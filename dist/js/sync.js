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



// NOTE: fetchSystemActivityLogs and renderSystemActivityLogs have been moved to js/activity.js


