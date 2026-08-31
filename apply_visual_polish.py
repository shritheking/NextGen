import os

with open("telegram-bot-development.html", "r", encoding="utf-8") as f:
    content = f.read()

def replace_between(html, start_str, end_str, new_content):
    if start_str not in html: return html
    start_idx = html.find(start_str)
    end_idx = html.find(end_str, start_idx)
    if end_idx != -1:
        return html[:start_idx] + new_content + html[end_idx:]
    return html

# 1. Update Terminal Panel (Alive)
old_term = """<div class="term-line output" style="color: var(--accent);">BOT STATUS</div>
                <div class="term-line output">? ONLINE</div>
                <div class="term-line">&nbsp;</div>
                <div class="term-line output" style="color: var(--ink-faint);">/start</div>
                <div class="term-line output" style="color: var(--ink-faint);">/order</div>
                <div class="term-line output" style="color: var(--ink-faint);">/status</div>
                <div class="term-line output" style="color: var(--ink-faint);">/support</div>
                <div class="term-line">&nbsp;</div>"""

new_term = """<style>
                  .term-blink { animation: blink 1s step-end infinite; }
                  @keyframes blink { 50% { opacity: 0; } }
                  .status-pulse {
                    display: inline-block; width: 8px; height: 8px; background-color: #4ADE80;
                    border-radius: 50%; margin-right: 8px; box-shadow: 0 0 8px #4ADE80;
                    animation: pulse-glow 2s infinite;
                  }
                  @keyframes pulse-glow {
                    0% { box-shadow: 0 0 4px #4ADE80; opacity: 0.8; }
                    50% { box-shadow: 0 0 12px #4ADE80; opacity: 1; }
                    100% { box-shadow: 0 0 4px #4ADE80; opacity: 0.8; }
                  }
                </style>
                <div class="term-line output" style="color: var(--accent);">BOT STATUS</div>
                <div class="term-line output" style="display: flex; align-items: center;"><span class="status-pulse"></span> ONLINE</div>
                <div class="term-line">&nbsp;</div>
                <div class="term-line output" style="color: var(--ink-faint);">> Loading commands...</div>
                <div class="term-line output" style="color: var(--ink-soft); margin-left: 10px;">/start</div>
                <div class="term-line output" style="color: var(--ink-soft); margin-left: 10px;">/order</div>
                <div class="term-line output" style="color: var(--ink-soft); margin-left: 10px;">/status</div>
                <div class="term-line output" style="color: var(--ink-soft); margin-left: 10px;">/support</div>
                <div class="term-line">&nbsp;</div>"""
content = content.replace(old_term, new_term)

# Add blinking cursor to the end of the terminal
term_end = """<div class="term-line output">WEBHOOK ............. <span style="color: #4ADE80;">ACTIVE</span></div>
              </div>"""
term_end_new = """<div class="term-line output">WEBHOOK ............. <span style="color: #4ADE80;">ACTIVE</span></div>
                <div class="term-line">&nbsp;</div>
                <div class="term-line output"><span style="color: var(--accent);">nextgen@server:~$</span> <span class="term-blink" style="background: var(--ink); width: 8px; height: 15px; display: inline-block; vertical-align: middle;"></span></div>
              </div>"""
content = content.replace(term_end, term_end_new)


# 2. Add visual separation and section tightness
# Workflow bg
content = content.replace('<section class="block" id="workflow">', '<section class="block" id="workflow" style="background-color: var(--bg-alt);">')
# Tech Stack tightening
content = content.replace('<section class="block" id="tech-stack" style="padding-bottom: 30px; border-bottom: none;">', '<section class="block" id="tech-stack" style="padding-bottom: 60px; border-bottom: none;">')
# Case study tightening and bg
content = content.replace('<section class="block" id="case-study" style="padding-top: 30px; border-top: none;">', '<section class="block" id="case-study" style="padding-top: 40px; padding-bottom: 80px; border-top: 1px dashed var(--border); background-color: var(--bg-alt);">')

# 3. Capability Cards 01-08 (add icons, hover glow, equal height)
old_services = '<div class="services-grid">'
new_services = """<style>
        .service-card {
          height: 100%;
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        .service-card:hover {
          border-color: var(--accent);
          box-shadow: 0 8px 30px rgba(224, 255, 79, 0.05);
          transform: translateY(-4px);
        }
      </style>
      <div class="services-grid">
        <div class="service-card" style="grid-column: span 6;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); color: var(--accent); font-size: 13px; font-weight: 700; border: 1px solid var(--accent); padding: 4px 10px; border-radius: 20px; background: rgba(224,255,79,0.05);">01</div>
            <i class="fa-solid fa-robot" style="font-size: 24px; color: var(--ink-faint);"></i>
          </div>
          <h3 style="margin-bottom: 12px; font-size: 20px;">Custom Telegram Bots</h3>
          <p style="margin-bottom: 0;">Bots designed around your exact business workflow and specific industry needs.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); color: var(--accent); font-size: 13px; font-weight: 700; border: 1px solid var(--accent); padding: 4px 10px; border-radius: 20px; background: rgba(224,255,79,0.05);">02</div>
            <i class="fa-solid fa-gears" style="font-size: 24px; color: var(--ink-faint);"></i>
          </div>
          <h3 style="margin-bottom: 12px; font-size: 20px;">Business Automation</h3>
          <p style="margin-bottom: 0;">Automate repetitive tasks, team notifications, and internal company workflows.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); color: var(--accent); font-size: 13px; font-weight: 700; border: 1px solid var(--accent); padding: 4px 10px; border-radius: 20px; background: rgba(224,255,79,0.05);">03</div>
            <i class="fa-solid fa-credit-card" style="font-size: 24px; color: var(--ink-faint);"></i>
          </div>
          <h3 style="margin-bottom: 12px; font-size: 20px;">Payment Bots</h3>
          <p style="margin-bottom: 0;">Accept Razorpay/Stripe payments, handle order confirmation, and automated receipts.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); color: var(--accent); font-size: 13px; font-weight: 700; border: 1px solid var(--accent); padding: 4px 10px; border-radius: 20px; background: rgba(224,255,79,0.05);">04</div>
            <i class="fa-solid fa-plug" style="font-size: 24px; color: var(--ink-faint);"></i>
          </div>
          <h3 style="margin-bottom: 12px; font-size: 20px;">API Integrations</h3>
          <p style="margin-bottom: 0;">Connect Telegram directly with your existing websites, CRMs, APIs and SaaS tools.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); color: var(--accent); font-size: 13px; font-weight: 700; border: 1px solid var(--accent); padding: 4px 10px; border-radius: 20px; background: rgba(224,255,79,0.05);">05</div>
            <i class="fa-solid fa-database" style="font-size: 24px; color: var(--ink-faint);"></i>
          </div>
          <h3 style="margin-bottom: 12px; font-size: 20px;">Database Systems</h3>
          <p style="margin-bottom: 0;">Robust PostgreSQL data structures for user, order, license and application state management.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); color: var(--accent); font-size: 13px; font-weight: 700; border: 1px solid var(--accent); padding: 4px 10px; border-radius: 20px; background: rgba(224,255,79,0.05);">06</div>
            <i class="fa-solid fa-shield-halved" style="font-size: 24px; color: var(--ink-faint);"></i>
          </div>
          <h3 style="margin-bottom: 12px; font-size: 20px;">Admin Bots</h3>
          <p style="margin-bottom: 0;">Securely manage users, ban accounts, review orders, and monitor operations directly via Telegram.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); color: var(--accent); font-size: 13px; font-weight: 700; border: 1px solid var(--accent); padding: 4px 10px; border-radius: 20px; background: rgba(224,255,79,0.05);">07</div>
            <i class="fa-solid fa-headset" style="font-size: 24px; color: var(--ink-faint);"></i>
          </div>
          <h3 style="margin-bottom: 12px; font-size: 20px;">Customer Support</h3>
          <p style="margin-bottom: 0;">Interactive navigation menus, dynamic FAQs, ticket routing systems and automated responses.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); color: var(--accent); font-size: 13px; font-weight: 700; border: 1px solid var(--accent); padding: 4px 10px; border-radius: 20px; background: rgba(224,255,79,0.05);">08</div>
            <i class="fa-solid fa-chart-line" style="font-size: 24px; color: var(--ink-faint);"></i>
          </div>
          <h3 style="margin-bottom: 12px; font-size: 20px;">Trading Integrations</h3>
          <p style="margin-bottom: 0;">Real-time Telegram notifications, secure license delivery, and MT5-related backend automation.</p>
        </div>"""
content = replace_between(content, '<div class="services-grid">', '      </div>\n    </section>', new_services)

# 4. Workflow Timeline styling
workflow_style = """<style>
      .process-list {
        position: relative;
      }
      .process-list::before {
        content: '';
        position: absolute;
        top: 20px;
        bottom: 20px;
        left: 17px;
        width: 2px;
        background: var(--border);
        z-index: 0;
      }
      .process-item {
        position: relative;
        z-index: 1;
        margin-bottom: 30px;
      }
      .process-node {
        position: absolute;
        left: 0;
        top: 0;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 2px solid var(--accent);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-mono);
        font-size: 13px;
        font-weight: 700;
        color: var(--accent);
        z-index: 2;
      }
      .process-content {
        margin-left: 60px;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 24px;
        transition: all 0.3s ease;
      }
      .process-item:hover .process-content {
        border-color: var(--accent);
      }
      </style>
      <div class="process-list">"""
content = content.replace('<div class="process-list">', workflow_style)

# 5. Fix Pricing Flow (CTA -> Pricing -> Contact)
# Wait, currently it is Pricing -> CTA -> Contact. The user said:
# "Right now it flows: Capabilities → Workflow → Tech Stack → Case Study → CTA → Pricing → Contact. Putting a big 'HAVE A BOT IDEA?' CTA before pricing (if you keep it) undercuts its own urgency"
# Since I added Pricing ABOVE CTA in my last script, the order is currently: Case Study -> Pricing -> CTA -> Contact.
# Wait, let me check the actual order in the HTML right now.
# `<section id="case-study">` ends, then `<section id="pricing">`, then `<!-- Contact Form Section -->`. Wait, where is `telegram-cta`?
# I placed Pricing right before Contact. So it goes Case Study -> CTA -> Pricing -> Contact?
# I need to ensure it is Case Study -> Pricing -> CTA -> Contact.
# Let's extract CTA, Pricing, and Contact and reorder them explicitly.

def extract_section(html, section_id):
    start_tag = f'<section class="block" id="{section_id}"'
    if start_tag not in html: return ""
    start_idx = html.find(start_tag)
    end_idx = html.find('</section>', start_idx) + 10
    return html[start_idx:end_idx]

pricing_sec = extract_section(content, 'pricing')
cta_sec = extract_section(content, 'telegram-cta')
contact_sec = extract_section(content, 'contact')

if pricing_sec and cta_sec and contact_sec:
    # Remove them all
    content = content.replace(pricing_sec, '')
    content = content.replace(cta_sec, '')
    content = content.replace(contact_sec, '')
    # Append them in the correct order: Pricing -> CTA -> Contact
    # Actually wait, CTA is just a title "HAVE A BOT IDEA?" and a button to Contact.
    # If the user clicks CTA, they jump to Contact.
    # It should be: Pricing -> CTA -> Contact
    content = content.replace('    <!-- Contact Form Section -->', pricing_sec + '\n' + cta_sec + '\n    <!-- Contact Form Section -->\n' + contact_sec)

# 6. Add Micro-interactions (Fade In script)
fade_script = """  <!-- Scroll Animation Script -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.block').forEach(block => {
        if(block.id !== 'home') { // Don't animate hero
          block.style.opacity = '0';
          block.style.transform = 'translateY(20px)';
          block.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          observer.observe(block);
        }
      });
    });
  </script>
</body>"""
content = content.replace('</body>', fade_script)

with open("telegram-bot-development.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Visual polish applied.")
