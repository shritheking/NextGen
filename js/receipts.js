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

  const setLiveTimeBtn = document.getElementById('setLiveTimeBtn');
  if (setLiveTimeBtn) {
    setLiveTimeBtn.addEventListener('click', () => {
      const input = document.getElementById('rcptDate');
      if (input) {
        input.value = toDatetimeLocalString(new Date());
      }
    });
  }
});

// ---------- DATE & TIME UTILITY HELPERS ----------

function setModalLiveTime() {
  const input = document.getElementById('mRcptDate');
  if (input) {
    input.value = toDatetimeLocalString(new Date());
  }
}
window.setModalLiveTime = setModalLiveTime;

function closeReceiptModalView() {
  const modal = document.getElementById('receiptModal');
  if (modal) modal.classList.remove('show');
}
window.closeReceiptModalView = closeReceiptModalView;


// ---------- DETAILS VIEWER MODAL ----------
function openDetailsModal(id, type) {
  let item = null;
  let title = '';
  let markup = '';
  let actionsMarkup = '';

  const receiptModal = document.getElementById('receiptModal');
  if (!receiptModal) return;

  if (type === 'inquiry') {
    item = (window.inquiries || []).find(i => i.id === id);
    if (!item) return;

    title = "Client Enquiry Brief";
    markup = `
      <div class="receipt-row">
        <span class="r-label">Contact Client</span>
        <span class="r-val">${item.name}</span>
      </div>
      <div class="receipt-row">
        <span class="r-label">Email</span>
        <span class="r-val">${item.email}</span>
      </div>
      <div class="receipt-row">
        <span class="r-label">Phone</span>
        <span class="r-val">${item.phone || 'Not Provided'}</span>
      </div>
      <div class="receipt-row">
        <span class="r-label">Date Logged</span>
        <span class="r-val">${new Date(item.date).toLocaleString('en-IN')}</span>
      </div>
      <div class="receipt-row">
        <span class="r-label">Contact Status</span>
        <span class="r-val">${item.status || 'New'}</span>
      </div>
      <div>
        <span class="r-label">Client Message Brief:</span>
        <div class="receipt-desc-block">${item.message}</div>
      </div>
    `;
    
    const actText = item.status === 'Contacted' ? 'Mark as New' : 'Mark Contacted';
    const isMoved = item.status === 'Moved';
    const moveBtn = isMoved 
      ? `<button class="login-btn" style="background-color:#10B981; border-color:#10B981; color:#fff;" disabled><i class="fa-solid fa-circle-check"></i> Project Active</button>`
      : `<button class="login-btn" style="background-color:var(--accent); border-color:var(--accent); color:var(--bg);" onclick="moveToProject('${item.id}'); document.getElementById('receiptModal').classList.remove('show');"><i class="fa-solid fa-rocket"></i> Start Project</button>`;
    actionsMarkup = `
      ${moveBtn}
      <button class="login-btn" onclick="toggleInquiryStatus('${item.id}'); document.getElementById('receiptModal').classList.remove('show');">${actText}</button>
      <button class="refresh-btn" style="justify-content:center;" onclick="dispatchEmail('${item.id}', 'inquiry')">Dispatched SMTP Test</button>
    `;

  } else if (type === 'project') {
    item = (window.projects || []).find(p => p.id === id);
    if (!item) return;

    title = "Client Project Scoping";
    markup = '<div style="text-align:center; padding:20px; color:var(--ink-soft);"><i class="fa-solid fa-spinner fa-spin"></i> Loading details...</div>';
    actionsMarkup = '';

    setTimeout(() => {
      if (window.renderProjectModalView) {
        window.renderProjectModalView(id, false);
      }
    }, 50);

  } else if (type === 'receipt') {
    item = (window.receipts || []).find(r => r.id === id);
    if (!item) return;

    title = "Client Billing Receipt";
    const advancePaid = item.advancePaid || 0;
    const balanceDue = item.total - advancePaid;
    const formattedTotal = Number(item.total).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
    const formattedAdvance = Number(advancePaid).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
    const formattedBalance = Number(balanceDue).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

    let advanceMarkup = '';
    if (advancePaid > 0) {
      advanceMarkup = `
        <div class="receipt-row">
          <span class="r-label">Advance Paid</span>
          <span class="r-val" style="font-weight:600; color:#4ADE80;">${formattedAdvance}</span>
        </div>
        <div class="receipt-row" style="border-top:1px dashed var(--border); padding-top:10px; margin-top:10px;">
          <span class="r-label" style="font-size:12px; font-weight:600;">BALANCE DUE</span>
          <span class="r-val" style="font-size:16px; font-weight:700; color:var(--accent);">${formattedBalance}</span>
        </div>
      `;
    }

    let printAdvanceMarkup = '';
    if (advancePaid > 0) {
      printAdvanceMarkup = `
        <div style="text-align: right; margin-top: 15px; font-family: monospace; font-size: 13px; color: #403f3d;">
          <div style="margin-bottom: 4px;">GRAND TOTAL: ${formattedTotal}</div>
          <div style="margin-bottom: 4px; color: #2E7D32;">ADVANCE PAID: ${formattedAdvance}</div>
          <div style="font-size: 16px; font-weight: 700; color: #000; border-top: 1px solid #706f6b; padding-top: 4px; margin-top: 4px;">BALANCE DUE: ${formattedBalance}</div>
        </div>
      `;
    }

    let rowsMarkup = '';
    if (item.lineItems && item.lineItems.length > 0) {
      item.lineItems.forEach(line => {
        const costText = Number(line.taskCost).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
        rowsMarkup += `
          <tr>
            <td>${line.taskName}</td>
            <td style="text-align:right; font-weight:500;">${costText}</td>
          </tr>
        `;
      });
    } else {
      rowsMarkup = `<tr><td colspan="2">No detailed tasks checklist provided.</td></tr>`;
    }

    markup = `
      <!-- ON-SCREEN PREVIEW VIEW -->
      <div class="screen-receipt-view">
        <div class="receipt-row">
          <span class="r-label">Billing Code</span>
          <span class="r-val" style="font-family:var(--font-mono);">${item.id.toUpperCase()}</span>
        </div>
        <div class="receipt-row">
          <span class="r-label">Client Name</span>
          <span class="r-val">${item.clientName}</span>
        </div>
        <div class="receipt-row">
          <span class="r-label">Client Email</span>
          <span class="r-val">${item.clientEmail}</span>
        </div>
        <div class="receipt-row">
          <span class="r-label">Client Phone</span>
          <span class="r-val">${item.clientPhone || 'N/A'}</span>
        </div>
        <div class="receipt-row">
          <span class="r-label">Invoice Project</span>
          <span class="r-val" style="font-weight:500;">${item.projectTitle}</span>
        </div>
        <div class="receipt-row">
          <span class="r-label">Date Created</span>
          <span class="r-val">${new Date(item.date).toLocaleString('en-IN')}</span>
        </div>
        <div class="receipt-row">
          <span class="r-label">Payment Status</span>
          <span class="r-val" style="font-weight:600; color:${item.status === 'Paid' ? '#4ADE80' : '#FBBF24'};">${item.status}</span>
        </div>
        <div>
          <span class="r-label">Scoping Line Items breakdown:</span>
          <div class="receipt-items-block">
            <table class="receipt-items-table">
              <thead>
                <tr>
                  <th style="background:none;">Task Item</th>
                  <th style="background:none; text-align:right;">Sub-total Cost</th>
                </tr>
              </thead>
              <tbody>
                ${rowsMarkup}
              </tbody>
            </table>
          </div>
        </div>
        <div class="receipt-row" style="border-top:1px dashed var(--border); padding-top:10px; margin-top:10px;">
          <span class="r-label" style="font-size:12px; font-weight:600;">GRAND TOTAL</span>
          <span class="r-val" style="font-size:16px; font-weight:700; color:var(--ink-soft);">${formattedTotal}</span>
        </div>
        ${advanceMarkup}
      </div>

      <!-- PRINT-ONLY DETAILED 2-PAGE INVOICE (Hidden on screen) -->
      <div class="print-receipt-view">
        <div class="print-invoice-container">
          <!-- PAGE 1: INVOICE DETAILS -->
          <div class="invoice-print-page invoice-page-1">
            <div class="invoice-print-header">
              <div class="company-info">
                <div class="company-logo-print" style="margin-bottom: 12px;">
                  <img src="logo-print.png" alt="NextGen Logo" style="height: 48px; width: auto; display: block;">
                </div>
                <p>Premium Web Design &amp; Full-Stack Engineering</p>
                <p class="meta-sub">Coimbatore, Tamil Nadu, India | shridharsan@nextgenwebstudio.in</p>
              </div>
              <div class="invoice-meta-block">
                <h3>INVOICE STATEMENT</h3>
                <p><span>ID:</span> ${item.id.toUpperCase()}</p>
                <p><span>Date:</span> ${new Date(item.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            
            <div class="client-billing-block">
              <h4>BILL TO:</h4>
              <p class="client-name">${item.clientName}</p>
              <p>${item.clientEmail}</p>
              <p>${item.clientPhone || 'N/A'}</p>
            </div>

            <div class="project-title-block">
              <h4>PROJECT:</h4>
              <p>${item.projectTitle}</p>
            </div>

            <table class="print-items-table">
              <thead>
                <tr>
                  <th>Line Item Description</th>
                  <th style="text-align: right;">Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                ${rowsMarkup}
              </tbody>
            </table>

            <div class="print-grand-total" style="${advancePaid > 0 ? 'display:none;' : ''}">
              <span>Total Amount Due:</span>
              <h3>${formattedTotal}</h3>
            </div>
            ${printAdvanceMarkup}
            
            <div class="payment-status-block">
              <p><span>Payment Status:</span> <strong style="color: ${item.status === 'Paid' ? '#2E7D32' : '#E65100'}">${item.status.toUpperCase()}</strong></p>
            </div>

            <!-- Page Number -->
            <div class="print-page-number">1</div>
          </div>

          <!-- PAGE 2: ROADMAP, TERMS & SIGN-OFF -->
          <div class="invoice-print-page invoice-page-2">
            <div class="invoice-print-header">
              <div class="company-info">
                <div class="company-logo-print" style="margin-bottom: 12px;">
                  <img src="logo-print.png" alt="NextGen Logo" style="height: 48px; width: auto; display: block;">
                </div>
                <p class="terms-title">Project Service Agreement &amp; Terms</p>
              </div>
            </div>

            <div class="terms-section">
              <h4>1. Scope &amp; Deliverables</h4>
              <p>All service components listed in the invoice table are subject to the project milestones agreed upon by NextGen Web Studio. Any alterations or addenda to these items will be scoped, approved, and billed separately.</p>
            </div>

            <div class="terms-section">
              <h4>2. Billing &amp; Payments</h4>
              <p>For invoices marked pending, payment is due within 7 business days from date of receipt. Outstanding balances may result in temporary suspension of hosting services or software source-code deployments.</p>
            </div>

            <div class="terms-section">
              <h4>3. Support and Warranty Period</h4>
              <p>Every development cycle includes a 30-day post-delivery bug-free maintenance period starting from the date of final sign-off. Post-warranty updates can be secured via custom SLA contracts.</p>
            </div>

            <!-- Sign-off signatures -->
            <div class="signatures-grid" style="grid-template-columns: 1fr; justify-items: center; text-align: center;">
              <div class="sig-block" style="width: 250px; margin: 0 auto;">
                <div style="height: 80px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 6px;">
                  <!-- Client signs this line directly -->
                </div>
                <div class="sig-line"></div>
                <p>Client Signature</p>
                <small>${item.clientName}</small>
              </div>
            </div>

            <div class="print-footer" style="margin-top: 20px;">
              <p>Thank you for partnering with NextGen Web Studio to build your modern digital storefront.</p>
              <p class="company-tagline">We build websites that ship fast and work hard.</p>
            </div>

            <!-- Page Number -->
            <div class="print-page-number">2</div>
          </div>
        </div>
      </div>
    `;

    actionsMarkup = `
      <button class="login-btn" onclick="window.print();"><i class="fa-solid fa-print"></i> Print Receipt</button>
      <button class="refresh-btn" style="justify-content:center;" onclick="dispatchEmail('${item.id}', 'receipt')">Email PDF invoice</button>
      <button class="refresh-btn" onclick="renderReceiptModalEditView('${item.id}')"><i class="fa-solid fa-edit"></i> Edit</button>
    `;
  }

  const rTitle = document.getElementById('rTitle');
  const rId = document.getElementById('rId');
  const metaDetails = document.getElementById('receiptMetaDetails');
  const actionsContainer = document.getElementById('receiptActionsContainer');

  if (rTitle) rTitle.innerText = title;
  if (rId) rId.innerText = id.toUpperCase();
  if (metaDetails) metaDetails.innerHTML = markup;
  if (actionsContainer) actionsContainer.innerHTML = actionsMarkup;

  receiptModal.classList.add('show');
}
window.openDetailsModal = openDetailsModal;

// ---------- RECEIPT MODAL EDITOR ----------
function renderReceiptModalEditView(id) {
  const item = (window.receipts || []).find(r => r.id === id);
  if (!item) return;

  const body = document.getElementById('receiptMetaDetails');
  const footer = document.getElementById('receiptActionsContainer');
  if (!body || !footer) return;

  // Render items rows
  let rowsMarkup = '';
  if (item.lineItems && item.lineItems.length > 0) {
    item.lineItems.forEach((line, idx) => {
      rowsMarkup += `
        <tr class="modal-line-row">
          <td><input type="text" class="line-name-input m-item-name" style="width:100%;" value="${line.taskName}" oninput="updateModalTotalSum()"></td>
          <td><input type="number" class="line-name-input m-item-cost" style="width:100px; text-align:right;" value="${line.taskCost}" oninput="updateModalTotalSum()"></td>
          <td style="text-align:center;"><button type="button" onclick="this.closest('tr').remove(); updateModalTotalSum();" style="background:none; border:none; color:#EF4444; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
      `;
    });
  }

  body.innerHTML = `
    <div style="margin-top:10px;">
      <span class="r-label">Client Name</span>
      <input type="text" id="mRcptClientName" class="line-name-input" style="width:100%; margin-top:4px;" value="${item.clientName}">
    </div>
    <div style="margin-top:10px;">
      <span class="r-label">Client Email</span>
      <input type="email" id="mRcptClientEmail" class="line-name-input" style="width:100%; margin-top:4px;" value="${item.clientEmail}">
    </div>
    <div style="margin-top:10px;">
      <span class="r-label">Client Phone</span>
      <input type="text" id="mRcptClientPhone" class="line-name-input" style="width:100%; margin-top:4px;" value="${item.clientPhone || ''}">
    </div>
    <div style="margin-top:10px;">
      <span class="r-label">Project Title</span>
      <input type="text" id="mRcptProjectTitle" class="line-name-input" style="width:100%; margin-top:4px;" value="${item.projectTitle}">
    </div>
    <div style="margin-top:10px;">
      <span class="r-label">Invoice Creation Date/Time</span>
      <div style="display:flex; gap:8px; margin-top:4px;">
        <input type="datetime-local" id="mRcptDate" class="line-name-input" style="flex:1;" value="${toDatetimeLocalString(item.date)}">
        <button type="button" class="refresh-btn" onclick="setModalLiveTime()" style="margin-top:0; padding:0 12px; height:42px;"><i class="fa-solid fa-clock"></i> Live</button>
      </div>
    </div>
    <div style="margin-top:10px;">
      <span class="r-label">Invoice Due Date</span>
      <input type="date" id="mRcptDueDate" class="line-name-input" style="width:100%; margin-top:4px;" value="${item.dueDate || ''}">
    </div>
    <div style="margin-top:10px;">
      <span class="r-label">Invoice Payment Status</span>
      <select id="mRcptStatus" class="line-name-input" style="width:100%; margin-top:4px; background:var(--bg-alt); color:var(--ink); border:1px solid var(--border); padding:8px; border-radius:4px; outline:none; height:42px;">
        <option value="Paid" ${item.status === 'Paid' ? 'selected' : ''}>Paid</option>
        <option value="Pending" ${item.status === 'Pending' ? 'selected' : ''}>Pending</option>
        <option value="Overdue" ${item.status === 'Overdue' ? 'selected' : ''}>Overdue</option>
      </select>
    </div>
    <div style="margin-top:10px;">
      <span class="r-label">Advance Deposited (INR)</span>
      <input type="number" id="mRcptAdvancePaid" class="line-name-input" style="width:100%; margin-top:4px; color:#4ADE80; font-weight:600;" value="${item.advancePaid || 0}" oninput="updateModalTotalSum()">
    </div>
    <div style="margin-top:15px;">
      <span class="r-label">Line Items Description Breakdown:</span>
      <div class="receipt-items-block" style="margin-top:6px;">
        <table class="receipt-items-table" style="width:100%;">
          <thead>
            <tr>
              <th style="background:none;">Task Milestone Item</th>
              <th style="background:none; text-align:right; width:120px;">Amount Cost</th>
              <th style="background:none; width:40px; text-align:center;"></th>
            </tr>
          </thead>
          <tbody id="modalLineItemsBody">
            ${rowsMarkup}
          </tbody>
        </table>
      </div>
      <button type="button" onclick="addModalLineItemRow();" style="font-size:11px; padding:4px 8px; margin-top:8px; background:var(--bg-alt); border:1px solid var(--border); color:var(--ink); border-radius:4px; cursor:pointer;"><i class="fa-solid fa-plus"></i> Add Item Line</button>
    </div>
    <div class="receipt-row" style="border-top:1px dashed var(--border); padding-top:10px; margin-top:15px;">
      <span class="r-label" style="font-size:12px; font-weight:600;">GRAND TOTAL</span>
      <span class="r-val" id="mRcptTotalText" style="font-size:16px; font-weight:700; color:var(--ink-soft);">&#8377;${Number(item.total).toLocaleString('en-IN')}</span>
    </div>
    <div class="receipt-row" id="mRcptBalanceRow" style="border-top:1px dashed var(--border); padding-top:10px; margin-top:8px; display:${item.advancePaid > 0 ? 'flex' : 'none'};">
      <span class="r-label" style="font-size:12px; font-weight:600; color:var(--accent);">BALANCE DUE</span>
      <span class="r-val" id="mRcptBalanceText" style="font-size:16px; font-weight:700; color:var(--accent);">&#8377;${Number(item.total - (item.advancePaid || 0)).toLocaleString('en-IN')}</span>
    </div>
  `;

  footer.innerHTML = `
    <button class="login-btn" style="background-color:var(--accent); border-color:var(--accent); color:var(--bg); flex:1;" onclick="saveModalReceiptDetails('${item.id}')"><i class="fa-solid fa-save"></i> Save Invoice</button>
    <button class="refresh-btn" style="justify-content:center; flex:1; margin-top:0;" onclick="openDetailsModal('${item.id}', 'receipt')">Cancel</button>
  `;

  attachModalInputListeners();
}
window.renderReceiptModalEditView = renderReceiptModalEditView;

function addModalLineItemRow() {
  const tbody = document.getElementById('modalLineItemsBody');
  if (!tbody) return;

  const tr = document.createElement('tr');
  tr.className = 'modal-line-row';
  tr.innerHTML = `
    <td><input type="text" class="line-name-input m-item-name" style="width:100%;" placeholder="e.g. Design Wireframes" oninput="updateModalTotalSum()"></td>
    <td><input type="number" class="line-name-input m-item-cost" style="width:100px; text-align:right;" placeholder="0" oninput="updateModalTotalSum()"></td>
    <td style="text-align:center;"><button type="button" onclick="this.closest('tr').remove(); updateModalTotalSum();" style="background:none; border:none; color:#EF4444; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></td>
  `;
  tbody.appendChild(tr);
  attachModalInputListeners();
}
window.addModalLineItemRow = addModalLineItemRow;

function attachModalInputListeners() {
  const inputs = document.querySelectorAll('.m-item-cost, #mRcptAdvancePaid');
  inputs.forEach(input => {
    input.addEventListener('input', updateModalTotalSum);
  });
}
window.attachModalInputListeners = attachModalInputListeners;

function updateModalTotalSum() {
  let total = 0;
  const costInputs = document.querySelectorAll('.m-item-cost');
  costInputs.forEach(input => {
    total += Number(input.value || 0);
  });

  const advanceInput = document.getElementById('mRcptAdvancePaid');
  const advance = advanceInput ? Number(advanceInput.value || 0) : 0;
  const balance = total - advance;

  const totalText = document.getElementById('mRcptTotalText');
  if (totalText) {
    totalText.innerHTML = `&#8377;${total.toLocaleString('en-IN')}`;
  }

  const balanceRow = document.getElementById('mRcptBalanceRow');
  const balanceText = document.getElementById('mRcptBalanceText');
  if (balanceRow) {
    balanceRow.style.display = advance > 0 ? 'flex' : 'none';
  }
  if (balanceText) {
    balanceText.innerHTML = `&#8377;${balance.toLocaleString('en-IN')}`;
  }
}
window.updateModalTotalSum = updateModalTotalSum;

async function saveModalReceiptDetails(id) {
  const clientName = document.getElementById('mRcptClientName').value.trim();
  const clientEmail = document.getElementById('mRcptClientEmail').value.trim();
  const clientPhone = document.getElementById('mRcptClientPhone').value.trim();
  const projectTitle = document.getElementById('mRcptProjectTitle').value.trim();
  const date = document.getElementById('mRcptDate').value;
  const dueDate = document.getElementById('mRcptDueDate').value;
  const status = document.getElementById('mRcptStatus').value;
  const advancePaid = Number(document.getElementById('mRcptAdvancePaid').value || 0);

  if (!clientName || !clientEmail || !projectTitle) {
    showToast('Required Fields', 'Client details and project title are required.', 'warning');
    return;
  }

  // Build line items
  const lineItems = [];
  let total = 0;
  const rows = document.querySelectorAll('.modal-line-row');
  rows.forEach(row => {
    const name = row.querySelector('.m-item-name').value.trim();
    const cost = Number(row.querySelector('.m-item-cost').value || 0);
    if (name) {
      lineItems.push({ taskName: name, taskCost: cost });
      total += cost;
    }
  });

  const payload = {
    id, clientName, clientEmail, clientPhone, projectTitle,
    date: new Date(date).toISOString(), dueDate, status,
    advancePaid, total, subtotal: total, tax: 0, lineItems
  };

  try {
    const res = await fetch(window.getApiUrl('/api/receipts/update'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast('Invoice Saved', 'Invoice statement details updated successfully.', 'success');
      if (window.syncAllDatabases) {
        await window.syncAllDatabases();
      } else {
        await fetchReceipts();
        renderWorkspaceInvoices();
        renderPaymentSummary();
        if (window.updateDashboardStats) window.updateDashboardStats();
      }
      openDetailsModal(id, 'receipt');
    } else {
      showToast('Error', 'Failed to save changes.', 'error');
    }
  } catch (err) {
    showToast('Error', 'Connection failed.', 'error');
  }
}
window.saveModalReceiptDetails = saveModalReceiptDetails;

// ---------- DYNAMIC MANUAL RECEIPT GENERATOR FORM ----------
let editingReceiptId = null;

function removeRow(btn) {
  const itemLinesList = document.getElementById('itemLinesList');
  if (!itemLinesList) return;
  const rowsCount = itemLinesList.querySelectorAll('.item-row').length;
  if (rowsCount <= 1) {
    showToast('Validation Error', 'Your receipt must contain at least one line item Task Cost.', 'error');
    return;
  }
  btn.closest('.item-row').remove();
  updateTotalSum();
}
window.removeRow = removeRow;

function attachInputListeners() {
  const itemLinesList = document.getElementById('itemLinesList');
  if (!itemLinesList) return;
  const costInputs = itemLinesList.querySelectorAll('.line-cost-input');
  costInputs.forEach(input => {
    input.removeEventListener('input', updateTotalSum);
    input.addEventListener('input', updateTotalSum);
  });
}

function updateTotalSum() {
  const itemLinesList = document.getElementById('itemLinesList');
  const receiptTotalText = document.getElementById('receiptTotalText');
  if (!itemLinesList || !receiptTotalText) return 0;
  
  let sum = 0;
  const costInputs = itemLinesList.querySelectorAll('.line-cost-input');
  costInputs.forEach(input => {
    sum += Number(input.value) || 0;
  });
  receiptTotalText.innerText = sum.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  return sum;
}

function editReceipt(id) {
  const item = (window.receipts || []).find(r => r.id === id);
  if (!item) return;

  editingReceiptId = item.id;
  
  const titleEl = document.querySelector('.creator-card h3');
  const submitBtn = document.querySelector('#receiptGeneratorForm button[type="submit"]');
  if (titleEl) titleEl.innerHTML = `Edit Receipt <span style="font-family:var(--font-mono); font-size:12px; color:var(--ink-faint);">(${item.id.toUpperCase()})</span>`;
  if (submitBtn) submitBtn.innerHTML = `<i class="fa-solid fa-save"></i> Update Receipt`;

  if (document.getElementById('rcptName')) document.getElementById('rcptName').value = item.clientName;
  if (document.getElementById('rcptEmail')) document.getElementById('rcptEmail').value = item.clientEmail;
  if (document.getElementById('rcptPhone')) document.getElementById('rcptPhone').value = item.clientPhone === 'N/A' ? '' : item.clientPhone;
  if (document.getElementById('rcptProject')) document.getElementById('rcptProject').value = item.projectTitle;
  if (document.getElementById('rcptStatus')) document.getElementById('rcptStatus').value = item.status;
  if (document.getElementById('rcptAdvance')) document.getElementById('rcptAdvance').value = item.advancePaid || '';

  const itemLinesList = document.getElementById('itemLinesList');
  if (itemLinesList) {
    itemLinesList.innerHTML = '';
    if (item.lineItems && item.lineItems.length > 0) {
      item.lineItems.forEach(line => {
        const row = document.createElement('div');
        row.className = 'item-row';
        row.innerHTML = `
          <input type="text" placeholder="Task Name (e.g. E-Commerce setup)" required class="line-name-input" value="${line.taskName}">
          <input type="number" placeholder="Cost (₹)" required min="0" class="line-cost-input" value="${line.taskCost}">
          <button type="button" class="remove-row-btn" onclick="removeRow(this)">&times;</button>
        `;
        itemLinesList.appendChild(row);
      });
    } else {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML = `
        <input type="text" placeholder="Task Name (e.g. UX UI Design)" required class="line-name-input">
        <input type="number" placeholder="Cost (₹)" required min="0" class="line-cost-input">
        <button type="button" class="remove-row-btn" onclick="removeRow(this)">&times;</button>
      `;
      itemLinesList.appendChild(row);
    }
  }

  updateTotalSum();
  attachInputListeners();
  
  const creatorCard = document.querySelector('.creator-card');
  if (creatorCard) creatorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
window.editReceipt = editReceipt;

document.addEventListener('DOMContentLoaded', () => {
  const itemLinesList = document.getElementById('itemLinesList');
  const addLineItemBtn = document.getElementById('addLineItemBtn');
  const receiptForm = document.getElementById('receiptGeneratorForm');
  const closeReceiptBtn = document.getElementById('closeReceiptBtn');

  if (addLineItemBtn && itemLinesList) {
    addLineItemBtn.addEventListener('click', () => {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML = `
        <input type="text" placeholder="Task Name (e.g. E-Commerce setup)" required class="line-name-input">
        <input type="number" placeholder="Cost (₹)" required min="0" class="line-cost-input">
        <button type="button" class="remove-row-btn" onclick="removeRow(this)">&times;</button>
      `;
      itemLinesList.appendChild(row);
      updateTotalSum();
      attachInputListeners();
    });
  }

  if (itemLinesList) {
    attachInputListeners();
  }

  if (receiptForm) {
    receiptForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const totalAmount = updateTotalSum();
      if (totalAmount <= 0) {
        showToast('Validation Error', 'Total billing cost must be greater than 0.', 'error');
        return;
      }

      const lines = [];
      const rows = itemLinesList.querySelectorAll('.item-row');
      rows.forEach(row => {
        const taskName = row.querySelector('.line-name-input').value.trim();
        const taskCost = Number(row.querySelector('.line-cost-input').value) || 0;
        lines.push({ taskName, taskCost });
      });

      const dateVal = document.getElementById('rcptDate') ? document.getElementById('rcptDate').value : '';
      const receiptDate = dateVal ? new Date(dateVal).toISOString() : new Date().toISOString();

      const payload = {
        clientName: document.getElementById('rcptName').value.trim(),
        clientEmail: document.getElementById('rcptEmail').value.trim(),
        clientPhone: document.getElementById('rcptPhone').value.trim() || 'N/A',
        projectTitle: document.getElementById('rcptProject').value.trim(),
        status: document.getElementById('rcptStatus').value,
        advancePaid: Number(document.getElementById('rcptAdvance').value) || 0,
        date: receiptDate,
        total: totalAmount,
        lineItems: lines,
        sendEmail: document.getElementById('rcptSendEmail') ? document.getElementById('rcptSendEmail').checked : false
      };

      if (editingReceiptId) {
        payload.id = editingReceiptId;
      }

      try {
        const res = await fetch(window.getApiUrl('/api/receipts/create'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          showToast('Receipt Saved', editingReceiptId ? 'Billing Receipt updated successfully!' : 'Billing Receipt created successfully!', 'success');
          receiptForm.reset();
          if (document.getElementById('rcptSendEmail')) document.getElementById('rcptSendEmail').checked = false;
          editingReceiptId = null;
          
          const creatorTitle = document.querySelector('.creator-card h3');
          const submitBtn = document.querySelector('#receiptGeneratorForm button[type="submit"]');
          if (creatorTitle) creatorTitle.innerText = 'Manual Receipt Builder';
          if (submitBtn) submitBtn.innerHTML = `<i class="fa-solid fa-save"></i> Save &amp; Generate`;

          if (itemLinesList) {
            itemLinesList.innerHTML = `
              <div class="item-row">
                <input type="text" placeholder="Task Name (e.g. UX UI Design)" required class="line-name-input">
                <input type="number" placeholder="Cost (₹)" required min="0" class="line-cost-input">
                <button type="button" class="remove-row-btn" onclick="removeRow(this)">&times;</button>
              </div>
            `;
          }
          updateTotalSum();
          attachInputListeners();
          if (window.syncAllDatabases) {
            window.syncAllDatabases();
          }
        } else {
          showToast('Failed to Save', 'Failed to save receipt. Check form fields.', 'error');
        }
      } catch (err) {
        console.error(err);
        showToast('Connection Error', 'Server API connection error occurred.', 'error');
      }
    });
  }

  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener('click', () => {
      const modal = document.getElementById('receiptModal');
      if (modal) modal.classList.remove('show');
    });
  }
});
