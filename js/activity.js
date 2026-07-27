// ========================================================
// NextGen Web Studio - Email Hub & Activity Logs Module
// ========================================================

// ---------- SMTP / EMAIL HUB CONFIGURATION ----------

const providerRadios = document.getElementsByName('emailProvider');

function toggleProviderBlocks(selectedProvider) {
  const resendBlock = document.getElementById('resendConfigBlock');
  const smtpBlock = document.getElementById('smtpConfigBlock');
  if (!resendBlock || !smtpBlock) return;
  if (selectedProvider === 'smtp') {
    resendBlock.style.display = 'none';
    smtpBlock.style.display = 'grid';
  } else {
    resendBlock.style.display = 'grid';
    smtpBlock.style.display = 'none';
  }
}
window.toggleProviderBlocks = toggleProviderBlocks;

async function fetchSmtpConfig() {
  try {
    const res = await fetch(window.getApiUrl('/api/config'));
    if (res.ok) {
      const config = await res.json();
      
      const activeProvider = config.provider || 'resend';
      const targetRadio = Array.from(providerRadios).find(r => r.value === activeProvider);
      if (targetRadio) targetRadio.checked = true;
      toggleProviderBlocks(activeProvider);

      if (config.smtp) {
        if (document.getElementById('smtpHost')) document.getElementById('smtpHost').value = config.smtp.host || '';
        if (document.getElementById('smtpPort')) document.getElementById('smtpPort').value = config.smtp.port || '';
        if (document.getElementById('smtpUser')) document.getElementById('smtpUser').value = config.smtp.user || '';
        if (document.getElementById('smtpPass')) document.getElementById('smtpPass').value = config.smtp.pass || '';
        if (document.getElementById('smtpFromName')) document.getElementById('smtpFromName').value = config.smtp.fromName || 'NextGen Web Studio';
        if (document.getElementById('smtpFromEmail')) document.getElementById('smtpFromEmail').value = config.smtp.fromEmail || '';
        if (document.getElementById('smtpTo')) document.getElementById('smtpTo').value = config.smtp.to || 'shridharsan@nextgenwebstudio.in';
      }
      if (config.resend) {
        if (document.getElementById('resendApiKey')) document.getElementById('resendApiKey').value = config.resend.apiKey || '';
        if (document.getElementById('resendFromName')) document.getElementById('resendFromName').value = config.resend.fromName || 'NextGen Web Studio';
        if (document.getElementById('resendFromEmail')) document.getElementById('resendFromEmail').value = config.resend.fromEmail || 'shridharsan@nextgenwebstudio.in';
        if (document.getElementById('resendTo')) document.getElementById('resendTo').value = config.resend.to || 'shridharsan@nextgenwebstudio.in';
      }

      loadTemplates();
      loadEmailLogs();

      const activeFromEmail = activeProvider === 'resend' ? 
        (config.resend ? config.resend.fromEmail : '') : 
        (config.smtp ? config.smtp.fromEmail : '');
      loadDomainDiagnostics(activeProvider, activeFromEmail);
    }
  } catch (err) {
    console.warn('Failed to fetch SMTP configuration settings from backend.');
  }
}
window.fetchSmtpConfig = fetchSmtpConfig;

// Domain diagnostics loader
async function loadDomainDiagnostics(provider, fromEmail) {
  const diagProvider = document.getElementById('diagProvider');
  const diagConnection = document.getElementById('diagConnection');
  const diagDomain = document.getElementById('diagDomain');
  const diagVerification = document.getElementById('diagVerification');
  if (!diagProvider || !diagConnection || !diagDomain || !diagVerification) return;

  diagProvider.innerText = provider.toUpperCase();

  if (fromEmail && fromEmail.includes('@')) {
    diagDomain.innerText = fromEmail.substring(fromEmail.indexOf('@') + 1);
  } else {
    diagDomain.innerText = '-';
  }

  if (provider === 'resend') {
    try {
      const res = await fetch(window.getApiUrl('/api/resend/domain-status'));
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'not_configured') {
          diagConnection.innerHTML = '<span style="color: #EF4444;">🔴 Not Configured</span>';
          diagVerification.innerHTML = '<span style="color: var(--ink-faint);">N/A (Missing API Key)</span>';
        } else {
          diagConnection.innerHTML = '<span style="color: #4ADE80;">🟢 Connected</span>';
          diagVerification.innerHTML = data.verified ? 
            '<span style="color: #4ADE80;">✅ Verified</span>' : 
            '<span style="color: #FBBF24;">⏳ Pending/Unverified</span>';
        }
      } else {
        diagConnection.innerHTML = '<span style="color: #EF4444;">🔴 Offline</span>';
        diagVerification.innerHTML = '<span style="color: #EF4444;">Verification Query Fail</span>';
      }
    } catch (e) {
      diagConnection.innerHTML = '<span style="color: #EF4444;">🔴 Error</span>';
      diagVerification.innerHTML = '<span style="color: #EF4444;">Query Error</span>';
    }
  } else {
    const host = document.getElementById('smtpHost') ? document.getElementById('smtpHost').value : '';
    const user = document.getElementById('smtpUser') ? document.getElementById('smtpUser').value : '';
    if (host && user) {
      diagConnection.innerHTML = '<span style="color: #4ADE80;">🟢 Configured</span>';
    } else {
      diagConnection.innerHTML = '<span style="color: #EF4444;">🔴 Disconnected</span>';
    }
    diagVerification.innerHTML = '<span style="color: var(--ink-faint);">N/A (SMTP Mode)</span>';
  }
}
window.loadDomainDiagnostics = loadDomainDiagnostics;

// Email templates manager logic
let templatesData = [];
async function loadTemplates() {
  const templateSelect = document.getElementById('templateSelect');
  if (!templateSelect) return;
  try {
    const res = await fetch(window.getApiUrl('/api/email/templates'));
    if (res.ok) {
      templatesData = await res.json();
      templateSelect.innerHTML = '';
      templatesData.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.innerText = t.name || t.id;
        templateSelect.appendChild(opt);
      });
      if (templatesData.length > 0) {
        selectTemplate(templatesData[0].id);
      }
    }
  } catch (e) {
    console.error('Error fetching email templates:', e);
  }
}
window.loadTemplates = loadTemplates;

function selectTemplate(id) {
  const templateSubject = document.getElementById('templateSubject');
  const templateBody = document.getElementById('templateBody');
  if (!templateSubject || !templateBody) return;
  const t = templatesData.find(temp => temp.id === id);
  if (t) {
    templateSubject.value = t.subject || '';
    templateBody.value = t.body || '';
  }
}
window.selectTemplate = selectTemplate;

// Email delivery logs logic
async function loadEmailLogs() {
  const tbody = document.getElementById('emailLogsTableBody');
  if (!tbody) return;
  try {
    const res = await fetch(window.getApiUrl('/api/email/logs'));
    if (res.ok) {
      const logs = await res.json();
      tbody.innerHTML = '';
      if (logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="padding: 15px; text-align: center; color: var(--ink-faint);">No email delivery logs recorded yet.</td></tr>`;
        return;
      }
      logs.forEach(log => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.02)';
        
        const dateStr = new Date(log.timestamp).toLocaleString('en-IN', {
          day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
        });
        const statusColor = log.status === 'Success' ? '#4ADE80' : '#EF4444';
        const statusIcon = log.status === 'Success' ? '✅' : '❌';
        
        tr.innerHTML = `
          <td style="padding: 10px 12px; color: var(--ink-soft); white-space: nowrap;">${dateStr}</td>
          <td style="padding: 10px 12px; font-weight: 500; word-break: break-all;">${log.recipient}</td>
          <td style="padding: 10px 12px; color: var(--ink-soft);">${log.subject}</td>
          <td style="padding: 10px 12px; text-transform: uppercase; font-size: 11px; font-family: var(--font-mono);">${log.provider}</td>
          <td style="padding: 10px 12px; text-align: right; color: ${statusColor}; font-weight: 600; white-space: nowrap;">${statusIcon} ${log.status}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  } catch (e) {
    console.error('Error fetching email delivery logs:', e);
  }
}
window.loadEmailLogs = loadEmailLogs;

// SMTP email dispatcher
async function dispatchEmail(id, type) {
  const btn = event.currentTarget || document.activeElement;
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Mailing...`;

  const oldStatus = document.getElementById('modalSmtpStatus');
  if (oldStatus) oldStatus.remove();

  const statusBanner = document.createElement('div');
  statusBanner.id = 'modalSmtpStatus';
  statusBanner.style.marginTop = '15px';
  statusBanner.style.padding = '12px';
  statusBanner.style.borderRadius = 'var(--radius-sm)';
  statusBanner.style.fontSize = '12.5px';
  statusBanner.style.fontFamily = 'var(--font-mono)';
  statusBanner.style.lineHeight = '1.4';
  statusBanner.style.textAlign = 'center';
  statusBanner.innerText = 'Connecting to SMTP mail server...';
  statusBanner.style.border = '1px solid var(--border)';
  statusBanner.style.background = 'var(--bg-alt)';
  statusBanner.style.color = 'var(--ink-soft)';
  
  const container = document.getElementById('receiptActionsContainer');
  if (container) {
    container.parentNode.insertBefore(statusBanner, container.nextSibling);
  } else {
    document.body.appendChild(statusBanner);
  }

  try {
    const res = await fetch(window.getApiUrl('/api/smtp/dispatch-receipt'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type })
    });
    
    const data = await res.json();
    if (res.ok && data.success) {
      statusBanner.style.background = 'rgba(74, 222, 128, 0.08)';
      statusBanner.style.borderColor = 'rgba(74, 222, 128, 0.3)';
      statusBanner.style.color = '#4ADE80';
      statusBanner.innerText = '✓ Success: Email dispatched successfully!';
    } else {
      statusBanner.style.background = 'rgba(239, 68, 68, 0.08)';
      statusBanner.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      statusBanner.style.color = '#EF4444';
      statusBanner.innerText = '✗ Error: ' + (data.error || 'Failed to connect.');
    }
  } catch (err) {
    console.error(err);
    statusBanner.style.background = 'rgba(239, 68, 68, 0.08)';
    statusBanner.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    statusBanner.style.color = '#EF4444';
    statusBanner.innerText = '✗ Network connection failed.';
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalText;
    setTimeout(() => {
      const banner = document.getElementById('modalSmtpStatus');
      if (banner) banner.remove();
    }, 5000);
  }
}
window.dispatchEmail = dispatchEmail;


// ---------- SYSTEM ACTIVITY LOGS ----------

async function fetchSystemActivityLogs() {
  const container = document.getElementById('systemActivityLogList');
  if (!container) return;

  try {
    const res = await fetch(window.getApiUrl('/api/activity-logs?_t=' + Date.now()));
    if (res.ok) {
      const logs = await res.json();
      renderSystemActivityLogs(logs);
    } else {
      container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ink-soft); font-size:12.5px;">Failed to fetch activity logs.</div>`;
    }
  } catch (err) {
    console.error('Failed to fetch system activity logs:', err);
    container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ink-soft); font-size:12.5px;">Error connecting to API.</div>`;
  }
}
window.fetchSystemActivityLogs = fetchSystemActivityLogs;

function renderSystemActivityLogs(list) {
  const container = document.getElementById('systemActivityLogList');
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ink-soft); font-size:12.5px;">No system events logged yet.</div>`;
    return;
  }

  const sorted = [...list].sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at));

  container.innerHTML = sorted.slice(0, 50).map(l => {
    const date = new Date(l.createdAt || l.created_at);
    const timeText = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let icon = 'fa-circle-check', color = '#4ADE80';
    if (l.action.includes('Invoice') || l.action.includes('Billing') || l.action.includes('Payment')) { icon = 'fa-file-invoice-dollar'; color = 'var(--accent)'; }
    else if (l.action.includes('Roadmap')) { icon = 'fa-route'; color = '#3B82F6'; }
    else if (l.action.includes('Login')) { icon = 'fa-right-to-bracket'; color = '#A78BFA'; }
    else if (l.action.includes('File') || l.action.includes('Asset') || l.action.includes('Uploaded')) { icon = 'fa-cloud-arrow-up'; color = '#F472B6'; }
    else if (l.action.includes('Project Created') || l.action.includes('Onboarding')) { icon = 'fa-rocket'; color = '#3B82F6'; }
    else if (l.action.includes('Ticket') || l.action.includes('Support')) { icon = 'fa-headset'; color = '#F59E0B'; }

    return `
      <div class="activity-item" style="border-bottom:1px solid var(--border); padding-bottom:12px; margin-bottom:8px;">
        <div class="activity-icon" style="color:${color}; background:rgba(128,128,128,0.05); display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:50%; margin-right:12px;"><i class="fa-solid ${icon}"></i></div>
        <div class="activity-text">
          <strong>${l.action}</strong>
          <div style="font-size:12.5px; color:var(--ink-soft); margin-top:2px;">${l.description || ''}</div>
          <span>${timeText} &bull; User: ${l.userId || 'system'}</span>
        </div>
      </div>
    `;
  }).join('');
}
window.renderSystemActivityLogs = renderSystemActivityLogs;


// ---------- EVENT BINDINGS FOR SMTP ----------

document.addEventListener('DOMContentLoaded', () => {
  providerRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      toggleProviderBlocks(e.target.value);
      const fromEmail = e.target.value === 'resend' ? 
        (document.getElementById('resendFromEmail') ? document.getElementById('resendFromEmail').value : '') : 
        (document.getElementById('smtpFromEmail') ? document.getElementById('smtpFromEmail').value : '');
      loadDomainDiagnostics(e.target.value, fromEmail);
    });
  });

  const smtpSettingsForm = document.getElementById('smtpSettingsForm');
  if (smtpSettingsForm) {
    smtpSettingsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const activeProvider = document.querySelector('input[name="emailProvider"]:checked').value;
      const payload = {
        provider: activeProvider,
        smtp: {
          host: document.getElementById('smtpHost') ? document.getElementById('smtpHost').value.trim() : '',
          port: document.getElementById('smtpPort') ? parseInt(document.getElementById('smtpPort').value) || 0 : 0,
          user: document.getElementById('smtpUser') ? document.getElementById('smtpUser').value.trim() : '',
          pass: document.getElementById('smtpPass') ? document.getElementById('smtpPass').value.replace(/\s+/g, '') : '',
          fromName: document.getElementById('smtpFromName') ? document.getElementById('smtpFromName').value.trim() : 'NextGen Web Studio',
          fromEmail: document.getElementById('smtpFromEmail') ? document.getElementById('smtpFromEmail').value.trim() : '',
          to: document.getElementById('smtpTo') ? document.getElementById('smtpTo').value.trim() : ''
        },
        resend: {
          apiKey: document.getElementById('resendApiKey') ? document.getElementById('resendApiKey').value.trim() : '',
          fromName: document.getElementById('resendFromName') ? document.getElementById('resendFromName').value.trim() : 'NextGen Web Studio',
          fromEmail: document.getElementById('resendFromEmail') ? document.getElementById('resendFromEmail').value.trim() : 'shridharsan@nextgenwebstudio.in',
          to: document.getElementById('resendTo') ? document.getElementById('resendTo').value.trim() : 'shridharsan@nextgenwebstudio.in'
        }
      };

      try {
        const res = await fetch(window.getApiUrl('/api/config/save'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (res.ok) {
          showToast('Settings Saved', 'Email configurations have been saved successfully.', 'success');
          fetchSmtpConfig();
        } else {
          const data = await res.json();
          showToast('Save Failed', data.error || 'Server error occurred.', 'error');
        }
      } catch (err) {
        console.error(err);
        showToast('Connection Error', 'Failed to reach backend configuration API.', 'error');
      }
    });
  }

  const testSmtpBtn = document.getElementById('testSmtpBtn');
  if (testSmtpBtn) {
    testSmtpBtn.addEventListener('click', async () => {
      const originalText = testSmtpBtn.innerHTML;
      testSmtpBtn.disabled = true;
      testSmtpBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Dispatched...`;

      const activeProvider = document.querySelector('input[name="emailProvider"]:checked').value;
      const payload = {
        provider: activeProvider,
        to: document.getElementById('emailTestTo') ? document.getElementById('emailTestTo').value.trim() : '',
        smtp: {
          host: document.getElementById('smtpHost') ? document.getElementById('smtpHost').value.trim() : '',
          port: document.getElementById('smtpPort') ? parseInt(document.getElementById('smtpPort').value) || 0 : 0,
          user: document.getElementById('smtpUser') ? document.getElementById('smtpUser').value.trim() : '',
          pass: document.getElementById('smtpPass') ? document.getElementById('smtpPass').value.replace(/\s+/g, '') : '',
          fromName: document.getElementById('smtpFromName') ? document.getElementById('smtpFromName').value.trim() : 'NextGen Web Studio',
          fromEmail: document.getElementById('smtpFromEmail') ? document.getElementById('smtpFromEmail').value.trim() : '',
          to: document.getElementById('smtpTo') ? document.getElementById('smtpTo').value.trim() : ''
        },
        resend: {
          apiKey: document.getElementById('resendApiKey') ? document.getElementById('resendApiKey').value.trim() : '',
          fromName: document.getElementById('resendFromName') ? document.getElementById('resendFromName').value.trim() : 'NextGen Web Studio',
          fromEmail: document.getElementById('resendFromEmail') ? document.getElementById('resendFromEmail').value.trim() : 'shridharsan@nextgenwebstudio.in',
          to: document.getElementById('resendTo') ? document.getElementById('resendTo').value.trim() : 'shridharsan@nextgenwebstudio.in'
        }
      };

      const statusDiv = document.getElementById('smtpTestStatus');
      if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.style.background = 'rgba(224, 255, 79, 0.04)';
        statusDiv.style.borderColor = 'var(--border)';
        statusDiv.style.color = 'var(--ink-soft)';
        statusDiv.innerText = 'Connecting to email dispatcher and dispatching connection check...';
      }

      try {
        const res = await fetch(window.getApiUrl('/api/smtp/test'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (res.ok && data.success) {
          if (statusDiv) {
            statusDiv.style.background = 'rgba(74, 222, 128, 0.08)';
            statusDiv.style.borderColor = 'rgba(74, 222, 128, 0.3)';
            statusDiv.style.color = '#4ADE80';
            
            statusDiv.innerText = [
              `Provider      : ${data.provider}`,
              `Domain        : ${data.domain}`,
              `Verified      : ${data.verified}`,
              `Recipient     : ${data.recipient}`,
              `Message ID    : ${data.messageId}`,
              `Latency       : ${data.latency} ms`,
              `Status        : ${data.status}`
            ].join('\n');
          }

          if (document.getElementById('diagLastTest')) document.getElementById('diagLastTest').innerText = new Date().toLocaleTimeString();
          if (document.getElementById('diagMessageId')) document.getElementById('diagMessageId').innerText = data.messageId || '-';
          
          loadEmailLogs();
          const activeFromEmail = activeProvider === 'resend' ? 
            (document.getElementById('resendFromEmail') ? document.getElementById('resendFromEmail').value : '') : 
            (document.getElementById('smtpFromEmail') ? document.getElementById('smtpFromEmail').value : '');
          loadDomainDiagnostics(activeProvider, activeFromEmail);
        } else {
          if (statusDiv) {
            statusDiv.style.background = 'rgba(239, 68, 68, 0.08)';
            statusDiv.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            statusDiv.style.color = '#EF4444';
            statusDiv.innerText = `EMAIL CONNECTION TEST FAILED:\n\n${data.error || 'Connection failed.'}\n\nVerify provider keys, server ports, and domain mappings.`;
          }
        }
      } catch (err) {
        console.error(err);
        if (statusDiv) {
          statusDiv.style.background = 'rgba(239, 68, 68, 0.08)';
          statusDiv.style.borderColor = 'rgba(239, 68, 68, 0.3)';
          statusDiv.style.color = '#EF4444';
          statusDiv.innerText = `API CONNECTIVITY ERROR:\n\nFailed to establish connection to the backend test router. Ensure server.js is running.`;
        }
      } finally {
        testSmtpBtn.disabled = false;
        testSmtpBtn.innerHTML = originalText;
      }
    });
  }

  const templateSelect = document.getElementById('templateSelect');
  if (templateSelect) {
    templateSelect.addEventListener('change', (e) => {
      selectTemplate(e.target.value);
    });
  }

  const saveTemplateBtn = document.getElementById('saveTemplateBtn');
  if (saveTemplateBtn) {
    saveTemplateBtn.addEventListener('click', async () => {
      const activeId = templateSelect.value;
      const index = templatesData.findIndex(t => t.id === activeId);
      if (index !== -1) {
        templatesData[index].subject = document.getElementById('templateSubject').value;
        templatesData[index].body = document.getElementById('templateBody').value;
        
        try {
          const res = await fetch(window.getApiUrl('/api/email/templates/save'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(templatesData)
          });
          if (res.ok) {
            showToast('Template Saved', 'Template changes have been saved successfully.', 'success');
          } else {
            showToast('Save Failed', 'Failed to save email template.', 'error');
          }
        } catch (e) {
          showToast('Connection Error', 'Error saving template to server.', 'error');
        }
      }
    });
  }
});
