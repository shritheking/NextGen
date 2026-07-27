// ========================================================
// NextGen Web Studio - Receipts & Invoices Module
// Uses window.* globals shared with inline admin script
// ========================================================

async function fetchReceipts() {
  try {
    const res = await fetch(window.getApiUrl('/api/receipts?_t=' + Date.now()));
    if (!res.ok) throw new Error();
    window.receipts = await res.json();
    renderReceipts(window.receipts);
  } catch (err) {
    console.warn('Receipts fetch failed');
    renderReceipts([]);
  }
}
window.fetchReceipts = fetchReceipts;

function renderReceipts(list) {
  const tbody = document.getElementById('receiptsTableBody');
  const empty = document.getElementById('receiptsEmpty');
  const table = document.getElementById('receiptsTable');
  const countEl = document.getElementById('receiptsCount');
  if (countEl) countEl.innerText = `${list.length} receipts found`;
  if (!tbody) return;

  tbody.innerHTML = '';
  if (list.length === 0) {
    if (table) table.style.display = 'none';
    if (empty) {
      empty.style.display = 'block';
      const emptyMsg = empty.querySelector('p');
      if (emptyMsg) {
        emptyMsg.innerHTML = !window.initialFetchSuccess
          ? '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i> Connecting to database...'
          : 'No generated client invoices found.';
      }
    }
    return;
  }
  if (table) table.style.display = 'table';
  if (empty) empty.style.display = 'none';

  list.sort((a,b) => new Date(b.date) - new Date(a.date));
  list.forEach(item => {
    const tr = document.createElement('tr');
    const formattedTotal = Number(item.total).toLocaleString('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 });
    const statusClass = item.status === 'Paid' ? 'paid' : 'pending';
    const formattedDate = item.date ? new Date(item.date).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : 'N/A';

    tr.innerHTML = `
      <td>
        <div style="font-family:var(--font-mono); font-size:11.5px; font-weight:600;">${item.id.toUpperCase()}</div>
        <div style="font-size:10.5px; color:var(--ink-soft); margin-top:2px;">${formattedDate}</div>
      </td>
      <td>
        <div class="col-name">${item.clientName}</div>
        <div style="font-size:11.5px; color:var(--ink-soft);">${item.clientEmail}</div>
      </td>
      <td style="font-weight:500;">${item.projectTitle}</td>
      <td style="font-weight:600; color:var(--accent);">${formattedTotal}</td>
      <td>
        <span class="status-badge ${statusClass}">${item.status}</span>
        ${item.razorpayPaymentId ? `<div style="font-size:10px; font-family:var(--font-mono); color:var(--accent); margin-top:4px; font-weight:600;">${item.razorpayPaymentId}</div>` : ''}
      </td>
      <td>
        <div class="action-group">
          <button class="action-btn" title="View Print Layout" onclick="openDetailsModal('${item.id}', 'receipt')"><i class="fa-solid fa-print"></i></button>
          <button class="action-btn" title="Edit Receipt" onclick="renderReceiptModalEditView('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="action-btn btn-delete" title="Delete Invoice" onclick="deleteReceipt('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
window.renderReceipts = renderReceipts;

async function deleteReceipt(id) {
  showConfirmModal('Permanently delete this generated billing receipt statement?', async () => {
    try {
      const res = await fetch(window.getApiUrl('/api/receipts/delete'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) syncAllDatabases();
    } catch (err) { console.error(err); }
  });
}
window.deleteReceipt = deleteReceipt;

// ---------- WORKSPACE INVOICE ACTIONS ----------
function renderWorkspaceInvoices() {
  const list = (window.receipts || []).filter(r => r.clientEmail && r.clientEmail.toLowerCase() === window.currentWorkspaceEmail.toLowerCase());
  const tbody = document.getElementById('profileInvoicesList');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--ink-soft);">No invoices generated yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(r => `
    <tr>
      <td><div style="font-family:var(--font-mono); font-weight:600;">#${r.id.substring(0,8)}</div></td>
      <td><div style="font-weight:600;">${r.projectTitle || 'Milestone Invoice'}</div><div style="font-size:11px; color:var(--ink-faint);">${r.projectDescription || ''}</div></td>
      <td style="font-family:var(--font-mono); font-weight:600; color:var(--accent);">&#8377;${Number(r.total).toLocaleString('en-IN')}</td>
      <td style="font-size:12.5px; color:var(--ink-soft);">${r.dueDate || 'TBD'}</td>
      <td><span class="status-badge ${r.status === 'Paid' ? 'completed' : 'pending'}">${r.status || 'Pending'}</span></td>
      <td>
        <div style="display:flex; gap:4px; align-items:center;">
          ${r.status !== 'Paid' ? `
            <button class="action-btn" style="padding:4px 8px; font-size:11px; background:#4ADE80; color:#0A0A0A; border:none;" onclick="markWorkspaceInvoicePaid('${r.id}')" title="Mark Paid"><i class="fa-solid fa-check"></i></button>
            <button class="action-btn" style="padding:4px 8px; font-size:11px;" onclick="sendInvoiceReminderDirect('${r.id}')" title="Send Reminder"><i class="fa-solid fa-paper-plane"></i></button>
          ` : ''}
          <button class="action-btn" style="padding:4px 8px; font-size:11px;" onclick="printWorkspaceInvoice('${r.id}')" title="Print"><i class="fa-solid fa-print"></i></button>
          <button class="action-btn btn-delete" style="padding:4px 8px; font-size:11px;" onclick="deleteWorkspaceInvoice('${r.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}
window.renderWorkspaceInvoices = renderWorkspaceInvoices;

async function renderWorkspacePayments() {
  try {
    const res = await fetch(window.getApiUrl('/api/payments?_t=' + Date.now()));
    if (res.ok) {
      const allPayments = await res.json();
      const clientReceiptIds = (window.receipts || []).filter(r => r.clientEmail && r.clientEmail.toLowerCase() === window.currentWorkspaceEmail.toLowerCase()).map(r => r.id);
      const list = allPayments.filter(p => clientReceiptIds.includes(p.receiptId));
      const tbody = document.getElementById('profilePaymentsList');
      if (!tbody) return;
      if (list.length === 0) { tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--ink-soft);">No transaction records found.</td></tr>`; return; }
      tbody.innerHTML = list.map(p => `
        <tr>
          <td><div style="font-family:var(--font-mono); font-size:11.5px;">#${p.id.substring(0,8)}</div></td>
          <td style="font-family:var(--font-mono); font-weight:600; color:#4ADE80;">&#8377;${Number(p.amount).toLocaleString('en-IN')}</td>
          <td style="font-size:12.5px;">${p.gateway || 'Razorpay'}</td>
          <td style="font-family:var(--font-mono); font-size:12px; color:var(--ink-soft);">${p.transactionId || 'pay_simulated'}</td>
          <td style="font-size:11.5px; color:var(--ink-faint);">${new Date(p.paidAt).toLocaleString()}</td>
          <td><span class="status-badge completed" style="background:rgba(74,222,128,.1); color:#4ADE80; border:1px solid #4ADE80;">Cleared</span></td>
        </tr>
      `).join('');
    }
  } catch (e) { console.warn('Payments load failed'); }
}
window.renderWorkspacePayments = renderWorkspacePayments;

function renderPaymentSummary() {
  const clientReceipts = (window.receipts || []).filter(r => r.clientEmail && r.clientEmail.toLowerCase() === window.currentWorkspaceEmail.toLowerCase());
  let totalPaid = 0, totalPending = 0, totalAdvance = 0, totalRemaining = 0;
  clientReceipts.forEach(r => {
    const total = Number(r.total) || 0;
    const advance = Number(r.advancePaid) || 0;
    const remaining = total - advance;
    if (r.status === 'Paid') { totalPaid += total; }
    else { totalPending += remaining > 0 ? remaining : 0; totalAdvance += advance; totalRemaining += remaining > 0 ? remaining : 0; }
  });
  const container = document.getElementById('profilePaymentSummaryContainer');
  if (!container) return;
  container.innerHTML = `
    <div style="background:var(--bg-alt); border:1px solid var(--border); padding:10px; border-radius:4px; text-align:center;"><div style="font-size:10px; font-family:var(--font-mono); color:var(--ink-faint); text-transform:uppercase;">Invoices</div><div style="font-size:16px; font-weight:700; margin-top:4px;">${clientReceipts.length}</div></div>
    <div style="background:var(--bg-alt); border:1px solid var(--border); padding:10px; border-radius:4px; text-align:center;"><div style="font-size:10px; font-family:var(--font-mono); color:var(--ink-faint); text-transform:uppercase;">Paid</div><div style="font-size:16px; font-weight:700; margin-top:4px; color:#4ADE80;">&#8377;${totalPaid.toLocaleString('en-IN')}</div></div>
    <div style="background:var(--bg-alt); border:1px solid var(--border); padding:10px; border-radius:4px; text-align:center;"><div style="font-size:10px; font-family:var(--font-mono); color:var(--ink-faint); text-transform:uppercase;">Pending</div><div style="font-size:16px; font-weight:700; margin-top:4px; color:var(--accent);">&#8377;${totalPending.toLocaleString('en-IN')}</div></div>
    <div style="background:var(--bg-alt); border:1px solid var(--border); padding:10px; border-radius:4px; text-align:center;"><div style="font-size:10px; font-family:var(--font-mono); color:var(--ink-faint); text-transform:uppercase;">Advance</div><div style="font-size:16px; font-weight:700; margin-top:4px; color:#3B82F6;">&#8377;${totalAdvance.toLocaleString('en-IN')}</div></div>
    <div style="background:var(--bg-alt); border:1px solid var(--border); padding:10px; border-radius:4px; text-align:center;"><div style="font-size:10px; font-family:var(--font-mono); color:var(--ink-faint); text-transform:uppercase;">Remaining</div><div style="font-size:16px; font-weight:700; margin-top:4px; color:#F59E0B;">&#8377;${totalRemaining.toLocaleString('en-IN')}</div></div>
  `;
}
window.renderPaymentSummary = renderPaymentSummary;

function toggleWorkspaceInvoiceForm() {
  const form = document.getElementById('workspaceInvoiceForm');
  if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
window.toggleWorkspaceInvoiceForm = toggleWorkspaceInvoiceForm;

async function saveWorkspaceInvoice() {
  const projectId = document.getElementById('newInvProjSelect').value;
  const milestoneTitle = document.getElementById('newInvTitle').value.trim();
  const amount = document.getElementById('newInvAmount').value.trim();
  const dueDate = document.getElementById('newInvDueDate').value;
  const status = document.getElementById('newInvStatus').value;
  const email = window.currentWorkspaceEmail;
  const client = (window.approvedUsers || []).find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!client || !projectId || !milestoneTitle || !amount) { showToast('Required Fields', 'Please select a project, fill in title and amount.', 'warning'); return; }

  const proj = (window.projects || []).find(p => p.id === projectId);
  const projName = proj ? proj.name : 'Web App Development';

  try {
    const res = await fetch(window.getApiUrl('/api/receipts/create'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName: client.name, clientEmail: client.email,
        projectTitle: projName, projectDescription: milestoneTitle,
        lineItems: [{ description: milestoneTitle, amount: Number(amount) }],
        subtotal: Number(amount), tax: 0, total: Number(amount),
        status, dueDate: dueDate || '', date: new Date().toISOString()
      })
    });
    if (res.ok) {
      showToast('Invoice Created', 'Milestone invoice saved to client account.', 'success');
      toggleWorkspaceInvoiceForm();
      await fetchReceipts();
      renderWorkspaceInvoices();
      renderPaymentSummary();
    } else { showToast('Error', 'Failed to save invoice.', 'error'); }
  } catch (err) { showToast('Error', 'Connection failed.', 'error'); }
}
window.saveWorkspaceInvoice = saveWorkspaceInvoice;

async function markWorkspaceInvoicePaid(id) {
  const receipt = (window.receipts || []).find(r => r.id === id);
  if (!receipt) return;
  try {
    const res = await fetch(window.getApiUrl('/api/receipts/mark-paid'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, razorpayPaymentId: 'pay_manual_' + Date.now() })
    });
    if (res.ok) {
      showToast('Payment Recorded', `Invoice marked as paid.`, 'success');
      await fetchReceipts();
      renderWorkspaceInvoices();
      renderPaymentSummary();
      updateDashboardStats();
    } else { showToast('Error', 'Failed to mark invoice as paid.', 'error'); }
  } catch (err) { showToast('Error', 'Connection failed.', 'error'); }
}
window.markWorkspaceInvoicePaid = markWorkspaceInvoicePaid;

async function sendInvoiceReminderDirect(id) {
  const receipt = (window.receipts || []).find(r => r.id === id);
  if (!receipt) return;
  try {
    const res = await fetch(window.getApiUrl('/api/receipts/send-reminder'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id })
    });
    if (res.ok) { showToast('Reminder Sent', `Payment reminder sent to ${receipt.clientEmail}.`, 'success'); }
    else { showToast('Notice', 'Reminder could not be sent via email API.', 'info'); }
  } catch (err) { showToast('Error', 'Connection failed.', 'error'); }
}
window.sendInvoiceReminderDirect = sendInvoiceReminderDirect;

function printWorkspaceInvoice(id) {
  openDetailsModal(id, 'receipt');
}
window.printWorkspaceInvoice = printWorkspaceInvoice;

async function deleteWorkspaceInvoice(id) {
  showConfirmModal('Delete this invoice from the client account?', async () => {
    try {
      const res = await fetch(window.getApiUrl('/api/receipts/delete'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id })
      });
      if (res.ok) {
        showToast('Invoice Deleted', 'Invoice removed from account.', 'success');
        await fetchReceipts();
        renderWorkspaceInvoices();
        renderPaymentSummary();
      }
    } catch (e) { showToast('Error', 'Failed to delete invoice.', 'error'); }
  });
}
window.deleteWorkspaceInvoice = deleteWorkspaceInvoice;

// ---------- SEARCH FILTER ----------
document.addEventListener('DOMContentLoaded', () => {
  const searchReceipts = document.getElementById('searchReceiptsInput');
  if (searchReceipts) {
    searchReceipts.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      renderReceipts((window.receipts || []).filter(item =>
        (item.id && item.id.toLowerCase().includes(q)) ||
        (item.clientName && item.clientName.toLowerCase().includes(q)) ||
        (item.clientEmail && item.clientEmail.toLowerCase().includes(q)) ||
        (item.projectTitle && item.projectTitle.toLowerCase().includes(q)) ||
        (item.status && item.status.toLowerCase().includes(q))
      ));
    });
  }
});
