// ========================================================
// NextGen Web Studio - Tasks Board Module
// ========================================================

let tasks = [];
window.tasks = tasks;

async function fetchTasks() {
  try {
    const res = await fetch(window.getApiUrl('/api/tasks?_t=' + Date.now()));
    if (!res.ok) throw new Error();
    tasks = await res.json();
    window.tasks = tasks;
    renderTasks(tasks);
  } catch (err) { console.warn('Tasks fetch failed', err); }
}
window.fetchTasks = fetchTasks;

function renderTasks(list) {
  const stages = ['Todo','Design','Development','Testing','Done'];
  stages.forEach(stage => {
    const col = document.getElementById('taskCol_' + stage);
    if (!col) return;
    const cards = col.querySelectorAll('.task-card');
    cards.forEach(c => c.remove());
    const countEl = col.querySelector('.crm-count');
    const stageItems = list.filter(t => t.stage === stage);
    if (countEl) countEl.innerText = stageItems.length;
    stageItems.forEach(task => {
      const card = document.createElement('div');
      card.className = 'task-card';
      if (stage === 'Done') card.style.opacity = '0.65';
      card.innerHTML = `
        <div class="task-title"><span class="task-priority ${task.priority || 'low'}"></span>${task.title}</div>
        <div class="task-assign">&#8594; ${task.assignedTo || 'Admin'}</div>
        <div style="margin-top:8px; display:flex; gap:6px;">
          <select style="font-size:10px; padding:2px 6px; background:var(--bg-alt); border:1px solid var(--border); color:var(--ink); border-radius:3px; flex:1; cursor:pointer;" onchange="moveTask('${task.id}', this.value)">
            ${stages.map(s => '<option value="' + s + '"' + (s === stage ? ' selected' : '') + '>' + s + '</option>').join('')}
          </select>
          <button onclick="deleteTask('${task.id}')" style="background:none; border:none; color:#EF4444; font-size:13px; cursor:pointer;" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      col.appendChild(card);
    });
  });
}
window.renderTasks = renderTasks;

async function moveTask(id, newStage) {
  try {
    await fetch(window.getApiUrl('/api/tasks/update'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, stage: newStage })
    });
    fetchTasks();
  } catch (err) { console.error(err); }
}
window.moveTask = moveTask;

async function deleteTask(id) {
  showConfirmModal('Delete this task?', async () => {
    await fetch(window.getApiUrl('/api/tasks/delete'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchTasks();
  });
}
window.deleteTask = deleteTask;

async function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const assignedTo = document.getElementById('taskAssign').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const stage = document.getElementById('taskStage').value;
  if (!title) { showToast('Error', 'Task title required', 'error'); return; }
  try {
    const res = await fetch(window.getApiUrl('/api/tasks/create'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, assignedTo, priority, stage })
    });
    if (res.ok) {
      showToast('Task Added', title, 'success');
      document.getElementById('taskTitle').value = '';
      const form = document.getElementById('taskAddForm');
      if (form) form.style.display = 'none';
      fetchTasks();
    } else { showToast('Error', 'Failed to add task', 'error'); }
  } catch (err) { showToast('Error', 'Connection failed', 'error'); }
}
window.addTask = addTask;

