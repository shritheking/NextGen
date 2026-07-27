// ========================================================
// NextGen Web Studio - Database Sync Orchestrator
// ========================================================

async function syncAllDatabases() {
  try {
    await Promise.all([
      fetchInquiries(),
      fetchProjects(),
      fetchReceipts(),
      fetchChatbotMessages(),
      fetchCrmLeads(),
      fetchTasks(),
      fetchSupportTickets(),
      fetchApprovedUsers(),
      fetchSystemActivityLogs()
    ]);
    window.initialFetchSuccess = true;
    updateDashboardStats();
  } catch (err) {
    console.warn('Sync databases failed:', err);
  }
}
window.syncAllDatabases = syncAllDatabases;


// Activity Log: Fetch and render system-wide logs into the sidebar Activity Log tab
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

