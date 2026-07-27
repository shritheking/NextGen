// ========================================================
// NextGen Web Studio - Client Management & Portal Registry
// ========================================================

// 1. Client Modal State Variable
window.currentWorkspaceEmail = '';

// 2. Fetch & Render Clients List
async function fetchApprovedUsers() {
  try {
    const res = await fetch(window.getApiUrl('/api/approved-users?_t=' + Date.now()));
    if (!res.ok) throw new Error();
    window.approvedUsers = await res.json(); var approvedUsers = window.approvedUsers;
    renderApprovedUsers(approvedUsers);
  } catch (err) {
    console.warn('Approved users fetch failed');
    window.approvedUsers = []; var approvedUsers = window.approvedUsers;
    renderApprovedUsers([]);
  }
}
window.fetchApprovedUsers = fetchApprovedUsers;

function renderApprovedUsers(list) {
  const tbody = document.getElementById('approvedUsersTableBody');
  const countEl = document.getElementById('approvedUsersCount');
  if (countEl) countEl.innerText = `${list.length} clients found`;
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align:center; padding: 30px; color:var(--ink-soft);">
          <i class="fa-solid fa-user-slash" style="font-size:24px; margin-bottom:10px; display:block;"></i>
          No client accounts approved yet. Start a project or manually approve an email to authorize access.
        </td>
      </tr>
    `;
    return;
  }

  const sorted = [...list].sort((a,b) => new Date(b.created) - new Date(a.created));

  sorted.forEach(item => {
    const tr = document.createElement('tr');
    const names = (item.name || 'Approved Client').split(' ');
    const initials = names.map(n => n[0]).join('').substring(0, 2);
    
    // Dynamic avatar colors
    const colors = ['#E0FF4F', '#4ADE80', '#3B82F6', '#F59E0B', '#A78BFA', '#F472B6'];
    const avatarBg = colors[Math.abs(item.email.split('').reduce((s, c) => s + c.charCodeAt(0), 0)) % colors.length];
    const avatarColor = avatarBg === '#E0FF4F' || avatarBg === '#4ADE80' ? '#0A0A0A' : '#FFFFFF';
    
    // Find active project
    const clientProjects = (window.projects || []).filter(p => p.email && p.email.toLowerCase() === item.email.toLowerCase());
    const activeProj = clientProjects.find(p => p.status !== 'Completed' && p.status !== 'Cancelled') || clientProjects[0];
    
    let projName = 'None';
    let progress = 0;
    let projStatus = 'N/A';
    let devName = 'Unassigned';
    let progressHtml = `<span style="color:var(--ink-soft); font-size:12px;">N/A</span>`;
    let statusClass = 'pending';

    if (activeProj) {
      projName = activeProj.name || activeProj.projectType || 'Custom Project';
      progress = Number(activeProj.progress) || 0;
      projStatus = activeProj.status || 'Pending';
      statusClass = projStatus.toLowerCase().replace(' ', '-');
      
      if (activeProj.developerId) {
        const dev = (window.developers || []).find(d => d.id === activeProj.developerId);
        devName = dev ? dev.name : activeProj.developerId;
      } else if (activeProj.developer) {
        devName = activeProj.developer;
      }
      
      progressHtml = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:11.5px; font-family:var(--font-mono); width:32px;">${progress}%</span>
          <div style="flex:1; width:60px; height:6px; background:var(--border); border-radius:3px; overflow:hidden;">
            <div style="width:${progress}%; height:100%; background:var(--accent);"></div>
          </div>
        </div>
      `;
    }

    // Calculate pending payments
    const clientReceipts = (window.receipts || []).filter(r => r.clientEmail && r.clientEmail.toLowerCase() === item.email.toLowerCase());
    const pendingSum = clientReceipts.filter(r => r.status !== 'Paid').reduce((s, r) => s + Number(r.total || r.totalAmount || 0), 0);
    const paymentText = pendingSum > 0 ? `&#8377;${pendingSum.toLocaleString('en-IN')} Pending` : `&#8377;0 Paid`;
    const paymentColor = pendingSum > 0 ? 'var(--accent)' : '#4ADE80';

    // Formatting date
    const updatedDate = activeProj && activeProj.date ? activeProj.date : (item.created ? new Date(item.created).toLocaleDateString() : 'Just now');

    // Compute access badges
    let accessBadges = '';
    if (item.status === 'Suspended') {
      accessBadges += ` <span style="background:rgba(239,68,68,.15); color:#EF4444; border:1px solid rgba(239,68,68,.3); font-size:10px; padding:1px 4px; border-radius:3px; font-family:var(--font-mono); font-weight:600; text-transform:uppercase; margin-left:4px;">Suspended</span>`;
    }
    if (item.portalEnabled === false || item.portalEnabled === 'false') {
      accessBadges += ` <span style="background:rgba(245,158,11,.15); color:#F59E0B; border:1px solid rgba(245,158,11,.3); font-size:10px; padding:1px 4px; border-radius:3px; font-family:var(--font-mono); font-weight:600; text-transform:uppercase; margin-left:4px;">Portal Off</span>`;
    }
    if (item.approved === false || item.approved === 'false') {
      accessBadges += ` <span style="background:rgba(59,130,246,.15); color:#3B82F6; border:1px solid rgba(59,130,246,.3); font-size:10px; padding:1px 4px; border-radius:3px; font-family:var(--font-mono); font-weight:600; text-transform:uppercase; margin-left:4px;">Unapproved</span>`;
    }

    tr.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:36px; height:36px; border-radius:50%; background:${avatarBg}; color:${avatarColor}; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); font-size:13px; font-weight:700; text-transform:uppercase; flex-shrink:0;">
            ${initials}
          </div>
          <div>
            <div class="col-name" style="font-weight:600; display:flex; align-items:center; flex-wrap:wrap; gap:4px;">${item.name || 'Approved Client'}${accessBadges}</div>
            <div style="font-size:11.5px; color:var(--ink-faint); font-family:var(--font-mono);">${item.email}</div>
          </div>
        </div>
      </td>
      <td style="font-size:12.5px; color:var(--ink);">${item.company || 'No Company'}</td>
      <td style="font-size:12.5px; color:var(--ink-soft); max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${projName}</td>
      <td>${progressHtml}</td>
      <td style="font-family:var(--font-mono); font-size:12.5px; color:${paymentColor}; font-weight:600;">${paymentText}</td>
      <td>
        <span class="status-badge ${statusClass}">${projStatus}</span>
      </td>
      <td style="font-size:12.5px; color:var(--ink-soft);">${devName}</td>
      <td style="font-size:11.5px; color:var(--ink-faint); font-family:var(--font-mono);">${updatedDate}</td>
      <td>
        <div style="display:flex; gap:6px; align-items:center;">
          <button class="action-btn" style="font-size:11.5px; height:26px; padding:0 8px; display:inline-flex; align-items:center; gap:4px; background-color:var(--bg-alt); color:var(--ink); border:1px solid var(--border); border-radius:4px; cursor:pointer;" onclick="openClientProfileModal('${item.email}')">
            <i class="fa-solid fa-folder-open"></i> Profile
          </button>
          <button class="action-btn btn-delete" title="Revoke Access" onclick="deleteApprovedUser('${item.email}')" style="height:26px; width:26px; padding:0; display:inline-flex; align-items:center; justify-content:center; border-radius:4px; margin-top:0 !important;">
            <i class="fa-solid fa-user-minus"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
window.renderApprovedUsers = renderApprovedUsers;

// 3. Add Client (Approved Users / Access Registry Form)
async function handleAddApprovedUser(e) {
  e.preventDefault();
  const email = document.getElementById('newUserEmail').value.trim();
  const name = document.getElementById('newUserName').value.trim();
  const company = document.getElementById('newUserCompany').value.trim();
  const phone = document.getElementById('newUserPhone').value.trim();
  const gst = document.getElementById('newUserGst').value.trim();
  const address = document.getElementById('newUserAddress').value.trim();
  const notes = document.getElementById('newUserNotes').value.trim();
  
  const projectName = document.getElementById('newUserProjectName').value.trim();
  const budget = document.getElementById('newUserProjectBudget').value.trim();
  const projectType = document.getElementById('newUserProjectType').value.trim();
  const portalEnabled = document.getElementById('newUserPortalEnabled').value;
  
  try {
    const res = await fetch(window.getApiUrl('/api/approved-users/add'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, name, company, phone, gst, address, notes,
        projectName, budget, projectType, portalEnabled
      })
    });
    if (res.ok) {
      showToast('Client Profile Created', 'Client successfully authorized and profile created!', 'success');
      const form = document.getElementById('addApprovedUserForm');
      if (form) form.reset();
      fetchApprovedUsers();
    } else {
      showToast('Failed to Add', 'Could not add email to access registry.', 'error');
    }
  } catch (err) {
    console.error(err);
    showToast('Connection Error', 'Could not connect to access registry API.', 'error');
  }
}
window.handleAddApprovedUser = handleAddApprovedUser;

// 4. Delete Client (Revoke Access Registry)
async function deleteApprovedUser(email) {
  showConfirmModal(`Permanently revoke portal access for client email: ${email}?`, async () => {
    try {
      const res = await fetch(window.getApiUrl('/api/approved-users/delete'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        showToast('Access Revoked', 'Client email removed from approved registry.', 'success');
        fetchApprovedUsers();
      } else {
        showToast('Error', 'Failed to revoke access.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection Error', 'Failed to communicate with access API.', 'error');
    }
  });
}
window.deleteApprovedUser = deleteApprovedUser;

// 5. Client Profile Workspace Modal Controllers
async function openClientProfileModal(email) {
  window.currentWorkspaceEmail = email;
  const client = (window.approvedUsers || []).find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!client) return;

  const el = id => document.getElementById(id);
  
  // Initials for avatar
  const names = (client.name || 'Approved Client').split(' ');
  const initials = names.map(n => n[0]).join('').substring(0, 2);
  const avatar = el('profileAvatar');
  const profName = el('profileName');
  const profComp = el('profileCompany');
  if (avatar) avatar.innerText = initials;
  if (profName) profName.innerText = client.name || 'Approved Client';
  if (profComp) profComp.innerText = client.company || 'No Company Details';

  const editEmail = el('editProfileEmail');
  const editName = el('editProfileName');
  const editComp = el('editProfileCompany');
  const editPhone = el('editProfilePhone');
  const editGst = el('editProfileGst');
  const editAddr = el('editProfileAddress');
  const editNotes = el('editProfileNotes');

  if (editEmail) editEmail.value = client.email;
  if (editName) editName.value = client.name || '';
  if (editComp) editComp.value = client.company || '';
  if (editPhone) editPhone.value = client.phone || '';
  if (editGst) editGst.value = client.gst || '';
  if (editAddr) editAddr.value = client.address || '';
  if (editNotes) editNotes.value = client.notes || '';

  // Populate access settings controls
  const sSel = id => document.getElementById(id);
  if (sSel('controlClientStatus')) {
    sSel('controlClientStatus').value = client.status || 'Active';
  }
  if (sSel('controlPortalEnabled')) {
    sSel('controlPortalEnabled').value = (client.portalEnabled === false || client.portalEnabled === 'false') ? 'false' : 'true';
  }
  if (sSel('controlGoogleLogin')) {
    sSel('controlGoogleLogin').value = (client.approved === false || client.approved === 'false') ? 'false' : 'true';
  }

  await loadDevelopers();
  loadRoadmapProjectDropdown();
  renderWorkspaceProjects();
  renderWorkspaceInvoices();
  renderWorkspacePayments();
  renderPaymentSummary();
  
  switchProfileTab('details');
  const modal = el('clientProfileModal');
  if (modal) modal.classList.add('show');
}
window.openClientProfileModal = openClientProfileModal;

function closeClientProfileModal() {
  const modal = document.getElementById('clientProfileModal');
  if (modal) modal.classList.remove('show');
}
window.closeClientProfileModal = closeClientProfileModal;

// 6. Update Client Profile Info Settings Details (Workspace Details Form)
async function saveClientProfileDetails() {
  const email = document.getElementById('editProfileEmail').value.trim();
  const name = document.getElementById('editProfileName').value.trim();
  const company = document.getElementById('editProfileCompany').value.trim();
  const phone = document.getElementById('editProfilePhone').value.trim();
  const gst = document.getElementById('editProfileGst').value.trim();
  const address = document.getElementById('editProfileAddress').value.trim();
  const notes = document.getElementById('editProfileNotes').value.trim();

  if (!email || !name) {
    showToast('Required Fields', 'Client email and name are required.', 'warning');
    return;
  }

  try {
    const res = await fetch(window.getApiUrl('/api/approved-users/update'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, company, phone, gst, address, notes })
    });
    if (res.ok) {
      showToast('Profile Saved', 'Client details updated successfully and synced!', 'success');
      await fetchApprovedUsers();
      // Re-populate modal header
      const profName = document.getElementById('profileName');
      const profComp = document.getElementById('profileCompany');
      if (profName) profName.innerText = name;
      if (profComp) profComp.innerText = company || 'No Company Details';
    } else {
      showToast('Error', 'Failed to save profile changes.', 'error');
    }
  } catch (err) {
    console.error(err);
    showToast('Error', 'Connection failed.', 'error');
  }
}
window.saveClientProfileDetails = saveClientProfileDetails;

// 7. Update Portal Toggles Settings Switches
async function updateClientAccessSetting(field, val) {
  const email = window.currentWorkspaceEmail;
  if (!email) return;

  const payload = { email };
  payload[field] = val;

  try {
    const res = await fetch(window.getApiUrl('/api/approved-users/update'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast('Updated', `Client portal setting for ${field} updated successfully to ${val}.`, 'success');
      await fetchApprovedUsers();
    } else {
      showToast('Error', 'Failed to update access setting.', 'error');
    }
  } catch (e) {
    showToast('Error', 'Connection failed.', 'error');
  }
}
window.updateClientAccessSetting = updateClientAccessSetting;

// 8. Reset Portal Active Sessions (Log out Client)
async function resetClientPortalSession() {
  const email = window.currentWorkspaceEmail;
  if (!confirm(`Are you sure you want to reset all active portal sessions for ${email}?`)) return;

  try {
    const res = await fetch(window.getApiUrl('/api/approved-users/reset-portal'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) {
      const data = await res.json();
      showToast('Reset Complete', data.message || 'All portal sessions have been reset.', 'success');
    } else {
      showToast('Error', 'Failed to reset sessions.', 'error');
    }
  } catch (e) {
    showToast('Error', 'Connection failed.', 'error');
  }
}
window.resetClientPortalSession = resetClientPortalSession;

// 9. Admin Notes Tab CRUD
async function loadPrivateNotes() {
  const container = document.getElementById('privateNotesContainer');
  if (!container) return;
  container.innerHTML = '';

  try {
    const res = await fetch(window.getApiUrl('/api/client-notes?_t=' + Date.now()));
    if (res.ok) {
      const allNotes = await res.json();
      const list = allNotes.filter(n => n.userId && n.userId.toLowerCase() === window.currentWorkspaceEmail.toLowerCase());
      
      if (list.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ink-soft); font-size:12.5px;">No private admin notes. Add a note below.</div>`;
        return;
      }

      list.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

      container.innerHTML = list.map(n => {
        const d = new Date(n.createdAt);
        const timeStr = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `
          <div style="background:var(--bg-alt); border:1px solid var(--border); padding:10px 14px; border-radius:4px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:start;">
            <div style="flex:1;">
              <div style="font-size:12.5px; color:var(--ink); line-height:1.4;">${n.note}</div>
              <div style="font-size:10.5px; color:var(--ink-faint); margin-top:4px; font-family:var(--font-mono);">${timeStr} &bull; By: ${n.createdBy}</div>
            </div>
            <button class="action-btn btn-delete" onclick="deletePrivateNote('${n.id}')" style="height:22px; width:22px; padding:0; display:inline-flex; align-items:center; justify-content:center; margin-left:12px;">
              <i class="fa-solid fa-trash" style="font-size:10.5px;"></i>
            </button>
          </div>
        `;
      }).join('');
    }
  } catch (err) {
    container.innerHTML = `<div>Error loading notes.</div>`;
  }
}
window.loadPrivateNotes = loadPrivateNotes;

async function savePrivateNote() {
  const noteEl = document.getElementById('newPrivateNoteText');
  if (!noteEl) return;
  const note = noteEl.value.trim();
  const userId = window.currentWorkspaceEmail;

  if (!note || !userId) return;

  try {
    const res = await fetch(window.getApiUrl('/api/client-notes/create'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, note, private: true })
    });
    if (res.ok) {
      noteEl.value = '';
      showToast('Note Saved', 'Private admin note saved successfully.', 'success');
      loadPrivateNotes();
    }
  } catch (err) {
    showToast('Error', 'Failed to save note.', 'error');
  }
}
window.savePrivateNote = savePrivateNote;

async function deletePrivateNote(id) {
  showConfirmModal('Delete this private admin note?', async () => {
    try {
      const res = await fetch(window.getApiUrl('/api/client-notes/delete'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        showToast('Note Deleted', 'Private note has been removed.', 'success');
        loadPrivateNotes();
      }
    } catch (err) {
      showToast('Error', 'Failed to delete note.', 'error');
    }
  });
}
window.deletePrivateNote = deletePrivateNote;

// 10. Bind Search Input Filter
document.addEventListener('DOMContentLoaded', () => {
  const searchAccess = document.getElementById('searchAccessInput');
  if (searchAccess) {
    searchAccess.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = (window.approvedUsers || []).filter(item => 
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q))
      );
      renderApprovedUsers(filtered);
    });
  }
});

// 11. Direct Client Access Actions
function loginAsClientDirect() {
  if (!window.currentWorkspaceEmail) return;
  const client = (window.approvedUsers || []).find(u => u.email.toLowerCase() === window.currentWorkspaceEmail.toLowerCase());
  if (!client) return;

  // Set simulation variables
  localStorage.setItem('clientAuth', 'true');
  localStorage.setItem('clientEmail', client.email);
  localStorage.setItem('clientName', client.name || 'Client');
  
  // Add simulated activity audit
  fetch(window.getApiUrl('/api/activity-logs/create'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: client.email,
      action: 'Client Logged In',
      description: 'Simulated client portal access via Admin Dashboard.',
      entity: 'users',
      entityId: client.email
    })
  });

  showToast('Launching Session', `Redirecting to portal as ${client.name}...`, 'success');
  window.open('/client.html', '_blank');
}
window.loginAsClientDirect = loginAsClientDirect;

function revokeClientAccessDirect() {
  if (!window.currentWorkspaceEmail) return;
  if (window.closeClientProfileModal) {
    window.closeClientProfileModal();
  }
  if (window.deleteApprovedUser) {
    window.deleteApprovedUser(window.currentWorkspaceEmail);
  }
}
window.revokeClientAccessDirect = revokeClientAccessDirect;

// Direct Notification Dispatcher
function openSendNotificationModal() {
  const modal = document.getElementById('sendNotifModal');
  if (modal) modal.classList.add('show');
}
window.openSendNotificationModal = openSendNotificationModal;

function closeSendNotificationModal() {
  const modal = document.getElementById('sendNotifModal');
  if (modal) {
    modal.classList.remove('remove');
    modal.classList.remove('show');
  }
}
window.closeSendNotificationModal = closeSendNotificationModal;

async function submitWorkspaceNotification() {
  const title = document.getElementById('notifTitle').value.trim();
  const message = document.getElementById('notifMessage').value.trim();
  const type = document.getElementById('notifType').value;
  const priority = document.getElementById('notifPriority').value;
  const userId = window.currentWorkspaceEmail;

  if (!title || !userId) {
    showToast('Required Fields', 'Notification title is required.', 'warning');
    return;
  }

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';

  try {
    const res = await fetch(window.getApiUrl('/api/notifications/create'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, title, message, type, priority, icon })
    });
    if (res.ok) {
      showToast('Alert Sent', 'Notification dispatched to client portal dashboard.', 'success');
      closeSendNotificationModal();
    }
  } catch (e) {
    showToast('Error', 'Failed to dispatch alert notification.', 'error');
  }
}
window.submitWorkspaceNotification = submitWorkspaceNotification;


