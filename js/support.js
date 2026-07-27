// ========================================================
// NextGen Web Studio - Support Tickets Module
// ========================================================

let supportTickets = [];
window.supportTickets = supportTickets;

async function fetchSupportTickets() {
  try {
    const res = await fetch(window.getApiUrl('/api/support-tickets?_t=' + Date.now()));
    if (!res.ok) throw new Error();
    supportTickets = await res.json();
    window.supportTickets = supportTickets;
    renderSupportTickets(supportTickets);
  } catch (err) { console.warn('Support tickets fetch failed', err); }
}
window.fetchSupportTickets = fetchSupportTickets;

function renderSupportTickets(list) {
  const container = document.getElementById('ticketList');
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = `<div style="padding:30px 20px; text-align:center; color:var(--ink-soft);"><i class="fa-solid fa-check-circle" style="font-size:28px; color:#4ADE80; margin-bottom:10px; display:block;"></i>No open tickets. All clear!</div>`;
    return;
  }
  container.innerHTML = '';
  list.sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(ticket => {
    const priorityColor = ticket.priority === 'high' ? '#EF4444' : ticket.priority === 'med' ? '#F59E0B' : '#3B82F6';
    const statusColor   = ticket.status === 'Resolved' ? '#4ADE80' : ticket.status === 'In Review' ? '#3B82F6' : '#F59E0B';
    const ageStr = ticket.date ? new Date(ticket.date).toLocaleDateString('en-IN', { day:'2-digit', month:'short' }) : '';
    const row = document.createElement('div');
    row.className = 'ticket-row';
    row.innerHTML = `
      <div class="ticket-priority-dot" style="background:${priorityColor};"></div>
      <div class="ticket-info">
        <div class="ticket-subject">#${ticket.ticketNumber || '000'} &mdash; ${ticket.subject}</div>
        <div class="ticket-meta">${ticket.clientEmail || 'N/A'} &bull; ${ticket.category || 'General'} &bull; ${ageStr}</div>
      </div>
      <span class="ticket-badge" style="color:${priorityColor}; border-color:${priorityColor}33;">${ticket.priority || 'Low'}</span>
      <span class="ticket-badge" style="color:${statusColor}; border-color:${statusColor}33;">${ticket.status}</span>
      <div class="action-group">
        <button class="action-btn" title="Mark Resolved" onclick="resolveTicket('${ticket.id}')"><i class="fa-solid fa-check"></i></button>
        <button class="action-btn btn-delete" title="Delete" onclick="deleteTicket('${ticket.id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    container.appendChild(row);
  });
}
window.renderSupportTickets = renderSupportTickets;

async function resolveTicket(id) {
  try {
    await fetch(window.getApiUrl('/api/support-tickets/update'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'Resolved' })
    });
    showToast('Ticket Resolved', 'Marked as resolved!', 'success');
    fetchSupportTickets();
  } catch (err) { console.error(err); }
}
window.resolveTicket = resolveTicket;

async function deleteTicket(id) {
  showConfirmModal('Delete this support ticket?', async () => {
    await fetch(window.getApiUrl('/api/support-tickets/delete'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchSupportTickets();
  });
}
window.deleteTicket = deleteTicket;

async function addSupportTicket() {
  const subject = document.getElementById('ticketSubject').value.trim();
  const clientEmail = document.getElementById('ticketEmail').value.trim();
  const category = document.getElementById('ticketCategory').value;
  const priority = document.getElementById('ticketPriority').value;
  const message = document.getElementById('ticketMessage').value.trim();
  if (!subject) { showToast('Error', 'Subject required', 'error'); return; }
  try {
    const res = await fetch(window.getApiUrl('/api/support-tickets/create'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, clientEmail, category, priority, message })
    });
    if (res.ok) {
      showToast('Ticket Created', subject, 'success');
      const form = document.getElementById('ticketAddForm');
      if (form) form.style.display = 'none';
      fetchSupportTickets();
    } else { showToast('Error', 'Failed to create ticket', 'error'); }
  } catch (err) { showToast('Error', 'Connection failed', 'error'); }
}
window.addSupportTicket = addSupportTicket;

// Workspace: Load tickets for a specific client in the profile modal
window.activeSupportTicketId = '';

async function loadWorkspaceTickets() {
  const container = document.getElementById('workspaceTicketList');
  if (!container) return;
  container.innerHTML = '';

  try {
    const res = await fetch(window.getApiUrl('/api/support-tickets?_t=' + Date.now()));
    if (!res.ok) throw new Error();
    const allTickets = await res.json();
    const list = allTickets.filter(t => t.clientEmail && t.clientEmail.toLowerCase() === window.currentWorkspaceEmail.toLowerCase());

    if (list.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:24px; color:var(--ink-soft);"><i class="fa-solid fa-check-circle" style="font-size:24px; color:#4ADE80; display:block; margin-bottom:10px;"></i>No tickets from this client.</div>`;
      return;
    }

    list.sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(ticket => {
      const priorityColor = ticket.priority === 'high' ? '#EF4444' : ticket.priority === 'med' ? '#F59E0B' : '#3B82F6';
      const statusColor = ticket.status === 'Resolved' ? '#4ADE80' : '#F59E0B';
      const div = document.createElement('div');
      div.className = 'ticket-row';
      div.style.cursor = 'pointer';
      div.onclick = () => openWorkspaceTicketReply(ticket.id);
      div.innerHTML = `
        <div class="ticket-priority-dot" style="background:${priorityColor};"></div>
        <div class="ticket-info" style="flex:1;">
          <div class="ticket-subject">#${ticket.ticketNumber || ticket.id.substring(0,6)} â€” ${ticket.subject}</div>
          <div class="ticket-meta">${ticket.category || 'General'} &bull; ${ticket.date ? new Date(ticket.date).toLocaleDateString() : ''}</div>
        </div>
        <span class="ticket-badge" style="color:${statusColor}; border-color:${statusColor}33;">${ticket.status}</span>
        <div class="action-group">
          ${ticket.status !== 'Resolved' ? `<button class="action-btn" onclick="event.stopPropagation(); resolveTicket('${ticket.id}'); loadWorkspaceTickets();"><i class="fa-solid fa-check"></i></button>` : ''}
          <button class="action-btn btn-delete" onclick="event.stopPropagation(); deleteTicket('${ticket.id}'); loadWorkspaceTickets();"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = `<div style="padding:20px; color:var(--ink-soft);">Error loading tickets.</div>`;
  }
}
window.loadWorkspaceTickets = loadWorkspaceTickets;

async function openWorkspaceTicketReply(ticketId) {
  window.activeSupportTicketId = ticketId;
  const modal = document.getElementById('ticketReplyModal');
  if (modal) modal.classList.add('show');

  const res = await fetch(window.getApiUrl('/api/support-tickets?_t=' + Date.now()));
  if (!res.ok) return;
  const all = await res.json();
  const ticket = all.find(t => t.id === ticketId);
  if (!ticket) return;

  const subjectEl = document.getElementById('ticketReplySubject');
  const historyEl = document.getElementById('ticketReplyHistory');
  if (subjectEl) subjectEl.innerText = ticket.subject;
  if (!historyEl) return;

  const replies = ticket.replies || [];
  historyEl.innerHTML = `
    <div style="background:var(--bg-alt); border:1px solid var(--border); border-radius:6px; padding:10px 14px; margin-bottom:10px;">
      <div style="font-size:10px; color:var(--ink-faint); font-family:var(--font-mono); font-weight:700; text-transform:uppercase; margin-bottom:4px;">Original Message</div>
      <div style="font-size:13px; color:var(--ink);">${ticket.message || 'No message body.'}</div>
    </div>
    ${replies.map(r => `
      <div style="background:${r.sender === 'admin' ? 'rgba(224,255,79,0.06)' : 'var(--bg)'}; border:1px solid var(--border); border-radius:6px; padding:10px 14px; margin-bottom:8px;">
        <div style="font-size:10px; font-family:var(--font-mono); font-weight:700; color:${r.sender === 'admin' ? 'var(--accent)' : 'var(--ink-soft)'}; text-transform:uppercase; margin-bottom:4px;">${r.sender === 'admin' ? 'Admin' : 'Client'}</div>
        <div style="font-size:13px; color:var(--ink);">${r.text}</div>
        <div style="font-size:10px; color:var(--ink-faint); margin-top:4px; font-family:var(--font-mono);">${new Date(r.date).toLocaleString()}</div>
      </div>
    `).join('')}
  `;
}
window.openWorkspaceTicketReply = openWorkspaceTicketReply;

async function sendTicketReply() {
  const replyText = document.getElementById('ticketReplyText') ? document.getElementById('ticketReplyText').value.trim() : '';
  if (!replyText || !window.activeSupportTicketId) return;

  try {
    const res = await fetch(window.getApiUrl('/api/support-tickets/reply'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: window.activeSupportTicketId, text: replyText, sender: 'admin' })
    });
    if (res.ok) {
      showToast('Reply Sent', 'Admin reply appended to ticket.', 'success');
      document.getElementById('ticketReplyText').value = '';
      openWorkspaceTicketReply(window.activeSupportTicketId);
    } else {
      showToast('Error', 'Failed to append reply.', 'error');
    }
  } catch (err) {
    showToast('Error', 'Failed to append reply.', 'error');
  }
}
window.sendTicketReply = sendTicketReply;

function selectWorkspaceTicket(t) {
  window.activeSupportTicketId = t.id;
  const noTicket = document.getElementById('noTicketSelected');
  const ticketEditor = document.getElementById('supportTicketEditor');
  if (noTicket) noTicket.style.display = 'none';
  if (ticketEditor) ticketEditor.style.display = 'block';

  if (document.getElementById('ticketEditorHeader')) {
    document.getElementById('ticketEditorHeader').innerText = `TICKET #${t.ticketNumber || t.id.substring(0,6)} : ${t.subject}`;
  }
  if (document.getElementById('editTicketPriority')) document.getElementById('editTicketPriority').value = t.priority || 'low';
  if (document.getElementById('editTicketStatus')) document.getElementById('editTicketStatus').value = t.status || 'Open';
  if (document.getElementById('editTicketAssignee')) document.getElementById('editTicketAssignee').value = t.assignedTo || '';
  if (document.getElementById('editTicketInternalNotes')) document.getElementById('editTicketInternalNotes').value = t.internalNotes || '';
  if (document.getElementById('ticketReplyText')) document.getElementById('ticketReplyText').value = '';
}
window.selectWorkspaceTicket = selectWorkspaceTicket;

async function updateTicketField(field) {
  if (!window.activeSupportTicketId) return;
  
  const ticketId = window.activeSupportTicketId;
  const el = id => document.getElementById(id);
  
  const updatedData = {
    id: ticketId,
    priority: el('editTicketPriority') ? el('editTicketPriority').value : 'low',
    status: el('editTicketStatus') ? el('editTicketStatus').value : 'Open',
    assignedTo: el('editTicketAssignee') ? el('editTicketAssignee').value : '',
    internalNotes: el('editTicketInternalNotes') ? el('editTicketInternalNotes').value : ''
  };

  try {
    const res = await fetch(window.getApiUrl('/api/support-tickets/update'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (res.ok) {
      showToast('Updated', 'Ticket details successfully updated.', 'success');
      if (window.loadWorkspaceTickets) {
        window.loadWorkspaceTickets();
      }
    }
  } catch (e) {
    showToast('Error', 'Failed to update ticket parameters.', 'error');
  }
}
window.updateTicketField = updateTicketField;

