import os
import re

with open("telegram-bot-development.html", "r", encoding="utf-8") as f:
    content = f.read()

# Update Title and Meta
content = content.replace("<title>NextGen Web Studio | Website Development Company in Coimbatore</title>", "<title>Telegram Bot Development | NextGen Web Studio</title>")
content = content.replace('content="NextGen Web Studio builds professional websites, eCommerce stores, portfolios and business solutions for startups and companies in India."', 'content="Custom Telegram bots, business automation, payment integrations, APIs and workflow automation built by NextGen Web Studio."')

# Remove sections: services, work, process, faq
# We can find them by <section class="block" id="NAME"> ... </section> (until the next section)
def remove_section(html, section_id):
    pattern = rf'<!-- .*?Section -->\s*<section class="block" id="{section_id}">.*?</section>'
    return re.sub(pattern, '', html, flags=re.DOTALL)

content = remove_section(content, "services")
content = remove_section(content, "work")
content = remove_section(content, "process")
content = remove_section(content, "faq")

# Now rewrite the hero section
hero_pattern = r'<section id="home" class="hero-section">.*?</section>'
new_hero = """<section id="home" class="hero-section" style="padding-top: 140px; padding-bottom: 80px;">
      <div class="path-label">~/telegram-bot-development</div>
      
      <div class="hero-grid" style="grid-template-columns: 1.1fr 0.9fr; align-items: center; gap: 40px;">
        <div class="hero-text-content">
          <h1 style="font-size: clamp(36px, 5vw, 64px); line-height: 1.1;">BUILD → AUTOMATE → SCALE<br><span class="gradient-text">Telegram Bots</span><br>That Actually Do Work.</h1>
          <p class="hero-sub">Custom Telegram bots built for automation, payments, notifications, APIs and business workflows. Your bot. Your workflow. Your infrastructure.</p>
          <div class="hero-actions">
            <a href="#contact?service=Telegram+Bot" class="btn-primary" onclick="document.querySelector('[data-value=\\'Telegram Bot\\']').click();">start a project <i class="fa-solid fa-arrow-right"></i></a>
            <a href="#capabilities" class="btn-ghost">view capabilities</a>
          </div>
        </div>

        <div class="terminal-container">
          <div class="terminal" aria-hidden="true" style="transform: none; animation: none;">
            <div class="term-bar">
              <div class="term-dot close"></div>
              <div class="term-dot minimize"></div>
              <div class="term-dot expand"></div>
              <span class="term-title">bash — telegram_bot.init()</span>
            </div>
            <div class="term-body" id="termBody" style="min-height: 280px; font-size: 13px;">
              <div class="term-history">
                <div class="term-line output" style="color: var(--accent);">BOT STATUS</div>
                <div class="term-line output">● ONLINE</div>
                <div class="term-line">&nbsp;</div>
                <div class="term-line output" style="color: var(--ink-faint);">/start</div>
                <div class="term-line output" style="color: var(--ink-faint);">/order</div>
                <div class="term-line output" style="color: var(--ink-faint);">/status</div>
                <div class="term-line output" style="color: var(--ink-faint);">/support</div>
                <div class="term-line">&nbsp;</div>
                <div class="term-line output">API ................. <span style="color: #4ADE80;">CONNECTED</span></div>
                <div class="term-line output">DATABASE ............ <span style="color: #4ADE80;">CONNECTED</span></div>
                <div class="term-line output">PAYMENTS ............ <span style="color: #4ADE80;">CONNECTED</span></div>
                <div class="term-line output">WEBHOOK ............. <span style="color: #4ADE80;">ACTIVE</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CAPABILITIES SECTION -->
    <section class="block" id="capabilities">
      <div class="path-label">~/capabilities</div>
      <div class="section-head">
        <h2>What We Build</h2>
        <p class="section-note">Custom Telegram integrations designed around your exact business workflow.</p>
      </div>
      <div class="services-grid">
        <div class="service-card" style="grid-column: span 6;">
          <div style="font-family: var(--font-mono); color: var(--accent); margin-bottom: 12px;">01</div>
          <h3>Custom Telegram Bots</h3>
          <p>Bots designed around your exact business workflow.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="font-family: var(--font-mono); color: var(--accent); margin-bottom: 12px;">02</div>
          <h3>Business Automation</h3>
          <p>Automate repetitive tasks, notifications and workflows.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="font-family: var(--font-mono); color: var(--accent); margin-bottom: 12px;">03</div>
          <h3>Payment Bots</h3>
          <p>Payments, order confirmation and automated notifications.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="font-family: var(--font-mono); color: var(--accent); margin-bottom: 12px;">04</div>
          <h3>API Integrations</h3>
          <p>Connect Telegram with existing websites, APIs and services.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="font-family: var(--font-mono); color: var(--accent); margin-bottom: 12px;">05</div>
          <h3>Database Systems</h3>
          <p>User, order, license and application data management.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="font-family: var(--font-mono); color: var(--accent); margin-bottom: 12px;">06</div>
          <h3>Admin Bots</h3>
          <p>Manage users, orders, licenses and operations directly through Telegram.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="font-family: var(--font-mono); color: var(--accent); margin-bottom: 12px;">07</div>
          <h3>Customer Support</h3>
          <p>Menus, FAQs, ticket systems and automated responses.</p>
        </div>
        <div class="service-card" style="grid-column: span 6;">
          <div style="font-family: var(--font-mono); color: var(--accent); margin-bottom: 12px;">08</div>
          <h3>Trading Integrations</h3>
          <p>Telegram notifications, license systems and MT5-related automation.</p>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="block" id="workflow">
      <div class="path-label">~/workflow</div>
      <div class="section-head">
        <h2>How We Build It</h2>
        <p class="section-note">From command to deployment.</p>
      </div>
      <div class="process-timeline">
        <div class="process-item">
          <div class="process-node">01</div>
          <div class="process-content">
            <div class="process-content-header"><h3>DEFINE</h3></div>
            <p>Understand the workflow and requirements.</p>
          </div>
        </div>
        <div class="process-item">
          <div class="process-node">02</div>
          <div class="process-content">
            <div class="process-content-header"><h3>DESIGN</h3></div>
            <p>Design commands, menus and interaction flow.</p>
          </div>
        </div>
        <div class="process-item">
          <div class="process-node">03</div>
          <div class="process-content">
            <div class="process-content-header"><h3>CONNECT</h3></div>
            <p>Integrate APIs, databases, payments and services.</p>
          </div>
        </div>
        <div class="process-item">
          <div class="process-node">04</div>
          <div class="process-content">
            <div class="process-content-header"><h3>DEPLOY</h3></div>
            <p>Deploy the bot to reliable cloud infrastructure.</p>
          </div>
        </div>
        <div class="process-item">
          <div class="process-node">05</div>
          <div class="process-content">
            <div class="process-content-header"><h3>AUTOMATE</h3></div>
            <p>The bot handles the repetitive work automatically.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TECH STACK -->
    <section class="block" id="tech-stack">
      <div class="path-label">~/tech-stack</div>
      <div class="section-head">
        <h2>Telegram Bot Stack</h2>
      </div>
      <div class="filters" style="justify-content: center; margin-top: 30px;">
        <span class="filter-btn">Telegram Bot API</span>
        <span class="filter-btn">Python</span>
        <span class="filter-btn">Node.js</span>
        <span class="filter-btn">FastAPI</span>
        <span class="filter-btn">Express</span>
        <span class="filter-btn">PostgreSQL</span>
        <span class="filter-btn">Supabase</span>
        <span class="filter-btn">REST APIs</span>
        <span class="filter-btn">Webhooks</span>
        <span class="filter-btn">Docker</span>
        <span class="filter-btn">Render</span>
        <span class="filter-btn">Vercel</span>
        <span class="filter-btn">Razorpay</span>
      </div>
    </section>

    <!-- CASE STUDY -->
    <section class="block" id="case-study">
      <div class="path-label">~/case-study</div>
      <div class="section-head">
        <h2>CASE STUDY // TELEGRAM AUTOMATION</h2>
        <p class="section-note">Infinity Trader — MT5 License & Delivery System</p>
      </div>
      <div class="glass-panel" style="padding: 40px; margin-top: 30px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card);">
        <p style="margin-bottom: 30px; font-size: 16px; color: var(--ink-soft); line-height: 1.6;">A Telegram-based license automation system that handles customer information, license generation, automated MQ5 → EX5 compilation and secure file delivery. <em>(Note: Trading EA logic is supplied separately).</em></p>
        
        <div style="font-family: var(--font-mono); font-size: 14px; color: var(--ink); display: flex; flex-direction: column; gap: 15px; align-items: center; text-align: center;">
          <div style="padding: 10px 20px; border: 1px solid var(--accent); border-radius: 8px; background: rgba(22,163,74,0.1);">Telegram Client</div>
          <div style="color: var(--ink-faint);">↓</div>
          <div style="padding: 10px 20px; border: 1px solid var(--border); border-radius: 8px;">FastAPI Backend</div>
          <div style="color: var(--ink-faint);">↓</div>
          <div style="padding: 10px 20px; border: 1px solid var(--border); border-radius: 8px;">License System</div>
          <div style="color: var(--ink-faint);">↓</div>
          <div style="padding: 10px 20px; border: 1px solid var(--border); border-radius: 8px;">Compile Queue</div>
          <div style="color: var(--ink-faint);">↓</div>
          <div style="padding: 10px 20px; border: 1px solid var(--border); border-radius: 8px;">Docker + Wine</div>
          <div style="color: var(--ink-faint);">↓</div>
          <div style="padding: 10px 20px; border: 1px solid var(--border); border-radius: 8px;">MetaEditor</div>
          <div style="color: var(--ink-faint);">↓</div>
          <div style="padding: 10px 20px; border: 1px solid var(--border); border-radius: 8px;">EX5 Binary</div>
          <div style="color: var(--ink-faint);">↓</div>
          <div style="padding: 10px 20px; border: 1px solid var(--border); border-radius: 8px;">Storage</div>
          <div style="color: var(--ink-faint);">↓</div>
          <div style="padding: 10px 20px; border: 1px solid var(--accent); border-radius: 8px; background: rgba(22,163,74,0.1);">Telegram Delivery</div>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="block" id="telegram-cta" style="text-align: center; padding: 100px 0;">
      <h2 style="font-size: 36px; margin-bottom: 20px;">HAVE A BOT IDEA?</h2>
      <p style="color: var(--ink-soft); margin-bottom: 40px; font-size: 18px;">Tell us what you want to automate.</p>
      <a href="#contact" class="btn-primary" onclick="document.querySelector('[data-value=\\'Telegram Bot\\']').click();" style="display: inline-block; margin-bottom: 20px;">START A TELEGRAM PROJECT</a>
      <div style="font-family: var(--font-mono); font-size: 14px; color: var(--ink-faint);">
        > ./deploy --telegram
      </div>
    </section>
"""
content = re.sub(hero_pattern, new_hero, content, flags=re.DOTALL)

with open("telegram-bot-development.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Created telegram-bot-development.html cleanly.")
