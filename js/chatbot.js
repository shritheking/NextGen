// ========================================================
// NextGen Web Studio - Chatbot Console Module
// ========================================================

let chatbotMessages = [];
let activeChatEmail = '';
let chatHistoryPollInterval = null;

async function fetchChatbotMessages() {
  try {
    const res = await fetch(window.getApiUrl('/api/chatbot/messages?_t=' + Date.now()));
    if (!res.ok) throw new Error();
    const data = await res.json();

    // Notification dot indicator
    const hasUnread = data.some(m => !m.read);
    const dot = document.getElementById('chatNotificationDot');
    if (dot) dot.style.display = hasUnread ? 'inline-block' : 'none';

    // Auto-mark read if chatbot tab is active
    const activeTab = document.querySelector('.sidebar-menu li.active');
    const isViewingChat = activeTab && activeTab.getAttribute('data-tab') === 'chatbotTab';
    if (isViewingChat && data.filter(m => !m.read).length > 0) {
      markAllChatbotMessagesReadSilent();
    }

    chatbotMessages = data;
    window.chatbotMessages = chatbotMessages;
    renderChatbotMessages(chatbotMessages);
  } catch (err) {
    console.warn('Chatbot messages fetch failed', err);
  }
}
window.fetchChatbotMessages = fetchChatbotMessages;

function renderChatbotMessages(list) {
  const tbody = document.getElementById('chatbotMessagesTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--ink-soft);">No chatbot logs recorded yet.</td></tr>`;
    return;
  }

  // Group by email
  const groups = {};
  list.forEach(item => {
    const key = item.email || 'Guest';
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  const groupList = Object.keys(groups).map(email => {
    const messages = groups[email];
    messages.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = messages[0];

    const hasSpeakToAdminFlag = messages.some(m => m.speakToAdmin === true);
    const hasAdminReply = messages.some(m => m.sender === 'admin');
    const hasAdminKeywords = messages.some(m => {
      const txt = (m.text || '').toLowerCase();
      const bot = (m.botResponse || '').toLowerCase();
      return txt.includes('admin') || txt.includes('support') || txt.includes('human') || txt.includes('invoice') || txt.includes('billing') || bot.includes('admin console') || bot.includes('sent directly');
    });

    const shouldShow = hasSpeakToAdminFlag || hasAdminReply || hasAdminKeywords;
    const hasUnread = messages.some(m => !m.read && m.sender === 'client');
    return { email, latestMessage: latest, hasUnread, date: new Date(latest.date), shouldShow };
  }).filter(g => g.shouldShow);

  groupList.sort((a, b) => b.date - a.date);

  groupList.forEach(group => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      openChatReplyModal(group.email);
    });

    const formattedDate = group.date.toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    const latestText = group.latestMessage.text;
    const botResponseText = group.latestMessage.botResponse || (group.latestMessage.sender === 'admin' ? 'Replied' : 'No response');

    const statusCell = group.hasUnread
      ? `<span style="font-size:10px; padding:3px 8px; background-color:rgba(239,68,68,0.2); color:#ef4444; border-radius:10px; font-family:var(--font-mono); font-weight:700;">NEW</span>`
      : `<span style="font-size:10px; padding:3px 8px; background-color:var(--bg-alt); color:var(--ink-soft); border-radius:10px; font-family:var(--font-mono);">READ</span>`;

    const actionsCell = group.email && group.email !== 'Guest'
      ? `<button class="action-btn" onclick="openChatReplyModal('${group.email}')" style="padding:6px 12px; display:inline-flex; align-items:center; gap:6px; font-size:11.5px; font-weight:600; cursor:pointer; border-radius:var(--radius-sm);"><i class="fa-solid fa-reply"></i> Reply</button>`
      : `<span style="color:var(--ink-faint); font-size:11.5px;">N/A</span>`;

    tr.innerHTML = `
      <td><div style="font-weight:600; color:var(--accent);">${group.email}</div></td>
      <td><div style="max-width:320px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${latestText}</div></td>
      <td><div style="max-width:320px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--ink-soft); font-style:italic;">${botResponseText}</div></td>
      <td><div style="font-family:var(--font-mono); font-size:11.5px; color:var(--ink-faint);">${formattedDate}</div></td>
      <td>${statusCell}</td>
      <td>${actionsCell}</td>
    `;
    tbody.appendChild(tr);
  });
}
window.renderChatbotMessages = renderChatbotMessages;

async function fetchActiveChatHistory() {
  if (!activeChatEmail) return;
  try {
    const res = await fetch(window.getApiUrl(`/api/chatbot/messages?email=${encodeURIComponent(activeChatEmail)}&_t=${Date.now()}`));
    if (!res.ok) return;
    const messages = await res.json();
    const sorted = messages.sort((a, b) => new Date(a.date) - new Date(b.date));
    const historyWindow = document.getElementById('chatHistoryWindow');
    if (!historyWindow) return;

    historyWindow.innerHTML = '';
    if (sorted.length === 0) {
      historyWindow.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ink-faint); font-size:13px;">No message logs found for this client.</div>`;
      return;
    }

    sorted.forEach(msg => {
      const div = document.createElement('div');
      const sender = msg.sender || 'client';
      const isAdmin = sender === 'admin';
      const senderLabel = sender === 'admin' ? 'Admin' : (sender === 'bot' ? 'Assistant' : 'Client');
      const timeText = new Date(msg.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

      div.style.alignSelf = isAdmin ? 'flex-end' : 'flex-start';
      div.style.background = isAdmin ? 'rgba(224,255,79,0.08)' : 'rgba(255,255,255,0.04)';
      div.style.border = isAdmin ? '1px solid var(--accent)' : '1px solid var(--border)';
      div.style.padding = '8px 12px';
      div.style.borderRadius = '8px';
      div.style.maxWidth = '80%';
      div.style.fontSize = '13.5px';
      div.style.lineHeight = '1.4';

      div.innerHTML = `
        <div style="font-size:10px; font-weight:700; color:${isAdmin ? 'var(--accent)' : 'var(--ink-soft)'}; margin-bottom:4px; text-transform:uppercase; font-family:var(--font-mono);">${senderLabel}</div>
        <div style="color:var(--ink); white-space:pre-wrap; word-break:break-all;">${msg.text}</div>
        <div style="font-size:9.5px; color:var(--ink-faint); text-align:right; margin-top:4px; font-family:var(--font-mono);">${timeText}</div>
      `;
      historyWindow.appendChild(div);

      // Append bot response if present
      if (msg.botResponse && sender !== 'admin') {
        const botDiv = document.createElement('div');
        botDiv.style.alignSelf = 'flex-start';
        botDiv.style.background = 'rgba(59,130,246,0.06)';
        botDiv.style.border = '1px solid rgba(59,130,246,0.3)';
        botDiv.style.padding = '8px 12px';
        botDiv.style.borderRadius = '8px';
        botDiv.style.maxWidth = '80%';
        botDiv.style.fontSize = '13.5px';
        botDiv.innerHTML = `
          <div style="font-size:10px; font-weight:700; color:#3B82F6; margin-bottom:4px; text-transform:uppercase; font-family:var(--font-mono);">Assistant</div>
          <div style="color:var(--ink); white-space:pre-wrap; word-break:break-all;">${msg.botResponse}</div>
          <div style="font-size:9.5px; color:var(--ink-faint); text-align:right; margin-top:4px; font-family:var(--font-mono);">${timeText}</div>
        `;
        historyWindow.appendChild(botDiv);
      }
    });

    historyWindow.scrollTop = historyWindow.scrollHeight;
  } catch (err) {
    console.error('Failed to fetch active chat history:', err);
  }
}

async function markChatMessagesReadForEmail(email) {
  try {
    await fetch(window.getApiUrl('/api/chatbot/mark-read'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    fetchChatbotMessages();
  } catch (err) { console.error('Failed to mark read for email:', err); }
}

function openChatReplyModal(email) {
  activeChatEmail = email;
  const emailEl = document.getElementById('chatReplyUserEmail');
  const inputEl = document.getElementById('chatReplyInput');
  if (emailEl) emailEl.innerText = email;
  if (inputEl) inputEl.value = '';

  markChatMessagesReadForEmail(email);
  fetchActiveChatHistory();

  const modal = document.getElementById('chatReplyModal');
  if (modal) modal.classList.add('show');

  if (chatHistoryPollInterval) clearInterval(chatHistoryPollInterval);
  chatHistoryPollInterval = setInterval(fetchActiveChatHistory, 2500);
}
window.openChatReplyModal = openChatReplyModal;

function closeChatReplyModal() {
  activeChatEmail = '';
  const modal = document.getElementById('chatReplyModal');
  if (modal) modal.classList.remove('show');
  if (chatHistoryPollInterval) {
    clearInterval(chatHistoryPollInterval);
    chatHistoryPollInterval = null;
  }
}
window.closeChatReplyModal = closeChatReplyModal;

async function sendChatReply(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('chatReplyInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text || !activeChatEmail) return;

  input.value = '';
  try {
    const res = await fetch(window.getApiUrl('/api/chatbot/send'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: activeChatEmail, text, sender: 'admin' })
    });
    if (res.ok) {
      fetchActiveChatHistory();
    } else {
      showToast('Failed to Send', 'Could not save admin response.', 'error');
    }
  } catch (err) {
    showToast('Connection Error', 'Failed to connect to server.', 'error');
  }
}
window.sendChatReply = sendChatReply;

async function markAllChatbotMessagesRead() {
  try {
    await fetch(window.getApiUrl('/api/chatbot/mark-read'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const dot = document.getElementById('chatNotificationDot');
    if (dot) dot.style.display = 'none';
    await fetchChatbotMessages();
    showToast('Success', 'All chatbot messages marked as read.', 'success');
  } catch (err) { console.error('Failed to mark read:', err); }
}
window.markAllChatbotMessagesRead = markAllChatbotMessagesRead;

async function markAllChatbotMessagesReadSilent() {
  try {
    await fetch(window.getApiUrl('/api/chatbot/mark-read'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const dot = document.getElementById('chatNotificationDot');
    if (dot) dot.style.display = 'none';
  } catch (err) { console.error('Failed silent read:', err); }
}
window.markAllChatbotMessagesReadSilent = markAllChatbotMessagesReadSilent;

// Workspace: Load chat messages for specific client in profile modal
async function loadWorkspaceActivity() {
  const listDiv = document.getElementById('profileActivityList');
  if (!listDiv) return;
  listDiv.innerHTML = '';

  try {
    const res = await fetch(window.getApiUrl('/api/activity-logs?_t=' + Date.now()));
    if (res.ok) {
      const logs = await res.json();
      const clientLogs = logs.filter(l => l.userId && l.userId.toLowerCase() === window.currentWorkspaceEmail.toLowerCase());

      if (clientLogs.length === 0) {
        listDiv.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ink-soft); font-size:12.5px;">No operations audits logged yet.</div>`;
        return;
      }

      clientLogs.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

      listDiv.innerHTML = clientLogs.map(l => {
        const date = new Date(l.createdAt);
        const timeText = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let icon = 'fa-circle-check', color = '#4ADE80';
        if (l.action.includes('Invoice') || l.action.includes('Billing')) { icon = 'fa-file-invoice-dollar'; color = 'var(--accent)'; }
        else if (l.action.includes('Roadmap')) { icon = 'fa-route'; color = '#3B82F6'; }
        else if (l.action.includes('Login')) { icon = 'fa-right-to-bracket'; color = '#A78BFA'; }
        else if (l.action.includes('File') || l.action.includes('Asset')) { icon = 'fa-cloud-arrow-up'; color = '#F472B6'; }

        return `
          <div style="display:flex; gap:12px; position:relative; padding-bottom:14px; border-left:2px solid var(--border); margin-left:10px; padding-left:16px;">
            <div style="position:absolute; left:-9px; top:0; width:16px; height:16px; border-radius:50%; background:var(--bg); border:2.5px solid ${color}; display:flex; align-items:center; justify-content:center;"></div>
            <div>
              <div style="font-weight:600; font-size:12.5px; color:var(--ink);"><i class="fa-solid ${icon}" style="color:${color}; margin-right:4px;"></i>${l.action}</div>
              <div style="font-size:12px; color:var(--ink-soft); margin-top:2px;">${l.description || ''}</div>
              <div style="font-size:11px; color:var(--ink-faint); font-family:var(--font-mono); margin-top:4px;">
                <span>${timeText}</span> &bull; <span>IP: ${l.ipAddress || 'unknown'}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  } catch (e) {
    listDiv.innerHTML = `<div>Error loading timeline logs.</div>`;
  }
}
window.loadWorkspaceActivity = loadWorkspaceActivity;

// Workspace: Teamchat messages for a specific client
async function loadTeamchatMessages() {
  const messagesContainer = document.getElementById('teamchatMessages');
  if (!messagesContainer) return;
  messagesContainer.innerHTML = '';

  try {
    const res = await fetch(window.getApiUrl('/api/internal-comments?_t=' + Date.now()));
    if (res.ok) {
      const allComments = await res.json();
      const list = allComments.filter(c => c.userId && c.userId.toLowerCase() === window.currentWorkspaceEmail.toLowerCase());

      if (list.length === 0) {
        messagesContainer.innerHTML = `<div style="text-align:center; padding:30px; color:var(--ink-soft); font-size:12.5px; font-style:italic;">No team comments posted. Leave the first private note!</div>`;
        return;
      }

      list.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));

      messagesContainer.innerHTML = list.map(c => {
        const timeText = new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const initials = c.senderName ? c.senderName.substring(0, 2).toUpperCase() : 'TM';
        const bg = c.senderName === 'Admin' ? 'var(--accent)' : (c.senderName === 'Designer' ? '#F472B6' : '#3B82F6');
        const clr = c.senderName === 'Admin' ? '#0A0A0A' : '#FFFFFF';

        return `
          <div style="display:flex; gap:10px; align-items:start;">
            <div style="width:28px; height:28px; border-radius:50%; background:${bg}; color:${clr}; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size:11px; font-weight:700; flex-shrink:0;">${initials}</div>
            <div style="background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:8px 12px; flex:1;">
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--ink-soft); margin-bottom:4px; font-weight:600;">
                <span>${c.senderName}</span><span>${timeText}</span>
              </div>
              <div style="font-size:12.5px; color:var(--ink); line-height:1.4;">${c.text}</div>
            </div>
          </div>
        `;
      }).join('');

      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  } catch (e) {
    messagesContainer.innerHTML = `<div>Error loading chat history.</div>`;
  }
}
window.loadTeamchatMessages = loadTeamchatMessages;

async function sendTeamchatComment() {
  const input = document.getElementById('teamchatInput');
  const senderName = document.getElementById('teamchatSenderName') ? document.getElementById('teamchatSenderName').value : 'Admin';
  const text = input ? input.value.trim() : '';
  const userId = window.currentWorkspaceEmail;
  if (!text || !userId) return;

  try {
    const res = await fetch(window.getApiUrl('/api/internal-comments/create'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, senderName, text })
    });
    if (res.ok) {
      if (input) input.value = '';
      await loadTeamchatMessages();
    }
  } catch (e) {
    showToast('Error', 'Failed to send comment.', 'error');
  }
}
window.sendTeamchatComment = sendTeamchatComment;

// ---------- EVENT BINDINGS FOR CHATBOT ----------
document.addEventListener('DOMContentLoaded', () => {
  const searchChat = document.getElementById('searchChatInput');
  if (searchChat) {
    searchChat.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = (chatbotMessages || []).filter(item => 
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.text && item.text.toLowerCase().includes(q)) ||
        (item.botResponse && item.botResponse.toLowerCase().includes(q))
      );
      renderChatbotMessages(filtered);
    });
  }

  const markAllChatReadBtn = document.getElementById('markAllChatReadBtn');
  if (markAllChatReadBtn) {
    markAllChatReadBtn.addEventListener('click', markAllChatbotMessagesRead);
  }
});

