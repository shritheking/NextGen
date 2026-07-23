const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');
const https = require('https');
const smtpClient = require('./smtpClient');

// Manually parse and load environment variables from local .env file
const dotenvPath = path.join(__dirname, '.env');
if (fs.existsSync(dotenvPath)) {
  const envContent = fs.readFileSync(dotenvPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let value = parts.slice(1).join('=').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

// Bypass local SSL certificate check restrictions for outbound API connections (e.g. Razorpay)
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SESSIONS = new Map();

const PORT = process.env.PORT || 3000;
const PROJECTS_FILE = path.join(__dirname, 'projects.json');
const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');
const RECEIPTS_FILE = path.join(__dirname, 'receipts.json');
const CONFIG_FILE = path.join(__dirname, 'config.json');
const USERS_FILE = path.join(__dirname, 'users.json');
const CHAT_MESSAGES_FILE = path.join(__dirname, 'chatbot_messages.json');

// Ensure database files exist
if (!fs.existsSync(PROJECTS_FILE)) fs.writeFileSync(PROJECTS_FILE, JSON.stringify([], null, 2));
if (!fs.existsSync(INQUIRIES_FILE)) fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
if (!fs.existsSync(RECEIPTS_FILE)) fs.writeFileSync(RECEIPTS_FILE, JSON.stringify([], null, 2));
if (!fs.existsSync(CHAT_MESSAGES_FILE)) fs.writeFileSync(CHAT_MESSAGES_FILE, JSON.stringify([], null, 2));
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([
    { email: 'shridharsanshridharsan@gmail.com', passcode: '123456' },
    { email: 'shridharsan@nextgenwebstudio.in', passcode: '123456' },
    { email: 'manual@test.com', passcode: '123456' }
  ], null, 2));
}
if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify({
    smtp: { host: 'smtp.gmail.com', port: 465, user: '', pass: '', from: '', to: 'shridharsan@nextgenwebstudio.in' },
    razorpay: { keyId: '', keySecret: '' },
    oauth: {
      googleClientId: '',
      googleClientSecret: '',
      appleClientId: '',
      appleTeamId: '',
      appleKeyId: '',
      applePrivateKey: ''
    }
  }, null, 2));
}

// ---------- SUPABASE DATABASE & DUAL FALLBACK SYSTEM ----------
let supabase = null;
try {
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('[Database] Connected to Supabase cloud hosting successfully.');
  } else {
    console.warn('[Database] Missing SUPABASE_URL or SUPABASE_KEY. Running on local JSON file fallbacks.');
  }
} catch (err) {
  console.warn('[Database] @supabase/supabase-js is not installed locally. Running on local JSON file fallbacks.');
}

function getTableName(collection) {
  switch (collection) {
    case 'inquiries': return 'inquiries';
    case 'projects': return 'projects';
    case 'receipts': return 'receipts';
    case 'users': return 'users';
    case 'chatbot_messages': return 'chatbot_messages';
    default: return collection;
  }
}

function getLocalFile(collection) {
  switch (collection) {
    case 'inquiries': return INQUIRIES_FILE;
    case 'projects': return PROJECTS_FILE;
    case 'receipts': return RECEIPTS_FILE;
    case 'users': return USERS_FILE;
    case 'chatbot_messages': return CHAT_MESSAGES_FILE;
    default: return path.join(__dirname, `${collection}.json`);
  }
}

function readLocalFallback(collection) {
  const file = getLocalFile(collection);
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return [];
  }
}

async function dbList(collection) {
  if (supabase) {
    const table = getTableName(collection);
    let { data, error } = await supabase.from(table).select('*');
    if (error) {
      console.error(`[Supabase dbList Error (${table})]:`, error);
      return readLocalFallback(collection);
    }
    if (data) {
      if (collection === 'users') {
        data = data.map(item => ({
          ...item,
          created: item.dateApproved || item.created_at
        }));
      } else if (collection === 'projects') {
        data = data.map(item => ({
          ...item,
          projectType: item.stack
        }));
      } else if (collection === 'receipts') {
        data = data.map(item => ({
          ...item,
          lineItems: item.items
        }));
      } else if (collection === 'chatbot_messages') {
        data = data.map(item => ({
          ...item,
          date: item.timestamp
        }));
      }
    }
    return data || [];
  }
  return readLocalFallback(collection);
}

async function dbWrite(collection, list) {
  if (supabase) {
    const table = getTableName(collection);
    let upsertList = list;
    if (collection === 'users') {
      upsertList = list.map(item => ({
        id: item.id || item.email,
        email: item.email,
        name: item.name || '',
        role: item.role || 'client',
        dateApproved: item.created || item.dateApproved || new Date().toISOString()
      }));
    } else if (collection === 'projects') {
      upsertList = list.map(item => ({
        id: item.id,
        name: item.name || '',
        email: item.email || '',
        phone: item.phone || '',
        budget: item.budget || '',
        stack: item.projectType || item.stack || 'Web Development',
        status: item.status || 'New Project',
        previewUrl: item.previewUrl || '',
        message: item.message || '',
        adminNotes: item.adminNotes || '',
        date: item.date || new Date().toLocaleDateString()
      }));
    } else if (collection === 'receipts') {
      upsertList = list.map(item => ({
        id: item.id,
        receiptCode: item.receiptCode || '',
        clientName: item.clientName || '',
        clientEmail: item.clientEmail || '',
        clientPhone: item.clientPhone || '',
        clientAddress: item.clientAddress || '',
        projectName: item.projectName || '',
        projectDescription: item.projectDescription || '',
        items: item.lineItems || item.items || [],
        subtotal: Number(item.subtotal) || 0,
        advancePaid: Number(item.advancePaid) || 0,
        taxRate: Number(item.taxRate) || 0,
        taxAmount: Number(item.taxAmount) || 0,
        totalAmount: Number(item.totalAmount) || 0,
        status: item.status || 'Pending',
        razorpayPaymentId: item.razorpayPaymentId || '',
        razorpaySignature: item.razorpaySignature || '',
        date: item.date || new Date().toLocaleDateString()
      }));
    } else if (collection === 'chatbot_messages') {
      upsertList = list.map(item => ({
        id: item.id,
        userEmail: item.userEmail || '',
        userMessage: item.userMessage || '',
        botResponse: item.botResponse || '',
        read: !!item.read,
        timestamp: item.date || item.timestamp || new Date().toISOString()
      }));
    }
    const { error } = await supabase.from(table).upsert(upsertList);
    if (error) {
      console.error(`[Supabase dbWrite Error (${table})]:`, error);
    }
  }
  const file = getLocalFile(collection);
  try {
    fs.writeFileSync(file, JSON.stringify(list, null, 2));
  } catch (e) {}
}

async function dbDelete(collection, id) {
  if (supabase) {
    const table = getTableName(collection);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      console.error(`[Supabase dbDelete Error (${table})]:`, error);
    }
  }
  const file = getLocalFile(collection);
  try {
    let list = readLocalFallback(collection);
    list = list.filter(item => item.id !== id);
    fs.writeFileSync(file, JSON.stringify(list, null, 2));
  } catch (e) {}
}

async function dbDeleteUserByEmail(email) {
  if (supabase) {
    const { error } = await supabase.from('users').delete().eq('email', email);
    if (error) {
      console.error('[Supabase dbDeleteUserByEmail Error]:', error);
    }
  }
  try {
    let list = readLocalFallback('users');
    list = list.filter(item => item.email.toLowerCase() !== email.toLowerCase());
    fs.writeFileSync(USERS_FILE, JSON.stringify(list, null, 2));
  } catch (e) {}
}

function readConfigFallback() {
  const base = {
    smtp: { host: 'smtp.gmail.com', port: 465, user: '', pass: '', from: '', to: 'shridharsan@nextgenwebstudio.in' },
    razorpay: { keyId: '', keySecret: '' },
    resend: { apiKey: '', from: 'onboarding@resend.dev', to: 'shridharsan@nextgenwebstudio.in' },
    oauth: {
      googleClientId: '',
      googleClientSecret: '',
      appleClientId: '',
      appleTeamId: '',
      appleKeyId: '',
      applePrivateKey: ''
    }
  };
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      // Deep merge fallback fields
      const config = {
        smtp: { ...base.smtp, ...data.smtp },
        razorpay: { ...base.razorpay, ...data.razorpay },
        resend: { ...base.resend, ...data.resend },
        oauth: { ...base.oauth, ...data.oauth }
      };

      if (process.env.RAZORPAY_KEY_ID && !config.razorpay.keyId) {
        config.razorpay.keyId = process.env.RAZORPAY_KEY_ID;
      }
      if (process.env.RAZORPAY_KEY_SECRET && !config.razorpay.keySecret) {
        config.razorpay.keySecret = process.env.RAZORPAY_KEY_SECRET;
      }
      if (process.env.SMTP_HOST && !config.smtp.host) config.smtp.host = process.env.SMTP_HOST;
      if (process.env.SMTP_PORT && !config.smtp.port) config.smtp.port = parseInt(process.env.SMTP_PORT, 10);
      if (process.env.SMTP_USER && !config.smtp.user) config.smtp.user = process.env.SMTP_USER;
      if (process.env.SMTP_PASS && !config.smtp.pass) config.smtp.pass = process.env.SMTP_PASS;
      if (process.env.SMTP_FROM && !config.smtp.from) config.smtp.from = process.env.SMTP_FROM;
      if (process.env.SMTP_TO && !config.smtp.to) config.smtp.to = process.env.SMTP_TO;
      if (process.env.RESEND_API_KEY && !config.resend.apiKey) config.resend.apiKey = process.env.RESEND_API_KEY;
      if (process.env.RESEND_FROM && !config.resend.from) config.resend.from = process.env.RESEND_FROM;
      if (process.env.RESEND_TO && !config.resend.to) config.resend.to = process.env.RESEND_TO;
      return config;
    }
  } catch (err) {
    console.error('Error reading config: ', err);
  }

  if (process.env.RAZORPAY_KEY_ID) {
    base.razorpay.keyId = process.env.RAZORPAY_KEY_ID;
  }
  if (process.env.RAZORPAY_KEY_SECRET) {
    base.razorpay.keySecret = process.env.RAZORPAY_KEY_SECRET;
  }
  if (process.env.SMTP_HOST) base.smtp.host = process.env.SMTP_HOST;
  if (process.env.SMTP_PORT) base.smtp.port = parseInt(process.env.SMTP_PORT, 10);
  if (process.env.SMTP_USER) base.smtp.user = process.env.SMTP_USER;
  if (process.env.SMTP_PASS) base.smtp.pass = process.env.SMTP_PASS;
  if (process.env.SMTP_FROM) base.smtp.from = process.env.SMTP_FROM;
  if (process.env.SMTP_TO) base.smtp.to = process.env.SMTP_TO;
  if (process.env.RESEND_API_KEY) base.resend.apiKey = process.env.RESEND_API_KEY;
  if (process.env.RESEND_FROM) base.resend.from = process.env.RESEND_FROM;
  if (process.env.RESEND_TO) base.resend.to = process.env.RESEND_TO;
  return base;
}

global.CONFIG = null;
function readConfig() {
  if (!global.CONFIG) {
    return readConfigFallback();
  }
  return global.CONFIG;
}

async function writeConfig(config) {
  try {
    global.CONFIG = config;
    if (supabase) {
      const { error } = await supabase.from('settings').upsert([{ key: 'app_config', value: config }]);
      if (error) {
        console.error('[Supabase writeConfig Error]:', error);
      }
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing config: ', err);
    return false;
  }
}

async function initConfig() {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('settings').select('value').eq('key', 'app_config').maybeSingle();
      if (!error && data && data.value) {
        global.CONFIG = data.value;
        console.log('[Config] Loaded config configuration from Supabase.');
        return;
      }
    }
  } catch (err) {
    console.error('[Config Init Error]:', err);
  }
  global.CONFIG = readConfigFallback();
}

async function dbMarkAllChatbotMessagesRead() {
  if (supabase) {
    const { error } = await supabase.from('chatbot_messages').update({ read: true }).eq('read', false);
    if (error) {
      console.error('[Supabase dbMarkAllChatbotMessagesRead Error]:', error);
    }
  }
  try {
    const list = readLocalFallback('chatbot_messages');
    list.forEach(msg => msg.read = true);
    fs.writeFileSync(CHAT_MESSAGES_FILE, JSON.stringify(list, null, 2));
  } catch (e) {}
}

async function registerUserAndSendCredentials(email, name) {
  try {
    const users = await dbList('users');
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      const newUser = {
        id: 'usr_' + Date.now(),
        email: email.toLowerCase(),
        name: name || 'Client',
        role: 'client',
        dateApproved: new Date().toISOString()
      };
      await dbWrite('users', [...users, newUser]);
      console.log(`[Auth] Approved client email: ${email}`);
    } else {
      console.log(`[Auth] Client ${email} is already approved`);
    }

    const config = readConfig();
    const hasSmtp = !!(config.smtp && config.smtp.user && config.smtp.pass);
    const hasResend = !!(config.resend && config.resend.apiKey);

    if (hasSmtp || hasResend) {
      const subject = `Welcome to NextGen Client Hub — Portal Access Active`;
      const emailText = `
Hello ${name || 'Client'},

Thank you for starting a project with NextGen Web Studio!

We have approved and activated your email address in our secure Client Hub registry. You can now log in directly using your Google (Gmail) or Apple account to view milestone roadmaps, track invoice status, and complete payments securely online:

Access Link: http://localhost:3000/client.html
Approved Email: ${email.toLowerCase()}

Simply click the "Sign In with Google" or "Sign In with Apple" button matching your approved email address.

Best regards,
NextGen Web Studio
Coimbatore, Tamil Nadu, India
      `;
      smtpClient.sendMail(config, { subject, text: emailText, to: email.trim().toLowerCase() })
        .then(() => console.log(`[Email Dispatch] Onboarding email dispatched to ${email.trim().toLowerCase()}`))
        .catch(err => console.error(`[Email Dispatch] Onboarding email failed:`, err.message));
    }
  } catch (err) {
    console.error('[Auth] Failed to register and send credentials:', err);
  }
}

function getSessionCookie(sessionId, req) {
  const origin = req.headers.origin || '';
  const host = req.headers.host || '';
  const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1') || host.includes('localhost') || host.includes('127.0.0.1');
  const sameSiteAttr = isLocalhost ? 'SameSite=Lax' : 'SameSite=None; Secure';
  return `session_id=${sessionId}; Path=/; HttpOnly; ${sameSiteAttr}; Max-Age=2592000`;
}

function getLogoutCookie(req) {
  const origin = req.headers.origin || '';
  const host = req.headers.host || '';
  const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1') || host.includes('localhost') || host.includes('127.0.0.1');
  const sameSiteAttr = isLocalhost ? 'SameSite=Lax' : 'SameSite=None; Secure';
  return `session_id=; Path=/; HttpOnly; ${sameSiteAttr}; Max-Age=0`;
}

function getFrontendRedirectUrl(req, redirectPath = '/client.html') {
  const host = req.headers.host || '';
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
  if (isLocalhost) {
    return redirectPath;
  }
  const frontendUrl = process.env.FRONTEND_URL || 'https://nextgenwebstudio.in';
  return `${frontendUrl}${redirectPath}`;
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  const origin = req.headers.origin || '';
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Route: /admin -> Serve admin.html
  if (pathname === '/admin' || pathname === '/admin/') {
    const adminPath = path.join(__dirname, 'admin.html');
    fs.readFile(adminPath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error loading admin workspace');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
    return;
  }

  // Handle Contact API (Splits submissions between projects and inquiries)
  if (pathname === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const lead = JSON.parse(body);
        if (!lead.name || !lead.email || !lead.message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name, email, and message are required' }));
          return;
        }

        // Add metadata
        lead.id = 'lead_' + Date.now();
        lead.date = new Date().toISOString();
        lead.status = 'New'; // Default status

        // All enquiries save to inquiries.json (General Enquiries) as master inbox
        const targetFile = INQUIRIES_FILE;
        const isProject = lead.budget && lead.budget.trim().length > 0;

        // Read and update file
        const records = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
        records.push(lead);
        await dbWrite(targetFile === INQUIRIES_FILE ? 'inquiries' : 'projects', records);

        // Dispatch email notification to admin asynchronously (non-blocking)
        try {
          dispatchNotificationEmail(lead, isProject);
        } catch (err) {
          console.error('[SMTP] Email trigger exception: ', err);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Message sent successfully!', leadId: lead.id, type: isProject ? 'project' : 'inquiry' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body or server error' }));
      }
    });
    return;
  }

  // GET All Leads (Union of both for backward compatibility)
  if (pathname === '/api/leads' && req.method === 'GET') {
    try {
      const projects = await dbList('projects');
      const inquiries = await dbList('inquiries');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([...projects, ...inquiries]));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read database leads' }));
    }
    return;
  }

  // --- INQUIRIES ROUTING (GET, UPDATE, DELETE) ---
  if (pathname === '/api/inquiries' && req.method === 'GET') {
    try {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read database inquiries' }));
    }
    return;
  }

  if (pathname === '/api/inquiries/update' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { id, status } = JSON.parse(body);
        const inquiries = await dbList('inquiries');
        const index = inquiries.findIndex(l => l.id === id);
        if (index === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Inquiry not found' }));
          return;
        }
        inquiries[index].status = status;
        await dbWrite('inquiries', inquiries);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, inquiry: inquiries[index] }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error updating inquiry' }));
      }
    });
    return;
  }

  if (pathname === '/api/inquiries/delete' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { id } = JSON.parse(body);
        await dbDelete('inquiries', id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Inquiry deleted' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error deleting inquiry' }));
      }
    });
    return;
  }

function parseBudgetToNumber(budgetString) {
  if (!budgetString) return 15000;
  const clean = budgetString.replace(/,/g, '').toLowerCase();
  const lakhMatch = clean.match(/([\d.]+)\s*l/);
  if (lakhMatch) {
    return parseFloat(lakhMatch[1]) * 100000;
  }
  const kMatch = clean.match(/([\d.]+)\s*k/);
  if (kMatch) {
    return parseFloat(kMatch[1]) * 1000;
  }
  const numberMatch = clean.match(/\d+/);
  if (numberMatch) {
    return parseInt(numberMatch[0]);
  }
  return 15000; 
}

  if (pathname === '/api/inquiries/move-to-project' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { id } = JSON.parse(body);
        const inquiries = await dbList('inquiries');
        const inquiryIndex = inquiries.findIndex(i => i.id === id);
        
        if (inquiryIndex === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Inquiry not found' }));
          return;
        }

        const inquiry = inquiries[inquiryIndex];
        
        // 1. Update status in inquiries.json
        inquiries[inquiryIndex].status = 'Moved';
        await dbWrite('inquiries', inquiries);

        // 2. Add new project lead entry in projects.json
        const projects = await dbList('projects');
        
        // Avoid duplicate project mappings
        let existingProj = projects.find(p => p.email.toLowerCase() === inquiry.email.toLowerCase() && p.projectType === (inquiry.projectType || 'Web Scoping'));
        
        if (!existingProj) {
          const newProject = {
            id: 'proj_' + Date.now(),
            name: inquiry.name,
            email: inquiry.email,
            phone: inquiry.phone || 'Not Provided',
            budget: inquiry.budget || 'Not Specified',
            projectType: inquiry.projectType || 'Web Development',
            message: inquiry.message,
            date: inquiry.date,
            status: 'New Project',
            startDate: new Date().toISOString() 
          };
          projects.push(newProject);
          await dbWrite('projects', projects);
        }

        // 2b. Auto-create a pending Retainer Invoice in receipts.json
        const receipts = await dbList('receipts');
        const existingReceipt = receipts.find(r => r.clientEmail.toLowerCase() === inquiry.email.toLowerCase() && r.projectTitle.toLowerCase().includes('milestone'));
        
        if (!existingReceipt) {
          const parsedTotal = parseBudgetToNumber(inquiry.budget);
          const newReceipt = {
            id: 'rcpt_' + Date.now(),
            clientName: inquiry.name,
            clientEmail: inquiry.email,
            clientPhone: inquiry.phone || 'N/A',
            projectTitle: (inquiry.projectType || 'Web Development') + ' - Milestone Retainer',
            status: 'Pending',
            total: parsedTotal,
            lineItems: [
              {
                taskName: 'Initial Project Scoping & Wireframe Specification Retainer',
                taskCost: parsedTotal
              }
            ],
            date: new Date().toISOString()
          };
          receipts.push(newReceipt);
          await dbWrite('receipts', receipts);
          console.log(`[Billing] Auto-generated milestone retainer invoice ${newReceipt.id} for ${inquiry.email} with amount ₹${parsedTotal}`);
        }

        // 3. Register user and send access passcode details email to their Gmail
        await registerUserAndSendCredentials(inquiry.email, inquiry.name);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Lead successfully moved to project and client welcome credentials dispatched!' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error converting lead to project' }));
      }
    });
    return;
  }

  // --- PROJECTS ROUTING (GET, UPDATE, DELETE) ---
  if (pathname === '/api/projects' && req.method === 'GET') {
    try {
      const data = fs.readFileSync(PROJECTS_FILE, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read database projects' }));
    }
    return;
  }

  if (pathname === '/api/projects/update-details' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { id, name, email, phone, projectType, budget, status, previewUrl, message } = JSON.parse(body);
        const projects = await dbList('projects');
        const index = projects.findIndex(l => l.id === id);
        if (index === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Project not found' }));
          return;
        }

        if (name !== undefined) projects[index].name = name.trim();
        if (email !== undefined) projects[index].email = email.trim();
        if (phone !== undefined) projects[index].phone = phone.trim();
        if (projectType !== undefined) projects[index].projectType = projectType.trim();
        if (budget !== undefined) projects[index].budget = budget.trim();
        if (status !== undefined) projects[index].status = status.trim();
        if (previewUrl !== undefined) projects[index].previewUrl = previewUrl.trim();
        if (message !== undefined) projects[index].message = message.trim();
        
        await dbWrite('projects', projects);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, project: projects[index] }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error updating project details' }));
      }
    });
    return;
  }

  if (pathname === '/api/projects/create-manual' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { name, email, phone, projectType, budget, status, previewUrl, message, adminNotes } = JSON.parse(body);
        if (!name || !email || !projectType || !budget) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name, email, project type, and budget are required' }));
          return;
        }

        const projects = await dbList('projects');
        const newProject = {
          id: 'proj_' + Date.now(),
          name,
          email,
          phone: phone || 'Not Provided',
          budget,
          projectType,
          message: message || '',
          date: new Date().toISOString(),
          status: status || 'New Project',
          previewUrl: previewUrl || '',
          adminNotes: adminNotes || '',
          startDate: new Date().toISOString()
        };
        projects.push(newProject);
        await dbWrite('projects', projects);

        // Auto-approve user email for portal access if they are manual projects!
        await registerUserAndSendCredentials(email, name);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, project: newProject }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error creating manual project' }));
      }
    });
    return;
  }

  if (pathname === '/api/projects/delete' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { id } = JSON.parse(body);
        await dbDelete('projects', id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Project deleted' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error deleting project' }));
      }
    });
    return;
  }

  // --- MANUAL RECEIPTS ROUTING (GET, CREATE, DELETE) ---
  if (pathname === '/api/receipts' && req.method === 'GET') {
    try {
      const data = fs.readFileSync(RECEIPTS_FILE, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read database receipts' }));
    }
    return;
  }

  if (pathname === '/api/receipts/create' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const receipt = JSON.parse(body);
        if (!receipt.clientName || !receipt.clientEmail || !receipt.projectTitle || !receipt.total) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name, email, project, and total are required' }));
          return;
        }

        const receipts = await dbList('receipts');

        if (receipt.id) {
          // Update existing receipt
          const index = receipts.findIndex(r => r.id === receipt.id);
          if (index !== -1) {
            receipt.date = receipts[index].date || new Date().toISOString();
            receipts[index] = receipt;
          } else {
            receipt.date = new Date().toISOString();
            receipts.push(receipt);
          }
        } else {
          // Create new receipt
          receipt.id = 'rcpt_' + Date.now();
          receipt.date = new Date().toISOString();
          receipts.push(receipt);
        }

        await dbWrite('receipts', receipts);

        // OPTIONAL CLIENT NOTIFICATION DISPATCH BASED ON FORM CHECKBOX
        if (receipt.sendEmail) {
          const config = readConfig();
          const hasSmtp = !!(config.smtp && config.smtp.user && config.smtp.pass);
          const hasResend = !!(config.resend && config.resend.apiKey);

          if (hasSmtp || hasResend) {
            const subject = `${receipt.status === 'Paid' ? 'Payment Confirmation Receipt' : 'Invoice Billing Statement'}: ${receipt.projectTitle} (${receipt.id.toUpperCase()})`;
            const htmlBody = generateReceiptEmailHtml(receipt);
            const pdfBuffer = generateReceiptPdfBuffer(receipt);
            const attachments = [
              {
                filename: `${receipt.status === 'Paid' ? 'Receipt' : 'Invoice'}_${receipt.id.toUpperCase()}.pdf`,
                contentType: 'application/pdf',
                content: pdfBuffer.toString('base64')
              }
            ];
            smtpClient.sendMail(config, { subject, text: htmlBody, to: receipt.clientEmail.trim().toLowerCase(), attachments })
              .then(() => console.log(`[Email Dispatch] Dispatched statement with PDF attachment for receipt ${receipt.id} to ${receipt.clientEmail.trim().toLowerCase()}`))
              .catch(err => console.error(`[Email Dispatch] Failed to dispatch statement: ${err.message}`));
          } else {
            console.log(`[Email Dispatch] Skipping dispatch for receipt ${receipt.id} since credentials are not configured.`);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, receipt }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error saving receipt' }));
      }
    });
    return;
  }

  if (pathname === '/api/receipts/delete' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { id } = JSON.parse(body);
        let receipts = await dbList('receipts');
        receipts = receipts.filter(r => r.id !== id);
        await dbWrite('receipts', receipts);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Receipt deleted' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error deleting receipt' }));
      }
    });
    return;
  }

  // --- CONFIGURATION ROUTING (GET, SAVE) ---
  if (pathname === '/api/config' && req.method === 'GET') {
    const config = readConfig();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(config));
    return;
  }

  if (pathname === '/api/config/save' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        if (!payload.smtp && !payload.resend) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email configuration parameters are required' }));
          return;
        }

        const config = readConfig();
        if (payload.smtp) {
          config.smtp = {
            host: payload.smtp.host || '',
            port: parseInt(payload.smtp.port) || 0,
            user: payload.smtp.user || '',
            pass: (payload.smtp.pass || '').replace(/\s+/g, ''), // Strip spaces
            from: payload.smtp.from || payload.smtp.user || '',
            to: payload.smtp.to || 'shridharsan@nextgenwebstudio.in'
          };
        }
        if (payload.resend) {
          config.resend = {
            apiKey: payload.resend.apiKey || '',
            from: payload.resend.from || 'onboarding@resend.dev',
            to: payload.resend.to || 'shridharsan@nextgenwebstudio.in'
          };
        }

        if (await writeConfig(config)) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, config }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to write config file' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error saving configurations' }));
      }
    });
    return;
  }

  // --- EMAIL TESTING & RECEIPT EMAILING ---
  if (pathname === '/api/smtp/test' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        const smtpConfig = payload.smtp || readConfig().smtp;
        const resendConfig = payload.resend || readConfig().resend;
        
        if (smtpConfig.pass) {
          smtpConfig.pass = smtpConfig.pass.replace(/\s+/g, ''); // Strip spaces
        }

        const hasSmtp = !!(smtpConfig.user && smtpConfig.pass);
        const hasResend = !!(resendConfig && resendConfig.apiKey);
        
        if (!hasSmtp && !hasResend) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'SMTP credentials or Resend API key is required for connection tests.' }));
          return;
        }

        const testEmail = {
          subject: 'Test Connection — NextGen Web Studio Email Dispatcher',
          text: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #dedcd4; border-radius: 8px; padding: 24px; background-color: #fafaf9; color: #0a0a0a;">
              <h2 style="border-bottom: 2px solid #0a0a0a; padding-bottom: 12px; margin-top: 0; font-weight: 700; text-transform: uppercase; font-size: 18px; letter-spacing: 0.5px;">NextGen Web Studio</h2>
              <p style="font-size: 14.5px; line-height: 1.5; color: #0a0a0a; font-weight: 600;">Connection Verified successfully!</p>
              <p style="font-size: 13.5px; line-height: 1.5; color: #59564f;">This is a test notification confirming your email dispatcher works successfully over secure HTTPS/SMTP transport.</p>
              <div style="margin-top: 30px; border-top: 1px dashed #dedcd4; padding-top: 15px; font-size: 11px; text-align: center; color: #8c897f;">
                Coimbatore, Tamil Nadu • Indian Standard Time
              </div>
            </div>
          `
        };

        const configToSend = { smtp: smtpConfig, resend: resendConfig };
        
        smtpClient.sendMail(configToSend, testEmail)
          .then(result => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, log: result.log }));
          })
          .catch(err => {
            console.error('[Email Test Error]', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          });
      } catch (err) {
        console.error('[SMTP Test Catch]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error during connection test: ' + err.message }));
      }
    });
    return;
  }

  if (pathname === '/api/smtp/dispatch-receipt' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { id, type } = JSON.parse(body);
        const config = readConfig();
        const hasSmtp = !!(config.smtp && config.smtp.user && config.smtp.pass);
        const hasResend = !!(config.resend && config.resend.apiKey);

        if (!hasSmtp && !hasResend) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email configuration is incomplete. Add credentials in Settings tab first.' }));
          return;
        }

        let subject = '';
        let htmlBody = '';
        let recipient = '';
        let attachments = [];

        if (type === 'receipt') {
          const receipts = await dbList('receipts');
          const item = receipts.find(r => r.id === id);
          if (!item) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Billing receipt not found' }));
            return;
          }

          recipient = item.clientEmail;
          subject = `${item.status === 'Paid' ? 'Payment Confirmation Receipt' : 'Invoice Billing Statement'}: ${item.projectTitle} (${item.id.toUpperCase()})`;
          htmlBody = generateReceiptEmailHtml(item);
          
          const pdfBuffer = generateReceiptPdfBuffer(item);
          attachments = [
            {
              filename: `${item.status === 'Paid' ? 'Receipt' : 'Invoice'}_${item.id.toUpperCase()}.pdf`,
              contentType: 'application/pdf',
              content: pdfBuffer.toString('base64')
            }
          ];

        } else {
          // Send lead details (for project/inquiry dispatch)
          const targetFile = type === 'project' ? PROJECTS_FILE : INQUIRIES_FILE;
          const records = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
          const item = records.find(r => r.id === id);
          if (!item) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Lead data not found' }));
            return;
          }

          recipient = config.to || 'shridharsan@nextgenwebstudio.in';
          subject = `Fwd Lead Brief: ${item.name} (${type.toUpperCase()})`;
          htmlBody = `
            <div style="background-color: #0b0b0a; padding: 40px 20px; font-family: 'Outfit', 'Inter', -apple-system, sans-serif; color: #f5f4f0; margin: 0 auto; max-width: 600px; border-radius: 12px;">
              <div style="background-color: #131312; border: 1px solid #22211f; border-radius: 12px; padding: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                <div style="border-bottom: 1px dashed #22211f; padding-bottom: 20px; margin-bottom: 24px;">
                  <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; color: #e0ff4f; letter-spacing: 2px;">nextgen_ studio</span>
                  <h3 style="margin: 8px 0 0 0; font-size: 18px; font-weight: 700; color: #f5f4f0; text-transform: uppercase;">Forwarded Lead Brief</h3>
                </div>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13.5px;">
                  <tr style="border-bottom: 1px solid #22211f;">
                    <th style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098; width: 35%;">Client Name</th>
                    <td style="padding: 10px 0; color: #f5f4f0;">${item.name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #22211f;">
                    <th style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Client Email</th>
                    <td style="padding: 10px 0; color: #f5f4f0;"><a href="mailto:${item.email}" style="color: #e0ff4f; text-decoration: none;">${item.email}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #22211f;">
                    <th style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Client Phone</th>
                    <td style="padding: 10px 0; color: #f5f4f0;">${item.phone || 'N/A'}</td>
                  </tr>
                  ${type === 'project' ? `
                  <tr style="border-bottom: 1px solid #22211f;">
                    <th style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Selected Categories</th>
                    <td style="padding: 10px 0; color: #f5f4f0;">${item.projectType || 'Not specified'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #22211f;">
                    <th style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Indicated Budget</th>
                    <td style="padding: 10px 0; color: #e0ff4f; font-weight: 600;">${item.budget || 'Not specified'}</td>
                  </tr>
                  ` : ''}
                  <tr style="border-bottom: 1px solid #22211f;">
                    <th style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Date Logged</th>
                    <td style="padding: 10px 0; color: #fafaf9;">${new Date(item.date).toLocaleString('en-IN')}</td>
                  </tr>
                </table>

                <div style="margin-top: 20px;">
                  <span style="font-weight: 600; font-size: 13.5px; display: block; margin-bottom: 8px; color: #e0ff4f;">Client Message Brief:</span>
                  <div style="background-color: #1b1b19; border: 1px solid #22211f; border-radius: 6px; padding: 16px; font-size: 13.5px; line-height: 1.6; color: #a2a098; font-style: italic; white-space: pre-wrap;">${item.message}</div>
                </div>

                <div style="margin-top: 30px; border-top: 1px solid #22211f; padding-top: 15px; font-size: 11px; text-align: center; color: #5c5b56;">
                  NextGen Web Studio Private Console • <a href="http://localhost:3000/admin" style="color: #a2a098; text-decoration: underline;">Open Workspace</a>
                </div>
              </div>
            </div>
          `;
        }

        // Send Email
        smtpClient.sendMail(config, { subject, text: htmlBody, to: recipient, attachments })
          .then(result => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Email statement dispatched successfully!' }));
          })
          .catch(err => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          });

      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error dispatching receipt email' }));
      }
    });
    return;
  }

  // Helper to parse cookies and verify active session user
  function getSessionUser(req) {
    const cookieHeader = req.headers.cookie || '';
    const cookies = {};
    cookieHeader.split(';').forEach(c => {
      const parts = c.split('=');
      if (parts.length === 2) {
        cookies[parts[0].trim()] = parts[1].trim();
      }
    });
    const sessionId = cookies['session_id'];
    if (!sessionId) return null;
    const session = SESSIONS.get(sessionId);
    if (!session) return null;
    if (Date.now() - session.loginTime > 30 * 24 * 60 * 60 * 1000) {
      SESSIONS.delete(sessionId);
      return null;
    }
    return session;
  }

  // --- CLIENT OAUTH AUTHENTICATION ROUTING ---
  if (pathname === '/api/auth/me' && req.method === 'GET') {
    const user = getSessionUser(req);
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ authenticated: !!user, email: user ? user.email : null }));
    return;
  }

  if (pathname === '/api/auth/login-email' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { email } = JSON.parse(body);
        if (!email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email is required' }));
          return;
        }

        const clientEmail = email.trim().toLowerCase();
        const users = await dbList('users');
        const isApproved = users.some(u => u.email.toLowerCase() === clientEmail);

        if (isApproved) {
          const sessionId = 'sess_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
          SESSIONS.set(sessionId, { email: clientEmail, loginTime: Date.now() });
          res.writeHead(200, { 
            'Set-Cookie': `session_id=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`, 
            'Content-Type': 'application/json' 
          });
          res.end(JSON.stringify({ success: true, message: 'Logged in successfully' }));
        } else {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'unauthorized_email' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error during passwordless login' }));
      }
    });
    return;
  }

  if (pathname === '/api/auth/mock' && req.method === 'GET') {
    const queryEmail = parsedUrl.searchParams.get('email') ? parsedUrl.searchParams.get('email').trim().toLowerCase() : 'shridharsanshridharsan@gmail.com';
    const users = await dbList('users');
    const isApproved = users.some(u => u.email.toLowerCase() === queryEmail);
    
    if (!isApproved) {
      res.writeHead(302, { 'Location': getFrontendRedirectUrl(req, '/client.html?error=unauthorized_email') });
      res.end();
      return;
    }

    const sessionId = 'sess_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    SESSIONS.set(sessionId, { email: queryEmail, loginTime: Date.now() });
    
    res.writeHead(302, { 
      'Set-Cookie': getSessionCookie(sessionId, req), 
      'Location': getFrontendRedirectUrl(req, '/client.html') 
    });
    res.end();
    return;
  }

  if (pathname === '/api/auth/logout' && req.method === 'GET') {
    const cookieHeader = req.headers.cookie || '';
    cookieHeader.split(';').forEach(c => {
      const parts = c.split('=');
      if (parts.length === 2 && parts[0].trim() === 'session_id') {
        SESSIONS.delete(parts[1].trim());
      }
    });
    res.writeHead(302, {
      'Set-Cookie': getLogoutCookie(req),
      'Location': getFrontendRedirectUrl(req, '/client.html')
    });
    res.end();
    return;
  }

  if (pathname === '/api/auth/google' && req.method === 'GET') {
    const oauth = readConfig().oauth || {};
    const googleClientId = process.env.GOOGLE_CLIENT_ID || oauth.googleClientId;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || oauth.googleClientSecret;
    if (!googleClientId || !googleClientSecret) {
      console.warn('[Google OAuth] Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET. Redirecting to mock login bypass.');
      res.writeHead(302, { 'Location': '/api/auth/mock?email=shridharsanshridharsan@gmail.com' });
      res.end();
      return;
    }
    const host = req.headers.host || 'localhost:3000';
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1');
    const protocol = isLocal ? 'http' : 'https';
    const redirectUri = encodeURIComponent(`${protocol}://${host}/api/auth/google/callback`);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile&prompt=select_account`;
    res.writeHead(302, { 'Location': authUrl });
    res.end();
    return;
  }

  if (pathname === '/api/auth/google/callback' && req.method === 'GET') {
    const code = parsedUrl.searchParams.get('code');
    if (!code) {
      res.writeHead(302, { 'Location': '/client.html?error=google_auth_failed' });
      res.end();
      return;
    }
    const oauth = readConfig().oauth || {};
    const googleClientId = process.env.GOOGLE_CLIENT_ID || oauth.googleClientId;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || oauth.googleClientSecret;
    if (!googleClientSecret) {
      console.warn('[Google OAuth] Missing GOOGLE_CLIENT_SECRET in callback phase. Redirecting to mock login bypass.');
      res.writeHead(302, { 'Location': '/api/auth/mock?email=shridharsanshridharsan@gmail.com' });
      res.end();
      return;
    }
    const host = req.headers.host || 'localhost:3000';
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1');
    const protocol = isLocal ? 'http' : 'https';
    const redirectUriStr = `${protocol}://${host}/api/auth/google/callback`;
    const tokenData = `code=${code}&client_id=${googleClientId}&client_secret=${googleClientSecret}&redirect_uri=${encodeURIComponent(redirectUriStr)}&grant_type=authorization_code`;
    
    const tokenOptions = {
      hostname: 'oauth2.googleapis.com',
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(tokenData)
      }
    };
    
    const reqToken = https.request(tokenOptions, (resToken) => {
      let body = '';
      resToken.on('data', chunk => body += chunk);
      resToken.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.access_token) {
            const userOptions = {
              hostname: 'www.googleapis.com',
              port: 443,
              path: '/oauth2/v2/userinfo',
              method: 'GET',
              headers: { 'Authorization': `Bearer ${json.access_token}` }
            };
            const reqUser = https.request(userOptions, (resUser) => {
              let userBody = '';
              resUser.on('data', chunk => userBody += chunk);
              resUser.on('end', async () => {
                try {
                  const userJson = JSON.parse(userBody);
                  if (userJson.email) {
                    const clientEmail = userJson.email.toLowerCase();
                    const users = await dbList('users');
                    const isApproved = users.some(u => u.email.toLowerCase() === clientEmail);
                    
                    if (isApproved) {
                      const sessionId = 'sess_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
                      SESSIONS.set(sessionId, { email: clientEmail, loginTime: Date.now() });
                      res.writeHead(302, { 
                        'Set-Cookie': getSessionCookie(sessionId, req), 
                        'Location': getFrontendRedirectUrl(req, '/client.html') 
                      });
                      res.end();
                    } else {
                      res.writeHead(302, { 'Location': getFrontendRedirectUrl(req, '/client.html?error=unauthorized_email') });
                      res.end();
                    }
                  } else {
                    res.writeHead(302, { 'Location': '/client.html?error=no_email' });
                    res.end();
                  }
                } catch (e) {
                  res.writeHead(302, { 'Location': '/client.html?error=user_info_parse_failed' });
                  res.end();
                }
              });
            });
            reqUser.on('error', () => {
              res.writeHead(302, { 'Location': '/client.html?error=user_info_fetch_failed' });
              res.end();
            });
            reqUser.end();
          } else {
            console.error('[Google OAuth] Token exchange failed. Response body:', body);
            res.writeHead(302, { 'Location': '/client.html?error=token_exchange_failed' });
            res.end();
          }
        } catch (e) {
          res.writeHead(302, { 'Location': '/client.html?error=token_parse_failed' });
          res.end();
        }
      });
    });
    
    reqToken.on('error', () => {
      res.writeHead(302, { 'Location': '/client.html?error=token_request_failed' });
      res.end();
    });
    reqToken.write(tokenData);
    reqToken.end();
    return;
  }

  if (pathname === '/api/auth/apple' && req.method === 'GET') {
    const oauth = readConfig().oauth || {};
    const appleClientId = process.env.APPLE_CLIENT_ID || oauth.appleClientId;
    if (!appleClientId) {
      res.writeHead(302, { 'Location': '/api/auth/mock' });
      res.end();
      return;
    }
    const redirectUri = encodeURIComponent('http://localhost:3000/api/auth/apple/callback');
    const authUrl = `https://appleid.apple.com/auth/authorize?client_id=${appleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=name%20email&response_mode=form_post`;
    res.writeHead(302, { 'Location': authUrl });
    res.end();
    return;
  }

  if (pathname === '/api/auth/apple/callback' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const parts = body.split('&');
        const params = {};
        parts.forEach(p => {
          const kvs = p.split('=');
          if (kvs.length === 2) {
            params[decodeURIComponent(kvs[0])] = decodeURIComponent(kvs[1]);
          }
        });
        
        const idToken = params.id_token;
        if (idToken) {
          const tokenParts = idToken.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString('utf8'));
            if (payload.email) {
              const clientEmail = payload.email.toLowerCase();
              const users = await dbList('users');
              const isApproved = users.some(u => u.email.toLowerCase() === clientEmail);
              
              if (isApproved) {
                const sessionId = 'sess_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
                SESSIONS.set(sessionId, { email: clientEmail, loginTime: Date.now() });
                res.writeHead(302, { 
                  'Set-Cookie': getSessionCookie(sessionId, req), 
                  'Location': getFrontendRedirectUrl(req, '/client.html') 
                });
                res.end();
                return;
              } else {
                res.writeHead(302, { 'Location': getFrontendRedirectUrl(req, '/client.html?error=unauthorized_email') });
                res.end();
                return;
              }
            }
          }
        }
        res.writeHead(302, { 'Location': '/client.html?error=apple_email_not_found' });
        res.end();
      } catch (err) {
        res.writeHead(302, { 'Location': '/client.html?error=apple_callback_failed' });
        res.end();
      }
    });
    return;
  }

  // --- APPROVED USERS REGISTRY API FOR ADMIN ---
  if (pathname === '/api/approved-users' && req.method === 'GET') {
    try {
      const users = await dbList('users');
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(users));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read approved users registry' }));
    }
    return;
  }

  if (pathname === '/api/approved-users/add' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { email, name } = JSON.parse(body);
        if (!email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email address is required' }));
          return;
        }

        const users = await dbList('users');
        const exists = users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
        
        if (!exists) {
          users.push({
            email: email.trim().toLowerCase(),
            name: name ? name.trim() : 'Approved Client',
            created: new Date().toISOString()
          });
          await dbWrite('users', users);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Client email added to approved OAuth registry.' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error adding approved user' }));
      }
    });
    return;
  }

  if (pathname === '/api/approved-users/delete' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { email } = JSON.parse(body);
        if (!email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email address is required' }));
          return;
        }

        await dbDeleteUserByEmail(email.trim());

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Client email removed from approved OAuth registry.' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error deleting approved user' }));
      }
    });
    return;
  }

  // --- CLIENT-SPECIFIC PROTECTED RETRIEVALS ---
  if (pathname === '/api/client/receipts' && req.method === 'GET') {
    const user = getSessionUser(req);
    if (!user) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized user session' }));
      return;
    }
    try {
      const receipts = await dbList('receipts');
      const filtered = receipts.filter(r => r.clientEmail && r.clientEmail.trim().toLowerCase() === user.email.trim().toLowerCase());
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      });
      res.end(JSON.stringify(filtered));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read client receipts' }));
    }
    return;
  }

  if (pathname === '/api/client/projects' && req.method === 'GET') {
    const user = getSessionUser(req);
    if (!user) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized user session' }));
      return;
    }
    try {
      const projects = await dbList('projects');
      const filtered = projects.filter(p => p.email && p.email.trim().toLowerCase() === user.email.trim().toLowerCase());
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      });
      res.end(JSON.stringify(filtered));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read client projects' }));
    }
    return;
  }

  if (pathname === '/api/client/inquiries' && req.method === 'GET') {
    const user = getSessionUser(req);
    if (!user) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized user session' }));
      return;
    }
    try {
      const inquiries = await dbList('inquiries');
      const filtered = inquiries.filter(i => i.email && i.email.trim().toLowerCase() === user.email.trim().toLowerCase());
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      });
      res.end(JSON.stringify(filtered));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read client inquiries' }));
    }
    return;
  }

  // --- CLIENT CHATBOT MESSAGES API ---
  if (pathname === '/api/chatbot/send' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { email, text, sender, botResponse } = JSON.parse(body);
        if (!text) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message text is required' }));
          return;
        }

        const messages = await dbList('chatbot_messages');
        const queryText = (text || '').toLowerCase();
        const connectKeywords = ['admin', 'manager', 'support', 'human', 'connect', 'talk', 'message admin', 'representative', 'receipt', 'invoice', 'billing', 'login', 'dashboard', 'passcode'];
        const isRequestingAdmin = connectKeywords.some(keyword => queryText.includes(keyword)) || sender === 'admin';

        const newMsg = {
          id: 'msg_' + Date.now() + Math.random().toString(36).substring(2, 6),
          email: email || 'Guest',
          sender: sender || 'client',
          text: text.trim(),
          date: new Date().toISOString(),
          read: (sender === 'admin')
        };

        if (isRequestingAdmin) {
          newMsg.speakToAdmin = true;
        }

        messages.push(newMsg);

        // Also save auto botResponse if present
        if (botResponse && botResponse.trim()) {
          const botMsg = {
            id: 'msg_bot_' + Date.now() + Math.random().toString(36).substring(2, 6),
            email: email || 'Guest',
            sender: 'bot',
            text: botResponse.trim(),
            date: new Date(Date.now() + 100).toISOString(),
            read: true
          };
          messages.push(botMsg);
        }

        // Write to database
        await dbWrite('chatbot_messages', messages);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: newMsg }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error saving chatbot message' }));
      }
    });
    return;
  }

  if (pathname === '/api/chatbot/messages' && req.method === 'GET') {
    try {
      const messages = await dbList('chatbot_messages');
      const qEmail = parsedUrl.searchParams.get('email');
      if (qEmail) {
        const filtered = messages.filter(m => m.email.toLowerCase() === qEmail.toLowerCase());
        res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        res.end(JSON.stringify(filtered));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        res.end(JSON.stringify(messages));
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read chatbot messages' }));
    }
    return;
  }

  if (pathname === '/api/chatbot/mark-read' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { messageId, email } = JSON.parse(body);
        const messages = await dbList('chatbot_messages');
        let updated = false;
        messages.forEach(m => {
          if (email) {
            if (m.email === email && !m.read) {
              m.read = true;
              updated = true;
            }
          } else if (!messageId || m.id === messageId) {
            if (!m.read) {
              m.read = true;
              updated = true;
            }
          }
        });
        if (updated) {
          await dbWrite('chatbot_messages', messages);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error marking messages read' }));
      }
    });
    return;
  }

  // --- RAZORPAY PAYMENT ENDPOINTS ---
  if (pathname === '/api/razorpay/create-order' && req.method === 'POST') {
    const user = getSessionUser(req);
    if (!user) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized user session' }));
      return;
    }
    
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { receiptId } = JSON.parse(body);
        const receipts = await dbList('receipts');
        const receipt = receipts.find(r => r.id === receiptId && r.clientEmail && r.clientEmail.trim().toLowerCase() === user.email.trim().toLowerCase());
        
        if (!receipt) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Receipt not found or access denied' }));
          return;
        }

        const config = readConfig();
        const rp = config.razorpay || {};
        
        if (!rp.keyId || !rp.keySecret) {
          const advancePaid = receipt.advancePaid || 0;
          const balanceDue = receipt.total - advancePaid;
          const orderAmount = Math.max(0, balanceDue);

          console.log('[Razorpay Mock] Simulating order creation for receipt:', receiptId);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            id: 'order_mock_' + Date.now(),
            amount: orderAmount * 100,
            currency: 'INR',
            receipt: receipt.id,
            isMock: true,
            key: 'rzp_test_mockkey'
          }));
          return;
        }

        const advancePaid = receipt.advancePaid || 0;
        const balanceDue = receipt.total - advancePaid;
        const orderAmount = Math.max(0, balanceDue);

        const auth = Buffer.from(`${rp.keyId}:${rp.keySecret}`).toString('base64');
        const reqData = JSON.stringify({
          amount: Math.round(orderAmount * 100),
          currency: 'INR',
          receipt: receipt.id
        });

        const reqOptions = {
          hostname: 'api.razorpay.com',
          port: 443,
          path: '/v1/orders',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
            'Content-Length': Buffer.byteLength(reqData)
          }
        };

        const rReq = https.request(reqOptions, (rRes) => {
          let rBody = '';
          rRes.on('data', chunk => rBody += chunk);
          rRes.on('end', () => {
            try {
              const resJson = JSON.parse(rBody);
              if (rRes.statusCode >= 200 && rRes.statusCode < 300) {
                resJson.key = rp.keyId;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(resJson));
              } else {
                res.writeHead(rRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(rBody);
              }
            } catch (e) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Failed to parse Razorpay response' }));
            }
          });
        });

        rReq.on('error', (e) => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to contact Razorpay server: ' + e.message }));
        });
        rReq.write(reqData);
        rReq.end();
      } catch (err) {
        console.error('[Razorpay Order Error]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error processing Razorpay order: ' + err.message }));
      }
    });
    return;
  }

  if (pathname === '/api/razorpay/verify-payment' && req.method === 'POST') {
    const user = getSessionUser(req);
    if (!user) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized user session' }));
      return;
    }
    
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { receiptId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = JSON.parse(body);
        const config = readConfig();
        const rp = config.razorpay || {};
        
        let verified = false;
        
        if (razorpay_order_id.startsWith('order_mock_')) {
          verified = true;
          console.log('[Razorpay Mock] Verifying payment for mock order:', razorpay_order_id);
        } else {
          const text = razorpay_order_id + '|' + razorpay_payment_id;
          const generated_signature = crypto
            .createHmac('sha256', rp.keySecret)
            .update(text)
            .digest('hex');
          
          if (generated_signature === razorpay_signature) {
            verified = true;
          }
        }

        if (verified) {
          const receipts = await dbList('receipts');
          const index = receipts.findIndex(r => r.id === receiptId && r.clientEmail && r.clientEmail.trim().toLowerCase() === user.email.trim().toLowerCase());
          
          if (index !== -1) {
            receipts[index].status = 'Paid';
            receipts[index].razorpayPaymentId = razorpay_payment_id || 'N/A';
            receipts[index].razorpayOrderId = razorpay_order_id || 'N/A';
            await dbWrite('receipts', receipts);

            const hasSmtp = !!(config.smtp && config.smtp.user && config.smtp.pass);
            const hasResend = !!(config.resend && config.resend.apiKey);

            if (hasSmtp || hasResend) {
              const updatedReceipt = receipts[index];
              const subject = `Payment Confirmation Receipt: ${updatedReceipt.projectTitle} (${updatedReceipt.id.toUpperCase()})`;
              const htmlBody = generateReceiptEmailHtml(updatedReceipt);
              const pdfBuffer = generateReceiptPdfBuffer(updatedReceipt);
              const attachments = [
                {
                  filename: `Receipt_${updatedReceipt.id.toUpperCase()}.pdf`,
                  contentType: 'application/pdf',
                  content: pdfBuffer.toString('base64')
                }
              ];
              smtpClient.sendMail(config, { subject, text: htmlBody, to: updatedReceipt.clientEmail.trim().toLowerCase(), attachments })
                .then(() => console.log(`[Email Dispatch] Dispatched paid confirmation for receipt ${updatedReceipt.id} to ${updatedReceipt.clientEmail.trim().toLowerCase()}`))
                .catch(err => console.error(`[Email Dispatch] Failed to send paid confirmation:`, err.message));
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Payment successfully processed and verified!' }));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Receipt not found to update status' }));
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Cryptographic signature verification failed' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error verifying signature' }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Secure against directory traversal attacks by ensuring the resolved path starts with __dirname
  const resolvedPath = path.resolve(filePath);
  const resolvedBase = path.resolve(__dirname);
  if (!resolvedPath.startsWith(resolvedBase)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden - Access Denied');
  }

  // Block direct access to database JSON logs, configs, env variables, or server script source code
  const forbiddenFiles = [
    'config.json',
    'users.json',
    'leads.json',
    'smtp_config.json',
    'inquiries.json',
    'projects.json',
    'receipts.json',
    'approved_users.json',
    'chatbot_messages.json',
    '.env',
    'package.json',
    'package-lock.json',
    'server.js'
  ];
  const baseName = path.basename(filePath).toLowerCase();
  if (forbiddenFiles.includes(baseName) || baseName.startsWith('.')) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden - Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA router (or 404 for assets with extensions)
      if (path.extname(pathname)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.json') contentType = 'application/json';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.ico') contentType = 'image/x-icon';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        const headers = { 'Content-Type': contentType };
        if (contentType === 'text/html') {
          headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';
        }
        res.writeHead(200, headers);
        res.end(content);
      }
    });
  });
});

initConfig().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});

function generateReceiptPdfBuffer(item) {
  const isPaid = item.status === 'Paid';
  const linesContent = [];

  const escapePdf = (str) => {
    if (!str) return '';
    return str.replace(/[()\\\r]/g, (m) => '\\' + m);
  };

  const hasSignature = false;

  // Let's set line width and stroke color to default black
  linesContent.push('0.5 w');
  linesContent.push('0 0 0 RG');
  linesContent.push('0 0 0 rg');

  // ==================== LEFT HEADER: LOGO ====================
  // Company logo text: nextgen
  linesContent.push('BT');
  linesContent.push('/F2 20 Tf'); // Helvetica-Bold 20
  linesContent.push('50 780 Td');
  linesContent.push('(nextgen) Tj');
  linesContent.push('ET');

  // Draw thick vertical black cursor bar: x=128, y=780, w=6, h=18
  linesContent.push('128 780 6 18 re f');

  // Sub-header 1: Premium Web Design & Full-Stack Engineering
  linesContent.push('BT');
  linesContent.push('/F1 9 Tf'); // Helvetica 9
  linesContent.push('50 762 Td');
  linesContent.push('(Premium Web Design & Full-Stack Engineering) Tj');
  linesContent.push('ET');

  // Sub-header 2: Coimbatore, Tamil Nadu, India | shridharsan@nextgenwebstudio.in
  linesContent.push('BT');
  linesContent.push('/F1 8 Tf'); // Helvetica 8
  linesContent.push('50 750 Td');
  linesContent.push('(Coimbatore, Tamil Nadu, India | shridharsan@nextgenwebstudio.in) Tj');
  linesContent.push('ET');

  // ==================== RIGHT HEADER: METADATA ====================
  // Document Title: INVOICE STATEMENT / PAYMENT RECEIPT
  linesContent.push('BT');
  linesContent.push('/F2 13 Tf'); // Helvetica-Bold 13
  linesContent.push('380 780 Td');
  linesContent.push(`(${isPaid ? 'PAYMENT RECEIPT' : 'INVOICE STATEMENT'}) Tj`);
  linesContent.push('ET');

  // ID & Date
  linesContent.push('BT');
  linesContent.push('/F1 9 Tf'); // Helvetica 9
  linesContent.push('430 762 Td');
  linesContent.push(`(ID: ${escapePdf(item.id.toUpperCase())}) Tj`);
  linesContent.push('ET');

  linesContent.push('BT');
  linesContent.push('/F1 9 Tf'); // Helvetica 9
  linesContent.push('430 748 Td');
  linesContent.push(`(Date: ${escapePdf(new Date(item.date).toLocaleDateString('en-IN'))}) Tj`);
  linesContent.push('ET');

  // ==================== SEPARATOR LINE ====================
  linesContent.push('0.5 w');
  linesContent.push('0.4 0.4 0.4 RG');
  linesContent.push('50 735 m');
  linesContent.push('545 735 l');
  linesContent.push('S');

  // ==================== BILL TO & PROJECT SECTIONS ====================
  // BILL TO:
  linesContent.push('BT');
  linesContent.push('/F1 8 Tf'); // Helvetica 8
  linesContent.push('50 710 Td');
  linesContent.push('(BILL TO:) Tj');
  linesContent.push('ET');

  linesContent.push('BT');
  linesContent.push('/F2 11 Tf'); // Helvetica-Bold 11
  linesContent.push('50 694 Td');
  linesContent.push(`(${escapePdf(item.clientName)}) Tj`);
  linesContent.push('ET');

  linesContent.push('BT');
  linesContent.push('/F1 9 Tf'); // Helvetica 9
  linesContent.push('50 680 Td');
  linesContent.push(`(${escapePdf(item.clientEmail)}) Tj`);
  linesContent.push('ET');

  linesContent.push('BT');
  linesContent.push('/F1 9 Tf'); // Helvetica 9
  linesContent.push('50 666 Td');
  linesContent.push(`(${escapePdf(item.clientPhone || 'N/A')}) Tj`);
  linesContent.push('ET');

  // PROJECT:
  linesContent.push('BT');
  linesContent.push('/F1 8 Tf'); // Helvetica 8
  linesContent.push('280 710 Td');
  linesContent.push('(PROJECT:) Tj');
  linesContent.push('ET');

  linesContent.push('BT');
  linesContent.push('/F2 11 Tf'); // Helvetica-Bold 11
  linesContent.push('280 694 Td');
  linesContent.push(`(${escapePdf(item.projectTitle)}) Tj`);
  linesContent.push('ET');

  // ==================== TABLE OF LINE ITEMS ====================
  // Table Top thick border line
  linesContent.push('1.5 w');
  linesContent.push('0 0 0 RG');
  linesContent.push('50 645 m');
  linesContent.push('545 645 l');
  linesContent.push('S');

  // Table Headers
  linesContent.push('BT');
  linesContent.push('/F1 8 Tf'); // Helvetica 8
  linesContent.push('50 632 Td');
  linesContent.push('(LINE ITEM DESCRIPTION) Tj');
  linesContent.push('ET');

  linesContent.push('BT');
  linesContent.push('/F1 8 Tf'); // Helvetica 8
  linesContent.push('480 632 Td');
  linesContent.push('(AMOUNT \\(INR\\)) Tj');
  linesContent.push('ET');

  // Table header thin separator line
  linesContent.push('1 w');
  linesContent.push('50 622 m');
  linesContent.push('545 622 l');
  linesContent.push('S');

  // Table Rows (Dynamic list)
  let y = 605;
  if (item.lineItems && item.lineItems.length > 0) {
    item.lineItems.forEach(line => {
      linesContent.push('BT');
      linesContent.push('/F1 9.5 Tf');
      linesContent.push(`55 ${y} Td`);
      linesContent.push(`(${escapePdf(line.taskName)}) Tj`);
      linesContent.push('ET');

      linesContent.push('BT');
      linesContent.push('/F2 9.5 Tf');
      linesContent.push(`480 ${y} Td`); 
      linesContent.push(`(INR ${escapePdf(Number(line.taskCost).toLocaleString('en-IN'))}) Tj`);
      linesContent.push('ET');

      y -= 20;
    });
  } else {
    linesContent.push('BT');
    linesContent.push('/F1 9.5 Tf');
    linesContent.push(`55 ${y} Td`);
    linesContent.push(`(${escapePdf(item.projectTitle)}) Tj`);
    linesContent.push('ET');

    linesContent.push('BT');
    linesContent.push('/F2 9.5 Tf');
    linesContent.push(`480 ${y} Td`); 
    linesContent.push(`(INR ${escapePdf(Number(item.total).toLocaleString('en-IN'))}) Tj`);
    linesContent.push('ET');

    y -= 20;
  }

  // Draw end of table line
  linesContent.push('1 w');
  linesContent.push(`50 ${y + 10} m`);
  linesContent.push(`545 ${y + 10} l`);
  linesContent.push('S');

  // ==================== TOTALS SECTION ====================
  const advancePaid = item.advancePaid || 0;
  const balanceDue = item.total - advancePaid;
  const formattedTotal = Number(item.total).toLocaleString('en-IN');
  const formattedAdvance = Number(advancePaid).toLocaleString('en-IN');
  const formattedBalance = Number(balanceDue).toLocaleString('en-IN');

  if (advancePaid > 0) {
    // Grand Total Row
    linesContent.push('BT');
    linesContent.push('/F1 9 Tf');
    linesContent.push(`330 ${y - 10} Td`);
    linesContent.push('(GRAND TOTAL:) Tj');
    linesContent.push('ET');

    linesContent.push('BT');
    linesContent.push('/F1 9.5 Tf');
    linesContent.push(`480 ${y - 10} Td`);
    linesContent.push(`(INR ${escapePdf(formattedTotal)}) Tj`);
    linesContent.push('ET');

    // Advance Paid Row
    linesContent.push('BT');
    linesContent.push('/F1 9 Tf');
    linesContent.push(`330 ${y - 25} Td`);
    linesContent.push('(ADVANCE PAID:) Tj');
    linesContent.push('ET');

    linesContent.push('BT');
    linesContent.push('/F1 9.5 Tf');
    linesContent.push(`480 ${y - 25} Td`);
    linesContent.push(`(INR ${escapePdf(formattedAdvance)}) Tj`);
    linesContent.push('ET');

    // Thin separator
    linesContent.push(`330 ${y - 35} m`);
    linesContent.push(`545 ${y - 35} l`);
    linesContent.push('S');

    // Balance Due Row
    linesContent.push('BT');
    linesContent.push('/F2 10.5 Tf');
    linesContent.push(`330 ${y - 50} Td`);
    linesContent.push(`(${isPaid ? 'TOTAL AMOUNT PAID:' : 'BALANCE DUE:'}) Tj`);
    linesContent.push('ET');

    linesContent.push('BT');
    linesContent.push('/F2 13 Tf');
    linesContent.push(`480 ${y - 52} Td`);
    linesContent.push(`(INR ${escapePdf(isPaid ? formattedTotal : formattedBalance)}) Tj`);
    linesContent.push('ET');

    y -= 55;
  } else {
    // Standard Total row
    linesContent.push('BT');
    linesContent.push('/F1 10.5 Tf');
    linesContent.push(`330 ${y - 15} Td`);
    linesContent.push(`(${isPaid ? 'TOTAL AMOUNT PAID:' : 'TOTAL AMOUNT DUE:'}) Tj`);
    linesContent.push('ET');

    linesContent.push('BT');
    linesContent.push('/F2 13 Tf');
    linesContent.push(`480 ${y - 17} Td`);
    linesContent.push(`(INR ${escapePdf(formattedTotal)}) Tj`);
    linesContent.push('ET');

    y -= 20;
  }

  // ==================== PAYMENT STATUS BLOCK ====================
  const statusColor = isPaid ? '0 0.5 0' : '0.9 0.4 0'; // green or orange
  linesContent.push('BT');
  linesContent.push('/F1 9.5 Tf');
  linesContent.push(`50 ${y - 35} Td`);
  linesContent.push('(Payment Status: ) Tj');
  linesContent.push('ET');

  linesContent.push('BT');
  linesContent.push('/F2 9.5 Tf');
  linesContent.push(`${statusColor} rg`); // Set fill color for status
  linesContent.push(`130 ${y - 35} Td`);
  linesContent.push(`(${isPaid ? 'PAID & CLEARED' : 'PENDING'}) Tj`);
  linesContent.push('ET');
  linesContent.push('0 0 0 rg'); // Restore fill color black

  // ==================== FOOTER ====================
  // Separation line
  linesContent.push('0.5 w');
  linesContent.push('0.8 0.8 0.8 RG');
  linesContent.push('50 60 m');
  linesContent.push('545 60 l');
  linesContent.push('S');

  linesContent.push('BT');
  linesContent.push('/F1 8 Tf');
  linesContent.push('0.4 0.4 0.4 rg'); // Light gray text
  linesContent.push('140 42 Td');
  linesContent.push('(NextGen Web Studio • Coimbatore, Tamil Nadu, India • Support: shridharsan@nextgenwebstudio.in) Tj');
  linesContent.push('ET');
  linesContent.push('0 0 0 rg'); // Restore fill color black

  const streamContent = linesContent.join('\n');
  const streamLength = Buffer.byteLength(streamContent, 'utf8');

  const pdfParts = [];
  pdfParts.push(Buffer.from('%PDF-1.4\n'));
  
  // Object 1: Catalog
  pdfParts.push(Buffer.from('1 0 obj\n<</Type/Catalog/Pages 2 0 R>>\nendobj\n'));

  // Object 2: Pages
  pdfParts.push(Buffer.from('2 0 obj\n<</Type/Pages/Kids[3 0 R]/Count 1>>\nendobj\n'));

  // Object 3: Page Definition
  const resources = hasSignature 
    ? '<</Font<</F1 5 0 R/F2 6 0 R>>/XObject<</Img0 7 0 R>>>>'
    : '<</Font<</F1 5 0 R/F2 6 0 R>>>>';
  pdfParts.push(Buffer.from(`3 0 obj\n<</Type/Page/Parent 2 0 R/Resources${resources}/MediaBox[0 0 595.28 841.89]/Contents 4 0 R>>\nendobj\n`));

  // Object 4: Stream Data
  pdfParts.push(Buffer.from(`4 0 obj\n<</Length ${streamLength}>>\nstream\n`));
  pdfParts.push(Buffer.from(streamContent + '\n'));
  pdfParts.push(Buffer.from('endstream\nendobj\n'));

  // Object 5: Normal Font
  pdfParts.push(Buffer.from('5 0 obj\n<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>\nendobj\n'));

  // Object 6: Bold Font
  pdfParts.push(Buffer.from('6 0 obj\n<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold>>\nendobj\n'));

  if (hasSignature) {
    // Object 7: Image RGB Data
    pdfParts.push(Buffer.from(`7 0 obj\n<</Type/XObject/Subtype/Image/Width 378/Height 189/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/FlateDecode/SMask 8 0 R/Length ${compRgb.length}>>\nstream\n`));
    pdfParts.push(compRgb);
    pdfParts.push(Buffer.from('\nendstream\nendobj\n'));

    // Object 8: Image SMask (Alpha) Data
    pdfParts.push(Buffer.from(`8 0 obj\n<</Type/XObject/Subtype/Image/Width 378/Height 189/ColorSpace/DeviceGray/BitsPerComponent 8/Filter/FlateDecode/Length ${compAlpha.length}>>\nstream\n`));
    pdfParts.push(compAlpha);
    pdfParts.push(Buffer.from('\nendstream\nendobj\n'));
  }

  // Trailer / EOF
  const size = hasSignature ? 9 : 7;
  pdfParts.push(Buffer.from(`trailer\n<</Root 1 0 R/Size ${size}>>\n%%EOF`));

  return Buffer.concat(pdfParts);
}

function generateReceiptEmailHtml(item) {
  const advancePaid = item.advancePaid || 0;
  const balanceDue = item.total - advancePaid;
  
  const formattedTotal = Number(item.total).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  const formattedBalance = Number(balanceDue).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  const formattedAdvance = Number(advancePaid).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  let rowsMarkup = '';
  if (item.lineItems && item.lineItems.length > 0) {
    item.lineItems.forEach(line => {
      const costText = Number(line.taskCost).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
      rowsMarkup += `
        <tr style="border-bottom: 1px solid #22211f;">
          <td style="padding: 12px; font-size: 13px; color: #a2a098;">${line.taskName}</td>
          <td style="padding: 12px; text-align: right; font-weight: 600; font-size: 13px; color: #fafaf9;">${costText}</td>
        </tr>
      `;
    });
  } else {
    rowsMarkup += `
      <tr style="border-bottom: 1px solid #22211f;">
        <td style="padding: 12px; font-size: 13px; color: #a2a098;">${item.projectTitle}</td>
        <td style="padding: 12px; text-align: right; font-weight: 600; font-size: 13px; color: #fafaf9;">${formattedTotal}</td>
      </tr>
    `;
  }

  const isPaid = item.status === 'Paid';
  const headerText = isPaid ? 'PAYMENT RECEIPT' : 'INVOICE STATEMENT';
  const badgeHtml = isPaid 
    ? `<span style="display: inline-block; background-color: rgba(74, 222, 128, 0.08); font-family: monospace; font-size: 11.5px; color: #4ADE80; padding: 6px 14px; border-radius: 4px; margin-top: 12px; border: 1px solid rgba(74, 222, 128, 0.2); font-weight: 700; letter-spacing: 0.5px;">✓ PAID &amp; CLEARED</span>` 
    : `<span style="display: inline-block; background-color: rgba(245, 158, 11, 0.08); font-family: monospace; font-size: 11.5px; color: #F59E0B; padding: 6px 14px; border-radius: 4px; margin-top: 12px; border: 1px solid rgba(245, 158, 11, 0.2); font-weight: 700; letter-spacing: 0.5px;">⏳ PAYMENT PENDING</span>`;
  
  const introText = isPaid 
    ? `Thank you for your payment! We have successfully received and processed your payment for the project listed below. Your formal confirmation receipt details are attached.` 
    : `Thank you for choosing NextGen Web Studio! Please review the project billing statement and contract agreement details listed below. Payment is currently outstanding.`;

  const totalLabel = isPaid ? 'Total Amount Paid (Received)' : 'Total Amount Due';
  const agreementTitle = isPaid ? 'Service Status Confirmation:' : 'Service Statement Agreement:';
  const agreementText = isPaid 
    ? `This document serves as formal confirmation of payment received. NextGen Web Studio has successfully logged this transaction to your client ledger. Service roadmaps will execute as scheduled.` 
    : `NextGen Web Studio is committed to full transparency. All items are custom compiled to project roadmap bounds. Service execution begins on confirmation of 50% project kickstart retainer.`;

  let footerRows = '';
  if (advancePaid > 0) {
    footerRows = `
      <tr style="background-color: #1b1b19; border-top: 2px solid #22211f;">
        <td class="table-cell" style="padding: 10px 12px; font-size: 12px; color: #a2a098;">GRAND TOTAL</td>
        <td class="table-cell" style="padding: 10px 12px; text-align: right; font-weight: 600; font-size: 13px; color: #fafaf9;">${formattedTotal}</td>
      </tr>
      <tr style="background-color: #1b1b19; border-top: 1px dashed #22211f;">
        <td class="table-cell" style="padding: 10px 12px; font-size: 12px; color: #a2a098;">ADVANCE PAID</td>
        <td class="table-cell" style="padding: 10px 12px; text-align: right; font-weight: 600; font-size: 13px; color: #4ADE80;">${formattedAdvance}</td>
      </tr>
      <tr style="background-color: #1b1b19; border-top: 2px solid #22211f;">
        <td class="table-cell" style="padding: 14px 12px; font-weight: 700; font-size: 13.5px; color: #fafaf9;">${totalLabel}</td>
        <td class="table-cell" style="padding: 14px 12px; text-align: right; font-weight: 700; font-size: 16px; color: #e0ff4f;">${formattedBalance}</td>
      </tr>
    `;
  } else {
    footerRows = `
      <tr style="background-color: #1b1b19; border-top: 2px solid #22211f;">
        <td class="table-cell" style="padding: 14px 12px; font-weight: 700; font-size: 13.5px; color: #fafaf9;">${totalLabel}</td>
        <td class="table-cell" style="padding: 14px 12px; text-align: right; font-weight: 700; font-size: 16px; color: #e0ff4f;">${formattedTotal}</td>
      </tr>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media screen and (max-width: 600px) {
          .email-container {
            padding: 16px 8px !important;
          }
          .email-card {
            padding: 20px 16px !important;
          }
          .email-header h2 {
            font-size: 19px !important;
          }
          .info-block {
            padding: 12px !important;
          }
          .table-header, .table-cell {
            padding: 8px !important;
            font-size: 12px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0b0b0a;">
      <div class="email-container" style="background-color: #0b0b0a; padding: 40px 20px; font-family: 'Outfit', 'Inter', -apple-system, sans-serif; color: #f5f4f0; margin: 0 auto; max-width: 600px; box-sizing: border-box;">
        <div class="email-card" style="background-color: #131312; border: 1px solid #22211f; border-radius: 12px; padding: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); box-sizing: border-box;">
          <!-- Header -->
          <div class="email-header" style="border-bottom: 1px dashed #22211f; padding-bottom: 24px; margin-bottom: 28px; text-align: center;">
            <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; color: #e0ff4f; letter-spacing: 2px; display: block; margin-bottom: 8px;">nextgen_ studio</span>
            <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #f5f4f0; text-transform: uppercase; letter-spacing: 0.5px;">${headerText}</h2>
            <div style="margin-top: 4px;">
              <span style="display: inline-block; background-color: #1b1b19; font-family: monospace; font-size: 11px; color: #a2a098; padding: 4px 12px; border-radius: 4px; border: 1px solid #22211f;">ID: ${item.id.toUpperCase()}</span>
            </div>
            <div>
              ${badgeHtml}
            </div>
          </div>

          <p style="font-size: 14.5px; margin-bottom: 16px; color: #fafaf9;">Dear <strong>${item.clientName}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #a2a098; margin-bottom: 28px;">${introText}</p>

          <!-- Project info -->
          <div class="info-block" style="background-color: #1b1b19; border: 1px solid #22211f; border-radius: 6px; padding: 16px; margin-bottom: 24px; box-sizing: border-box;">
            <span style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #e0ff4f; display: block; margin-bottom: 4px;">PROJECT DESCRIPTION</span>
            <span style="font-size: 14px; font-weight: 600; color: #f5f4f0;">${item.projectTitle}</span>
          </div>

          <!-- Table -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
            <thead>
              <tr style="background-color: #1b1b19;">
                <th class="table-header" style="padding: 12px; text-align: left; font-size: 11px; font-family: monospace; text-transform: uppercase; color: #a2a098; border-bottom: 2px solid #22211f;">Task Item Description</th>
                <th class="table-header" style="padding: 12px; text-align: right; font-size: 11px; font-family: monospace; text-transform: uppercase; color: #a2a098; border-bottom: 2px solid #22211f;">Cost</th>
              </tr>
            </thead>
            <tbody>
              ${rowsMarkup}
              ${footerRows}
            </tbody>
          </table>

          <div style="background-color: #1b1b19; padding: 18px; border-radius: 6px; border: 1px solid #22211f; font-size: 13px; line-height: 1.6; color: #a2a098; margin-bottom: 28px;">
            <span style="font-weight: 700; display: block; margin-bottom: 6px; text-transform: uppercase; font-size: 11px; color: #e0ff4f; letter-spacing: 0.5px;">${agreementTitle}</span>
            ${agreementText}
          </div>

          <div style="border-top: 1px solid #22211f; padding-top: 20px; font-size: 11px; text-align: center; color: #5c5b56;">
            NextGen Web Studio • Coimbatore, Tamil Nadu, India • <a href="mailto:shridharsan@nextgenwebstudio.in" style="color: #a2a098; text-decoration: underline;">Support Email</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateLeadEmailHtml(lead, isProject, leadType, phone, budget, categories) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media screen and (max-width: 600px) {
          .email-container {
            padding: 16px 8px !important;
          }
          .email-card {
            padding: 20px 16px !important;
          }
          .email-header h3 {
            font-size: 16px !important;
          }
          .table-header, .table-cell {
            padding: 8px !important;
            font-size: 12px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0b0b0a;">
      <div class="email-container" style="background-color: #0b0b0a; padding: 40px 20px; font-family: 'Outfit', 'Inter', -apple-system, sans-serif; color: #f5f4f0; margin: 0 auto; max-width: 600px; box-sizing: border-box;">
        <div class="email-card" style="background-color: #131312; border: 1px solid #22211f; border-radius: 12px; padding: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); box-sizing: border-box;">
          <div class="email-header" style="border-bottom: 1px dashed #22211f; padding-bottom: 20px; margin-bottom: 24px;">
            <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; color: #e0ff4f; letter-spacing: 2px;">nextgen_ studio</span>
            <h3 style="margin: 8px 0 0 0; font-size: 18px; font-weight: 700; color: #f5f4f0; text-transform: uppercase;">New Scoping Lead Logged</h3>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13.5px;">
            <tr style="border-bottom: 1px solid #22211f;">
              <th class="table-header" style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098; width: 35%;">Lead Type</th>
              <td class="table-cell" style="padding: 10px 0; color: #f5f4f0;">${leadType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #22211f;">
              <th class="table-header" style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Client Name</th>
              <td class="table-cell" style="padding: 10px 0; color: #f5f4f0;">${lead.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #22211f;">
              <th class="table-header" style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Client Email</th>
              <td class="table-cell" style="padding: 10px 0; color: #f5f4f0;"><a href="mailto:${lead.email}" style="color: #e0ff4f; text-decoration: none;">${lead.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #22211f;">
              <th class="table-header" style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Client Phone</th>
              <td class="table-cell" style="padding: 10px 0; color: #f5f4f0;">${phone}</td>
            </tr>
            ${isProject ? `
            <tr style="border-bottom: 1px solid #22211f;">
              <th class="table-header" style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Project Category</th>
              <td class="table-cell" style="padding: 10px 0; color: #f5f4f0;">${categories}</td>
            </tr>
            <tr style="border-bottom: 1px solid #22211f;">
              <th class="table-header" style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Project Budget</th>
              <td class="table-cell" style="padding: 10px 0; color: #e0ff4f; font-weight: 600;">${budget}</td>
            </tr>
            ` : ''}
            <tr style="border-bottom: 1px solid #22211f;">
              <th class="table-header" style="text-align: left; padding: 10px 0; font-weight: 600; color: #a2a098;">Captured Date</th>
              <td class="table-cell" style="padding: 10px 0; color: #fafaf9;">${new Date(lead.date).toLocaleString('en-IN')}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <span style="font-weight: 600; font-size: 13.5px; display: block; margin-bottom: 8px; color: #e0ff4f;">Client Message Brief:</span>
            <div style="background-color: #1b1b19; border: 1px solid #22211f; border-radius: 6px; padding: 16px; font-size: 13.5px; line-height: 1.6; color: #a2a098; font-style: italic; white-space: pre-wrap; box-sizing: border-box;">${lead.message}</div>
          </div>

          <div style="margin-top: 30px; border-top: 1px solid #22211f; padding-top: 15px; font-size: 11px; text-align: center; color: #5c5b56;">
            NextGen Web Studio Private Console • <a href="http://localhost:3000/admin" style="color: #a2a098; text-decoration: underline;">Open Workspace</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function dispatchNotificationEmail(lead, isProject) {
  const config = readConfig();
  const hasSmtp = !!(config.smtp && config.smtp.user && config.smtp.pass);
  const hasResend = !!(config.resend && config.resend.apiKey);

  if (!hasSmtp && !hasResend) {
    console.log('[Email Dispatch] Credentials not configured. Skipping email dispatch.');
    return;
  }

  const leadType = isProject ? 'Project Scoping Lead' : 'General Enquiry';
  const budget = lead.budget || 'Not specified';
  const categories = lead.projectType || 'Not specified';
  const phone = lead.phone || 'Not Provided';

  const subject = `🚀 New Lead: ${lead.name} (${leadType})`;
  const htmlBody = generateLeadEmailHtml(lead, isProject, leadType, phone, budget, categories);

  smtpClient.sendMail(config, { subject, text: htmlBody })
    .then(res => console.log(`[Email Dispatch] Success dispatching email alert for lead ${lead.id}`))
    .catch(err => console.error(`[Email Dispatch] Fail to send lead email: ${err.message}`));
}
