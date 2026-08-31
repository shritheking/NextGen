import re

template_str = r'''
  ea_customization_guide: {
    name: "Buyer Customization Guide",
    fields: [
      { id: "bot_name", label: "Bot Name", type: "text", default: "Infinity Trader EA Bot" }
    ],
    render: (data) => `
      <!-- PAGE 1: Cover Page -->
      <div class="doc-page">
        <img class="watermark" src="assets/logo-icon.png" alt="Watermark">
        <div class="agreement-cover-hero" style="margin-top: 100px;">
          <div class="confidential-badge agreement-cover-badge">Developer Guide</div>
          <div class="agreement-cover-logo" style="margin-bottom: 40px;">
            <img class="hero-icon" src="assets/logo-icon.png" alt="Icon" style="height: 50px;">
            <img class="hero-text" src="assets/logo-text.png" alt="Text" style="height: 24px;">
          </div>
          <h1 class="doc-hero-title agreement-cover-title" style="font-size: 38px; line-height: 1.2;">\${data.bot_name}<br><span style="font-size: 24px; color: var(--ink-soft); font-weight: 500;">Buyer Customization Guide</span></h1>
          
          <p class="doc-hero-pre agreement-cover-pre" style="color:var(--nextgen-green); margin-top: 20px; font-size: 16px;">NextGen Web Studio</p>
          
          <div class="cover-meta" style="margin-top: 60px;">
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
          <span>© NextGen Web Studio  •  @shridharsan1  •  Confidential</span>
          <span class="page-num-placeholder">Page 1 of 5</span>
        </div>
      </div>

      <!-- PAGE 2: Environment Variables -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Environment Config</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 1 — ENVIRONMENT VARIABLES</h2>
            <p class="doc-para">Below are all the required environment variables you must set for each service.</p>
            
            <h3 style="font-family: var(--font-mono); font-size: 13px; color: var(--accent); margin-bottom: 8px; margin-top: 20px;">RENDER BACKEND (DOCKER)</h3>
            <div style="background: var(--bg-alt); padding: 15px; border-radius: 6px; font-family: monospace; font-size: 11px; margin-bottom: 20px;">
              DATABASE_URL = Supabase asyncpg connection string<br>
              SUPABASE_URL = Supabase project URL<br>
              SUPABASE_SECRET_KEY = Supabase service_role key<br>
              ADMIN_API_KEY = Custom secret password (e.g. MySecretPass123)<br>
              TELEGRAM_WEBHOOK_URL = https://your-bot-url.onrender.com/internal/delivery
            </div>

            <h3 style="font-family: var(--font-mono); font-size: 13px; color: var(--accent); margin-bottom: 8px; margin-top: 20px;">RENDER TELEGRAM BOT (PYTHON)</h3>
            <div style="background: var(--bg-alt); padding: 15px; border-radius: 6px; font-family: monospace; font-size: 11px; margin-bottom: 20px;">
              TELEGRAM_BOT_TOKEN = Token from BotFather<br>
              API_BASE_URL = https://your-backend-url.onrender.com/api/v1<br>
              ADMIN_API_KEY = Exact match of backend ADMIN_API_KEY<br>
              ADMIN_CHAT_ID = Your personal numeric Telegram ID
            </div>

            <h3 style="font-family: var(--font-mono); font-size: 13px; color: var(--accent); margin-bottom: 8px; margin-top: 20px;">VERCEL FRONTEND</h3>
            <div style="background: var(--bg-alt); padding: 15px; border-radius: 6px; font-family: monospace; font-size: 11px; margin-bottom: 20px;">
              NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com
            </div>
            
            <div class="review-card" style="margin-top: 20px;">
              <p class="doc-para"><strong style="color: #ef4444;">WARNING:</strong> Do NOT append /api/v1 to the NEXT_PUBLIC_API_URL on Vercel. Ensure ADMIN_API_KEY is extremely secure.</p>
            </div>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Confidential</span>
          <span class="page-num-placeholder">Page 2 of 5</span>
        </div>
      </div>

      <!-- PAGE 3: Bot Branding -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Bot Customization</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 2 — TELEGRAM BOT BRANDING</h2>
            <p class="doc-para">Modify the following lines in <strong>telegram_bot/bot.py</strong> to brand the bot as your own.</p>
            
            <table class="doc-table" style="margin-top: 15px;">
              <thead>
                <tr>
                  <th style="width:15%">LINE</th>
                  <th style="width:40%">CURRENT TEXT</th>
                  <th>REPLACE WITH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-family: monospace;">Line 24</td>
                  <td style="font-family: monospace;">"Welcome to InfinityTrader Bot!"</td>
                  <td style="font-family: monospace;">"Welcome to [Your Bot Name]!"</td>
                </tr>
                <tr>
                  <td style="font-family: monospace;">Line 45</td>
                  <td style="font-family: monospace;">"Developed by NextGen Web Studio"</td>
                  <td style="font-family: monospace;">"Developed by [Your Company Name]"</td>
                </tr>
                <tr>
                  <td style="font-family: monospace;">Line 67</td>
                  <td style="font-family: monospace;">"Contact @shridharsan1 for help."</td>
                  <td style="font-family: monospace;">"Contact [Your Username] for help."</td>
                </tr>
                <tr>
                  <td style="font-family: monospace;">Line 112</td>
                  <td style="font-family: monospace;">"InfinityTrader Trial Activated"</td>
                  <td style="font-family: monospace;">"[Your Brand] Trial Activated"</td>
                </tr>
              </tbody>
            </table>
            
            <div class="review-card" style="margin-top: 20px;">
              <p class="doc-para"><strong style="color: var(--nextgen-green);">IMPORTANT:</strong> Ensure you keep the quotation marks (") intact around the text strings when modifying Python files to avoid syntax errors.</p>
            </div>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Confidential</span>
          <span class="page-num-placeholder">Page 3 of 5</span>
        </div>
      </div>

      <!-- PAGE 4: Frontend & Backend Branding -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">App Customization</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 3 — FRONTEND BRANDING</h2>
            <p class="doc-para">Modify the following locations in <strong>frontend/src/</strong> to brand the admin portal.</p>
            
            <table class="doc-table" style="margin-top: 15px;">
              <thead>
                <tr>
                  <th style="width:25%">FILE NAME</th>
                  <th style="width:10%">LINE</th>
                  <th>REPLACE WITH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-family: monospace;">layout.tsx</td>
                  <td style="font-family: monospace;">12</td>
                  <td style="font-family: monospace;">Change title from "Infinity Trader" to "[Your Brand]"</td>
                </tr>
                <tr>
                  <td style="font-family: monospace;">components/Navbar.tsx</td>
                  <td style="font-family: monospace;">45</td>
                  <td style="font-family: monospace;">Change "InfinityTrader Portal" to "[Your Brand] Portal"</td>
                </tr>
                <tr>
                  <td style="font-family: monospace;">public/favicon.ico</td>
                  <td style="font-family: monospace;">N/A</td>
                  <td style="font-family: monospace;">Delete and replace with your own .ico file</td>
                </tr>
                <tr>
                  <td style="font-family: monospace;">public/logo.png</td>
                  <td style="font-family: monospace;">N/A</td>
                  <td style="font-family: monospace;">Delete and replace with your own .png logo</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="doc-section" style="margin-top: 40px;">
            <h2 class="doc-section-title">SECTION 4 — BACKEND BRANDING</h2>
            <p class="doc-para">Modify the following API documentation branding in <strong>backend/app/main.py</strong>.</p>
            
            <table class="doc-table" style="margin-top: 15px;">
              <thead>
                <tr>
                  <th style="width:15%">LINE</th>
                  <th style="width:40%">CURRENT TEXT</th>
                  <th>REPLACE WITH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-family: monospace;">Line 15</td>
                  <td style="font-family: monospace;">title="Infinity Trader API"</td>
                  <td style="font-family: monospace;">title="[Your Brand] API"</td>
                </tr>
                <tr>
                  <td style="font-family: monospace;">Line 16</td>
                  <td style="font-family: monospace;">description="NextGen Web Studio"</td>
                  <td style="font-family: monospace;">description="[Your Company]"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Confidential</span>
          <span class="page-num-placeholder">Page 4 of 5</span>
        </div>
      </div>

      <!-- PAGE 5: First Time Setup Checklist -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Setup Checklist</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 5 — FIRST TIME SETUP CHECKLIST</h2>
            <p class="doc-para">Complete the following steps strictly in order after you finish making your code branding changes.</p>
            
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 8px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>1.</strong> Push your updated code to your own private GitHub repository</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>2.</strong> Create a Supabase project and run the migration SQL in the SQL Editor</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>3.</strong> Create the Render Docker Web Service for Backend with the correct env vars</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>4.</strong> Create the Render Python Web Service for Telegram Bot with the correct env vars</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>5.</strong> Deploy the frontend to Vercel with the correct environment variable</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>6.</strong> Log into the Admin Web Portal and upload your .mq5 EA template file</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>7.</strong> Create your products and pricing plans in the Admin Web Portal</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>8.</strong> Type /admin in Telegram to configure trial settings and your support username</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>9.</strong> Do a full test run: Register → Free Trial → Approve in Admin → Receive .ex5</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>10.</strong> Wipe test data from Supabase and reset ID sequences before going fully live</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Confidential</span>
          <span class="page-num-placeholder">Page 5 of 5</span>
        </div>
      </div>
    `
  },
'''

with open("js/documents.js", "r", encoding="utf-8") as f:
    content = f.read()

index = content.find("const templateSelector = document.getElementById")
if index == -1:
    print("Could not find insertion point.")
    exit(1)

brace_index = content.rfind("};", 0, index)
if brace_index == -1:
    print("Could not find closing brace.")
    exit(1)

new_content = content[:brace_index] + ",\n" + template_str + content[brace_index:]

with open("js/documents.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Template added successfully to js/documents.js")
