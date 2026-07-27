// ========================================================
// NextGen Web Studio - Inquiries & Projects Module  
// Uses window.* globals shared with inline admin script
// ========================================================

// ---------- INQUIRIES ----------
async function fetchInquiries() {
  try {
    const res = await fetch(window.getApiUrl('/api/inquiries?_t=' + Date.now()));
    if (!res.ok) throw new Error();
    window.inquiries = await res.json();
    renderInquiries(window.inquiries);
  } catch (err) {
    console.warn('Inquiries fetch failed');
    renderInquiries([]);
  }
}
window.fetchInquiries = fetchInquiries;

function renderInquiries(list) {
  const tbody = document.getElementById('inquiriesTableBody');
  const empty = document.getElementById('inquiriesEmpty');
  const table = document.getElementById('inquiriesTable');
  const countEl = document.getElementById('inquiriesCount');
  if (countEl) countEl.innerText = `${list.length} enquiries found`;
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
          : 'No general enquiries found.';
      }
    }
    return;
  }
  if (table) table.style.display = 'table';
  if (empty) empty.style.display = 'none';

  list.sort((a,b) => new Date(b.date) - new Date(a.date));
  list.forEach(item => {
    const tr = document.createElement('tr');
    const formattedDate = new Date(item.date).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    const statusClass = item.status === 'Moved' ? 'paid' : (item.status === 'Contacted' ? 'contacted' : 'new');
    const isMoved = item.status === 'Moved';
    const moveBtnMarkup = isMoved
      ? `<button class="action-btn" style="color:#4ADE80; cursor:default;" title="Project Active" disabled><i class="fa-solid fa-circle-check"></i></button>`
      : `<button class="action-btn" style="color:var(--accent);" title="Convert to Project" onclick="moveToProject('${item.id}')"><i class="fa-solid fa-rocket"></i></button>`;

    tr.innerHTML = `
      <td>
        <div class="col-name">${item.name}</div>
        <div style="font-size:11.5px; color:var(--ink-soft);">${item.email}</div>
        <div style="font-size:11.5px; color:var(--ink-soft);">${item.phone || 'No phone'}</div>
      </td>
      <td class="col-message">${item.message}</td>
      <td class="col-date">${formattedDate}</td>
      <td><span class="status-badge ${statusClass}">${item.status || 'New'}</span></td>
      <td>
        <div class="action-group">
          <button class="action-btn" title="View Details" onclick="openDetailsModal('${item.id}', 'inquiry')"><i class="fa-solid fa-receipt"></i></button>
          ${moveBtnMarkup}
          <button class="action-btn" title="Toggle Contact Status" onclick="toggleInquiryStatus('${item.id}')"><i class="fa-solid fa-check-double"></i></button>
          <button class="action-btn btn-delete" title="Delete Inquiry" onclick="deleteInquiry('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
window.renderInquiries = renderInquiries;

async function moveToProject(id) {
  showConfirmModal('Convert this enquiry to an active project? This will enrol their email and authorize portal access.', async () => {
    try {
      const res = await fetch(window.getApiUrl('/api/inquiries/move-to-project'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        showToast('Project Started', 'Lead converted to active project. Credentials sent!', 'success');
        syncAllDatabases();
      } else {
        showToast('Conversion Error', 'Failed to move inquiry to projects list.', 'error');
      }
    } catch (err) {
      showToast('Connection Error', 'Failed to connect to backend API.', 'error');
    }
  });
}
window.moveToProject = moveToProject;

async function toggleInquiryStatus(id) {
  const inquiry = (window.inquiries || []).find(i => i.id === id);
  if (!inquiry) return;
  const newStatus = inquiry.status === 'Contacted' ? 'New' : 'Contacted';
  try {
    const res = await fetch(window.getApiUrl('/api/inquiries/update'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    if (res.ok) syncAllDatabases();
  } catch (err) { console.error(err); }
}
window.toggleInquiryStatus = toggleInquiryStatus;

async function deleteInquiry(id) {
  showConfirmModal('Permanently delete this enquiry lead?', async () => {
    try {
      const res = await fetch(window.getApiUrl('/api/inquiries/delete'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) syncAllDatabases();
    } catch (err) { console.error(err); }
  });
}
window.deleteInquiry = deleteInquiry;

// ---------- PROJECTS ----------
async function fetchProjects() {
  try {
    const res = await fetch(window.getApiUrl('/api/projects?_t=' + Date.now()));
    if (!res.ok) throw new Error();
    window.projects = await res.json();
    renderProjects(window.projects);
  } catch (err) {
    console.warn('Projects fetch failed');
    renderProjects([]);
  }
}
window.fetchProjects = fetchProjects;

function renderProjects(list) {
  const tbody = document.getElementById('projectsTableBody');
  const empty = document.getElementById('projectsEmpty');
  const table = document.getElementById('projectsTable');
  const countEl = document.getElementById('projectsCount');
  if (countEl) countEl.innerText = `${list.length} projects found`;
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
          : 'No project scoping enquiries found.';
      }
    }
    return;
  }
  if (table) table.style.display = 'table';
  if (empty) empty.style.display = 'none';

  list.sort((a,b) => new Date(b.date) - new Date(a.date));
  list.forEach(item => {
    const tr = document.createElement('tr');
    const formattedDate = new Date(item.date).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    const budgetText = item.budget || 'Not Specified';
    const projectTypes = item.projectType ? item.projectType.split(', ') : ['Web Design'];
    const tagsMarkup = projectTypes.map(t => `<span>${t}</span>`).join('');
    const statusClass = item.status === 'Completed' ? 'completed' : (item.status === 'Homepage Created' ? 'contacted' : (item.status === 'Starting Project' ? 'pending' : (item.status === 'New Project' ? 'new' : 'hold')));

    tr.innerHTML = `
      <td>
        <div class="col-name">${item.name}</div>
        <div style="font-size:11.5px; color:var(--ink-soft);">${item.email}</div>
        <div style="font-size:11.5px; color:var(--ink-soft);">${item.phone || 'No phone'}</div>
      </td>
      <td class="col-tags">${tagsMarkup}</td>
      <td style="font-weight:600; color:var(--accent);">${budgetText}</td>
      <td class="col-message">${item.message}</td>
      <td class="col-date">${formattedDate}</td>
      <td><span class="status-badge ${statusClass}">${item.status || 'Not Started'}</span></td>
      <td>
        <div class="action-group">
          <button class="action-btn" title="View Details / Update" onclick="openDetailsModal('${item.id}', 'project')"><i class="fa-solid fa-receipt"></i></button>
          <button class="action-btn btn-delete" title="Delete Project" onclick="deleteProject('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
window.renderProjects = renderProjects;

async function deleteProject(id) {
  showConfirmModal('Permanently delete this active project scoping lead?', async () => {
    try {
      const res = await fetch(window.getApiUrl('/api/projects/delete'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) syncAllDatabases();
    } catch (err) { console.error(err); }
  });
}
window.deleteProject = deleteProject;

async function updateProjectDetails(id) {
  const name = document.getElementById('modalProjName').value.trim();
  const email = document.getElementById('modalProjEmail').value.trim();
  const phone = document.getElementById('modalProjPhone').value.trim();
  const projectType = document.getElementById('modalProjType').value.trim();
  const budget = document.getElementById('modalProjBudget').value.trim();
  const status = document.getElementById('modalProjStatus').value;
  const previewUrl = document.getElementById('modalProjPreviewUrl').value.trim();
  const message = document.getElementById('modalProjMessage').value.trim();
  const adminNotes = document.getElementById('modalProjAdminNotes').value.trim();

  try {
    const res = await fetch(window.getApiUrl('/api/projects/update-details'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, email, phone, projectType, budget, status, previewUrl, message, adminNotes })
    });
    if (res.ok) {
      showToast('Project Updated', 'Project details updated successfully!', 'success');
      syncAllDatabases();
      const receiptModal = document.getElementById('receiptModal');
      if (receiptModal) receiptModal.classList.remove('show');
    } else {
      showToast('Error', 'Failed to update project details.', 'error');
    }
  } catch (err) {
    showToast('Connection Error', 'Could not communicate with details API.', 'error');
  }
}
window.updateProjectDetails = updateProjectDetails;

// ---------- DEVELOPERS ----------
window.developers = [];

async function loadDevelopers() {
  try {
    const res = await fetch(window.getApiUrl('/api/developers?_t=' + Date.now()));
    if (res.ok) {
      window.developers = await res.json();
      if (window.developers.length === 0) {
        const defaultDevs = [
          { name: 'Shridhar (Lead Dev)', role: 'Full Stack Developer', specialty: 'React, Node.js, Supabase' },
          { name: 'Priya (Designer)', role: 'UI/UX Designer', specialty: 'Figma, CSS, Branding' },
          { name: 'Arjun (Backend)', role: 'Backend Engineer', specialty: 'Express, PostgreSQL, API' }
        ];
        for (const dev of defaultDevs) {
          await fetch(window.getApiUrl('/api/developers/create'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dev)
          });
        }
        const refetch = await fetch(window.getApiUrl('/api/developers?_t=' + Date.now()));
        if (refetch.ok) window.developers = await refetch.json();
      }
    }
  } catch (err) { console.warn('Developers fetch failed'); }

  const devSelect = document.getElementById('newProjDev');
  if (devSelect && window.developers.length > 0) {
    devSelect.innerHTML = '<option value="">Unassigned</option>' +
      window.developers.map(d => `<option value="${d.id}">${d.name} — ${d.role}</option>`).join('');
  }
}
window.loadDevelopers = loadDevelopers;

// ---------- ROADMAP EDITOR ----------
function loadRoadmapProjectDropdown() {
  const clientProj = (window.projects || []).filter(p => p.email && p.email.toLowerCase() === window.currentWorkspaceEmail.toLowerCase());
  const options = clientProj.map(p => `<option value="${p.id}">${p.name || p.projectType || 'Custom Project'}</option>`).join('');
  ['roadmapProjectSelect', 'fileProjSelect', 'newInvProjSelect'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = options || `<option value="">No Active Projects</option>`;
  });
}
window.loadRoadmapProjectDropdown = loadRoadmapProjectDropdown;

async function loadRoadmapDetails() {
  const projectId = document.getElementById('roadmapProjectSelect').value;
  const formContainer = document.getElementById('roadmapFormContainer');
  const warning = document.getElementById('noRoadmapProjectWarning');

  if (!projectId) {
    if (formContainer) formContainer.style.display = 'none';
    if (warning) warning.style.display = 'block';
    return;
  }

  if (formContainer) formContainer.style.display = 'block';
  if (warning) warning.style.display = 'none';

  const proj = (window.projects || []).find(p => p.id === projectId);
  if (!proj) return;

  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setVal('roadmapCurrentStage', proj.currentStage || 'Discovery');
  setVal('roadmapProgress', proj.progress !== undefined ? proj.progress : 15);
  setVal('roadmapNextMilestone', proj.nextMilestone || '');
  setVal('roadmapEta', proj.eta || '');
  setVal('roadmapStatus', proj.status || 'In Progress');
  setVal('roadmapPreviewUrl', proj.previewUrl || '');
}
window.loadRoadmapDetails = loadRoadmapDetails;

async function handleUpdateRoadmap(e) {
  e.preventDefault();
  const projectId = document.getElementById('roadmapProjectSelect').value;
  if (!projectId) return;

  const currentStage = document.getElementById('roadmapCurrentStage').value;
  const progress = document.getElementById('roadmapProgress').value;
  const nextMilestone = document.getElementById('roadmapNextMilestone').value.trim();
  const eta = document.getElementById('roadmapEta').value.trim();
  const status = document.getElementById('roadmapStatus').value;
  const previewUrl = document.getElementById('roadmapPreviewUrl').value.trim();

  try {
    const res = await fetch(window.getApiUrl('/api/project-roadmap/update'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, currentStage, progress, nextMilestone, eta, status, previewUrl })
    });
    if (res.ok) {
      showToast('Roadmap Updated', 'Project roadmap saved and synced to client portal!', 'success');
      await fetchProjects();
    } else {
      showToast('Error', 'Failed to update roadmap.', 'error');
    }
  } catch (err) {
    showToast('Connection Error', 'Failed to connect to roadmap API.', 'error');
  }
}
window.handleUpdateRoadmap = handleUpdateRoadmap;

// ---------- WORKSPACE PROFILE TABS ----------
function switchProfileTab(tabName) {
  const tabs = ['details','projects','invoices','roadmap','files','support','activity','teamchat','notes','settings'];
  tabs.forEach(t => {
    const content = document.getElementById('profileTab_' + t);
    const tName = t.charAt(0).toUpperCase() + t.slice(1);
    const btn = document.getElementById('btnProfile' + tName);
    if (content) content.style.display = t === tabName ? 'block' : 'none';
    if (btn) { if (t === tabName) btn.classList.add('active'); else btn.classList.remove('active'); }
  });

  if (tabName === 'roadmap') loadRoadmapDetails();
  else if (tabName === 'files') loadWorkspaceFiles();
  else if (tabName === 'support') loadWorkspaceTickets();
  else if (tabName === 'activity') loadWorkspaceActivity();
  else if (tabName === 'teamchat') loadTeamchatMessages();
  else if (tabName === 'notes') loadPrivateNotes();
}
window.switchProfileTab = switchProfileTab;

// ---------- WORKSPACE PROJECT ACTIONS ----------
function renderWorkspaceProjects() {
  const list = (window.projects || []).filter(p => p.email && p.email.toLowerCase() === window.currentWorkspaceEmail.toLowerCase());
  const tbody = document.getElementById('profileProjectsList');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--ink-soft);">No projects found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(p => {
    let devName = 'Unassigned';
    if (p.developerId) {
      const dev = (window.developers || []).find(d => d.id === p.developerId);
      devName = dev ? dev.name : p.developerId;
    } else if (p.developer) {
      devName = p.developer;
    }
    return `
      <tr>
        <td><div style="font-weight:600;">${p.name || 'Custom Web Build'}</div><div style="font-size:11px; color:var(--ink-faint);">${p.stack || 'General Development'}</div></td>
        <td style="font-family:var(--font-mono); color:var(--accent); font-weight:600;">&#8377;${Number(p.budget).toLocaleString('en-IN')}</td>
        <td style="font-size:12.5px;">${devName}</td>
        <td><div style="display:flex; align-items:center; gap:6px;"><span style="font-family:var(--font-mono); font-size:11px;">${p.progress || 0}%</span><div style="width:50px; height:5px; background:var(--border); border-radius:2px; overflow:hidden;"><div style="width:${p.progress || 0}%; height:100%; background:var(--accent);"></div></div></div></td>
        <td><span class="status-badge ${p.status ? p.status.toLowerCase().replace(' ', '-') : 'pending'}">${p.status || 'Pending'}</span></td>
        <td><button class="action-btn btn-delete" style="padding:4px 8px; font-size:11px;" onclick="deleteWorkspaceProject('${p.id}')"><i class="fa-solid fa-trash"></i></button></td>
      </tr>
    `;
  }).join('');
}
window.renderWorkspaceProjects = renderWorkspaceProjects;

function toggleAddProjectForm() {
  const form = document.getElementById('workspaceProjectForm');
  if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
window.toggleAddProjectForm = toggleAddProjectForm;

async function saveWorkspaceProject() {
  const name = document.getElementById('newProjTitle').value.trim();
  const budget = document.getElementById('newProjBudget').value.trim();
  const stack = document.getElementById('newProjStack').value.trim();
  const developerId = document.getElementById('newProjDev').value;
  const message = document.getElementById('newProjDesc').value.trim();
  const email = window.currentWorkspaceEmail;

  if (!name || !budget) { showToast('Required Fields', 'Please enter project title and budget.', 'warning'); return; }

  try {
    const res = await fetch(window.getApiUrl('/api/projects/create-manual'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, budget, stack, developerId, message })
    });
    if (res.ok) {
      showToast('Project Created', 'New project initialized successfully!', 'success');
      toggleAddProjectForm();
      await fetchProjects();
      renderWorkspaceProjects();
      loadRoadmapProjectDropdown();
      fetchApprovedUsers();
    }
  } catch (err) { showToast('Error', 'Failed to create workspace project.', 'error'); }
}
window.saveWorkspaceProject = saveWorkspaceProject;

async function deleteWorkspaceProject(id) {
  showConfirmModal('Permanently delete this project from database?', async () => {
    try {
      const res = await fetch(window.getApiUrl('/api/projects/delete'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        showToast('Project Deleted', 'Project has been removed.', 'success');
        await fetchProjects();
        renderWorkspaceProjects();
        loadRoadmapProjectDropdown();
        fetchApprovedUsers();
      }
    } catch (e) { showToast('Error', 'Deletion failed.', 'error'); }
  });
}
window.deleteWorkspaceProject = deleteWorkspaceProject;

// ---------- SEARCH FILTER BINDINGS ----------
document.addEventListener('DOMContentLoaded', () => {
  const searchInquiries = document.getElementById('searchInquiriesInput');
  if (searchInquiries) {
    searchInquiries.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      renderInquiries((window.inquiries || []).filter(item =>
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q))
      ));
    });
  }

  const searchProjects = document.getElementById('searchProjectsInput');
  if (searchProjects) {
    searchProjects.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      renderProjects((window.projects || []).filter(item =>
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.status && item.status.toLowerCase().includes(q))
      ));
    });
  }
});
