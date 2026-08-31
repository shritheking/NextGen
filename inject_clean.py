import re

template_str = r'''
  ea_mq5_guide: {
    name: "MQ5 Code Integration Guide",
    fields: [
      { id: "bot_name", label: "Bot Name", type: "text", default: "Infinity Trader EA" }
    ],
    render: (data) => `
      <!-- PAGE 1: Cover Page -->
      <div class="doc-page">
        <img class="watermark" src="assets/logo-icon.png" alt="Watermark">
        <div class="agreement-cover-hero" style="margin-top: 100px;">
          <div class="confidential-badge agreement-cover-badge">Integration Guide</div>
          <div class="agreement-cover-logo" style="margin-bottom: 40px;">
            <img class="hero-icon" src="assets/logo-icon.png" alt="Icon" style="height: 50px;">
            <img class="hero-text" src="assets/logo-text.png" alt="Text" style="height: 24px;">
          </div>
          <h1 class="doc-hero-title agreement-cover-title" style="font-size: 38px; line-height: 1.2;">${data.bot_name}<br><span style="font-size: 24px; color: var(--ink-soft); font-weight: 500;">MQ5 Code Integration Guide</span></h1>
          
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

      <!-- PAGE 2: The Two Required Lines -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Variable Declarations</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 1 — THE TWO REQUIRED LINES</h2>
            <p class="doc-para">The licensing system automatically injects the buyer's MT5 Account ID and license expiry date at compile time.</p>
            <p class="doc-para">These exact two lines must exist somewhere in your .mq5 file (usually near the top with other variable declarations):</p>
            
            <div class="review-card" style="margin-top: 15px; border-left: 4px solid var(--nextgen-green);">
              <p class="doc-para" style="margin-bottom: 5px;"><strong>Line 1 — MT5 ID Lock:</strong></p>
              <div style="background: var(--bg-alt); padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; color: var(--nextgen-green);">
                int ALLOWED_MT5_ID = 0;
              </div>
            </div>

            <div class="review-card" style="margin-top: 15px; border-left: 4px solid var(--nextgen-green);">
              <p class="doc-para" style="margin-bottom: 5px;"><strong>Line 2 — Expiry Date Lock:</strong></p>
              <div style="background: var(--bg-alt); padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; color: var(--nextgen-green);">
                datetime LICENSE_EXPIRY = D'2099.01.01';
              </div>
            </div>

            <h3 style="font-family: var(--font-mono); font-size: 13px; color: var(--accent); margin-bottom: 8px; margin-top: 20px;">EXPLANATION</h3>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 8px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> These are the ONLY two lines the licensing system touches.</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> The system automatically replaces the <code>0</code> and the date at compile time.</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> You must <strong>NOT</strong> rename these variables — the names must be exactly as shown.</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> The values (<code>0</code> and <code>2099.01.01</code>) are just placeholders.</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Confidential</span>
          <span class="page-num-placeholder">Page 2 of 5</span>
        </div>
      </div>

      <!-- PAGE 3: The License Check Code -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Validation Logic</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 2 — THE REQUIRED LICENSE CHECK CODE</h2>
            <p class="doc-para">You must add this license validation block inside your EA's <code>OnInit()</code> or <code>OnTick()</code> function:</p>
            
            <div class="review-card" style="margin-top: 15px; border-left: 4px solid var(--nextgen-green);">
              <div style="background: var(--bg-alt); padding: 15px; border-radius: 6px; font-family: monospace; font-size: 11px; white-space: pre; overflow-x: hidden;">
// ── License Check ──────────────────────────────────────────
int currentAccount = (int)AccountInfoInteger(ACCOUNT_LOGIN);
if(currentAccount != ALLOWED_MT5_ID)
  {
   Print("❌ Invalid MT5 ID. This EA is not licensed for this account.");
   ExpertRemove();
   return INIT_FAILED;
  }
if(TimeCurrent() > LICENSE_EXPIRY)
  {
   Print("❌ License Expired. Please renew via the bot.");
   ExpertRemove();
   return INIT_FAILED;
  }
Print("✅ License Validated! MT5 ID: ", currentAccount, " | Expiry: ", LICENSE_EXPIRY);
// ──────────────────────────────────────────────────────────
              </div>
            </div>

            <h3 style="font-family: var(--font-mono); font-size: 13px; color: var(--accent); margin-bottom: 8px; margin-top: 20px;">EXPLANATION</h3>
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 8px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> This block checks that the account ID matches and the license has not expired.</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> If either check fails, the EA removes itself automatically (<code>ExpertRemove()</code>).</li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> The <code>Print()</code> messages will appear in the MT5 Experts log tab.</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Confidential</span>
          <span class="page-num-placeholder">Page 3 of 5</span>
        </div>
      </div>

      <!-- PAGE 4: Placement & Warnings -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Code Placement</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 3 — WHERE TO PLACE THE CODE</h2>
            <p class="doc-para">In your uploaded .mq5 file, ensure the components are correctly placed:</p>
            
            <div class="review-card" style="margin-top: 15px; border-left: 4px solid #ef4444; background: rgba(239, 68, 68, 0.05);">
              <p class="doc-para" style="margin-bottom: 5px;"><strong style="color: #ef4444;">WARNING — IF MISSING:</strong></p>
              <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 8px; list-style: none; padding-left: 0;">
                <li><i class="fa-solid fa-triangle-exclamation" style="color: #ef4444; margin-right: 6px;"></i> Add <code>ALLOWED_MT5_ID</code> at the top of your file (Global Scope).</li>
                <li><i class="fa-solid fa-triangle-exclamation" style="color: #ef4444; margin-right: 6px;"></i> Add <code>LICENSE_EXPIRY</code> at the top of your file (Global Scope).</li>
                <li><i class="fa-solid fa-triangle-exclamation" style="color: #ef4444; margin-right: 6px;"></i> Add the validation block directly inside <code>int OnInit()</code> or <code>void OnTick()</code>.</li>
              </ul>
            </div>
          </div>

          <div class="doc-section" style="margin-top: 30px;">
            <h2 class="doc-section-title">SECTION 4 — WHAT NOT TO CHANGE</h2>
            
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 8px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-xmark" style="color: #ef4444; margin-right: 6px;"></i> Do <strong>NOT</strong> rename <code>ALLOWED_MT5_ID</code></li>
              <li><i class="fa-solid fa-xmark" style="color: #ef4444; margin-right: 6px;"></i> Do <strong>NOT</strong> rename <code>LICENSE_EXPIRY</code></li>
              <li><i class="fa-solid fa-xmark" style="color: #ef4444; margin-right: 6px;"></i> Do <strong>NOT</strong> remove the license check block</li>
              <li><i class="fa-solid fa-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> You <strong>CAN</strong> freely change everything else in your EA (strategy logic, indicators, etc.)</li>
              <li><i class="fa-solid fa-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> You <strong>CAN</strong> change the <code>Print()</code> messages text — only the variable names must stay the same</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Confidential</span>
          <span class="page-num-placeholder">Page 4 of 5</span>
        </div>
      </div>

      <!-- PAGE 5: Checklist -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">Pre-Flight Checklist</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 5 — QUICK CHECKLIST</h2>
            <p class="doc-para">Complete this checklist before uploading to the Admin Portal:</p>
            
            <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr; gap: 12px; list-style: none; padding-left: 0;">
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>1.</strong> Confirm <code>ALLOWED_MT5_ID</code> is declared as: <code style="color:var(--nextgen-green);">int ALLOWED_MT5_ID = 0;</code></li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>2.</strong> Confirm <code>LICENSE_EXPIRY</code> is declared as: <code style="color:var(--nextgen-green);">datetime LICENSE_EXPIRY = D'2099.01.01';</code></li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>3.</strong> Confirm the license check block exists inside <code>OnInit()</code> or <code>OnTick()</code></li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>4.</strong> Save the file as <code>bot.mq5</code></li>
              <li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> <strong>5.</strong> Upload the file in the Admin Web Portal under EA Templates → Upload New Version</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>© NextGen Web Studio  •  @shridharsan1  •  Confidential</span>
          <span class="page-num-placeholder">Page 5 of 5</span>
        </div>
      </div>
    `
  }
'''

with open("js/documents.js", "r", encoding="utf-8") as f:
    content = f.read()

index = content.find("const templateSelector = document.getElementById")
if index == -1:
    print("Could not find insertion point!")
    exit(1)

brace_index = content.rfind("};", 0, index)

# Avoid comma issues
new_content = content[:brace_index] + ",\n" + template_str + content[brace_index:]

with open("js/documents.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Safely injected MQ5 Guide into documents.js")
