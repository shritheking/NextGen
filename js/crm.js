// ========================================================
// NextGen Web Studio - CRM Pipeline Module
// ========================================================

let crmLeads = [];

async function fetchCrmLeads() {
  try {
    const res = await fetch(window.getApiUrl('/api/crm-leads?_t=' + Date.now()));
    if (!res.ok) throw new Error();
    crmLeads = await res.json();
    renderCrmLeads(crmLeads);
  } catch (err) { console.warn('CRM leads fetch failed', err); }
}
window.fetchCrmLeads = fetchCrmLeads;

function renderCrmLeads(list) {
  const stages = ['New','Contacted','Meeting','Proposal','Negotiation','Won','Lost'];
  stages.forEach(stage => {
    const col = document.getElementById('crmCol_' + stage);
    if (!col) return;
    const cards = col.querySelectorAll('.crm-lead-card');
    cards.forEach(c => c.remove());
    const countEl = col.querySelector('.crm-count');
    const stageLeads = list.filter(l => l.stage === stage);
    if (countEl) countEl.innerText = stageLeads.length;
    stageLeads.forEach(lead => {
      const card = document.createElement('div');
      card.className = 'crm-lead-card';
      card.style.borderColor = stage === 'Won' ? 'rgba(74,222,128,.3)' : '';
      card.innerHTML = `
        <div class="crm-lead-name">${lead.name}</div>
        <div class="crm-lead-budget" style="${stage === 'Won' ? 'color:#4ADE80;' : ''}">${lead.budget || 'Budget TBD'}</div>
        <div class="crm-lead-meta">
          ${lead.projectType ? '<span class="crm-lead-tag">' + lead.projectType + '</span>' : ''}
          ${lead.source ? '<span class="crm-lead-tag">' + lead.source + '</span>' : ''}
        </div>
        <div style="margin-top:8px; display:flex; gap:6px;">
          <select style="font-size:10px; padding:2px 6px; background:var(--bg-alt); border:1px solid var(--border); color:var(--ink); border-radius:3px; flex:1; cursor:pointer;" onchange="moveCrmLead('${lead.id}', this.value)">
            ${stages.map(s => '<option value="' + s + '"' + (s === stage ? ' selected' : '') + '>' + s + '</option>').join('')}
          </select>
          <button onclick="deleteCrmLead('${lead.id}')" style="background:none; border:none; color:#EF4444; font-size:13px; cursor:pointer;" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      col.appendChild(card);
    });
  });
}
window.renderCrmLeads = renderCrmLeads;

async function moveCrmLead(id, newStage) {
  try {
    await fetch(window.getApiUrl('/api/crm-leads/update'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, stage: newStage })
    });
    fetchCrmLeads();
  } catch (err) { console.error(err); }
}
window.moveCrmLead = moveCrmLead;

async function deleteCrmLead(id) {
  showConfirmModal('Delete this CRM lead?', async () => {
    await fetch(window.getApiUrl('/api/crm-leads/delete'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchCrmLeads();
  });
}
window.deleteCrmLead = deleteCrmLead;

async function addCrmLead() {
  const name = document.getElementById('crmLeadName').value.trim();
  const email = document.getElementById('crmLeadEmail').value.trim();
  const budget = document.getElementById('crmLeadBudget').value.trim();
  const projectType = document.getElementById('crmLeadType').value.trim();
  const source = document.getElementById('crmLeadSource').value.trim();
  if (!name) { showToast('Error', 'Lead name is required', 'error'); return; }
  try {
    const res = await fetch(window.getApiUrl('/api/crm-leads/create'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, budget, projectType, source })
    });
    if (res.ok) {
      showToast('CRM Lead Added', name + ' added to pipeline!', 'success');
      document.getElementById('crmLeadName').value = '';
      document.getElementById('crmLeadEmail').value = '';
      document.getElementById('crmLeadBudget').value = '';
      document.getElementById('crmLeadType').value = '';
      document.getElementById('crmLeadSource').value = '';
      const form = document.getElementById('crmAddForm');
      if (form) form.style.display = 'none';
      fetchCrmLeads();
    } else { showToast('Error', 'Failed to add lead', 'error'); }
  } catch (err) { showToast('Error', 'Connection failed', 'error'); }
}
window.addCrmLead = addCrmLead;

