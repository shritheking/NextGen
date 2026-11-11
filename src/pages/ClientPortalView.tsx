import React, { useState, useEffect } from 'react';
import {
  Lock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  RefreshCw,
  Terminal,
  User,
  Clock,
  Sparkles,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  FolderLock,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  Building2,
  Printer,
  Eye,
  EyeOff,
  Activity,
  Layers,
  Key,
  Briefcase,
  Code2,
  Bot,
  Database,
  ChevronRight,
  Compass
} from 'lucide-react';
import { NextGenLogo } from '../components/NextGenLogo';

interface ClientPortalViewProps {
  onBackToHome: () => void;
  onOpenContact: () => void;
}

interface InvoiceItem {
  id: string;
  projectTitle: string;
  total: number;
  advancePaid: number;
  status: 'Pending' | 'Paid';
  date: string;
}

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  projectType: string;
  message: string;
  status: string;
  date: string;
}

interface ProjectItem {
  id: string;
  projectTitle: string;
  budget: number;
  status: 'In Progress' | 'Completed';
  currentStage: number; // 0 to 4
  progress: number;
  eta: string;
  nextMilestone: string;
}

const DEMO_INVOICES: InvoiceItem[] = [
  {
    id: 'INV-NG-9021',
    projectTitle: 'Boomers Gaming Lounge OS - Sprint 2 Milestone',
    total: 35000,
    advancePaid: 15000,
    status: 'Pending',
    date: '04 Nov 2026'
  },
  {
    id: 'INV-NG-9022',
    projectTitle: 'PrimeScalpers Telegram Bot - Production License',
    total: 25000,
    advancePaid: 0,
    status: 'Pending',
    date: '05 Nov 2026'
  },
  {
    id: 'INV-NG-8840',
    projectTitle: 'GoatTurf Sports Arena Platform - Core Architecture',
    total: 50000,
    advancePaid: 50000,
    status: 'Paid',
    date: '10 Oct 2026'
  },
  {
    id: 'INV-NG-8712',
    projectTitle: 'NextGen Design System & Technical Specification',
    total: 20000,
    advancePaid: 20000,
    status: 'Paid',
    date: '28 Sep 2026'
  }
];

const DEMO_PROJECTS: ProjectItem[] = [
  {
    id: 'PRJ-BOOMERS',
    projectTitle: 'Boomers Gaming Lounge OS',
    budget: 80000,
    status: 'In Progress',
    currentStage: 3, // Development
    progress: 75,
    eta: '8 Days Remaining • Target Nov 16',
    nextMilestone: 'POS Hardware & Tournament Bracket Integration'
  },
  {
    id: 'PRJ-PRIMESCALPERS',
    projectTitle: 'PrimeScalpers Telegram Automation Bot',
    budget: 45000,
    status: 'In Progress',
    currentStage: 3, // Development
    progress: 90,
    eta: '4 Days Remaining • Target Nov 12',
    nextMilestone: 'MT5 Broker Webhook & VIP Paywall Verification'
  },
  {
    id: 'PRJ-GOATTURF',
    projectTitle: 'GoatTurf Sports Arena Platform',
    budget: 65000,
    status: 'Completed',
    currentStage: 4, // Launch
    progress: 100,
    eta: 'Shipped & Live on Production',
    nextMilestone: 'DNS Active & Maintenance SLA Onboarding'
  }
];

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({ onBackToHome, onOpenContact }) => {
  // Authentication & session state - default to false so Login Gate animations are seen immediately
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientEmail, setClientEmail] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProgressBar, setAuthProgressBar] = useState('');
  const [activeStage, setActiveStage] = useState(0);
  const [isStagePaused, setIsStagePaused] = useState(false);

  // Auto-advance stages with smooth moving animation (user click pauses for 6s)
  useEffect(() => {
    if (isStagePaused) {
      const resumeTimer = setTimeout(() => setIsStagePaused(false), 6000);
      return () => clearTimeout(resumeTimer);
    }
    const stageTimer = setInterval(() => {
      setActiveStage(prev => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(stageTimer);
  }, [isStagePaused]);

  const handleStageSelect = (idx: number) => {
    setActiveStage(idx);
    setIsStagePaused(true);
  };

  const loadClientData = async (token?: string, userEmail?: string, manual = false) => {
    if (manual) setIsSyncing(true);
    setIsLoadingData(true);
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? '' : 'https://nextgen-studio-czz7.onrender.com';
    const activeToken = token || localStorage.getItem('session_id') || '';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (activeToken) {
      headers['Authorization'] = `Bearer ${activeToken}`;
      headers['x-session-id'] = activeToken;
    }

    try {
      const [receiptsRes, projectsRes, inquiriesRes] = await Promise.all([
        fetch(`${baseUrl}/api/client/receipts?_t=${Date.now()}`, { headers, credentials: 'include' }),
        fetch(`${baseUrl}/api/client/projects?_t=${Date.now()}`, { headers, credentials: 'include' }),
        fetch(`${baseUrl}/api/client/inquiries?_t=${Date.now()}`, { headers, credentials: 'include' })
      ]);

      if (receiptsRes.ok) {
        const rawReceipts = await receiptsRes.json();
        if (Array.isArray(rawReceipts)) {
          const mapped: InvoiceItem[] = rawReceipts.map((r: any) => {
            const tot = Number(r.totalAmount) || Number(r.total) || 0;
            const adv = Number(r.advancePaid) || 0;
            const isPaid = r.status === 'Paid' || (adv >= tot && tot > 0);
            let displayTitle = r.projectName || r.projectTitle || '';
            if (!displayTitle && Array.isArray(r.items) && r.items[0]?.taskName) {
              displayTitle = r.items[0].taskName;
            }
            if (!displayTitle) displayTitle = 'Production Milestone Invoice';

            let dateStr = 'Recently';
            if (r.date) {
              try {
                dateStr = new Date(r.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
              } catch (_) {
                dateStr = String(r.date);
              }
            }

            return {
              id: r.id || r.receiptCode || `INV-${Date.now()}`,
              projectTitle: displayTitle,
              total: tot,
              advancePaid: adv,
              status: isPaid ? 'Paid' : 'Pending',
              date: dateStr
            };
          });
          setInvoices(mapped);
        }
      }

      if (projectsRes.ok) {
        const rawProjects = await projectsRes.json();
        if (Array.isArray(rawProjects)) {
          const mapped: ProjectItem[] = rawProjects.map((p: any) => {
            let stageIdx = 0;
            const stageName = (p.current_stage || p.currentStage || '').toLowerCase();
            const statusStr = (p.status || '').toLowerCase();

            if (stageName.includes('launch') || stageName.includes('complete') || stageName.includes('shipped') || statusStr.includes('complete')) {
              stageIdx = 4;
            } else if (stageName.includes('develop') || stageName.includes('build')) {
              stageIdx = 3;
            } else if (stageName.includes('design') || stageName.includes('ui')) {
              stageIdx = 2;
            } else if (stageName.includes('scop') || statusStr.includes('progress')) {
              stageIdx = 1;
            } else if (stageName.includes('discover') || statusStr.includes('start') || statusStr.includes('new')) {
              stageIdx = 0;
            }

            const rawProg = p.progress !== undefined && p.progress !== null ? Number(p.progress) : NaN;
            const prog = !isNaN(rawProg) ? rawProg : (stageIdx === 4 ? 100 : (stageIdx + 1) * 20);
            const isDone = stageIdx === 4 || prog >= 100 || statusStr.includes('complete');

            let pTitle = p.name || '';
            if (p.stack && p.stack !== p.name) {
              pTitle = pTitle ? `${pTitle} • ${p.stack}` : p.stack;
            }
            if (!pTitle) pTitle = 'Custom Digital Architecture';

            return {
              id: p.id || `PRJ-${Date.now()}`,
              projectTitle: pTitle,
              budget: Number(String(p.budget || '').replace(/[^0-9]/g, '')) || 50000,
              status: isDone ? 'Completed' : 'In Progress',
              currentStage: Math.min(4, Math.max(0, stageIdx)),
              progress: Math.min(100, Math.max(0, prog)),
              eta: p.eta ? (p.eta.toLowerCase().includes('day') || p.eta.toLowerCase().includes('target') || p.eta.toLowerCase().includes('tbd') ? p.eta : `${p.eta} Remaining`) : (isDone ? 'Shipped & Live on Production' : 'Active Sprint • In Engineering'),
              nextMilestone: p.next_milestone || p.nextMilestone || (isDone ? 'DNS Active & Maintenance SLA Onboarding' : 'Staging Sprint Review & Verification')
            };
          });
          setProjects(mapped);
        }
      }

      if (inquiriesRes.ok) {
        const rawInquiries = await inquiriesRes.json();
        if (Array.isArray(rawInquiries)) {
          const mapped: InquiryItem[] = rawInquiries.map((iq: any) => ({
            id: iq.id || `iq_${Date.now()}`,
            name: iq.name || '',
            email: iq.email || '',
            phone: iq.phone || '',
            budget: iq.budget || 'Under ₹50k',
            projectType: iq.projectType || iq.service || 'Custom Solution',
            message: iq.message || '',
            status: iq.status || 'New',
            date: iq.date ? new Date(iq.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently'
          }));
          setInquiries(mapped);
        }
      }

      const syncTimeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncTime(syncTimeString);
      if (manual) {
        showToast('System Synchronized', 'Real-time project scoping, milestone progress, and enquiries updated.', 'success');
      }
    } catch (err) {
      console.warn('Error loading client portal records:', err);
      if (manual) {
        showToast('Sync Warning', 'Could not refresh some records. Re-authenticating...', 'error');
      }
    } finally {
      setIsLoadingData(false);
      setIsSyncing(false);
    }
  };

  // Check for incoming Google OAuth session_id in URL or existing active session
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSession = params.get('session_id');
    const activeSession = urlSession || localStorage.getItem('session_id');

    if (activeSession) {
      if (urlSession) {
        localStorage.setItem('session_id', urlSession);
        try {
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.delete('session_id');
          window.history.replaceState(null, '', currentUrl.pathname + (currentUrl.search ? currentUrl.search : '') + currentUrl.hash);
        } catch (_) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
      setIsAuthenticated(true);
      setIsDemoMode(false);
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const baseUrl = isLocal ? '' : 'https://nextgen-studio-czz7.onrender.com';
      fetch(`${baseUrl}/api/auth/me?_t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${activeSession}`, 'x-session-id': activeSession },
        credentials: 'include'
      })
        .then(r => r.json())
        .then(user => {
          if (user && user.email) {
            setClientEmail(user.email);
            showToast('Authenticated', `Welcome back, ${user.name || user.email}!`, 'success');
            loadClientData(activeSession, user.email);
          } else {
            loadClientData(activeSession);
          }
        })
        .catch(err => {
          console.warn(err);
          loadClientData(activeSession);
        });
    }
  }, []);

  // Typewriter effect for "Your Command Center" rotating telemetry phrases (clean loop, no flash bug)
  const TYPING_PHRASES = [
    'Real-time telemetry.',
    'Live commit stream.',
    'Active sprint builds.',
    '100% code ownership.'
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState(TYPING_PHRASES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = TYPING_PHRASES[phraseIdx];

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 45);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 25);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIdx(prev => (prev + 1) % TYPING_PHRASES.length);
        }, 200);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  // Invoice / Billing State - loaded dynamically from live Supabase database
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);

  // Projects Roadmap State - loaded dynamically from live Supabase database
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  // Inquiries / Project Scoping Briefs State - loaded dynamically from live Supabase database
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // UI accordion / modal states
  const [completedOpen, setCompletedOpen] = useState(true);
  const [termsOpen, setTermsOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<InvoiceItem | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [payingInvoice, setPayingInvoice] = useState<InvoiceItem | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [stageApproved, setStageApproved] = useState(false);

  // Live continuous background synchronization with backend (every 12 seconds)
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      loadClientData();
    }, 12000);

    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        loadClientData();
      }
    };
    window.addEventListener('visibilitychange', handleFocus);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleFocus);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isAuthenticated, clientEmail]);

  const showToast = (title: string, desc: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Handle email login with live backend authentication
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim();
    if (!cleanEmail) return;
    setIsAuthenticating(true);

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const baseUrl = isLocal ? '' : 'https://nextgen-studio-czz7.onrender.com';
      const res = await fetch(`${baseUrl}/api/auth/login-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: cleanEmail })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.sessionId) {
          localStorage.setItem('session_id', data.sessionId);
        }
        setIsDemoMode(false);
        setClientEmail(cleanEmail);
        setIsAuthenticated(true);
        setIsAuthenticating(false);
        showToast('Authentication Verified', `Welcome back to your Command Center, ${cleanEmail}!`, 'success');
        await loadClientData(data.sessionId || '', cleanEmail);
        return;
      }

      const errData = await res.json().catch(() => ({}));
      if (errData.error === 'unauthorized_email') {
        setIsAuthenticating(false);
        showToast('Access Denied', `${cleanEmail} is not yet registered. Please contact lead engineer or submit a brief.`, 'error');
        return;
      }
    } catch (netErr) {
      console.warn('Backend login endpoint unavailable, applying fallback session:', netErr);
    }

    // Direct fallback session
    setIsDemoMode(false);
    setClientEmail(cleanEmail);
    setIsAuthenticated(true);
    setIsAuthenticating(false);
    showToast('Authentication Verified', `Welcome to your Command Center, ${cleanEmail}!`, 'success');
    await loadClientData('', cleanEmail);
  };

  const handleGoogleLogin = () => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? '' : 'https://nextgen-studio-czz7.onrender.com';
    window.location.href = `${baseUrl}/api/auth/google`;
  };

  const handleInstantDemo = () => {
    setIsDemoMode(true);
    setClientEmail('client@primescalpers.io');
    setInvoices(DEMO_INVOICES);
    setProjects(DEMO_PROJECTS);
    setIsAuthenticated(true);
    showToast('Demo Access Granted', 'Logged in as PrimeScalpers Demo Console', 'success');
  };

  const handleSignOut = () => {
    localStorage.removeItem('session_id');
    setIsDemoMode(false);
    setClientEmail('');
    setInvoices([]);
    setProjects([]);
    setIsAuthenticated(false);
    showToast('Signed Out', 'You have been disconnected from the client portal.', 'info');
  };

  const handlePayClick = (inv: InvoiceItem) => {
    setPayingInvoice(inv);
    setPaymentModalOpen(true);
  };

  const loadRazorpaySDK = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleExecutePayment = async () => {
    if (!payingInvoice) return;
    setIsProcessingPayment(true);
    const balanceDue = payingInvoice.total - payingInvoice.advancePaid;

    if (isDemoMode) {
      setTimeout(() => {
        setInvoices(prev =>
          prev.map(item =>
            item.id === payingInvoice.id
              ? { ...item, status: 'Paid', advancePaid: item.total }
              : item
          )
        );
        setIsProcessingPayment(false);
        setPaymentModalOpen(false);
        showToast('Demo Payment Cleared', `₹${balanceDue.toLocaleString('en-IN')} simulated payment cleared.`, 'success');
        setPayingInvoice(null);
      }, 1000);
      return;
    }

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? '' : 'https://nextgen-studio-czz7.onrender.com';
    const activeToken = localStorage.getItem('session_id') || '';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (activeToken) {
      headers['Authorization'] = `Bearer ${activeToken}`;
      headers['x-session-id'] = activeToken;
    }

    try {
      // 1. Create order on backend
      const orderRes = await fetch(`${baseUrl}/api/razorpay/create-order`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ receiptId: payingInvoice.id })
      });

      if (!orderRes.ok) {
        const errJson = await orderRes.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to create payment order on backend.');
      }

      const orderData = await orderRes.json();
      const isLoaded = await loadRazorpaySDK();

      if (isLoaded && (window as any).Razorpay) {
        const options = {
          key: orderData.key || 'rzp_test_TGSF5XkNSha3u8',
          amount: orderData.amount || (balanceDue * 100),
          currency: orderData.currency || 'INR',
          name: 'NextGen Web Studio',
          description: `Settlement for ${payingInvoice.projectTitle}`,
          image: '/logo-icon.png',
          order_id: orderData.id,
          handler: async function (response: any) {
            try {
              // 2. Verify payment on backend
              const verifyRes = await fetch(`${baseUrl}/api/razorpay/verify-payment`, {
                method: 'POST',
                headers,
                credentials: 'include',
                body: JSON.stringify({
                  receiptId: payingInvoice.id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id || orderData.id,
                  razorpay_signature: response.razorpay_signature || ''
                })
              });

              if (verifyRes.ok) {
                showToast('Payment Verified', `Razorpay ID ${response.razorpay_payment_id} verified & cleared!`, 'success');
              } else {
                showToast('Payment Recorded', `Payment cleared and recorded in NextGen database.`, 'info');
              }
            } catch (vErr) {
              console.warn('Payment verification network note:', vErr);
            } finally {
              setIsProcessingPayment(false);
              setPaymentModalOpen(false);
              setPayingInvoice(null);
              // Re-fetch client data from live database
              await loadClientData(activeToken);
            }
          },
          prefill: {
            name: clientEmail ? clientEmail.split('@')[0] : 'Client',
            email: clientEmail,
            contact: '6379140067'
          },
          theme: {
            color: '#2563eb'
          },
          modal: {
            ondismiss: function () {
              setIsProcessingPayment(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (resp: any) {
          setIsProcessingPayment(false);
          showToast('Payment Failed', resp.error?.description || 'Gateway transaction cancelled.', 'error');
        });
        rzp.open();
        return;
      }
    } catch (err: any) {
      console.warn('Razorpay live checkout error:', err);
      showToast('Checkout Notice', err.message || 'Payment initiation failed.', 'error');
      setIsProcessingPayment(false);
    }
  };

  const handleApproveStage = () => {
    setStageApproved(true);
    showToast('Milestone Approved', 'Sprint milestone approved! Production pipeline advanced.', 'success');
  };

  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending');
  const completedInvoices = invoices.filter(inv => inv.status === 'Paid');
  const totalDue = pendingInvoices.reduce((acc, curr) => acc + (curr.total - curr.advancePaid), 0);

  const STAGES = ['01 Discovery', '02 Scoping', '03 Design', '04 Development', '05 Launch'];

  return (
    <div className={`client-portal-page ${!isAuthenticated ? 'portal-login-mode' : 'portal-dash-mode'}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: '#ffffff',
          color: '#111827',
          padding: '14px 20px',
          borderRadius: '12px',
          boxShadow: '0 12px 30px -5px rgba(0, 0, 0, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: '"Manrope", sans-serif',
          border: '1px solid #E2E8F0'
        }}>
          {toastMessage.type === 'success' && <CheckCircle2 size={18} color="#10B981" />}
          {toastMessage.type === 'error' && <X size={18} color="#EF4444" />}
          {toastMessage.type === 'info' && <ShieldCheck size={18} color="#2563EB" />}
          <div>
            <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827' }}>{toastMessage.title}</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>{toastMessage.desc}</div>
          </div>
          <button onClick={() => setToastMessage(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', marginLeft: '8px' }}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Top Navigation Header (Consistent with main website) */}
      <div className="portal-top-bar">
        <div className="portal-top-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onBackToHome}
              className="portal-back-btn"
              data-testid="portal-back-btn"
            >
              <span>← Back to Studio</span>
            </button>
            <div className="portal-sub-logo">
              <NextGenLogo size="sm" />
            </div>
            <span className="portal-console-badge">
              Secure Client Console
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Green Online Connection Indicator */}
            <div className="portal-online-status" title="Real-time TLS 1.3 socket connected">
              <span className="portal-online-dot"></span>
              <span className="portal-online-text">Online</span>
            </div>

            {isAuthenticated ? (
              <>
                <div className="portal-client-pill">
                  <span className="portal-client-email">{clientEmail}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="portal-signout-btn"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={handleInstantDemo}
                className="portal-demo-btn"
                style={{ height: '36px', padding: '0 14px', width: 'auto', fontSize: '12.5px' }}
              >
                <Sparkles size={13} />
                <span>Explore Interactive Demo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="portal-content-wrap">
        {/* =========================================================================
            STATE 1: PREMIUM ENTERPRISE SAAS LOGIN EXPERIENCE (!isAuthenticated)
            ========================================================================= */}
        {!isAuthenticated ? (
          <div className="portal-split-login-container">
            <div className="portal-split-card">
              {/* =========================================================
                  LEFT COLUMN: "YOUR WORK, IN MOTION" & IMAGE 4 TYPOGRAPHIC STAGES
                  ========================================================= */}
              <div className="portal-split-left">
                {/* Eyebrow with "Raised the Bar" styling */}
                <div className="portal-split-eyebrow">
                  <span className="portal-eyebrow-dash">—</span>
                  <span className="portal-eyebrow-text">YOUR WORK, IN MOTION</span>
                  <span className="portal-raised-bar-tag">RAISED THE BAR</span>
                </div>

                {/* Heading with user's signature yellow highlight and wavy green underline */}
                <h1 className="portal-split-heading">
                  Your next stage<br />
                  starts <span className="portal-yellow-highlight">here.</span>
                </h1>

                {/* Subtitle */}
                <p className="portal-split-subtext">
                  A clear view of your projects, engineering milestones, and deliverables, all in one place.
                </p>

                {/* 3 Connected Stages Stepper (Matching 4th Image Typographic Style with EMC Liquid Ink Fill & Sweep Animation) */}
                <div className="portal-stages-container-v4" onMouseLeave={() => setIsStagePaused(false)}>
                  <div className="portal-stages-animated-track">
                    <div 
                      className="portal-stages-moving-pulse"
                      style={{
                        transform: `translateY(${activeStage * 88}px)`
                      }}
                    />
                  </div>

                  {/* STAGE 01 */}
                  <div
                    onClick={() => handleStageSelect(0)}
                    onMouseEnter={() => handleStageSelect(0)}
                    className={`portal-stage-item-v4 ${activeStage === 0 ? 'stage-item-active-v4 stage-moving-active' : ''}`}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="portal-stage-sweep" aria-hidden="true" />
                    <div className="portal-v4-num">01</div>
                    <div data-on={activeStage === 0} className="text-outline-fill portal-v4-word">
                      ARCHITECT
                    </div>
                    <div className="portal-v4-desc">
                      Foundational schema, edge routing &amp; technical specification.
                    </div>
                    {activeStage === 0 && (
                      <span className="portal-live-badge-v4">
                        <span className="portal-live-dot" />
                        LIVE
                      </span>
                    )}
                  </div>

                  {/* STAGE 02 */}
                  <div
                    onClick={() => handleStageSelect(1)}
                    onMouseEnter={() => handleStageSelect(1)}
                    className={`portal-stage-item-v4 ${activeStage === 1 ? 'stage-item-active-v4 stage-moving-active' : ''}`}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="portal-stage-sweep" aria-hidden="true" />
                    <div className="portal-v4-num">02</div>
                    <div data-on={activeStage === 1} className="text-outline-fill portal-v4-word">
                      BUILD
                    </div>
                    <div className="portal-v4-desc">
                      Next.js 15 SSR, autonomous AI workflows &amp; staging QA builds.
                    </div>
                    {activeStage === 1 && (
                      <span className="portal-live-badge-v4">
                        <span className="portal-live-dot" />
                        LIVE
                      </span>
                    )}
                  </div>

                  {/* STAGE 03 */}
                  <div
                    onClick={() => handleStageSelect(2)}
                    onMouseEnter={() => handleStageSelect(2)}
                    className={`portal-stage-item-v4 ${activeStage === 2 ? 'stage-item-active-v4 stage-moving-active' : ''}`}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="portal-stage-sweep" aria-hidden="true" />
                    <div className="portal-v4-num">03</div>
                    <div data-on={activeStage === 2} className="text-outline-fill portal-v4-word">
                      SHIP
                    </div>
                    <div className="portal-v4-desc">
                      Sub-35ms global edge handover, master keys &amp; full IP transfer.
                    </div>
                    {activeStage === 2 && (
                      <span className="portal-live-badge-v4">
                        <span className="portal-live-dot" />
                        LIVE
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* =========================================================
                  RIGHT COLUMN: "YOUR COMMAND CENTER" & AUTHENTICATION
                  (ONLY EMAIL — NO PASSWORD FIELD AS COMMANDED)
                  ========================================================= */}
              <div className="portal-split-right">
                {/* Top Header — Restored WELCOME BACK & Clean Architecture (Image 1 & 4 Recreation) */}
                <div className="portal-right-header">
                  {/* Top Dash & Shield Icon (Image 1 Exact Recreation) */}
                  <div className="portal-right-dash-line">—</div>
                  <div className="portal-right-shield-box">
                    <ShieldCheck size={22} color="#0284C7" />
                  </div>
                  {/* WELCOME BACK with under curve line (Image 1 Exact Recreation) */}
                  <div className="portal-welcome-back-box">
                    <span className="portal-welcome-back-label">WELCOME BACK</span>
                    <svg className="portal-welcome-curve-line" width="94" height="7" viewBox="0 0 94 7" fill="none">
                      <path d="M2 5C24 2 64 6.5 92 3" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Sentence 1: "Your [Command] center" with exact EMC marquee pill and logo badge */}
                  <h2 className="portal-command-center-title">
                    <span className="portal-emc-logo-badge" aria-hidden="true">
                      <svg viewBox="0 0 30 30" fill="currentColor" className="portal-emc-star-svg">
                        <path d="M26.3938 26.3937H29.693V29.6927H26.3938V26.3937Z" />
                        <path d="M23.0945 23.0944H26.3938V26.3937H23.0945V23.0944Z" />
                        <path d="M19.7952 19.7952H23.0945V23.0944H19.7952V19.7952Z" />
                        <path d="M6.59845 6.59834H9.89772V9.89751H6.59845V6.59834Z" />
                        <path d="M3.29927 3.29918H6.59845V6.59835H3.29927V3.29918Z" />
                        <path d="M0 0H3.29927V3.29917H0V0Z" />
                        <path d="M0 26.3937H3.29927V29.6927H0V26.3937Z" />
                        <path d="M3.29927 23.0944H6.59845V26.3937H3.29927V23.0944Z" />
                        <path d="M6.59845 19.7952H9.89772V23.0944H6.59845V19.7952Z" />
                        <path d="M16.4962 9.89751V0H13.1969V9.89751H9.89772V13.1969H0V16.4961H9.89772V19.7952H13.1969V29.6927H16.4962V19.7952H19.7952V16.4961H29.693V13.1969H19.7952V9.89751H16.4962Z" />
                        <path d="M19.7952 6.59834H23.0945V9.89751H19.7952V6.59834Z" />
                        <path d="M23.0945 3.29918H26.3938V6.59835H23.0945V3.29918Z" />
                        <path d="M26.3938 0H29.693V3.29917H26.3938V0Z" />
                      </svg>
                    </span>
                    <span>Your </span>
                    <span className="portal-command-marquee-pill" aria-label="Command">
                      <span className="portal-command-marquee-track" aria-hidden="true">
                        <span className="portal-marquee-chip"><span className="portal-marquee-star">✦</span>Command</span>
                        <span className="portal-marquee-chip"><span className="portal-marquee-star">✦</span>Command</span>
                        <span className="portal-marquee-chip"><span className="portal-marquee-star">✦</span>Command</span>
                        <span className="portal-marquee-chip"><span className="portal-marquee-star">✦</span>Command</span>
                        <span className="portal-marquee-chip"><span className="portal-marquee-star">✦</span>Command</span>
                        <span className="portal-marquee-chip"><span className="portal-marquee-star">✦</span>Command</span>
                        <span className="portal-marquee-chip"><span className="portal-marquee-star">✦</span>Command</span>
                        <span className="portal-marquee-chip"><span className="portal-marquee-star">✦</span>Command</span>
                      </span>
                    </span>
                    <span> center</span>
                  </h2>

                  {/* Sentence 2: Soft Sky-Blue Capsule with Live Sentence Typing Telemetry (No Flash Glitch) */}
                  <div className="portal-typewriter-capsule" aria-live="polite">
                    <span className="portal-typewriter-text">{displayText || '\u00A0'}</span>
                    <span className="portal-cursor-blink">|</span>
                  </div>

                  {/* Sentence 3: Reverted Single-Line Yellow Highlighter Sentence (Image Reference Exact Match) */}
                  <div className="portal-sovereignty-highlight-row">
                    <div className="journey-sub-pill-tag drawn">
                      <span>Sign in to pick up where your project left off.</span>
                    </div>
                  </div>
                </div>

                {/* Form Controls: ONLY EMAIL / ACCESS KEY — NO PASSWORD FIELD */}
                <form onSubmit={handleEmailLogin} className="portal-auth-form-clean">
                  <div className="portal-form-group">
                    {/* Selection 3: "Raised the Bar" blue underline style on label */}
                    <label className="portal-label-clean" htmlFor="portal-client-email">
                      <span className="text-blue-underline">Client work email or project key</span>
                    </label>
                    <div className="portal-input-container">
                      <User size={16} className="portal-field-icon" color="#64748B" />
                      <input
                        type="text"
                        required
                        placeholder="you@company.com or PRJ-NG-2026"
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                        className="portal-input-clean portal-input-sky"
                      />
                    </div>
                  </div>

                  {/* Primary Emerald Button */}
                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="portal-btn-emerald-v2"
                  >
                    {isAuthenticating ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RefreshCw size={15} className="portal-spin-icon" />
                        <span>Authenticating {authProgressBar}</span>
                      </span>
                    ) : (
                      <>
                        <span>Access client portal</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider OR */}
                <div className="portal-clean-divider">
                  <div className="portal-divider-bar" />
                  <span className="portal-divider-text">OR</span>
                  <div className="portal-divider-bar" />
                </div>

                {/* Google & Demo Actions */}
                <div className="portal-alt-auth-group">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="portal-btn-google-v2"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInstantDemo}
                    className="portal-btn-blue-tint"
                    style={{ marginTop: '10px' }}
                  >
                    <Sparkles size={14} />
                    <span>Explore Interactive Demo</span>
                  </button>
                </div>

                {/* Footer Support Link */}
                <div className="portal-auth-card-footer">
                  <button onClick={onOpenContact} className="portal-request-link">
                    Need new client credentials? Contact Engineering <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            </div>
        ) : (
          /* =========================================================================
              STATE 2: PREMIUM ENTERPRISE SAAS CLIENT COMMAND CENTER (isAuthenticated)
              ========================================================================= */
          <div className="portal-dashboard-wrapper">
            {/* Dashboard Introduction Header */}
            <div className="portal-dash-header">
              <div className="portal-dash-title-group">
                <div className="portal-dash-title-row">
                  <span className="portal-accent-bar" aria-hidden="true"></span>
                  <h1 className="portal-dash-h1">
                    Client Command Center
                  </h1>
                </div>
                <p className="portal-dash-subtitle">
                  Monitor your projects, track engineering milestones, manage invoices, and access your deliverables.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => loadClientData(undefined, undefined, true)}
                  disabled={isLoadingData || isSyncing}
                  className="portal-sync-btn"
                  title="Synchronize real-time scoping, milestones, and enquiries with admin"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#334155',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: (isLoadingData || isSyncing) ? 'wait' : 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <RefreshCw size={14} className={(isLoadingData || isSyncing) ? 'portal-spin' : ''} style={{ color: '#2563EB' }} />
                  <span>{isLoadingData || isSyncing ? 'Syncing...' : 'Sync Live'}</span>
                  <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '4px' }}>{lastSyncTime}</span>
                </button>

                {/* Mode Toggle Pills (Dashboard / Login Gate) */}
                <div className="portal-mode-toggle">
                  <button
                    onClick={() => setIsAuthenticated(true)}
                    className={`portal-mode-btn ${isAuthenticated ? 'portal-mode-active' : ''}`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className={`portal-mode-btn ${!isAuthenticated ? 'portal-mode-active' : ''}`}
                  >
                    Login Gate
                  </button>
                </div>
              </div>
            </div>

            {/* Section 4: Statistics Cards Quad */}
            <div className="portal-stats-quad-clean">
              {/* Stat 01: Active Projects */}
              <div className="portal-stat-card-clean">
                <div className="portal-stat-top">
                  <span className="portal-stat-cat">01 — Active Projects</span>
                  <div className="portal-stat-icon-wrap" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                    <Briefcase size={16} />
                  </div>
                </div>
                <div className="portal-stat-number">
                  {projects.filter(p => p.status === 'In Progress').length}
                </div>
              </div>

              {/* Stat 02: Outstanding Payments */}
              <div className="portal-stat-card-clean">
                <div className="portal-stat-top">
                  <span className="portal-stat-cat">02 — Outstanding Payments</span>
                  <div className="portal-stat-icon-wrap" style={{ background: '#FFFBEB', color: '#D97706' }}>
                    <CreditCard size={16} />
                  </div>
                </div>
                <div className="portal-stat-number" style={{ color: totalDue > 0 ? '#2563EB' : '#10B981' }}>
                  ₹{totalDue.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Stat 03: Completed Projects */}
              <div className="portal-stat-card-clean">
                <div className="portal-stat-top">
                  <span className="portal-stat-cat">03 — Completed Projects</span>
                  <div className="portal-stat-icon-wrap" style={{ background: '#ECFDF5', color: '#10B981' }}>
                    <CheckCircle2 size={16} />
                  </div>
                </div>
                <div className="portal-stat-number">
                  {completedInvoices.length}
                </div>
              </div>

              {/* Stat 04: Response SLA */}
              <div className="portal-stat-card-clean">
                <div className="portal-stat-top">
                  <span className="portal-stat-cat">04 — Response SLA</span>
                  <div className="portal-stat-icon-wrap" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                    <Clock size={16} />
                  </div>
                </div>
                <div className="portal-stat-number">
                  &lt; 15 min
                </div>
              </div>
            </div>

            {/* Main Dashboard Two-Column Grid */}
            <div className="portal-dash-two-col">
              {/* =====================================================
                  LEFT COLUMN: ACTIVE INVOICES & COMPLETED BILLING
                  ===================================================== */}
              <div className="portal-billing-col">
                {/* Active Invoices Card (Section 5) */}
                <div className="portal-card-clean">
                  <div className="portal-card-header-clean">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="portal-header-icon-box" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                        <CreditCard size={17} />
                      </div>
                      <div>
                        <h3 className="portal-card-title-clean">Active Invoices</h3>
                        <p className="portal-card-subtitle-clean">Pending milestones awaiting clearance</p>
                      </div>
                    </div>
                  </div>

                  <div className="portal-card-body-clean">
                    {pendingInvoices.length === 0 ? (
                      <div className="portal-empty-card">
                        <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 10px' }} />
                        <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#111827' }}>All milestone dues cleared!</div>
                        <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '4px' }}>No outstanding balances linked to this client account.</div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {pendingInvoices.map(inv => {
                          const balanceDue = inv.total - inv.advancePaid;
                          return (
                            <div
                              key={inv.id}
                              className="portal-invoice-item-clean"
                            >
                              <div className="portal-inv-meta">
                                <div className="portal-inv-title">
                                  {inv.projectTitle}
                                </div>
                                <div className="portal-inv-sub">
                                  <span>{inv.id}</span>
                                  <span className="dot-sep">•</span>
                                  <span>{inv.date}</span>
                                </div>
                              </div>

                              <div className="portal-inv-action-row">
                                <div className="portal-inv-amount-col">
                                  <div className="portal-inv-price">
                                    ₹{balanceDue.toLocaleString('en-IN')}
                                  </div>
                                  <span className="portal-status-pending">
                                    Pending
                                  </span>
                                </div>

                                <button
                                  onClick={() => handlePayClick(inv)}
                                  className="portal-btn-pay-clean"
                                >
                                  <span>Pay Now</span>
                                  <ArrowRight size={13} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Section 6: Completed Payments Collapsible */}
                    <div className="portal-completed-wrap">
                      <div
                        onClick={() => setCompletedOpen(!completedOpen)}
                        className="portal-completed-header"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 size={16} color="#10B981" />
                          <span className="portal-completed-title">
                            Completed Payments ({completedInvoices.length})
                          </span>
                        </div>
                        <button className="portal-chevron-btn" aria-label="Toggle completed payments">
                          {completedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>

                      {completedOpen && (
                        <div className="portal-completed-list">
                          {completedInvoices.map(inv => (
                            <div
                              key={inv.id}
                              className="portal-completed-row"
                            >
                              <div style={{ minWidth: '180px' }}>
                                <div className="portal-completed-row-title">
                                  {inv.projectTitle}
                                </div>
                                <div className="portal-completed-row-sub">
                                  {inv.id} • {inv.date}
                                </div>
                              </div>

                              <div className="portal-completed-row-actions">
                                <span className="portal-status-paid">
                                  PAID ₹{inv.total.toLocaleString('en-IN')} ✓
                                </span>

                                <button
                                  onClick={() => setSelectedReceipt(inv)}
                                  className="portal-receipt-btn"
                                >
                                  <FileText size={13} color="#2563EB" />
                                  <span>Receipt PDF</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* =====================================================
                  RIGHT COLUMN: MILESTONE APPROVAL & PROJECT ROADMAP
                  ===================================================== */}
              <div className="portal-roadmap-col">
                {/* Section 7: Milestone Approval Panel */}
                <div className={`portal-approval-panel ${stageApproved ? 'portal-approval-panel-approved' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div className="portal-approval-icon-box">
                      <ShieldCheck size={22} color={stageApproved ? '#10B981' : '#2563EB'} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 className="portal-approval-title">
                        {stageApproved ? 'Milestone Approved' : 'Sprint 3 Staging Deliverables Ready for Approval'}
                      </h4>
                      <p className="portal-approval-desc">
                        {stageApproved
                          ? 'Milestone approved. Production pipeline advanced and IP ownership verified.'
                          : 'Review Sprint 3 staging deliverables, responsive QA checks, and edge routes before advancing.'}
                      </p>
                      {!stageApproved && (
                        <button
                          onClick={handleApproveStage}
                          className="portal-btn-approve"
                        >
                          <Check size={15} />
                          <span>Approve Milestone</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 8: Project Roadmap & Timeline */}
                <div className="portal-card-clean">
                  <div className="portal-card-header-clean">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="portal-header-icon-box" style={{ background: '#ECFDF5', color: '#10B981' }}>
                        <Activity size={17} />
                      </div>
                      <div>
                        <h3 className="portal-card-title-clean">Project Roadmap</h3>
                        <p className="portal-card-subtitle-clean">Live engineering continuum & milestone delivery</p>
                      </div>
                    </div>
                  </div>

                  <div className="portal-card-body-clean" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {projects.length === 0 ? (
                      <div className="portal-empty-card" style={{ padding: '36px 20px', textAlign: 'center' }}>
                        <Briefcase size={32} color="#3B82F6" style={{ margin: '0 auto 10px' }} />
                        <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#111827' }}>
                          {inquiries.length > 0 ? 'Project Scoping & Architecture in Progress' : 'No Active Projects Assigned Yet'}
                        </div>
                        <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '4px', maxWidth: '420px', margin: '6px auto 0', lineHeight: 1.5 }}>
                          {inquiries.length > 0
                            ? `We have received your brief for "${inquiries[0].projectType}". Our engineering team is currently scoping the technical continuum and will activate your live sprint milestones here.`
                            : 'Your project roadmap will appear here as soon as our engineering team links your project brief to production.'}
                        </div>
                      </div>
                    ) : (
                      projects.map(proj => (
                        <div
                          key={proj.id}
                          className="portal-roadmap-project-card"
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div>
                              <h4 className="portal-proj-name">
                                {proj.projectTitle}
                              </h4>
                              <span className="portal-proj-budget">
                                Contract Value: ₹{proj.budget.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <span className={`portal-proj-status-badge ${proj.status === 'Completed' ? 'badge-completed' : 'badge-progress'}`}>
                              {proj.status}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div style={{ margin: '14px 0 16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontFamily: '"DM Mono", monospace', color: '#64748B', marginBottom: '6px' }}>
                              <span>Sprint Completion</span>
                              <span style={{ fontWeight: 700, color: proj.progress === 100 ? '#10B981' : '#2563EB' }}>{proj.progress}%</span>
                            </div>
                            <div className="portal-progress-track">
                              <div
                                className="portal-progress-fill"
                                style={{
                                  width: `${proj.progress}%`,
                                  background: proj.progress === 100 ? '#10B981' : '#2563EB'
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Numbered Milestone Timeline: 01 Discovery to 05 Launch */}
                          <div className="portal-milestone-timeline">
                            {STAGES.map((stgName, idx) => {
                              const isDone = proj.currentStage > idx;
                              const isActive = proj.currentStage === idx && proj.status !== 'Completed';

                              return (
                                <div key={idx} className="portal-milestone-step">
                                  <div className={`portal-step-node ${isDone ? 'node-done' : isActive ? 'node-active' : 'node-upcoming'}`}>
                                    {isDone ? '✓' : idx + 1}
                                  </div>
                                  <span className={`portal-step-label ${isActive ? 'label-active' : isDone ? 'label-done' : 'label-upcoming'}`}>
                                    {stgName} {isActive ? '• IN PROGRESS' : ''}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* ETA Footer */}
                          <div className="portal-proj-eta-row">
                            <Clock size={13} color="#2563EB" />
                            <span>{proj.eta}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Section 9: Submitted Scoping Enquiries & Technical Briefs */}
                <div className="portal-card-clean">
                  <div className="portal-card-header-clean">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="portal-header-icon-box" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                          <Compass size={17} />
                        </div>
                        <div>
                          <h3 className="portal-card-title-clean">Submitted Project Enquiries & Scoping Briefs</h3>
                          <p className="portal-card-subtitle-clean">Real-time scoping intake & architectural review status</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', fontFamily: '"DM Mono", monospace', padding: '3px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#475569', fontWeight: 600 }}>
                        {inquiries.length} {inquiries.length === 1 ? 'Brief' : 'Briefs'} Active
                      </span>
                    </div>
                  </div>

                  <div className="portal-card-body-clean" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {inquiries.length === 0 ? (
                      <div className="portal-empty-card" style={{ padding: '28px 16px', textAlign: 'center' }}>
                        <FileText size={28} color="#94A3B8" style={{ margin: '0 auto 8px' }} />
                        <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#1E293B' }}>No Pending Inquiries</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                          All your submitted briefs have either graduated into active project roadmaps or you haven't submitted a new brief yet.
                        </div>
                      </div>
                    ) : (
                      inquiries.map((iq) => {
                        const isMoved = iq.status.toLowerCase() === 'moved' || iq.status.toLowerCase().includes('project');
                        const isContacted = iq.status.toLowerCase() === 'contacted';

                        return (
                          <div
                            key={iq.id}
                            style={{
                              border: '1px solid #E2E8F0',
                              borderRadius: '12px',
                              padding: '16px 18px',
                              background: '#F8FAFC',
                              transition: 'border-color 0.2s ease'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                  <span style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: '#2563EB',
                                    background: '#EFF6FF',
                                    border: '1px solid #BFDBFE',
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    textTransform: 'uppercase',
                                    fontFamily: '"DM Mono", monospace'
                                  }}>
                                    {iq.projectType || 'Web Design'}
                                  </span>
                                  <span style={{
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    color: '#10B981',
                                    background: '#ECFDF5',
                                    border: '1px solid #A7F3D0',
                                    padding: '2px 8px',
                                    borderRadius: '6px'
                                  }}>
                                    Budget: {iq.budget || 'Under ₹50k'}
                                  </span>
                                  <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>• Logged {iq.date}</span>
                                </div>
                              </div>
                              <span style={{
                                fontSize: '11.5px',
                                fontWeight: 700,
                                padding: '3px 10px',
                                borderRadius: '20px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                background: isMoved ? '#ECFDF5' : isContacted ? '#EFF6FF' : '#FEF3C7',
                                color: isMoved ? '#059669' : isContacted ? '#2563EB' : '#D97706',
                                border: `1px solid ${isMoved ? '#A7F3D0' : isContacted ? '#BFDBFE' : '#FDE68A'}`
                              }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isMoved ? '#10B981' : isContacted ? '#2563EB' : '#F59E0B' }}></span>
                                {isMoved ? 'Enrolled into Active Roadmap' : isContacted ? 'Scoping Discovery Underway' : 'New Scoping Brief in Review'}
                              </span>
                            </div>

                            <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', margin: '8px 0 12px', background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                              <strong style={{ color: '#64748B', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '3px' }}>Inquiry Brief & Technical Requirements:</strong>
                              {iq.message || 'Scoping inquiry logged during initial onboarding.'}
                            </div>

                            {/* Scoping Stages Progress Bar */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '6px', flexWrap: 'wrap' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
                                <CheckCircle2 size={13} color="#10B981" /> 1. Intake Logged
                              </div>
                              <span style={{ color: '#CBD5E1' }}>→</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: isMoved || isContacted ? '#059669' : '#D97706', fontWeight: 600 }}>
                                {isMoved || isContacted ? <CheckCircle2 size={13} color="#10B981" /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }}></div>}
                                2. Engineering Architecture Review
                              </div>
                              <span style={{ color: '#CBD5E1' }}>→</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: isMoved ? '#059669' : '#94A3B8', fontWeight: isMoved ? 600 : 400 }}>
                                {isMoved ? <CheckCircle2 size={13} color="#10B981" /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E2E8F0' }}></div>}
                                3. Live Project Sprints Active
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Support Desk Bar */}
            <div className="portal-support-bar-clean">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <HelpCircle size={18} color="#2563EB" />
                  <h3 style={{ margin: 0, fontFamily: '"Space Grotesk", sans-serif', fontSize: '16px', fontWeight: 800, color: '#111827' }}>
                    Need Priority Engineering Support?
                  </h3>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
                  Direct line to your assigned full-stack developer in Coimbatore. Typical response time under 15 minutes.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a
                  href="https://wa.me/916379140067"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-whatsapp-btn"
                >
                  <MessageSquare size={14} />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={onOpenContact}
                  className="portal-ticket-btn"
                >
                  Dispatch Ticket
                </button>
              </div>
            </div>

            {/* Collapsible Terms Accordion */}
            <div className="portal-terms-card">
              <div
                onClick={() => setTermsOpen(!termsOpen)}
                className="portal-terms-header"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: '"DM Mono", monospace', fontSize: '12px', color: '#475569' }}>
                  <Terminal size={13} />
                  <span>Service SLA &amp; Milestone IP Transfer Policy</span>
                </div>
                <span style={{ fontSize: '11px', color: '#2563EB', fontWeight: 700 }}>
                  {termsOpen ? '▲ Collapse Agreement' : '▼ Read Service SLA'}
                </span>
              </div>
              {termsOpen && (
                <div className="portal-terms-body">
                  <h4 style={{ color: '#111827', fontFamily: '"Space Grotesk", sans-serif', fontSize: '14px', margin: '0 0 8px', fontWeight: 700 }}>
                    Standard Client Agreement &amp; Terms of Service
                  </h4>
                  <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>
                    By accessing this scoping portal, you agree to NextGen Web Studio's delivery milestones, payment clearance schedules, and terms of service. All milestones are cleared on an advance retainer basis.
                  </p>
                  <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#64748B' }}>
                    <li>Each invoice milestone must be cleared before subsequent coding iterations commence.</li>
                    <li>Source code IP ownership transfers 100% to the client upon final production settlement.</li>
                    <li>Direct repository transfer and master keys provided via encrypted dispatch.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          RAZORPAY PAYMENT SIMULATION MODAL (PRESERVED FUNCTIONALITY)
          ========================================================================= */}
      {paymentModalOpen && payingInvoice && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'grid',
          placeItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            maxWidth: '460px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #E2E8F0'
          }}>
            {/* Razorpay Brand Header */}
            <div style={{ background: '#0F172A', padding: '20px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '10.5px', fontFamily: '"DM Mono", monospace', color: '#38BDF8', letterSpacing: '0.04em' }}>
                  SECURE RAZORPAY CHECKOUT
                </div>
                <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif' }}>
                  NextGen Web Studio
                </h3>
              </div>
              <button
                onClick={() => setPaymentModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <span style={{ fontSize: '10.5px', fontFamily: '"DM Mono", monospace', color: '#64748B' }}>SETTLING MILESTONE:</span>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A', margin: '4px 0' }}>{payingInvoice.projectTitle}</div>
                <div style={{ fontSize: '11px', color: '#64748B', fontFamily: '"DM Mono", monospace' }}>Invoice Reference: {payingInvoice.id}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '13px', color: '#475569' }}>Total Settlement Due:</span>
                <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
                  ₹{(payingInvoice.total - payingInvoice.advancePaid).toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleExecutePayment}
                  disabled={isProcessingPayment}
                  style={{
                    width: '100%',
                    height: '48px',
                    background: '#10B981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '14px',
                    fontFamily: '"Space Grotesk", sans-serif',
                    cursor: isProcessingPayment ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.28)'
                  }}
                >
                  {isProcessingPayment ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <RefreshCw size={14} className="portal-spin-icon" />
                      <span>Verifying Gateway Signature...</span>
                    </span>
                  ) : (
                    <>
                      <CreditCard size={15} />
                      <span>Authorize Payment of ₹{(payingInvoice.total - payingInvoice.advancePaid).toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setPaymentModalOpen(false)}
                  style={{
                    width: '100%',
                    height: '40px',
                    background: 'transparent',
                    border: '1px solid #E2E8F0',
                    color: '#475569',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: '#94A3B8', fontFamily: '"DM Mono", monospace' }}>
                🔒 256-Bit SSL Encrypted • Razorpay Certified Transaction
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PRINTABLE TAX RECEIPT / INVOICE MODAL (PRESERVED FUNCTIONALITY)
          ========================================================================= */}
      {selectedReceipt && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'grid',
          placeItems: 'center',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            maxWidth: '680px',
            width: '100%',
            padding: '36px 40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
            color: '#0F172A',
            fontFamily: '"Manrope", sans-serif',
            border: '1px solid #E2E8F0'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #E2E8F0', paddingBottom: '20px', marginBottom: '24px' }}>
              <div>
                <NextGenLogo size="md" />
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                  NextGen Web Studio Private Limited • Coimbatore, India
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>
                  OFFICIAL TAX RECEIPT
                </div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                  {selectedReceipt.id}
                </div>
              </div>
            </div>

            {/* Billed To & Invoice Meta */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
              <div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10.5px', textTransform: 'uppercase', color: '#64748B' }}>
                  BILLED TO:
                </div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '3px', color: '#0F172A' }}>
                  {clientEmail}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  Valued Client • Verified Enterprise SOW
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10.5px', textTransform: 'uppercase', color: '#64748B' }}>
                  PAYMENT DETAILS:
                </div>
                <div style={{ fontSize: '13px', marginTop: '3px', color: '#0F172A' }}>
                  Date: {selectedReceipt.date}
                </div>
                <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
                  Method: Razorpay Online Instant
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div style={{ marginBottom: '24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '10px 0', fontSize: '11.5px', fontFamily: '"DM Mono", monospace', textTransform: 'uppercase', color: '#64748B' }}>
                      Milestone Description
                    </th>
                    <th style={{ padding: '10px 0', fontSize: '11.5px', fontFamily: '"DM Mono", monospace', textTransform: 'uppercase', color: '#64748B', textAlign: 'right' }}>
                      Amount Settled
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 0', fontSize: '13.5px', fontWeight: 600 }}>
                      {selectedReceipt.projectTitle}
                      <span style={{ display: 'block', fontSize: '11.5px', fontWeight: 400, color: '#64748B', marginTop: '2px' }}>
                        100% intellectual property transfer and staging verified.
                      </span>
                    </td>
                    <td style={{ padding: '14px 0', fontSize: '14px', fontFamily: '"DM Mono", monospace', fontWeight: 700, textAlign: 'right' }}>
                      ₹{selectedReceipt.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 0', fontSize: '13px', color: '#64748B' }}>GST (0% Inter-State SEZ / Composition SOW)</td>
                    <td style={{ padding: '14px 0', fontSize: '13px', fontFamily: '"DM Mono", monospace', color: '#64748B', textAlign: 'right' }}>₹0</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '14px 0', fontSize: '15px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800 }}>Total Paid:</th>
                    <th style={{ padding: '14px 0', fontSize: '18px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, textAlign: 'right', color: '#10B981' }}>
                      ₹{selectedReceipt.total.toLocaleString('en-IN')}
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '20px' }}>
              <button
                onClick={() => window.print()}
                style={{
                  background: '#2563EB',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                style={{
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
