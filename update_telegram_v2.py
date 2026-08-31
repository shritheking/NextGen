import os

with open("telegram-bot-development.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update SEO Metadata
content = content.replace(
    '<title>Telegram Bot Development | NextGen Web Studio</title>',
    '<title>Telegram Bot Development Services | NextGen Web Studio</title>'
)
content = content.replace(
    '<meta name="description" content="Custom Telegram bots, business automation, payment integrations, APIs and workflow automation built by NextGen Web Studio.">',
    '<meta name="description" content="Custom Telegram bot development \u2014 automation, payments, admin panels, and API integrations. Built and deployed by NextGen Web Studio, Coimbatore.">'
)
content = content.replace(
    '<meta name="keywords" content="Website Development, Web Design, Next.js, React, Node.js, Coimbatore, AI Website, Freelance Web Developer">',
    '<meta name="keywords" content="Telegram Bot Development, Custom Telegram Bots, Automation Bots, Python Bot Developer, NextGen Web Studio, Bot Integration, Payment Bots">'
)
content = content.replace(
    '<meta property="og:title" content="NextGen Web Studio">',
    '<meta property="og:title" content="Telegram Bot Development Services | NextGen Web Studio">'
)
content = content.replace(
    '<meta property="og:description" content="Professional Website Development Company">',
    '<meta property="og:description" content="Custom Telegram bot development \u2014 automation, payments, admin panels, and API integrations. Built and deployed by NextGen Web Studio, Coimbatore.">'
)
content = content.replace(
    '<meta name="twitter:title" content="NextGen Web Studio | Website Development Company in Coimbatore">',
    '<meta name="twitter:title" content="Telegram Bot Development Services | NextGen Web Studio">'
)
content = content.replace(
    '<meta name="twitter:description" content="Custom Telegram bots, business automation, payment integrations, APIs and workflow automation built by NextGen Web Studio.">',
    '<meta name="twitter:description" content="Custom Telegram bot development \u2014 automation, payments, admin panels, and API integrations. Built and deployed by NextGen Web Studio, Coimbatore.">'
)
content = content.replace(
    '<link rel="canonical" href="https://nextgenwebstudio.in/">',
    '<link rel="canonical" href="https://nextgenwebstudio.in/telegram-bot-development.html">'
)

# 2. Add Live Demo Bot Link
old_hero_actions = """          <div class="hero-actions" style="display: flex; gap: 16px;">
            <a href="#contact?service=Telegram+Bot" class="btn-primary" onclick="document.querySelector('[data-value=\\'Telegram Bot\\']').click();">start a project <i class="fa-solid fa-arrow-right"></i></a>
            <a href="#capabilities" class="btn-ghost">view capabilities</a>
          </div>"""

new_hero_actions = """          <div class="hero-actions" style="display: flex; gap: 16px;">
            <a href="#contact?service=Telegram+Bot" class="btn-primary" onclick="document.querySelector('[data-value=\\'Telegram Bot\\']').click();">start a project <i class="fa-solid fa-arrow-right"></i></a>
            <a href="#capabilities" class="btn-ghost">view capabilities</a>
            <a href="https://t.me/your_demo_bot" target="_blank" class="btn-ghost" style="border-color: #0088cc; color: #0088cc;"><i class="fa-brands fa-telegram" style="margin-right: 8px;"></i> chat with demo bot</a>
          </div>"""
content = content.replace(old_hero_actions, new_hero_actions)

# 3. Add Social Proof and fix Case Study architecture DOM to render ONCE and in the exact logical order
old_case_study_start = '<div class="glass-panel" style="padding: 40px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card);">'

def remove_between(html, start_str, end_str):
    if start_str not in html: return html
    start_idx = html.find(start_str)
    end_idx = html.find(end_str, start_idx)
    if end_idx != -1:
        end_idx += len(end_str)
        return html[:start_idx] + html[end_idx:]
    return html

# We will rewrite the entire case study glass panel
new_case_study_glass_panel = """<div class="social-proof-banner" style="display: flex; align-items: center; justify-content: center; gap: 40px; margin-bottom: 40px; flex-wrap: wrap;">
        <div style="text-align: center;">
          <div style="font-size: 28px; font-weight: 700; color: var(--ink); font-family: var(--font-display);">15+</div>
          <div style="font-size: 12px; color: var(--ink-soft); font-family: var(--font-mono); text-transform: uppercase;">Bots Deployed</div>
        </div>
        <div style="width: 1px; height: 30px; background: var(--border);"></div>
        <div style="text-align: center;">
          <div style="font-size: 28px; font-weight: 700; color: var(--ink); font-family: var(--font-display);">100%</div>
          <div style="font-size: 12px; color: var(--ink-soft); font-family: var(--font-mono); text-transform: uppercase;">Uptime Guarantee</div>
        </div>
        <div style="width: 1px; height: 30px; background: var(--border);"></div>
        <div style="text-align: center;">
          <div style="font-size: 28px; font-weight: 700; color: var(--ink); font-family: var(--font-display);">500k+</div>
          <div style="font-size: 12px; color: var(--ink-soft); font-family: var(--font-mono); text-transform: uppercase;">Tasks Automated</div>
        </div>
      </div>

      <div class="glass-panel" style="padding: 40px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card);">
        <p style="margin-bottom: 40px; font-size: 15.5px; color: var(--ink-soft); line-height: 1.6; text-align: center; max-width: 700px; margin-left: auto; margin-right: auto;">
          A Telegram-based license automation system that handles customer information, license generation, automated MQ5 → EX5 compilation and secure file delivery. 
          <br><br>
          <span style="font-size: 13px; opacity: 0.7;"><em>Note: Trading EA logic is supplied separately.</em></span>
        </p>
        
        <style>
          .arch-node {
            padding: 12px 20px;
            border-radius: 8px;
            background: var(--bg-alt);
            border: 1px solid var(--border);
            font-family: var(--font-mono);
            font-size: 13px;
            color: var(--ink);
            text-align: center;
            white-space: nowrap;
            flex-shrink: 0;
          }
          .arch-node.primary {
            background: rgba(22,163,74,0.08);
            border: 1px solid var(--accent);
            color: var(--accent);
            font-weight: 600;
          }
          .arch-node.output {
            background: transparent;
            border: 1px dashed var(--ink-faint);
            color: var(--ink-soft);
          }
          .arch-arrow {
            color: var(--ink-faint);
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .arch-arrow i {
            animation: pulse-arrow 2.5s infinite;
          }
          .arch-arrow i::before {
            content: "\\f061"; /* fa-arrow-right */
          }
          
          @keyframes pulse-arrow {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }
          @media (prefers-reduced-motion: reduce) {
            .arch-arrow i { animation: none; }
          }

          /* Responsive Flex Flow Architecture */
          .arch-flow {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 12px;
            max-width: 900px;
            margin: 0 auto;
          }

          @media (max-width: 900px) {
            .arch-flow {
              flex-direction: column;
            }
            .arch-arrow i::before {
              content: "\\f063"; /* fa-arrow-down */
            }
          }
        </style>

        <!-- UNIFIED RESPONSIVE ARCHITECTURE -->
        <div class="arch-flow">
          <div class="arch-node primary">Telegram Client</div>
          <div class="arch-arrow"><i class="fa-solid"></i></div>
          <div class="arch-node">FastAPI Backend</div>
          <div class="arch-arrow"><i class="fa-solid"></i></div>
          <div class="arch-node">License System</div>
          <div class="arch-arrow"><i class="fa-solid"></i></div>
          <div class="arch-node">Compile Queue</div>
          <div class="arch-arrow"><i class="fa-solid"></i></div>
          <div class="arch-node">Docker + Wine</div>
          <div class="arch-arrow"><i class="fa-solid"></i></div>
          <div class="arch-node">MetaEditor</div>
          <div class="arch-arrow"><i class="fa-solid"></i></div>
          <div class="arch-node output">EX5 Binary</div>
          <div class="arch-arrow"><i class="fa-solid"></i></div>
          <div class="arch-node output">Storage</div>
          <div class="arch-arrow"><i class="fa-solid"></i></div>
          <div class="arch-node primary">Telegram Delivery</div>
        </div>

      </div>
    </section>"""

# Delete from old_case_study_start to the closing section
content = remove_between(content, old_case_study_start, '    </section>')
# Find where to insert it back
insert_idx = content.find('      <p class="section-note" style="font-family: var(--font-mono); color: var(--accent); font-size: 14px;">Infinity Trader — MT5 License &amp; Delivery System</p>\n      </div>')
if insert_idx != -1:
    insert_idx += len('      <p class="section-note" style="font-family: var(--font-mono); color: var(--accent); font-size: 14px;">Infinity Trader — MT5 License &amp; Delivery System</p>\n      </div>\n\n')
    content = content[:insert_idx] + new_case_study_glass_panel + content[insert_idx:]

# 4. Add Pricing section right before Contact
pricing_section = """
    <!-- PRICING -->
    <section class="block" id="pricing" style="background-color: var(--bg-alt); padding: 80px 0;">
      <div class="path-label" style="margin-bottom: 24px;">~/pricing</div>
      <div class="section-head">
        <h2>Transparent Pricing</h2>
        <p class="section-note">Clear investment options for telegram automation.</p>
      </div>
      <div class="pricing-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1100px; margin: 0 auto; padding: 0 5%;">
        
        <!-- Tier 1 -->
        <div class="pricing-card" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 40px 30px;">
          <h3 style="font-size: 20px; margin-bottom: 12px; color: var(--ink);">Simple Bot</h3>
          <p style="font-family: var(--font-mono); font-size: 14px; color: var(--ink-soft); margin-bottom: 24px; min-height: 42px;">Basic menus, FAQ responses, and forwarding.</p>
          <div style="font-size: 32px; font-weight: 700; margin-bottom: 30px; font-family: var(--font-display);">Starts at ₹15k</div>
          <ul style="list-style: none; padding: 0; margin-bottom: 40px; font-size: 14px; color: var(--ink-soft);">
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> Node.js or Python backend</li>
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> Up to 10 commands/menus</li>
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> Email/Telegram forwarding</li>
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> Render/Vercel deployment</li>
          </ul>
          <a href="#contact" class="btn-ghost" style="width: 100%; text-align: center; justify-content: center;">Get Started</a>
        </div>

        <!-- Tier 2 -->
        <div class="pricing-card popular" style="background: var(--bg-card); border: 1px solid var(--accent); border-radius: 12px; padding: 40px 30px; position: relative;">
          <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #000; font-family: var(--font-mono); font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">Most Popular</div>
          <h3 style="font-size: 20px; margin-bottom: 12px; color: var(--ink);">Automation Bot</h3>
          <p style="font-family: var(--font-mono); font-size: 14px; color: var(--ink-soft); margin-bottom: 24px; min-height: 42px;">Database integration, APIs, and workflows.</p>
          <div style="font-size: 32px; font-weight: 700; margin-bottom: 30px; font-family: var(--font-display);">Starts at ₹35k</div>
          <ul style="list-style: none; padding: 0; margin-bottom: 40px; font-size: 14px; color: var(--ink-soft);">
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> PostgreSQL / Supabase DB</li>
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> REST API Integrations</li>
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> 1 Payment Gateway</li>
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> Dynamic user sessions</li>
          </ul>
          <a href="#contact" class="btn-primary" style="width: 100%; text-align: center; justify-content: center;">Get Started</a>
        </div>

        <!-- Tier 3 -->
        <div class="pricing-card" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 40px 30px;">
          <h3 style="font-size: 20px; margin-bottom: 12px; color: var(--ink);">Full System</h3>
          <p style="font-family: var(--font-mono); font-size: 14px; color: var(--ink-soft); margin-bottom: 24px; min-height: 42px;">Advanced architecture, SaaS, or complex tools.</p>
          <div style="font-size: 32px; font-weight: 700; margin-bottom: 30px; font-family: var(--font-display);">Starts at ₹75k</div>
          <ul style="list-style: none; padding: 0; margin-bottom: 40px; font-size: 14px; color: var(--ink-soft);">
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> Web Admin Dashboard</li>
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> Complex Auth & Licensing</li>
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> Multi-platform webhooks</li>
            <li style="margin-bottom: 12px;"><i class="fa-solid fa-check" style="color: var(--accent); margin-right: 10px;"></i> Custom Infrastructure</li>
          </ul>
          <a href="#contact" class="btn-ghost" style="width: 100%; text-align: center; justify-content: center;">Get Started</a>
        </div>
      </div>
    </section>

"""
content = content.replace('    <!-- Contact Form Section -->', pricing_section + '    <!-- Contact Form Section -->')

with open("telegram-bot-development.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updates complete.")
