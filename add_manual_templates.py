import re

template_str = r'''
  ea_user_manual: {
    name: "EA Bot User Manual",
    fields: [
      { id: "client_name", label: "Client Name", type: "text", default: "User" },
      { id: "bot_name", label: "Bot Name", type: "text", default: "InfinityTrader Bot" }
    ],
    render: (data) => `
      <!-- PAGE 1: Cover Page -->
      <div class="doc-page">
        <img class="watermark" src="assets/logo-icon.png" alt="Watermark">
        <div class="agreement-cover-hero" style="margin-top: 100px;">
          <div class="confidential-badge agreement-cover-badge">User Manual</div>
          <div class="agreement-cover-logo" style="margin-bottom: 40px;">
            <img class="hero-icon" src="assets/logo-icon.png" alt="Icon" style="height: 50px;">
            <img class="hero-text" src="assets/logo-text.png" alt="Text" style="height: 24px;">
          </div>
          <h1 class="doc-hero-title agreement-cover-title" style="font-size: 38px; line-height: 1.2;">\${data.bot_name}<br><span style="font-size: 24px; color: var(--ink-soft); font-weight: 500;">Automated EA Licensing & Delivery Manual</span></h1>
          
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
          <span>© NextGen Web Studio  •  @shridharsan1</span>
          <span class="page-num-placeholder">Page 1 of 3</span>
        </div>
      </div>

      <!-- PAGE 2: Instructions -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">User Guide</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">1. INTRODUCTION</h2>
            <p class="doc-para"><strong>What is \${data.bot_name}?</strong><br>An automated EA licensing system for MetaTrader 5 that securely delivers and locks compiled .ex5 Expert Advisors to your personal MT5 Account ID.</p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">2. HOW TO GET STARTED</h2>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 6px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 1:</strong> Open the bot on Telegram</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 2:</strong> Press Start and enter your Full Name</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 3:</strong> Enter your Mobile Number</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 4:</strong> Enter your MetaTrader 5 Account ID (MT5 ID)</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 5:</strong> Select your plan (Free Trial or Paid)</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 6:</strong> Wait for admin approval</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 7:</strong> Receive your .ex5 file automatically via Telegram</li>
            </ul>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">3. FREE TRIAL & LICENSING</h2>
            <p class="doc-para">Trials are available once per month. The trial duration is set by the admin, after which the EA, locked strictly to your MT5 ID, will expire automatically.</p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">4. INSTALLATION (MT5)</h2>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 6px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 1:</strong> Open MetaTrader 5</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 2:</strong> Click File → Open Data Folder</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 3:</strong> Navigate to MQL5 → Experts</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 4:</strong> Copy the .ex5 file you received into this folder</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 5:</strong> Restart MetaTrader 5</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 6:</strong> Find the EA in the Navigator panel and drag it onto your chart</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>Step 7:</strong> Enable "Allow Algo Trading" and click OK</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1</span>
          <span class="page-num-placeholder">Page 2 of 3</span>
        </div>
      </div>

      <!-- PAGE 3: Support -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Support & FAQ</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">5. BROKER CHANGES & INSTALLMENTS</h2>
            <p class="doc-para"><strong>Broker Change:</strong> If your broker changes, your MT5 ID changes. You can request a broker change inside the bot (a fee applies). Admin approves and a new EA is compiled.<br><strong>Installments:</strong> Pay in installments for Lifetime access. EA delivered after final payment.</p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">6. FAQ</h2>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 12px; list-style: none; padding-left: 0;">
              <li><strong>Q: My EA shows "License Expired". What do I do?</strong><br><span style="color: var(--ink-soft);">A: Your trial or subscription has ended. Purchase a new plan from the bot.</span></li>
              <li><strong>Q: My EA shows "Invalid MT5 ID". What do I do?</strong><br><span style="color: var(--ink-soft);">A: The EA was compiled for a different MT5 ID. Use the correct account.</span></li>
              <li><strong>Q: I did not receive my file. What do I do?</strong><br><span style="color: var(--ink-soft);">A: Contact @shridharsan1 on Telegram directly.</span></li>
              <li><strong>Q: Can I use the EA on multiple accounts?</strong><br><span style="color: var(--ink-soft);">A: No. Each EA is strictly locked to one specific MT5 ID.</span></li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1</span>
          <span class="page-num-placeholder">Page 3 of 3</span>
        </div>
      </div>
    `
  },
  ea_setup_guide: {
    name: "Bot Code Setup Guide",
    fields: [
      { id: "bot_name", label: "Bot Name", type: "text", default: "InfinityTrader Bot" }
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
          <h1 class="doc-hero-title agreement-cover-title" style="font-size: 38px; line-height: 1.2;">\${data.bot_name}<br><span style="font-size: 24px; color: var(--ink-soft); font-weight: 500;">Source Code Technical Setup Guide</span></h1>
          
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
          <span>© NextGen Web Studio  •  @shridharsan1</span>
          <span class="page-num-placeholder">Page 1 of 4</span>
        </div>
      </div>

      <!-- PAGE 2: Architecture & DB -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Architecture & DB</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SYSTEM ARCHITECTURE</h2>
            <p class="doc-para">The system consists of 4 main components:</p>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 6px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Python FastAPI Backend (Render Docker)</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Python Telegram Bot (Render Python Web Service)</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Next.js Admin Web Portal (Vercel)</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Supabase (PostgreSQL + Storage)</li>
            </ul>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 1 — SUPABASE SETUP</h2>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 6px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Create a new Supabase project</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Copy the Project URL and service_role key</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Run the provided migration SQL to create all tables</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Create a storage bucket called "licenses" and set it to public</li>
            </ul>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 2 — TELEGRAM BOT SETUP</h2>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 6px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Create a new bot via BotFather (/newbot)</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Copy the bot token</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Get your Telegram Chat ID using @userinfobot</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1</span>
          <span class="page-num-placeholder">Page 2 of 4</span>
        </div>
      </div>

      <!-- PAGE 3: Render & Vercel -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Deployments</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 3 — RENDER BACKEND (DOCKER)</h2>
            <p class="doc-para">Create a Render Web Service → Deploy from GitHub (Environment: Docker, Root Directory: backend). Variables:</p>
            <div style="background: var(--bg-alt); padding: 15px; border-radius: 6px; font-family: monospace; font-size: 11px; margin-bottom: 20px;">
              DATABASE_URL = your Supabase asyncpg connection string<br>
              SUPABASE_URL = your Supabase project URL<br>
              SUPABASE_SECRET_KEY = your Supabase service_role key<br>
              ADMIN_API_KEY = any secret password you choose<br>
              TELEGRAM_WEBHOOK_URL = https://your-bot-url.onrender.com/internal/delivery
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 4 — RENDER TELEGRAM BOT (PYTHON)</h2>
            <p class="doc-para">Create a Render Web Service → Deploy from GitHub (Environment: Python, Root Directory: telegram_bot, Start Cmd: python bot.py). Variables:</p>
            <div style="background: var(--bg-alt); padding: 15px; border-radius: 6px; font-family: monospace; font-size: 11px; margin-bottom: 20px;">
              TELEGRAM_BOT_TOKEN = your BotFather token<br>
              API_BASE_URL = https://your-backend-url.onrender.com/api/v1<br>
              ADMIN_API_KEY = must match backend exactly<br>
              ADMIN_CHAT_ID = your personal Telegram numeric ID
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 5 — VERCEL FRONTEND</h2>
            <p class="doc-para">Import repo into Vercel (Root Directory: frontend). Environment Variable:</p>
            <div style="background: var(--bg-alt); padding: 15px; border-radius: 6px; font-family: monospace; font-size: 11px; margin-bottom: 20px;">
              NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com (Do NOT add /api/v1)
            </div>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1</span>
          <span class="page-num-placeholder">Page 3 of 4</span>
        </div>
      </div>

      <!-- PAGE 4: Config & Testing -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Config & Testing</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 6 — FIRST TIME SETUP</h2>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 6px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Log into Admin Web Portal using your ADMIN_API_KEY as password</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Go to EA Templates and upload your .mq5 source file</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Go to Products and create your pricing plans</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> In Telegram type /admin to configure trial settings & support username</li>
            </ul>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 7 — BRANDING CUSTOMIZATIONS</h2>
            <p class="doc-para"><strong>telegram_bot/bot.py:</strong> Replace "InfinityTrader", "NextGen Web Studio", "@shridharsan1".<br>
            <strong>frontend/src/:</strong> Replace "Infinity Trader" with your brand, swap logo/favicon.<br>
            <strong>backend/app/main.py:</strong> Replace "Infinity Trader API" with your brand.</p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 8 — TESTING CHECKLIST</h2>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 6px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Send /start to your bot on Telegram & Register</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Request a Free Trial</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Approve from Admin Web Portal</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Confirm you receive the compiled .ex5 in Telegram</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> Attach to MetaTrader 5 and confirm license validation prints correctly</li>
            </ul>
          </div>
          
          <div class="review-card" style="margin-top: 30px; text-align: center;">
            <p class="doc-para"><strong>For support contact NextGen Web Studio @shridharsan1 on Telegram.</strong></p>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1</span>
          <span class="page-num-placeholder">Page 4 of 4</span>
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

print("Templates added successfully to js/documents.js")
