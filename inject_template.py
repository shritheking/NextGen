import re
import sys

with open("js/documents.js", "r", encoding="utf-8") as f:
    content = f.read()

template_str = r'''  ea_automation_quotation: {
    name: "EA Automation System Proposal",
    fields: [
      { id: "client_name", label: "Client Name", type: "text", default: "Client Business" },
      { id: "quote_no", label: "Quotation Number", type: "text", default: "NXG-EA-AUTO-2026" },
      { id: "quote_date", label: "Date", type: "text", default: "11 / 08 / 2026" }
    ],
    render: (data) => `
      <!-- PAGE 1: Cover Page -->
      <div class="doc-page">
        <img class="watermark" src="assets/logo-icon.png" alt="Watermark">
        <div class="agreement-cover-hero" style="margin-top: 100px;">
          <div class="confidential-badge agreement-cover-badge">Premium Quotation</div>
          <div class="agreement-cover-logo" style="margin-bottom: 40px;">
            <img class="hero-icon" src="assets/logo-icon.png" alt="Icon" style="height: 50px;">
            <img class="hero-text" src="assets/logo-text.png" alt="Text" style="height: 24px;">
          </div>
          <h1 class="doc-hero-title agreement-cover-title" style="font-size: 38px; line-height: 1.2;">EA AUTOMATION, INTEGRATION &<br>DISTRIBUTION SYSTEM<br><span style="font-size: 24px; color: var(--ink-soft); font-weight: 500;">Automated EA Distribution & Telegram Management System</span></h1>
          
          <p class="doc-hero-pre agreement-cover-pre" style="color:var(--nextgen-green); margin-top: 20px; font-size: 16px;">Software Automation & Integration Proposal</p>
          
          <div class="cover-meta" style="margin-top: 60px;">
            <div class="meta-row">
              <span class="meta-label">Prepared For:</span>
              <span class="meta-value live-val" data-field="client_name" style="font-size: 20px;">\${data.client_name}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Total Project Cost:</span>
              <span class="meta-value" style="font-size: 20px; color: var(--nextgen-green);">₹1,50,000</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Reference No:</span>
              <span class="meta-value live-val" data-field="quote_no">\${data.quote_no}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Date:</span>
              <span class="meta-value live-val" data-field="quote_date">\${data.quote_date}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Prepared By:</span>
              <span class="meta-value">NextGen Web Studio</span>
            </div>
          </div>
        </div>
      </div>

      <!-- PAGE 2: Scope of Work -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-brand">
            <img class="doc-mini-icon" src="assets/logo-icon.png" alt="Icon">
            <span>NextGen Studio</span>
          </div>
          <div class="doc-header-meta">Scope of Work</div>
        </div>
        <div class="doc-content">
          <h2 class="doc-section-title">1. SCOPE OF WORK</h2>
          
          <h3>A. Telegram Bot</h3>
          <ul>
            <li>User registration/onboarding</li>
            <li>Automated welcome messages</li>
            <li>Customer information collection</li>
            <li>License/application workflow</li>
            <li>Admin approval/rejection</li>
            <li>Automated notifications</li>
            <li>User status management</li>
            <li>Broadcast functionality</li>
            <li>Custom buttons and menus</li>
          </ul>

          <h3>B. EA Automation</h3>
          <p>The client will provide the original EA/software. We will build the automation around the supplied EA for:</p>
          <ul>
            <li>Customer-specific configuration</li>
            <li>License generation/management</li>
            <li>Automated processing</li>
            <li>Customer-specific compilation where applicable</li>
            <li>Automated EA file generation</li>
            <li>EA delivery workflow</li>
            <li>License validation integration</li>
          </ul>

          <h3>C. Backend & Database</h3>
          <ul>
            <li>REST API & Database</li>
            <li>User management & License management</li>
            <li>Customer records</li>
            <li>Admin functionality & Activity/log management</li>
          </ul>

          <h3>D. Admin Panel</h3>
          <p>Admin can:</p>
          <ul>
            <li>View users & View licenses</li>
            <li>Approve/reject users</li>
            <li>Create/disable licenses</li>
            <li>Manage customers & View activity</li>
            <li>Manage bot settings & Manage EA distribution</li>
          </ul>
        </div>
        <div class="doc-footer">
          <span class="confidential-badge">CONFIDENTIAL</span>
          <span class="page-num-placeholder">Page 2</span>
        </div>
      </div>

      <!-- PAGE 3: Deployment & Documentation -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-brand">
            <img class="doc-mini-icon" src="assets/logo-icon.png" alt="Icon">
            <span>NextGen Studio</span>
          </div>
          <div class="doc-header-meta">Scope of Work</div>
        </div>
        <div class="doc-content">
          <h2 class="doc-section-title">1. SCOPE OF WORK (CONT.)</h2>
          
          <h3>E. Deployment</h3>
          <ul>
            <li>Backend deployment</li>
            <li>Telegram bot deployment</li>
            <li>Worker/automation deployment</li>
            <li>Database configuration</li>
            <li>Environment configuration</li>
            <li>Production setup</li>
          </ul>

          <h3>F. Documentation</h3>
          <ul>
            <li>Installation guide</li>
            <li>Admin guide</li>
            <li>User guide</li>
            <li>License management guide</li>
            <li>Deployment guide</li>
            <li>Troubleshooting guide</li>
          </ul>
        </div>
        <div class="doc-footer">
          <span class="confidential-badge">CONFIDENTIAL</span>
          <span class="page-num-placeholder">Page 3</span>
        </div>
      </div>

      <!-- PAGE 4: Important Clauses -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-brand">
            <img class="doc-mini-icon" src="assets/logo-icon.png" alt="Icon">
            <span>NextGen Studio</span>
          </div>
          <div class="doc-header-meta">Important Clauses</div>
        </div>
        <div class="doc-content">
          <h2 class="doc-section-title">2. IMPORTANT — CLIENT-SUPPLIED EA</h2>
          <div class="review-card" style="margin-bottom: 30px;">
            <p><strong>Client-Supplied EA</strong></p>
            <p>The EA/trading software and its underlying trading strategy will be supplied by the client. The development scope does not include creation of the EA or development of its trading strategy.</p>
            <p>Our responsibility is limited to the agreed automation, integration, licensing, distribution, Telegram bot, backend, database, compilation workflow and related infrastructure.</p>
          </div>

          <h2 class="doc-section-title">3. INTELLECTUAL PROPERTY</h2>
          
          <h3>Client-Supplied Intellectual Property</h3>
          <p>All intellectual property, source code, trading logic, algorithms, strategies, branding and materials supplied by the client remain the property of the client or their respective owner.</p>
          <p>The developer does not claim ownership of the client-supplied EA or its underlying trading strategy.</p>
          
          <h3>Developer-Created Components</h3>
          <p>Components specifically developed as part of the agreed project, including automation workflows, Telegram bot components, backend components, APIs and related configuration, will be delivered according to the agreed project and payment terms.</p>
          <p>Third-party libraries, frameworks and services remain subject to their respective licenses.</p>
        </div>
        <div class="doc-footer">
          <span class="confidential-badge">CONFIDENTIAL</span>
          <span class="page-num-placeholder">Page 4</span>
        </div>
      </div>

      <!-- PAGE 5: Software Development Agreement -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-brand">
            <img class="doc-mini-icon" src="assets/logo-icon.png" alt="Icon">
            <span>NextGen Studio</span>
          </div>
          <div class="doc-header-meta">Development Agreement</div>
        </div>
        <div class="doc-content">
          <h2 class="doc-section-title">4. SOFTWARE DEVELOPMENT AGREEMENT</h2>
          
          <table class="doc-table">
            <tbody>
              <tr>
                <td style="width: 30%;"><strong>Developer:</strong></td>
                <td>NextGen Web Studio</td>
              </tr>
              <tr>
                <td><strong>Client:</strong></td>
                <td><span class="live-val" data-field="client_name">\${data.client_name}</span></td>
              </tr>
              <tr>
                <td><strong>Project:</strong></td>
                <td>Automated EA Distribution & Telegram Management System.</td>
              </tr>
              <tr>
                <td><strong>Project Value:</strong></td>
                <td><strong>₹1,50,000</strong></td>
              </tr>
              <tr>
                <td><strong>Payment:</strong></td>
                <td>₹75,000 advance + ₹75,000 final payment</td>
              </tr>
            </tbody>
          </table>

          <h3>Development Process</h3>
          <div style="background: var(--bg-alt); padding: 20px; border-radius: 8px; border: 1px solid var(--border); font-family: var(--font-mono); font-size: 13px; text-align: center;">
            Client provides EA<br>↓<br>Requirements finalized<br>↓<br>50% advance<br>↓<br>Automation development<br>↓<br>Telegram bot<br>↓<br>Backend + database<br>↓<br>License system<br>↓<br>Compilation/distribution workflow<br>↓<br>Integration testing<br>↓<br>Client testing<br>↓<br>Final payment<br>↓<br>Final handover
          </div>
        </div>
        <div class="doc-footer">
          <span class="confidential-badge">CONFIDENTIAL</span>
          <span class="page-num-placeholder">Page 5</span>
        </div>
      </div>

      <!-- PAGE 6: Client Requirements & SRS -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-brand">
            <img class="doc-mini-icon" src="assets/logo-icon.png" alt="Icon">
            <span>NextGen Studio</span>
          </div>
          <div class="doc-header-meta">Requirements & SRS</div>
        </div>
        <div class="doc-content">
          <h2 class="doc-section-title">5. WHAT THE CLIENT MUST PROVIDE</h2>
          <p>Before development begins, collect:</p>
          <ul>
            <li><strong>EA:</strong> Original EA file, EX4 / EX5, as applicable. MQ4 / MQ5 source if the automation requires source-level compilation.</li>
            <li><strong>Configuration:</strong> Required configuration files, EA settings, Installation instructions, Any existing licensing mechanism, Broker/platform requirements.</li>
            <li><strong>Telegram:</strong> Bot requirements, Public channel/group information, VIP group information, Admin Telegram account, Required bot messages, Required buttons, User workflow.</li>
            <li><strong>Licensing:</strong> How should a customer\'s EA license be linked? (MT4/MT5 account number, License key, Customer ID, Expiry date, Account + license key)</li>
          </ul>

          <h2 class="doc-section-title">6. SOFTWARE REQUIREMENTS SPECIFICATION — SRS</h2>
          
          <div style="display: flex; gap: 20px;">
            <div style="flex: 1; background: var(--bg-alt); padding: 20px; border-radius: 8px; border: 1px solid var(--border); font-family: var(--font-mono); font-size: 12px; text-align: center;">
              <strong>User Flow</strong><br><br>User<br>↓<br>Telegram Bot<br>↓<br>Registration<br>↓<br>Required information<br>↓<br>Verification<br>↓<br>License approval<br>↓<br>EA generated/configured<br>↓<br>EA delivered<br>↓<br>Customer installs EA<br>↓<br>License server validates<br>↓<br>EA operates according to agreed licensing rules
            </div>
            <div style="flex: 1; background: var(--bg-alt); padding: 20px; border-radius: 8px; border: 1px solid var(--border); font-family: var(--font-mono); font-size: 12px; text-align: center;">
              <strong>Admin Flow</strong><br><br>Admin<br>↓<br>Admin Panel<br>↓<br>Users<br>Licenses<br>EA Requests<br>Logs<br>Settings
            </div>
          </div>
        </div>
        <div class="doc-footer">
          <span class="confidential-badge">CONFIDENTIAL</span>
          <span class="page-num-placeholder">Page 6</span>
        </div>
      </div>

      <!-- PAGE 7: Acceptance, Testing & Payment -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-brand">
            <img class="doc-mini-icon" src="assets/logo-icon.png" alt="Icon">
            <span>NextGen Studio</span>
          </div>
          <div class="doc-header-meta">Acceptance & Payment</div>
        </div>
        <div class="doc-content">
          <h2 class="doc-section-title">7. ACCEPTANCE CRITERIA</h2>
          <p>The project is considered complete when the agreed functions work, for example:</p>
          <ul>
            <li><strong>Telegram:</strong> /start, Registration, User information collection, Admin notification, Approval/rejection, Automated messages, VIP/access workflow</li>
            <li><strong>License:</strong> License creation, activation, validation, expiry, disabling, Customer mapping</li>
            <li><strong>EA Integration:</strong> Supplied EA successfully integrated, Required configuration works, Customer-specific process works, EA delivery works</li>
            <li><strong>Backend:</strong> API works, Database works, Admin functions work, Logs work</li>
          </ul>

          <h2 class="doc-section-title">8. TESTING</h2>
          <p><strong>3–5 business days UAT</strong></p>
          <p>During UAT: Bugs relating to the agreed scope will be corrected without additional development charges. But: New features, changes to requirements, new integrations or modifications to the client-supplied EA are outside the original scope and may require additional charges.</p>

          <h2 class="doc-section-title">9. FINAL PAYMENT</h2>
          <p>Once the agreed system passes testing:</p>
          <div class="review-card" style="margin-top: 15px;">
            <p><strong>PROJECT: EA AUTOMATION SYSTEM</strong></p>
            <p>Total Project Cost: ₹1,50,000</p>
            <p>Advance Received: ₹75,000</p>
            <p><strong>Final Balance: ₹75,000</strong></p>
            <p>Status: Final Delivery Pending</p>
          </div>
        </div>
        <div class="doc-footer">
          <span class="confidential-badge">CONFIDENTIAL</span>
          <span class="page-num-placeholder">Page 7</span>
        </div>
      </div>

      <!-- PAGE 8: Handover, Support & Disclaimer -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-brand">
            <img class="doc-mini-icon" src="assets/logo-icon.png" alt="Icon">
            <span>NextGen Studio</span>
          </div>
          <div class="doc-header-meta">Handover & Disclaimer</div>
        </div>
        <div class="doc-content">
          <h2 class="doc-section-title">10. FINAL HANDOVER</h2>
          <p>Your delivery folder can look like:</p>
          <pre style="background: var(--bg-alt); padding: 15px; border-radius: 8px; border: 1px solid var(--border); font-family: var(--font-mono); font-size: 12px; margin-bottom: 20px;">EA-AUTOMATION-PROJECT/
├── Telegram-Bot/
├── Backend/
├── Admin-Panel/
├── License-System/
├── Compiler-Automation/
├── Database/
├── Deployment/
├── Documentation/
│   ├── Installation-Guide.pdf
│   ├── Admin-Guide.pdf
│   ├── User-Guide.pdf
│   ├── License-Guide.pdf
│   ├── Deployment-Guide.pdf
│   └── Troubleshooting.pdf
└── README.md</pre>
          <p><em>Do not include private API keys, passwords, bot tokens or server credentials inside the ZIP.</em></p>

          <h2 class="doc-section-title">11. SUPPORT & MAINTENANCE</h2>
          <p><strong>Included:</strong> 14 days post-delivery support (Bug fixes, Installation assistance, Configuration assistance, Assistance with the delivered system).</p>
          <p><strong>Not included:</strong> New features, New Telegram workflows, New EA strategy, EA strategy modifications, New broker integration, New payment gateway, Major UI redesign, Major architectural changes. These should be separately quoted.</p>
          <p><strong>Optional Maintenance:</strong> ₹3,000/month (Includes agreed routine maintenance and technical assistance. Major feature development is charged separately).</p>

          <h2 class="doc-section-title">13. THIRD-PARTY COSTS</h2>
          <p>Hosting, VPS, domain, API services, payment gateway charges, broker/platform charges, Telegram-related third-party services and other external service costs are not included in the ₹1,50,000 development fee unless explicitly mentioned in the quotation.</p>
          
          <h2 class="doc-section-title">14. TRADING DISCLAIMER</h2>
          <p>The system is an automation and software-management solution. It does not guarantee trading profits, returns, accuracy or performance. The client is responsible for the trading strategy, EA performance, broker relationship and compliance with applicable laws, regulations and platform terms.</p>
          <p>The developer does not provide any guarantee regarding profitability or trading results of the client-supplied EA.</p>
        </div>
        <div class="doc-footer">
          <span class="confidential-badge">CONFIDENTIAL</span>
          <span class="page-num-placeholder">Page 8</span>
        </div>
      </div>

      <!-- PAGE 9: Final Acceptance Certificate -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-brand">
            <img class="doc-mini-icon" src="assets/logo-icon.png" alt="Icon">
            <span>NextGen Studio</span>
          </div>
          <div class="doc-header-meta">Acceptance Certificate</div>
        </div>
        <div class="doc-content">
          <h2 class="doc-section-title" style="text-align: center; margin-top: 40px; margin-bottom: 40px;">PROJECT ACCEPTANCE CERTIFICATE</h2>
          
          <p style="font-size: 16px; line-height: 1.8; margin-bottom: 40px;">
            I, <strong><span class="live-val" data-field="client_name">\${data.client_name}</span></strong>, confirm that the agreed <strong>Automated EA Distribution & Telegram Management System</strong> has been delivered according to the approved project scope.
          </p>

          <table class="doc-table" style="width: 80%; margin: 0 auto 40px auto;">
            <tbody>
              <tr>
                <td><strong>Total Project Value:</strong></td>
                <td>₹1,50,000</td>
              </tr>
              <tr>
                <td><strong>Advance Paid:</strong></td>
                <td>₹75,000</td>
              </tr>
              <tr>
                <td><strong>Final Payment:</strong></td>
                <td>₹75,000</td>
              </tr>
            </tbody>
          </table>

          <p style="font-size: 16px; line-height: 1.8; margin-bottom: 60px;">
            The client confirms acceptance of the agreed deliverables and understands that future feature additions or scope changes may be charged separately.
          </p>

          <div style="display: flex; justify-content: space-between; margin-top: 60px;">
            <div style="width: 45%;">
              <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 10px; min-height: 30px;">
                <span class="live-val" data-field="client_name" style="font-weight: 600;">\${data.client_name}</span>
              </div>
              <p style="color: var(--ink-soft); font-size: 14px;">Client Name</p>
            </div>
            <div style="width: 45%;">
              <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 10px; min-height: 30px;"></div>
              <p style="color: var(--ink-soft); font-size: 14px;">Date</p>
            </div>
          </div>
          
          <div style="margin-top: 60px; width: 45%;">
             <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 10px; min-height: 50px;"></div>
             <p style="color: var(--ink-soft); font-size: 14px;">Signature / Confirmation</p>
          </div>
        </div>
        <div class="doc-footer">
          <span class="confidential-badge">CONFIDENTIAL</span>
          <span class="page-num-placeholder">Page 9</span>
        </div>
      </div>
    `
  },
'''

# Find the injection point: before the last "};" which concludes the templates object
# We'll just look for:
#   const templateSelector = document.getElementById("docTemplateSelector");
# The end of the templates object is exactly before that.

index = content.find("const templateSelector = document.getElementById")
if index == -1:
    print("Could not find insertion point.")
    sys.exit(1)

# Find the closing brace of the templates object
# Typically it's "};\n\n" right before the index.
brace_index = content.rfind("};", 0, index)
if brace_index == -1:
    print("Could not find closing brace.")
    sys.exit(1)

new_content = content[:brace_index] + ",\n" + template_str + content[brace_index:]

with open("js/documents.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Template appended successfully.")
