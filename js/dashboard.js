// ========================================================
// NextGen Web Studio - Layout, Auth & Dashboard Analytics Module
// ========================================================

// 1. Chart.js Instance Variables
let revenueChartInst = null;
let paymentChartInst = null;

// 2. Calendar State Variables
let calendarYear = new Date().getFullYear();
let calendarMonth = new Date().getMonth();
const calendarEvents = {};
const todayDate = new Date();
calendarEvents[todayDate.getDate()] = ['Client Call 3PM'];
calendarEvents[todayDate.getDate() + 2] = ['Invoice Due'];
calendarEvents[todayDate.getDate() + 5] = ['Project Launch'];

// 3. Digital Clock Function
function startLiveClock() {
  const clockVal = document.getElementById('clockValue');
  if (!clockVal) return;
  
  const updateClock = () => {
    const now = new Date();
    clockVal.innerText = now.toLocaleString('en-IN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  };
  
  updateClock();
  setInterval(updateClock, 1000);
}
window.startLiveClock = startLiveClock;

// 4. Update Dashboard Count Metrics & Re-init Charts
function updateDashboardStats() {
  const el = id => document.getElementById(id);
  const fmt = v => v.toLocaleString('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 });

  // 1. Today's Revenue
  const todayStr = new Date().toLocaleDateString();
  const todayPaid = receipts.filter(r => r.status === 'Paid' && (r.date === todayStr || new Date(r.paymentDate || r.date).toLocaleDateString() === todayStr));
  const todayRevenueSum = todayPaid.reduce((s, r) => s + Number(r.total || r.totalAmount || 0), 0);
  if (el('statTodayRevenue')) el('statTodayRevenue').innerText = fmt(todayRevenueSum);

  // 2. Pending Payments
  const pendingCount = receipts.filter(r => r.status !== 'Paid').length;
  if (el('statPendingPayments')) el('statPendingPayments').innerText = pendingCount;

  // 3. Projects Running
  const runningCount = projects.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled').length;
  if (el('statProjectsRunning')) el('statProjectsRunning').innerText = runningCount;

  // 4. Unread Support
  const unreadSupportCount = supportTickets.filter(t => t.status === 'Open').length;
  if (el('statUnreadSupport')) el('statUnreadSupport').innerText = unreadSupportCount;

  // 5. CRM Leads
  const crmLeadsCount = crmLeads.length;
  if (el('statCrmLeads')) el('statCrmLeads').innerText = crmLeadsCount;

  // 6. Completed Milestones
  const completedMilestonesCount = projects.filter(p => p.progress === 100 || p.currentStage === 'Completed' || p.status === 'Completed').length;
  if (el('statCompletedMilestones')) el('statCompletedMilestones').innerText = completedMilestonesCount;

  // Update charts with latest database values
  initCharts();
}
window.updateDashboardStats = updateDashboardStats;

// 5. Chart.js Graphs Logic
function initCharts() {
  if (typeof Chart === 'undefined') return;
  const isDark = !document.body.classList.contains('light-theme');
  const accentColor = isDark ? 'rgba(224,255,79,0.65)' : 'rgba(10,10,10,0.7)';
  const accentBorder = isDark ? '#E0FF4F' : '#0A0A0A';
  const gridColor = 'rgba(128,128,128,0.1)';
  const tickColor = '#A2A098';

  // Revenue Chart labels and data dynamically
  const months = [];
  const monthData = [0, 0, 0, 0, 0, 0];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString('en-IN', { month: 'short' }));
  }

  const paidList = receipts.filter(r => r.status === 'Paid');
  paidList.forEach(r => {
    const rDate = new Date(r.date);
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      if (rDate.getFullYear() === d.getFullYear() && rDate.getMonth() === d.getMonth()) {
        monthData[5 - i] += Number(r.total || 0);
      }
    }
  });

  const totalRevenueSum = monthData.reduce((s, v) => s + v, 0);
  let finalRevenueData = monthData;
  if (totalRevenueSum === 0) {
    finalRevenueData = [45000, 80000, 60000, 120000, 95000, 150000];
  }

  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx) {
    if (revenueChartInst) {
      revenueChartInst.data.labels = months;
      revenueChartInst.data.datasets[0].data = finalRevenueData;
      revenueChartInst.data.datasets[0].backgroundColor = accentColor;
      revenueChartInst.data.datasets[0].borderColor = accentBorder;
      revenueChartInst.update();
    } else {
      revenueChartInst = new Chart(revenueCtx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{ label:'Revenue', data:finalRevenueData, backgroundColor:accentColor, borderColor:accentBorder, borderWidth:1, borderRadius:4 }]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ display:false } },
          scales:{
            x:{ grid:{ color:gridColor }, ticks:{ color:tickColor, font:{ family:'IBM Plex Mono', size:10 } } },
            y:{ grid:{ color:gridColor }, ticks:{ color:tickColor, font:{ family:'IBM Plex Mono', size:10 }, callback: v => '\u20B9' + (v/1000) + 'k' } }
          }
        }
      });
    }
  }

  // Payment Status Doughnut Chart dynamically
  const pendingList = receipts.filter(r => r.status !== 'Paid');
  let paidSum = paidList.reduce((s, r) => s + Number(r.total || 0), 0);
  let pendingSum = pendingList.filter(r => r.status === 'Pending').reduce((s, r) => s + (Number(r.total || 0) - Number(r.advancePaid || 0)), 0);
  let overdueSum = pendingList.filter(r => r.status === 'Overdue').reduce((s, r) => s + (Number(r.total || 0) - Number(r.advancePaid || 0)), 0);

  if (paidSum === 0 && pendingSum === 0 && overdueSum === 0) {
    paidSum = 150000;
    pendingSum = 50000;
    overdueSum = 0;
  }

  const payCtx = document.getElementById('paymentStatusChart');
  if (payCtx) {
    if (paymentChartInst) {
      paymentChartInst.data.datasets[0].data = [paidSum, pendingSum, overdueSum];
      paymentChartInst.update();
    } else {
      paymentChartInst = new Chart(payCtx, {
        type: 'doughnut',
        data: {
          labels: ['Received','Pending','Overdue'],
          datasets: [{ data:[paidSum, pendingSum, overdueSum], backgroundColor:['rgba(74,222,128,.75)','rgba(245,158,11,.75)','rgba(239,68,68,.75)'], borderColor:['#4ADE80','#F59E0B','#EF4444'], borderWidth:1 }]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ position:'bottom', labels:{ color:tickColor, font:{ family:'IBM Plex Mono', size:10 }, padding:14 } } }
        }
      });
    }
  }
}
window.initCharts = initCharts;

// 6. Calendar Event Scheduler UI Renderer
function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  const title = document.getElementById('calendarMonthTitle');
  if (!grid || !title) return;

  const date = new Date(calendarYear, calendarMonth, 1);
  title.innerText = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  grid.innerHTML = '';
  const dayNames = ['S','M','T','W','T','F','S'];
  dayNames.forEach(n => {
    const el = document.createElement('div');
    el.className = 'calendar-day-header';
    el.innerText = n;
    grid.appendChild(el);
  });

  const startDay = date.getDay();
  for (let i = 0; i < startDay; i++) {
    const el = document.createElement('div');
    el.className = 'calendar-day empty';
    grid.appendChild(el);
  }

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.className = 'calendar-day';
    
    const isToday = d === new Date().getDate() && calendarMonth === new Date().getMonth() && calendarYear === new Date().getFullYear();
    if (isToday) el.classList.add('today');

    el.innerHTML = `<span class="day-number">${d}</span>`;
    
    if (calendarEvents[d]) {
      calendarEvents[d].forEach(evt => {
        const tag = document.createElement('span');
        tag.className = 'day-event';
        tag.innerText = evt;
        el.appendChild(tag);
      });
    }
    grid.appendChild(el);
  }
}
window.renderCalendar = renderCalendar;

function changeCalendarMonth(offset) {
  calendarMonth += offset;
  if (calendarMonth > 11) {
    calendarMonth = 0;
    calendarYear += 1;
  } else if (calendarMonth < 0) {
    calendarMonth = 11;
    calendarYear -= 1;
  }
  renderCalendar();
}
window.changeCalendarMonth = changeCalendarMonth;

// 7. Initialize Admin Console Layout & Auth Controls
function initDashboard() {
  syncAllDatabases();
  fetchSmtpConfig();
  startLiveClock();
  initCharts();
  renderCalendar();

  // Auto-load polling: Refresh admin databases every 5 seconds when authenticated
  setInterval(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      syncAllDatabases();
    }
  }, 5000);
}
window.initDashboard = initDashboard;

// 8. Dom Content Loading Handlers & Bindings
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Bindings
  const themeToggle = document.getElementById('adminThemeToggle');
  if (themeToggle) {
    if (localStorage.getItem('adminTheme') === 'light') {
      document.body.classList.add('light-theme');
    }
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      localStorage.setItem('adminTheme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
      initCharts();
    });
  }

  // Mobile Menu Bindings
  const adminMenuToggle = document.getElementById('adminMenuToggle');
  const adminSidebar = document.getElementById('adminSidebar');
  const adminSidebarClose = document.getElementById('adminSidebarClose');
  const sidebarLinks = document.querySelectorAll('.sidebar-menu li');

  if (adminMenuToggle && adminSidebar) {
    adminMenuToggle.addEventListener('click', () => adminSidebar.classList.add('open'));
  }
  if (adminSidebarClose && adminSidebar) {
    adminSidebarClose.addEventListener('click', () => adminSidebar.classList.remove('open'));
  }
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900 && adminSidebar) {
        adminSidebar.classList.remove('open');
      }
    });
  });

  // Auth Overlay Checks
  const loginOverlay = document.getElementById('loginOverlay');
  const loginForm = document.getElementById('adminLoginForm');
  const adminPass = document.getElementById('adminPass');
  const loginError = document.getElementById('loginError');
  const logoutBtn = document.getElementById('logoutBtn');

  if (localStorage.getItem('adminAuth') === 'true') {
    if (loginOverlay) loginOverlay.classList.add('hidden');
    initDashboard();
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (adminPass && adminPass.value === 'Shridharsan12@') {
        localStorage.setItem('adminAuth', 'true');
        if (loginOverlay) loginOverlay.classList.add('hidden');
        initDashboard();
      } else {
        if (loginError) loginError.style.display = 'block';
        if (adminPass) adminPass.value = '';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('adminAuth');
      if (loginOverlay) loginOverlay.classList.remove('hidden');
      if (adminPass) adminPass.value = '';
      if (loginError) loginError.style.display = 'none';
    });
  }

  // Sidebar Menu Routing Tab Click bindings
  const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');
  const tabSections = document.querySelectorAll('.tab-section');
  const workspaceTitle = document.getElementById('workspaceTitle');

  sidebarMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarMenuItems.forEach(li => li.classList.remove('active'));
      tabSections.forEach(tab => tab.classList.remove('active'));

      item.classList.add('active');
      const targetTabId = item.getAttribute('data-tab');
      const targetEl = document.getElementById(targetTabId);
      if (targetEl) targetEl.classList.add('active');
      window.scrollTo(0, 0);

      const tabTitles = {
        'dashboardTab':    'Agency Dashboard',
        'inquiriesTab':    'General Client Enquiries',
        'activityTab':     'Activity Log',
        'crmTab':          'CRM Lead Pipeline',
        'proposalsTab':    'Proposals & Quotations',
        'projectsTab':     'Project Scoping Leads',
        'roadmapEditorTab':'Roadmap Phase Editor',
        'tasksTab':        'Task Board',
        'supportTab':      'Support Desk',
        'chatbotTab':      'Smart Chatbot Console',
        'settingsTab':     'System Config Settings',
        'accessTab':       'Client Access Registry',
        'calendarTab':     'Milestones Calendar'
      };

      if (workspaceTitle) {
        workspaceTitle.innerText = tabTitles[targetTabId] || targetTabId;
      }
      if (targetTabId === 'accessTab') fetchApprovedUsers();
      else if (targetTabId === 'chatbotTab') fetchChatbotMessages();
      else if (targetTabId === 'calendarTab') renderCalendar();
    });
  });
});
