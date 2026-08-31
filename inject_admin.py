import re

template_str = r'''
  ea_admin_manual: {
    name: "Admin Manual PDF",
    fields: [
      { id: "bot_name", label: "Bot Name", type: "text", default: "InfinityTrader Bot Admin Panel" }
    ],
    render: (data) => `
      <!-- PAGE 1: Cover Page -->
      <div class="doc-page">
        <img class="watermark" src="assets/logo-icon.png" alt="Watermark">
        <div class="agreement-cover-hero" style="margin-top: 100px;">
          <div class="confidential-badge agreement-cover-badge">Admin Guide</div>
          <div class="agreement-cover-logo" style="margin-bottom: 40px;">
            <img class="hero-icon" src="assets/logo-icon.png" alt="Icon" style="height: 50px;">
            <img class="hero-text" src="assets/logo-text.png" alt="Text" style="height: 24px;">
          </div>
          <h1 class="doc-hero-title agreement-cover-title" style="font-size: 38px; line-height: 1.2;">\${data.bot_name}<br><span style="font-size: 24px; color: var(--ink-soft); font-weight: 500;">Admin Manual</span></h1>
          
          <p class="doc-hero-pre agreement-cover-pre" style="color:var(--nextgen-green); margin-top: 20px; font-size: 16px;">NextGen Web Studio</p>
          
          <div class="cover-meta" style="margin-top: 60px;">
            <div class="meta-row">
              <span class="meta-label">Version:</span>
              <span class="meta-value" style="font-size: 20px;">1.0.0</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Developed By:</span>
              <span class="meta-value" style="font-size: 20px;">Shri Dharsan</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Contact:</span>
              <span class="meta-value" style="font-size: 20px; color: var(--nextgen-green);">@shridharsan1</span>
            </div>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Admin Manual  •  Confidential</span>
          <span class="page-num-placeholder">Page 1 of 6</span>
        </div>
      </div>

      <!-- PAGE 2: Table of Contents -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Table of Contents</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">TABLE OF CONTENTS</h2>
            
            <ul class="work-metrics" style="margin-top: 30px; font-size: 14px; display: grid; grid-template-columns: 1fr; gap: 16px; list-style: none; padding-left: 0;">
              <li><strong style="color:var(--accent);">SECTION 1</strong> — Logging into the Admin Web Portal</li>
              <li><strong style="color:var(--accent);">SECTION 2</strong> — Dashboard</li>
              <li><strong style="color:var(--accent);">SECTION 3</strong> — Managing Orders</li>
              <li><strong style="color:var(--accent);">SECTION 4</strong> — Managing Licenses</li>
              <li><strong style="color:var(--accent);">SECTION 5</strong> — Managing Products</li>
              <li><strong style="color:var(--accent);">SECTION 6</strong> — EA Templates</li>
              <li><strong style="color:var(--accent);">SECTION 7</strong> — Compiler Workers</li>
              <li><strong style="color:var(--accent);">SECTION 8</strong> — VPS Orders</li>
              <li><strong style="color:var(--accent);">SECTION 9</strong> — Settings</li>
              <li><strong style="color:var(--accent);">SECTION 10</strong> — Telegram Admin Commands</li>
              <li><strong style="color:var(--accent);">SECTION 11</strong> — Common Admin Tasks</li>
              <li><strong style="color:var(--accent);">SECTION 12</strong> — Before Going Live Checklist</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Admin Manual  •  Confidential</span>
          <span class="page-num-placeholder">Page 2 of 6</span>
        </div>
      </div>

      <!-- PAGE 3: Sections 1-4 -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Portal & Management</div>
        </div>
        <div class="doc-page-content">
          
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 1 — LOGGING INTO THE ADMIN WEB PORTAL</h2>
            <p class="doc-para"><strong>Link:</strong> <a href="https://mt5-license-system.vercel.app/admin" style="color:var(--accent);">https://mt5-license-system.vercel.app/admin</a><br><strong>Pass:</strong> <code style="color:var(--nextgen-green);">infinity trader</code></p>
            <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 20px;">
              <li>Open your Admin Web Portal URL in a browser</li>
              <li>Enter your <code>ADMIN_API_KEY</code> password and click Login</li>
              <li>You will see the main dashboard with stats: Total Users | Total Orders | Active Licenses | Compiler Queue</li>
            </ul>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 2 — DASHBOARD</h2>
            <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 20px;">
              <li>Shows live stats: total users, total orders, active licenses, revenue</li>
              <li>Shows recent orders list</li>
              <li>Shows compiler queue status (how many EAs are waiting to compile)</li>
            </ul>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 3 — MANAGING ORDERS</h2>
            <p class="doc-para" style="font-family: var(--font-mono); font-size: 10px; color: var(--ink-faint);">Location: Admin Web Portal → Orders</p>
            <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 20px;">
              <li>View all customer orders with status: <code>Pending</code> / <code>Compiling</code> / <code>Completed</code> / <code>Failed</code></li>
              <li>Click <strong>"Approve"</strong> on a pending order → EA will automatically start compiling</li>
              <li>Click <strong>"Reject"</strong> to reject an order</li>
              <li>Click <strong>"Recompile"</strong> if a compile failed to try again</li>
              <li>Filter orders by status using the dropdown</li>
              <li>Orders show: Order ID, Customer Name, MT5 ID, Plan, Status, Date</li>
            </ul>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 4 — MANAGING LICENSES</h2>
            <p class="doc-para" style="font-family: var(--font-mono); font-size: 10px; color: var(--ink-faint);">Location: Admin Web Portal → Licenses</p>
            <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 20px;">
              <li>View all active and expired licenses</li>
              <li>Each license shows: License ID, MT5 ID, Expiry Date, Status, File Name</li>
              <li>Click <strong>"Edit"</strong> to manually update expiry date or MT5 ID if needed</li>
              <li>Click <strong>"Recompile"</strong> to generate a new EA file for an existing license</li>
              <li>Download CSV to export all license data</li>
              <li>License statuses: <code>pending</code> / <code>active</code> / <code>expired</code> / <code>suspended</code></li>
            </ul>
          </div>

        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Admin Manual  •  Confidential</span>
          <span class="page-num-placeholder">Page 3 of 6</span>
        </div>
      </div>

      <!-- PAGE 4: Sections 5-8 -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Configuration & Tools</div>
        </div>
        <div class="doc-page-content">

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 5 — MANAGING PRODUCTS</h2>
            <p class="doc-para" style="font-family: var(--font-mono); font-size: 10px; color: var(--ink-faint);">Location: Admin Web Portal → Products</p>
            <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 20px;">
              <li>View all your pricing plans</li>
              <li>Click <strong>"Add Product"</strong> to create a new plan:
                <ul style="margin-top: 4px;">
                  <li>Product Name (e.g. "Monthly Plan", "Lifetime Plan", "Free Trial")</li>
                  <li>Price (e.g. 2999)</li>
                  <li>Duration in Days (e.g. 30 for monthly, 9999 for lifetime, 7 for trial)</li>
                  <li>Product Type: <code>ea</code> / <code>vps</code></li>
                  <li>Is Active: toggle on/off to show/hide from customers</li>
                </ul>
              </li>
              <li>Click "Edit" to modify an existing product or "Delete" to remove it</li>
            </ul>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 6 — EA TEMPLATES</h2>
            <p class="doc-para" style="font-family: var(--font-mono); font-size: 10px; color: var(--ink-faint);">Location: Admin Web Portal → EA Templates</p>
            <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 15px;">
              <li>This is where you upload your MQ5 source code</li>
              <li>Click <strong>"Upload New Version"</strong> and select your <code>.mq5</code> file</li>
              <li>The system will save it as the active template</li>
              <li>Every new EA compiled will use this template</li>
              <li>You can view version history and revert to a previous version</li>
            </ul>
            <div class="review-card" style="margin-top: 5px; margin-bottom: 20px; border-left: 4px solid #ef4444; background: rgba(239, 68, 68, 0.05);">
              <p class="doc-para" style="margin-bottom: 5px;"><strong style="color: #ef4444;">IMPORTANT CAUTION:</strong></p>
              <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
                <li>Only ONE template can be active at a time</li>
                <li>After uploading a new template, all future compilations will use the new code (existing licenses are NOT affected until recompiled)</li>
              </ul>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 7 — COMPILER WORKERS & SECTION 8 — VPS ORDERS</h2>
            <p class="doc-para" style="font-family: var(--font-mono); font-size: 10px; color: var(--ink-faint);">Location: Admin Web Portal → Compiler Workers | VPS</p>
            <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 20px;">
              <li><strong>Compiler Workers:</strong> Shows all compile jobs (pending / processing / completed / failed). If a job shows "failed", check the Error Message column. Click "Retry" to try again. Processes one job at a time.</li>
              <li><strong>VPS Orders:</strong> View customer VPS requests (Pending / Contacted / Paid / Provisioned). Click the status dropdown to update. Click the message icon to send a custom message via Telegram. Click "Provision" to send server details (IP, Username, Password) automatically.</li>
            </ul>
          </div>

        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Admin Manual  •  Confidential</span>
          <span class="page-num-placeholder">Page 4 of 6</span>
        </div>
      </div>

      <!-- PAGE 5: Sections 9-11 -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Telegram & Operations</div>
        </div>
        <div class="doc-page-content">

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 9 — SETTINGS & SECTION 10 — TELEGRAM ADMIN COMMANDS</h2>
            <p class="doc-para">View and edit all system settings inside the Web Portal Settings tab. Or, use Telegram Commands directly (only works for <code>ADMIN_CHAT_ID</code>):</p>
            
            <div class="review-card" style="margin-top: 15px; border-left: 4px solid var(--accent); background: rgba(212, 175, 55, 0.05);">
              <p class="doc-para" style="margin-bottom: 5px;"><strong style="color: var(--accent);">TELEGRAM COMMANDS:</strong></p>
              <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
                <li><code>/admin</code> → Opens the Admin Configuration Panel inside Telegram (Edit Trial Status, Trial Duration, Max Trials, Broker Change Fee, Support Username)</li>
                <li><code>/admintest</code> → Sends a test notification to confirm the admin alert system is working</li>
              </ul>
            </div>
            
            <div class="review-card" style="margin-top: 15px; border-left: 4px solid #3B82F6; background: rgba(59, 130, 246, 0.05);">
              <p class="doc-para" style="margin-bottom: 5px;"><strong style="color: #3B82F6;">HOW TO APPROVE AN ORDER FROM TELEGRAM:</strong></p>
              <ul style="font-size:11.5px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
                <li>When a customer places an order, you receive an automatic notification</li>
                <li>The notification has two buttons: <strong>"✅ Approve"</strong> and <strong>"❌ Reject"</strong></li>
                <li>Click <strong>"✅ Approve"</strong> → the EA compiles automatically and is sent to the customer</li>
                <li>Click <strong>"❌ Reject"</strong> → the customer is notified that their order was not approved</li>
              </ul>
            </div>
          </div>

          <div class="doc-section" style="margin-top: 30px;">
            <h2 class="doc-section-title">SECTION 11 — COMMON ADMIN TASKS</h2>
            
            <table class="doc-table" style="margin-top: 15px;">
              <thead>
                <tr>
                  <th style="width:30%">TASK</th>
                  <th>STEPS TO COMPLETE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Recompile failed EA</strong></td>
                  <td>1. Admin Portal → Licenses<br>2. Find license and click "Recompile"</td>
                </tr>
                <tr>
                  <td><strong>Extend license expiry</strong></td>
                  <td>1. Admin Portal → Licenses → Edit<br>2. Update Expiry Date & Save<br>3. <em>Note: Recompile needed to update EA file</em></td>
                </tr>
                <tr>
                  <td><strong>Change customer MT5 ID</strong></td>
                  <td>1. Admin Portal → Licenses → Edit<br>2. Update MT5 ID & Save<br>3. Click "Recompile" to send new EA</td>
                </tr>
                <tr>
                  <td><strong>Add new pricing plan</strong></td>
                  <td>1. Admin Portal → Products → Add Product<br>2. Fill in details and set Is Active = Yes<br>3. Immediately appears in Telegram bot menu</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Admin Manual  •  Confidential</span>
          <span class="page-num-placeholder">Page 5 of 6</span>
        </div>
      </div>

      <!-- PAGE 6: Checklist -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Final Checklist</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 12 — BEFORE GOING LIVE CHECKLIST</h2>
            <p class="doc-para">Complete all 8 steps before officially launching your bot to the public:</p>
            
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 12px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>1.</strong> Upload your <code>.mq5</code> EA template in EA Templates</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>2.</strong> Create your pricing plans in Products</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>3.</strong> Set your Support Username in Settings</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>4.</strong> Configure Trial Duration and Max Trials</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>5.</strong> Test the full flow: register → trial → approve → receive file → verify in MT5</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>6.</strong> Wipe all test data from Supabase (DELETE all rows from test tables)</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>7.</strong> Reset all ID sequences in Supabase SQL Editor</li>
              <li><i class="fa-solid fa-rocket" style="color: var(--accent); margin-right: 6px;"></i> <strong>8.</strong> You are live!</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Admin Manual  •  Confidential</span>
          <span class="page-num-placeholder">Page 6 of 6</span>
        </div>
      </div>
    `
  }
'''

with open("js/documents.js", "r", encoding="utf-8") as f:
    content = f.read()

index = content.find("const templateSelector = document.getElementById")
if index == -1:
    print("Error: Could not find const templateSelector = document.getElementById")
    exit(1)

brace_index = content.rfind("};", 0, index)

# Prevent trailing comma issues by safely joining
new_content = content[:brace_index] + ",\n" + template_str + content[brace_index:]

# Unescape variables that were escaped in the python literal
new_content = new_content.replace(r"\${data", "${data")

with open("js/documents.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully injected ea_admin_manual template.")
