// ========================================================
// NextGen Web Studio - Core API Config & Utility Module
// ========================================================

// NOTE: Shared state (inquiries, projects, receipts, approvedUsers,
// initialFetchSuccess) is declared on window.* in the inline admin script.
// This module provides utility functions as window.* exports.

// API Endpoint Resolution
const API_URL_MODULE = window.API_URL || (
  window.location.protocol === 'file:'
    ? 'http://localhost:3000'
    : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? '' : 'https://nextgen-studio-czz7.onrender.com')
);

// Ensure getApiUrl is on window
if (!window.getApiUrl) {
  window.getApiUrl = function(endpoint) {
    return `${API_URL_MODULE}${endpoint}`;
  };
}
// 3. Global Fetch Interceptor (Inject CORS Cookies Credentials)
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  options = options || {};
  if (typeof url === 'string' && (url.includes('/api/') || url.includes('localhost') || url.includes('onrender.com'))) {
    options.credentials = 'include';
  }
  return originalFetch(url, options);
};

// 4. Custom in-website Confirmation Modal UI Helpers
let activeConfirmCallback = null;

function showConfirmModal(message, callback) {
  const msgEl = document.getElementById('confirmMessageText');
  const modal = document.getElementById('confirmModal');
  if (msgEl && modal) {
    msgEl.innerText = message;
    activeConfirmCallback = callback;
    modal.classList.add('show');
  }
}
window.showConfirmModal = showConfirmModal;

function closeConfirmModal() {
  const modal = document.getElementById('confirmModal');
  if (modal) {
    modal.classList.remove('show');
  }
  activeConfirmCallback = null;
}
window.closeConfirmModal = closeConfirmModal;

// Bind confirmation modal triggers once the DOM compiles
document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('confirmYesBtn');
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      if (activeConfirmCallback) {
        activeConfirmCallback();
      }
      closeConfirmModal();
    });
  }
});

// 5. Custom Toast UI Notifications Dispatches Helper
function showToast(title, message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-card';
  
  let iconMarkup = '<i class="fa-solid fa-circle-info"></i>';
  if (type === 'success') {
    iconMarkup = '<i class="fa-solid fa-circle-check"></i>';
  } else if (type === 'error') {
    iconMarkup = '<i class="fa-solid fa-circle-xmark"></i>';
  }

  toast.innerHTML = `
    <div class="toast-icon ${type}">${iconMarkup}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${message}</div>
    </div>
    <div class="toast-close" onclick="this.closest('.toast-card').remove()">&times;</div>
  `;

  container.appendChild(toast);

  // Trigger show transition
  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  // Auto-remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}
window.showToast = showToast;
