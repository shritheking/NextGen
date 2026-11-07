import re

# Read documents.js
with open('js/documents.js', 'r', encoding='utf-8') as f:
    docs_js = f.read()

# Create the new template string
new_template = """
  ea_license_integration: {
    name: "License Integration Instructions",
    fields: [
      { id: "bot_name", label: "Bot Name", type: "text", default: "Infinity Trend V4" }
    ],
    render: (data) => `
      <!-- PAGE 1: Cover Page -->
      <div class="doc-page">
        <img class="watermark" src="assets/logo-icon.png" alt="Watermark">
        <div class="agreement-cover-hero" style="margin-top: 100px;">
          <div class="confidential-badge agreement-cover-badge">INTEGRATION GUIDE</div>
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
          <span>&copy; NextGen Web Studio • @shridharsan1 • Confidential</span>
          <span class="page-num-placeholder">Page 1 of 5</span>
        </div>
      </div>

      <!-- PAGE 2: Variable Declarations -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">VARIABLE DECLARATIONS</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 1 — THE TWO REQUIRED LINES</h2>
            
            <p class="doc-para">Your EA already has its own expiry system using these lines:</p>
            <div style="background: var(--bg-alt); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid #EF4444; margin-bottom: 20px;">
              <div style="font-family: var(--font-mono); font-size: 11.5px; color: var(--ink-soft);">
                <strong>Line 186:</strong> <span style="text-decoration: line-through;">string expdate = "2026.06.03 00:00:01";</span><br>
                <strong>Line 187:</strong> <span style="text-decoration: line-through;">bool validationcheck = false;</span>
              </div>
            </div>

            <p class="doc-para">The licensing system automatically injects the buyer's MT5 Account ID and license expiry date at compile time. These exact two lines must exist somewhere in your .mq5 file (usually near the top with other variable declarations):</p>
            
            <p class="doc-para" style="font-weight: 600; margin-bottom: 8px;">Line 1 — MT5 ID Lock:</p>
            <div class="code-block-wrapper" style="margin-bottom: 20px; border-radius: var(--radius-sm); border-left: 3px solid var(--nextgen-green);">
              <pre class="doc-code-block" style="margin: 0; padding: 12px; background: var(--ink); color: #fff; font-size: 12px;"><code class="language-cpp" style="color: var(--nextgen-green);">int ALLOWED_MT5_ID = 0;</code></pre>
            </div>
            
            <p class="doc-para" style="font-weight: 600; margin-bottom: 8px;">Line 2 — Expiry Date Lock:</p>
            <div class="code-block-wrapper" style="margin-bottom: 20px; border-radius: var(--radius-sm); border-left: 3px solid var(--nextgen-green);">
              <pre class="doc-code-block" style="margin: 0; padding: 12px; background: var(--ink); color: #fff; font-size: 12px;"><code class="language-cpp" style="color: var(--nextgen-green);">datetime LICENSE_EXPIRY = D'2099.01.01';</code></pre>
            </div>

            <p class="doc-para" style="color: var(--nextgen-green); font-family: var(--font-mono); font-size: 12px; margin-top: 30px; margin-bottom: 10px;">EXPLANATION</p>
            <ul class="work-metrics" style="font-size: 12.5px; list-style: none; padding-left: 0;">
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> These are the ONLY two lines the licensing system touches.</li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> The system automatically replaces the 0 and the date at compile time.</li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> You must <strong>NOT</strong> rename these variables — the names must be exactly as shown.</li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> The values (0 and 2099.01.01) are just placeholders.</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>&copy; NextGen Web Studio • @shridharsan1 • Confidential</span>
          <span class="page-num-placeholder">Page 2 of 5</span>
        </div>
      </div>

      <!-- PAGE 3: Validation Logic -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">VALIDATION LOGIC</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 2 — THE REQUIRED LICENSE CHECK CODE</h2>
            <p class="doc-para">Delete your old expiry check inside <code>OnInit()</code> and replace it with this license validation block:</p>

            <div class="code-block-wrapper" style="margin-bottom: 20px; border-radius: var(--radius-sm); border-left: 3px solid var(--nextgen-green);">
              <pre class="doc-code-block" style="margin: 0; padding: 20px; background: var(--ink); color: #fff; font-size: 11.5px; line-height: 1.6;"><code class="language-cpp">// ── License Check ──────────────────────────────────────────
int currentAccount = (int)AccountInfoInteger(ACCOUNT_LOGIN);
if(currentAccount != ALLOWED_MT5_ID)
{
   Print("❌ Invalid MT5 ID. This EA is not licensed.");
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
// ──────────────────────────────────────────────────────────</code></pre>
            </div>

            <p class="doc-para" style="color: var(--nextgen-green); font-family: var(--font-mono); font-size: 12px; margin-top: 30px; margin-bottom: 10px;">EXPLANATION</p>
            <ul class="work-metrics" style="font-size: 12.5px; list-style: none; padding-left: 0;">
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> This block checks that the account ID matches and the license has not expired.</li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> If either check fails, the EA removes itself automatically (<code>ExpertRemove()</code>).</li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> The <code>Print()</code> messages will appear in the MT5 Experts log tab.</li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>&copy; NextGen Web Studio • @shridharsan1 • Confidential</span>
          <span class="page-num-placeholder">Page 3 of 5</span>
        </div>
      </div>

      <!-- PAGE 4: Pre-Flight Checklist -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="header-text" src="assets/logo-text.png" alt="NextGen">
          </div>
          <div class="doc-header-meta">PRE-FLIGHT CHECKLIST</div>
        </div>
        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">SECTION 3 — WHAT NOT TO CHANGE</h2>
            
            <ul class="work-metrics" style="font-size: 13px; list-style: none; padding-left: 0; margin-bottom: 30px;">
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-xmark" style="color: #EF4444; margin-right: 8px;"></i> Do <strong>NOT</strong> rename <code>ALLOWED_MT5_ID</code></li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-xmark" style="color: #EF4444; margin-right: 8px;"></i> Do <strong>NOT</strong> rename <code>LICENSE_EXPIRY</code></li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-xmark" style="color: #EF4444; margin-right: 8px;"></i> Do <strong>NOT</strong> remove the license check block</li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> You <strong>CAN</strong> freely change everything else in your EA (strategy logic, indicators, etc.)</li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> You <strong>CAN</strong> change the <code>Print()</code> messages text — only the variable names must stay the same</li>
            </ul>

            <h2 class="doc-section-title">SECTION 4 — QUICK CHECKLIST</h2>
            <p class="doc-para">Complete this checklist before uploading to the Admin Portal:</p>
            
            <ul class="work-metrics" style="font-size: 13px; list-style: none; padding-left: 0;">
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> 1. Confirm <code>ALLOWED_MT5_ID</code> is declared as: <code style="color: var(--nextgen-green);">int ALLOWED_MT5_ID = 0;</code></li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> 2. Confirm <code>LICENSE_EXPIRY</code> is declared as: <code style="color: var(--nextgen-green);">datetime LICENSE_EXPIRY = D'2099.01.01';</code></li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> 3. Confirm the license check block exists inside <code>OnInit()</code> or <code>OnTick()</code></li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> 4. Save the file as <code>bot.mq5</code></li>
              <li style="margin-bottom: 10px;"><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 8px;"></i> 5. Upload the file in the Admin Web Portal under <strong>EA Templates &rarr; Upload New Version</strong></li>
            </ul>
          </div>
        </div>
        <div class="doc-footer">
          <span>&copy; NextGen Web Studio • @shridharsan1 • Confidential</span>
          <span class="page-num-placeholder">Page 4 of 5</span>
        </div>
      </div>
    `
  },
"""

# Insert into the templates object right before "ea_setup_guide: {"
if "ea_setup_guide: {" in docs_js:
    docs_js = docs_js.replace("ea_setup_guide: {", new_template + "ea_setup_guide: {")
    with open('js/documents.js', 'w', encoding='utf-8') as f:
        f.write(docs_js)
    print("Added ea_license_integration to js/documents.js")

# Now update admin.html to add the option to the dropdown
with open('admin.html', 'r', encoding='utf-8') as f:
    admin_html = f.read()

new_option = '<option value="ea_license_integration">EA License Integration Guide</option>\n                  <option value="ea_setup_guide">Bot Code Setup Guide</option>'
if '<option value="ea_setup_guide">Bot Code Setup Guide</option>' in admin_html:
    admin_html = admin_html.replace('<option value="ea_setup_guide">Bot Code Setup Guide</option>', new_option)
    with open('admin.html', 'w', encoding='utf-8') as f:
        f.write(admin_html)
    print("Added ea_license_integration to admin.html dropdown")
