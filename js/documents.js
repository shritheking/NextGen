// NextGen Document Center - Application Script

// SVG icons
const ICONS = {
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="table-icon-check"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="stars-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
};

// SVG icons to replace emojis
function getTechLogo(tech) {
  const logos = {
    react: `<svg viewBox="-11.5 -10.23174 23 20.46348" width="14" height="14" class="tech-icon"><circle cx="0" cy="0" r="2.05" fill="#a3e635"/><g stroke="#a3e635" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
    nextjs: `<svg viewBox="0 0 180 180" width="14" height="14" class="tech-icon" fill="currentColor"><circle cx="90" cy="90" r="90" fill="currentColor"/><path d="M140 135.5L78.2 57H66v66.3h10.4V72.4l51.5 66.2H140z" fill="#000"/><path d="M102.5 57h10.4v66.3h-10.4z" fill="#000"/></svg>`,
    nodejs: `<svg viewBox="0 0 256 288" width="14" height="14" class="tech-icon" fill="#a3e635"><path d="M241.6 62.4l-97.8-56.5c-9.8-5.7-22-5.7-31.7 0L14.3 62.4C4.6 68 0 77.9 0 88.6v110.8c0 10.7 4.6 20.6 14.3 26.2l97.8 56.5c9.8 5.7 22 5.7 31.7 0l97.8-56.5c9.7-5.6 14.3-15.5 14.3-26.2V88.6c.1-10.7-4.5-20.6-14.2-26.2zM128 245.3c-64.8 0-117.3-52.5-117.3-117.3S63.2 10.7 128 10.7s117.3 52.5 117.3 117.3-52.5 117.3-117.3 117.3z"/></svg>`,
    mongodb: `<svg viewBox="0 0 24 24" width="14" height="14" class="tech-icon" fill="currentColor"><path d="M12 .002C12 .002 9 6.8 9 9.8c0 1.66 1.34 3 3 3s3-1.34 3-3c0-3-3-9.8-3-9.8z" fill="#00e676"/><path d="M12 12.8c-1.66 0-3-1.34-3-3 0-3 3-9.8 3-9.8s3 6.8 3 9.8c0 1.66-1.34 3-3 3z" fill="#a3e635"/></svg>`,
    tailwind: `<svg viewBox="0 0 24 24" width="14" height="14" class="tech-icon" fill="currentColor"><path d="M12 .587l3.668 2.639-1.399 4.307h4.731L12 23.413l-7-15.88h4.731z" fill="#06b6d4"/></svg>`,
    vercel: `<svg viewBox="0 0 115 100" width="14" height="14" class="tech-icon" fill="currentColor"><polygon points="57.5,0 115,100 0,100"/></svg>`,
    stripe: `<svg viewBox="0 0 24 24" width="14" height="14" class="tech-icon" fill="currentColor"><path d="M13.93 7.82c0-.56.45-.76 1.15-.76 1.05 0 2.68.4 3.65.91l.63-3.21c-.97-.41-2.48-.68-3.95-.68-3.41 0-5.74 1.83-5.74 4.88 0 3.29 2.9 4.3 4.41 4.85 1 .37 1.48.69 1.48 1.17 0 .61-.53.84-1.28.84-1.2 0-3-.54-4.07-1.12l-.67 3.32c1.23.57 3 .89 4.63.89 3.63 0 6.07-1.74 6.07-4.88 0-3.32-2.9-4.28-4.41-4.85-.92-.35-1.38-.63-1.38-1.08z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" width="14" height="14" class="tech-icon" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    docker: `<svg viewBox="0 0 24 24" width="14" height="14" class="tech-icon" fill="currentColor"><path d="M13.983 8.878h-2.28v2.153h2.28v-2.153zm2.562 0h-2.282v2.153h2.282v-2.153zm-5.124 0h-2.28v2.153h2.28v-2.153zm-2.562 0h-2.28v2.153h2.28v-2.153zm5.124-2.422h-2.28v2.153h2.28v-2.153zm2.562 0h-2.282v2.153h2.282v-2.153zm-5.124 0h-2.28v2.153h2.28v-2.153zm7.686 2.422h-2.28v2.153h2.28v-2.153zm2.562 0h-2.282v2.153h2.282v-2.153zm-2.562-2.422h-2.28v2.153h2.28v-2.153z" fill="#2496ed"/></svg>`,
    figma: `<svg viewBox="0 0 137 205" width="10" height="14" class="tech-icon" fill="none"><path d="M34.25 205C53.1657 205 68.5 189.666 68.5 170.75V136.5H34.25C15.3343 136.5 0 151.834 0 170.75C0 189.666 15.3343 205 34.25 205Z" fill="#0ACF83"/><path d="M34.25 136.5C53.1657 136.5 68.5 121.166 68.5 102.25V68H34.25C15.3343 68 0 83.3343 0 102.25C0 121.166 15.3343 136.5 34.25 136.5Z" fill="#A259FF"/><path d="M34.25 68C53.1657 68 68.5 52.6657 68.5 33.75C68.5 14.8343 53.1657 0 34.25 0C15.3343 0 0 14.8343 0 33.75C0 52.6657 15.3343 68 34.25 68Z" fill="#F24E1E"/><path d="M102.75 68C121.666 68 137 52.6657 137 33.75C137 14.8343 121.666 0 102.75 0C83.8343 0 68.5 14.8343 68.5 33.75V68H102.75Z" fill="#FF7262"/><path d="M102.75 136.5C121.666 136.5 137 121.166 137 102.25C137 83.3343 121.666 68 102.75 68H68.5V136.5H102.75Z" fill="#1ABCFE"/></svg>`
  };
  return logos[tech] || '';
}

// Vector QR Code containing corner anchors and centering chevron logo
const QR_CODE_SVG = `
  <svg class="qr-code-svg" viewBox="0 0 100 100" fill="currentColor">
    <!-- Top-Left Corner Position block -->
    <path d="M5,5 h25 v25 h-25 z M10,10 h15 v15 h-15 z M13,13 h9 v9 h-9 z"/>
    <!-- Top-Right Corner Position block -->
    <path d="M70,5 h25 v25 h-25 z M75,10 h15 v15 h-15 z M78,13 h9 v9 h-9 z"/>
    <!-- Bottom-Left Corner Position block -->
    <path d="M5,70 h25 v25 h-25 z M10,75 h15 v15 h-15 z M13,78 h9 v9 h-9 z"/>
    <!-- Small Alignment blocks -->
    <path d="M75,75 h8 v8 h-8 z M78,78 h2 v2 h-2 z"/>
    <!-- Timing Patterns & Dense Noise -->
    <path d="M35,10 h5 v5 h-5 z M45,10 h10 v5 h-10 z M60,10 h5 v5 h-5 z M10,35 h5 v5 h-5 z M10,45 h5 v10 h-5 z M10,60 h5 v5 h-5 z"/>
    <path d="M35,35 h5 v5 h-5 z M45,35 h8 v5 h-8 z M57,35 h5 v5 h-5 z M35,45 h10 v5 h-10 z M50,45 h5 v8 h-5 z"/>
    <path d="M35,60 h8 v5 h-8 z M50,60 h5 v12 h-5 z M62,60 h8 v5 h-8 z"/>
    <path d="M35,75 h12 v5 h-12 z M55,75 h8 v5 h-8 z M35,85 h5 v5 h-5 z M45,85 h15 v5 h-15 z M65,85 h10 v5 h-10 z"/>
    <path d="M75,35 h15 v5 h-15 z M80,45 h10 v5 h-10 z M75,55 h5 v15 h-5 z M85,55 h5 v5 h-5 z M85,65 h5 v10 h-5 z"/>
    <!-- Center Shield Zone -->
    <circle cx="50" cy="50" r="16" fill="white"/>
    <!-- Embedded Lime Green Logo Chevron in Center -->
    <path d="M46,45 L51,50 L46,55 M51,45 L56,50 L51,55" fill="none" stroke="#a3e635" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const templates = {
  brochure: {
    name: "Company Profile & Brochure",
    fields: [
      { id: "founder_msg", label: "CEO Message", type: "textarea", default: "At NextGen, we don't just build websites—we build digital experiences that help businesses grow." },
      { id: "stat_projects", label: "Projects Delivered", type: "text", default: "25+" },
      { id: "stat_uptime", label: "Uptime Rating", type: "text", default: "99.9%" },
      { id: "stat_delivery", label: "Average Delivery", type: "text", default: "3-5 Weeks" },
      { id: "social_proof", label: "Social Proof Callout", type: "textarea", default: "Currently accepting introductory client projects. Full design and engineering portfolio available upon request." },
      { id: "proj_name", label: "Featured Case Study Name", type: "text", default: "Boomers Gaming Cafe" },
      { id: "proj_industry", label: "Case Study Industry", type: "text", default: "Gaming Lounge" },
      { id: "proj_tech", label: "Case Study Stack", type: "text", default: "React + Node.js" },
      { id: "proj_result", label: "Case Study Result", type: "text", default: "+42% online bookings" },
      { id: "proj_desc", label: "Case Study Description", type: "textarea", default: "Complete custom e-commerce booking portal and marketing website." },
      { id: "starter_price", label: "Starter Package Price", type: "text", default: "₹9,999" },
      { id: "business_price", label: "Business Package Price", type: "text", default: "₹19,999" },
      { id: "premium_price", label: "Premium Package Price", type: "text", default: "₹39,999+" },
      { id: "contact_email", label: "Agency Email", type: "text", default: "nextgenwebstudio63@gmail.com" },
      { id: "contact_phone", label: "Agency Phone", type: "text", default: "+91 79045 44101" },
      { id: "contact_ig", label: "Instagram Handle", type: "text", default: "@nextgen_web_studio" }
    ],
    render: (data) => `
      <!-- PAGE 1: Cover Page -->
      <div class="doc-page">
        <img class="watermark" src="assets/logo-icon.png" alt="Watermark">
        <div class="doc-hero">
          <div class="doc-hero-bg"></div>
          <div class="doc-hero-content">
            <div class="doc-hero-logo">
              <img class="hero-icon" src="assets/logo-icon.png" alt="Icon">
              <img class="hero-text" src="assets/logo-text.png" alt="Text">
            </div>
            <div class="doc-hero-title-group">
              <p class="doc-hero-pre">Company Profile & Services</p>
              <h1 class="doc-hero-title">Designing Tomorrow's<br>Digital Experiences</h1>
            </div>
            <p class="doc-hero-desc">We build fast, modern, and conversion-focused websites that work as hard as your business does.</p>
          </div>
          <div class="doc-hero-footer">
            <div>
              <span class="label">Document Type</span>
              <span>Agency Brochure — 2026</span>
            </div>
            <div>
              <span class="label">Service Provider</span>
              <span>NextGen Web Studio</span>
            </div>
          </div>
        </div>
        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 1 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 2: About & Trust -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">About & Agency Trust</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">About NextGen</h2>
            <p class="doc-para">NextGen Web Studio is a web design and development studio building fast, modern, conversion-focused websites for small businesses, startups, and personal brands. We combine clean design with reliable engineering — every project is built mobile-first, optimized for speed, and designed to represent your business online the way it deserves to be represented.</p>
          </div>

          <div class="founder-message">
            <div class="founder-quote">"${data.founder_msg}"</div>
            <div class="founder-author">— Founder & CEO, NextGen Web Studio</div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Our Services</h2>
            <div class="glass-grid">
              <div class="glass-card">
                <div class="glass-card-title"><i data-lucide="layout"></i> Premium Websites</div>
                <div class="glass-card-desc">Bespoke, premium interface designs with responsive layouts and modern UI.</div>
              </div>
              <div class="glass-card">
                <div class="glass-card-title"><i data-lucide="bot"></i> Telegram Bot Development</div>
                <div class="glass-card-desc">Custom Telegram bots for order management, notifications, and business automation.</div>
              </div>
              <div class="glass-card">
                <div class="glass-card-title"><i data-lucide="credit-card"></i> Payment Gateway Integration</div>
                <div class="glass-card-desc">Razorpay, Stripe, and UPI payment flows for seamless online transactions.</div>
              </div>
              <div class="glass-card">
                <div class="glass-card-title"><i data-lucide="gauge"></i> Admin Dashboards</div>
                <div class="glass-card-desc">Real-time analytics dashboards with CRM, inventory, and reporting modules.</div>
              </div>
              <div class="glass-card">
                <div class="glass-card-title"><i data-lucide="cog"></i> Business Automation</div>
                <div class="glass-card-desc">Automate invoicing, notifications, and workflows to save time and reduce errors.</div>
              </div>
              <div class="glass-card">
                <div class="glass-card-title"><i data-lucide="brain"></i> AI Solutions</div>
                <div class="glass-card-desc">AI-powered chatbots, smart search, and intelligent data processing tools.</div>
              </div>
            </div>
          </div>

          <div class="stat-grid">
            <div class="doc-stat-card">
              <i data-lucide="check-square" class="doc-stat-icon"></i>
              <div class="doc-stat-number">${data.stat_projects}</div>
              <div class="doc-stat-label">Delivered</div>
            </div>
            <div class="doc-stat-card">
              <i data-lucide="smartphone" class="doc-stat-icon"></i>
              <div class="doc-stat-number">100%</div>
              <div class="doc-stat-label">Responsive</div>
            </div>
            <div class="doc-stat-card">
              <i data-lucide="activity" class="doc-stat-icon"></i>
              <div class="doc-stat-number">${data.stat_uptime}</div>
              <div class="doc-stat-label">Uptime</div>
            </div>
            <div class="doc-stat-card">
              <i data-lucide="heart" class="doc-stat-icon"></i>
              <div class="doc-stat-number">30-Day</div>
              <div class="doc-stat-label">Support</div>
            </div>
            <div class="doc-stat-card">
              <i data-lucide="clock" class="doc-stat-icon"></i>
              <div class="doc-stat-number">${data.stat_delivery}</div>
              <div class="doc-stat-label">Timeline</div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 2 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 3: Services & Process -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Process & Portfolio</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">Our Development Process</h2>
            <div class="timeline-container">
              <div class="timeline-line"></div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-week">Week 1</span>
                  <span class="timeline-title">Discovery & Strategy</span>
                  <span class="timeline-desc">Gathering client requirements, mapping out sitemaps, and content planning.</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-week">Week 2</span>
                  <span class="timeline-title">UI/UX Design</span>
                  <span class="timeline-desc">Designing custom Figma wireframes and premium mockup visuals for approval.</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-week">Week 3 & 4</span>
                  <span class="timeline-title">Front & Backend Development</span>
                  <span class="timeline-desc">Writing high-speed code using Next.js, React, Node, and integrating databases.</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-week">Week 5</span>
                  <span class="timeline-title">QA & Domain Launch</span>
                  <span class="timeline-desc">Rigorous device checks, SSL integrations, and handing over CMS access.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Technologies We Use</h2>
            <div class="tech-grid">
              <div class="tech-item">${getTechLogo('react')} React</div>
              <div class="tech-item">${getTechLogo('nextjs')} Next.js</div>
              <div class="tech-item">${getTechLogo('nodejs')} Node.js</div>
              <div class="tech-item">${getTechLogo('mongodb')} MongoDB</div>
              <div class="tech-item">${getTechLogo('tailwind')} Tailwind</div>
              <div class="tech-item"><i data-lucide="database" style="width:14px;height:14px;"></i> PostgreSQL</div>
              <div class="tech-item"><i data-lucide="code" style="width:14px;height:14px;"></i> Python</div>
              <div class="tech-item">${getTechLogo('stripe')} Stripe</div>
              <div class="tech-item"><i data-lucide="credit-card" style="width:14px;height:14px;"></i> Razorpay</div>
              <div class="tech-item"><i data-lucide="send" style="width:14px;height:14px;"></i> Telegram API</div>
              <div class="tech-item">${getTechLogo('vercel')} Vercel</div>
              <div class="tech-item">${getTechLogo('figma')} Figma</div>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Featured Project</h2>
            <div class="browser-mockup">
              <div class="browser-header">
                <div class="browser-dot red"></div>
                <div class="browser-dot yellow"></div>
                <div class="browser-dot green"></div>
              </div>
              <img class="browser-screenshot" src="assets/boomers-mockup.png" alt="Boomers Gaming Cafe Website Screenshot">
              <div class="browser-content" style="padding: 16px;">
                <div class="portfolio-meta">
                  <span class="portfolio-name">${data.proj_name}</span>
                  <span class="portfolio-result">${data.proj_result}</span>
                </div>
                <p class="doc-para" style="margin-top: 8px; font-size: 12px; margin-bottom: 8px;">${data.proj_desc}</p>
                <div class="portfolio-meta" style="font-size: 10px; opacity: 0.8;">
                  <span>Technologies: <strong>${data.proj_tech}</strong></span>
                  <span>Industry: <strong>${data.proj_industry}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 3 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 4: Pricing & Testimonials -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Plans & Contact</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">Website Pricing Plans</h2>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th>Package Plan</th>
                    <th>Ideal For</th>
                    <th>Key Deliverables</th>
                    <th>Price Starts At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Starter Pack</strong></td>
                    <td>SMEs & Brands</td>
                    <td>5 Pages · Responsive UI · Contact Form</td>
                    <td><strong style="color:var(--nextgen-green);">${data.starter_price}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Business Pack</strong></td>
                    <td>Growth Startups</td>
                    <td>10 Pages · Custom CMS · Basic On-Page SEO</td>
                    <td><strong style="color:var(--nextgen-green);">${data.business_price}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Premium Pack</strong></td>
                    <td>Full Enterprises</td>
                    <td>Unlimited Pages · E-Commerce · Stripe Gateway</td>
                    <td><strong style="color:var(--nextgen-green);">${data.premium_price}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Client Support Details</h2>
            <div class="review-grid">
              <div class="review-card">
                <div class="stars">${ICONS.star}${ICONS.star}${ICONS.star}${ICONS.star}${ICONS.star}</div>
                <p class="review-text">"${data.social_proof}"</p>
                <div class="review-user">
                  <div class="user-avatar">NG</div>
                  <div class="user-meta">
                    <span class="user-name">Agency Status — 2026</span>
                    <span class="user-company">NextGen Web Studio</span>
                  </div>
                </div>
              </div>

              <div class="review-card" style="display:flex; align-items:center; justify-content:center; gap: 16px;">
                <div class="qr-code-box">
                  ${QR_CODE_SVG}
                </div>
                <div style="font-size:11px;">
                  <strong style="display:block; margin-bottom:4px; font-family:'Outfit';">Scan QR Code</strong>
                  <span style="color:#a1a1aa; display:block; line-height: 1.4;">Access our online portfolio & instant WhatsApp chat support.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="doc-section" style="margin-top: 45px;">
            <div style="display:flex; justify-content:space-between; gap:20px; align-items:center; background:rgba(255,255,255,0.01); border:1px solid rgba(255,255,255,0.05); padding:20px; border-radius:16px;">
              <div>
                <strong style="display:block; font-size:14px; font-family:'Outfit';">Ready to Build Your Website?</strong>
                <span style="font-size:11.5px; color:#a1a1aa;">Drop us an email or phone number to set up a free consultation.</span>
              </div>
              <div style="text-align:right; font-size:11.5px; line-height:1.6;">
                <div>📧 <strong style="color:var(--nextgen-green);">${data.contact_email}</strong></div>
                <div>📞 <strong>${data.contact_phone}</strong></div>
                <div>📸 <strong>${data.contact_ig}</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 4 of 4</span>
        </div>
      </div>
    `
  },
  agreement: {
    name: "Website Design Agreement",
    fields: [
      { id: "agr_id", label: "Agreement Reference ID", type: "text", default: "NXG-AGR-" + Math.floor(10000 + Math.random() * 90000) },
      { id: "agr_date", label: "Agreement Date", type: "text", default: "30 / 07 / 2026" },
      { id: "client_company", label: "Client Business Name", type: "text", default: "Boomers Gaming Cafe" },
      { id: "client_rep", label: "Client Representative", type: "text", default: "Vikram Sen" },
      { id: "client_contact", label: "Client Email / Phone", type: "text", default: "vikram@boomerscafe.com / +91 99999 88888" },
      { id: "proj_title", label: "Project Title", type: "text", default: "E-Commerce Booking Website" },
      { id: "revision_rate", label: "Extra Revision Rate (₹)", type: "text", default: "₹1,500" },
      { id: "payment_desc", label: "Payment Method Options", type: "text", default: "Razorpay Invoice Link, UPI, or Bank Transfer" }
    ],
    render: (data) => `
      <!-- PAGE 1: Agreement Cover Page -->
      <div class="doc-page">
        <img class="watermark" src="assets/logo-icon.png" alt="Watermark">
        <div class="agreement-cover-hero">
          <div class="confidential-badge agreement-cover-badge">Confidential Document</div>
          <div class="agreement-cover-logo">
            <img class="hero-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="hero-text" src="assets/logo-text.png" alt="Text">
          </div>
          <p class="doc-hero-pre agreement-cover-pre" style="color:var(--nextgen-green);">Client Service Agreement</p>
          <h1 class="doc-hero-title agreement-cover-title">Website Design &<br>Development Agreement</h1>
          
          <div class="agreement-cover-meta">
            <div>Agreement Reference: <strong style="color:var(--nextgen-green);">${data.agr_id}</strong></div>
            <div>Contract Version: <strong>v1.0 (Final)</strong></div>
            <div>Effective Date: <strong>${data.agr_date}</strong></div>
          </div>
          
          <div class="divider-line"></div>
          
          <p class="agreement-cover-desc">This legally binding Agreement is entered into by NextGen Web Studio and the Client listed below, governing custom web services and terms. All materials herein are strictly confidential.</p>
        </div>
        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 1 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 2: Client Details & Checklist -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Agreement Details</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">Agreement Parties Overview</h2>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <tbody>
                  <tr>
                    <td><strong>Agreement Reference</strong></td>
                    <td style="color:var(--nextgen-green);"><strong>${data.agr_id}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Service Provider</strong></td>
                    <td>NextGen Web Studio (Tamil Nadu, India)</td>
                  </tr>
                  <tr>
                    <td><strong>Client Business</strong></td>
                    <td><strong>${data.client_company}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Contact Representative</strong></td>
                    <td>${data.client_rep}</td>
                  </tr>
                  <tr>
                    <td><strong>Client Contact Details</strong></td>
                    <td>${data.client_contact}</td>
                  </tr>
                  <tr>
                    <td><strong>Project Title Scope</strong></td>
                    <td><strong>${data.proj_title}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Client Asset Checklist</h2>
            <p class="doc-para" style="font-size: 12px; margin-bottom: 12px;">Before development commences, the client agrees to provide the following requirements:</p>
            <div class="check-grid">
              <div class="check-item"><span class="check-box"></span> Logo Files</div>
              <div class="check-item"><span class="check-box"></span> Page Content</div>
              <div class="check-item"><span class="check-box"></span> Images/Assets</div>
              <div class="check-item"><span class="check-box"></span> Domain Access</div>
              <div class="check-item"><span class="check-box"></span> Hosting Access</div>
              <div class="check-item"><span class="check-box"></span> Brand Colors</div>
              <div class="check-item"><span class="check-box"></span> Font Names</div>
              <div class="check-item"><span class="check-box"></span> Content Sheet</div>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">1. Scope of Work</h2>
            <p class="doc-para">The Service Provider agrees to design and develop a website for the Client as per the specifications, features, and page count agreed upon in the Selected Package, including responsive layout configurations, basic search engine indexing setup, and forms. Any work outside this scope will be treated as a separate Change Request.</p>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 2 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 3: Deliverables & Timeline -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Deliverables & Schedule</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">Included Scope Deliverables</h2>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th>Core Deliverable</th>
                    <th>Status</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Custom UI/UX Design</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Custom wireframes built on client branding, no templates.</td>
                  </tr>
                  <tr>
                    <td><strong>Mobile Responsive</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Optimized viewport rendering for phones, tablets, laptops.</td>
                  </tr>
                  <tr>
                    <td><strong>Interactive Admin Panel</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Content Management dashboard for easy self-updates.</td>
                  </tr>
                  <tr>
                    <td><strong>On-page SEO Setup</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Configuring metadata, alt tags, and sitemaps.</td>
                  </tr>
                  <tr>
                    <td><strong>Contact & Lead Forms</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Secure forms connected to email or CRM databases.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Payment Milestones</h2>
            <div class="flowchart-container">
              <div class="flowchart-step">
                <div class="flow-node">50%</div>
                <span class="flow-label">Upfront Advance</span>
              </div>
              <div class="flow-arrow">➜</div>
              <div class="flowchart-step">
                <div class="flow-node" style="background:var(--nextgen-blue); color:#fff;"><i data-lucide="layout"></i></div>
                <span class="flow-label">UI Design Approval</span>
              </div>
              <div class="flow-arrow">➜</div>
              <div class="flowchart-step">
                <div class="flow-node" style="background:var(--nextgen-blue); color:#fff;"><i data-lucide="code"></i></div>
                <span class="flow-label">Development Code</span>
              </div>
              <div class="flow-arrow">➜</div>
              <div class="flowchart-step">
                <div class="flow-node">50%</div>
                <span class="flow-label">Balance & Launch</span>
              </div>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">2. Terms & Policies</h2>
            <p class="doc-para"><strong>Project Timeline:</strong> The project estimation timeline begins upon receiving all required logo assets and copy from the Client. Delays in receiving client inputs will postpone milestones by an equivalent length of time.</p>
            <p class="doc-para"><strong>Revisions Policy:</strong> The Client is entitled to 2 complete revision cycles on UI design screens. Extra design updates or revisions beyond these cycles are charged at a flat rate of <strong style="color:var(--nextgen-green);">${data.revision_rate}</strong> per round, quoted beforehand.</p>
            <p class="doc-para"><strong>Payment Schedule:</strong> The upfront advance must be paid to initiate planning. Final deliverables, source files, and live deployment configurations will be completed once the final 50% balance has been cleared via ${data.payment_desc}.</p>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 3 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 4: Clauses & Signatures -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Acceptance & Signature</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">3. Ownership, Warranty & Law</h2>
            <p class="doc-para" style="font-size:11.5px; margin-bottom:8px;"><strong>Copyright:</strong> Upon receipt of full and final payment, ownership of the custom website design, code assets, and assets built specifically for this project transfers to the Client.</p>
            <p class="doc-para" style="font-size:11.5px; margin-bottom:8px;"><strong>Warranty:</strong> Service Provider provides a 30-day bug warranty starting on deployment day, covering functional issues in the initial scope. Warranty does not cover edits made by client or third parties.</p>
            <p class="doc-para" style="font-size:11.5px; margin-bottom:8px;"><strong>Governing Law:</strong> This agreement is governed by the laws of India. Any legal disputes arising will be subject to the exclusive jurisdiction of the courts of Tamil Nadu, India.</p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Acceptance Handover Checklist</h2>
            <div class="check-grid">
              <div class="check-item"><span class="check-box"></span> Website Live</div>
              <div class="check-item"><span class="check-box"></span> Mobile Clean</div>
              <div class="check-item"><span class="check-box"></span> Forms Active</div>
              <div class="check-item"><span class="check-box"></span> SSL Configured</div>
              <div class="check-item"><span class="check-box"></span> Payment Setup</div>
              <div class="check-item"><span class="check-box"></span> SEO Indexed</div>
              <div class="check-item"><span class="check-box"></span> Speed Checked</div>
              <div class="check-item"><span class="check-box"></span> Handover Train</div>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Acceptance Signatures</h2>
            <div class="signature-section">
              <div class="sig-block">
                <div class="sig-title">For NextGen Web Studio</div>
                <div class="stamp-box">COMPANY SEAL & SIGNATURE</div>
                <div class="sig-line">___________________________</div>
                <div class="sig-date">Date: ____ / ____ / 2026</div>
              </div>
              <div class="sig-block">
                <div class="sig-title">For the Client (${data.client_company})</div>
                <div class="stamp-box">CLIENT STAMP & SIGNATURE</div>
                <div class="sig-line">___________________________</div>
                <div class="sig-date">Date: ____ / ____ / 2026</div>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 4 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 5: Change Request Rider Sheet -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Rider: Scope Changes</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section" style="margin-bottom:30px;">
            <h2 class="doc-section-title">Scope Change Request Form (Rider A)</h2>
            <p class="doc-para">Use this rider page to document features, additions, or integrations requested during or after development that fall outside the main Agreement's scope of work. Each line must be approved by the Client.</p>
          </div>

          <div class="doc-table-wrapper">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Requested Feature / Modification</th>
                  <th>Estimated Cost</th>
                  <th>Timeline Impact</th>
                  <th>Client Signature Approval</th>
                </tr>
              </thead>
              <tbody>
                <tr style="height: 60px;">
                  <td>1. </td>
                  <td></td>
                  <td></td>
                  <td style="opacity: 0.3; font-size: 10px; font-style:italic;">Sign:</td>
                </tr>
                <tr style="height: 60px;">
                  <td>2. </td>
                  <td></td>
                  <td></td>
                  <td style="opacity: 0.3; font-size: 10px; font-style:italic;">Sign:</td>
                </tr>
                <tr style="height: 60px;">
                  <td>3. </td>
                  <td></td>
                  <td></td>
                  <td style="opacity: 0.3; font-size: 10px; font-style:italic;">Sign:</td>
                </tr>
                <tr style="height: 60px;">
                  <td>4. </td>
                  <td></td>
                  <td></td>
                  <td style="opacity: 0.3; font-size: 10px; font-style:italic;">Sign:</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="doc-section" style="margin-top: 40px;">
            <p class="doc-para" style="font-size: 11px;">By signing this rider sheet, both parties acknowledge and agree to add these features to the website deliverables at the estimated costs and timelines noted above.</p>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Rider Page</span>
        </div>
      </div>
    `
  },
  bot_agreement: {
    name: "Telegram Bot Service Agreement",
    fields: [
      { id: "agr_id", label: "Agreement Reference ID", type: "text", default: "NXG-BOT-" + Math.floor(10000 + Math.random() * 90000) },
      { id: "agr_date", label: "Agreement Date", type: "text", default: "30 / 07 / 2026" },
      { id: "client_company", label: "Client Business Name", type: "text", default: "Client Business" },
      { id: "client_rep", label: "Client Representative", type: "text", default: "Client Name" },
      { id: "client_contact", label: "Client Email / Phone", type: "text", default: "client@example.com / +91 99999 88888" },
      { id: "proj_title", label: "Project Title", type: "text", default: "Custom Telegram Bot Development" },
      { id: "revision_rate", label: "Extra Revision Rate (?)", type: "text", default: "?1,500" },
      { id: "payment_desc", label: "Payment Method Options", type: "text", default: "Razorpay Invoice Link, UPI, or Bank Transfer" }
    ],
    render: (data) => `
      <!-- PAGE 1: Agreement Cover Page -->
      <div class="doc-page">
        <img class="watermark" src="assets/logo-icon.png" alt="Watermark">
        <div class="agreement-cover-hero">
          <div class="confidential-badge agreement-cover-badge">Confidential Document</div>
          <div class="agreement-cover-logo">
            <img class="hero-icon" src="assets/logo-icon.png" alt="Icon">
            <img class="hero-text" src="assets/logo-text.png" alt="Text">
          </div>
          <p class="doc-hero-pre agreement-cover-pre" style="color:var(--nextgen-green);">Client Service Agreement</p>
          <h1 class="doc-hero-title agreement-cover-title">Telegram Bot Development<br>Service Agreement</h1>
          
          <div class="agreement-cover-meta">
            <div>Agreement Reference: <strong style="color:var(--nextgen-green);">${data.agr_id}</strong></div>
            <div>Contract Version: <strong>v1.0 (Final)</strong></div>
            <div>Effective Date: <strong>${data.agr_date}</strong></div>
          </div>
          
          <div class="divider-line"></div>
          
          <p class="agreement-cover-desc">This legally binding Agreement is entered into by NextGen Web Studio and the Client listed below, governing custom Telegram Bot development and terms. All materials herein are strictly confidential.</p>
        </div>
        <div class="doc-footer">
          <span>Confidential  �  NextGen Web Studio  �  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 1 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 2: Client Details & Checklist -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Agreement Details</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">Agreement Parties Overview</h2>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <tbody>
                  <tr>
                    <td><strong>Agreement Reference</strong></td>
                    <td style="color:var(--nextgen-green);"><strong>${data.agr_id}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Service Provider</strong></td>
                    <td>NextGen Web Studio (Tamil Nadu, India)</td>
                  </tr>
                  <tr>
                    <td><strong>Client Business</strong></td>
                    <td><strong>${data.client_company}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Contact Representative</strong></td>
                    <td>${data.client_rep}</td>
                  </tr>
                  <tr>
                    <td><strong>Client Contact Details</strong></td>
                    <td>${data.client_contact}</td>
                  </tr>
                  <tr>
                    <td><strong>Project Title Scope</strong></td>
                    <td><strong>${data.proj_title}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Client Asset Checklist</h2>
            <p class="doc-para" style="font-size: 12px; margin-bottom: 12px;">Before development commences, the client agrees to provide the following requirements:</p>
            <div class="check-grid">
              <div class="check-item"><span class="check-box"></span> Bot Token (BotFather)</div>
              <div class="check-item"><span class="check-box"></span> Command List</div>
              <div class="check-item"><span class="check-box"></span> Flow Logic</div>
              <div class="check-item"><span class="check-box"></span> API Keys (if any)</div>
              <div class="check-item"><span class="check-box"></span> Server Details</div>
              <div class="check-item"><span class="check-box"></span> Database Config</div>
              <div class="check-item"><span class="check-box"></span> Payment Gateway details</div>
              <div class="check-item"><span class="check-box"></span> Brand/Bot Name</div>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">1. Scope of Work</h2>
            <p class="doc-para">The Service Provider agrees to design and develop a custom Telegram Bot for the Client as per the specifications, features, and integrations agreed upon in the Selected Package. This includes bot setup, webhooks configuration, database architecture, and required API integrations. Any work outside this scope will be treated as a separate Change Request.</p>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  �  NextGen Web Studio  �  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 2 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 3: Deliverables & Timeline -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Deliverables & Schedule</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">Included Scope Deliverables</h2>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th>Core Deliverable</th>
                    <th>Status</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Custom Bot Logic</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Custom command handling, menus, and conversational flows.</td>
                  </tr>
                  <tr>
                    <td><strong>API Integrations</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Integration with third-party services (e.g. Payments, Google Sheets).</td>
                  </tr>
                  <tr>
                    <td><strong>Database Setup</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Data persistence for users, orders, or application state.</td>
                  </tr>
                  <tr>
                    <td><strong>Server Deployment</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Deploying bot script to secure cloud server with active Webhooks.</td>
                  </tr>
                  <tr>
                    <td><strong>Admin Controls</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:600;">Included</td>
                    <td>Admin-only commands for broadcasting or managing bot data.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Payment Milestones</h2>
            <div class="flowchart-container">
              <div class="flowchart-step">
                <div class="flow-node">50%</div>
                <span class="flow-label">Upfront Advance</span>
              </div>
              <div class="flow-arrow">?</div>
              <div class="flowchart-step">
                <div class="flow-node" style="background:var(--nextgen-blue); color:#fff;"><i data-lucide="bot"></i></div>
                <span class="flow-label">Bot Logic Approval</span>
              </div>
              <div class="flow-arrow">?</div>
              <div class="flowchart-step">
                <div class="flow-node" style="background:var(--nextgen-blue); color:#fff;"><i data-lucide="code"></i></div>
                <span class="flow-label">Integration & Testing</span>
              </div>
              <div class="flow-arrow">?</div>
              <div class="flowchart-step">
                <div class="flow-node">50%</div>
                <span class="flow-label">Balance & Deployment</span>
              </div>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">2. Terms & Policies</h2>
            <p class="doc-para"><strong>Project Timeline:</strong> The project estimation timeline begins upon receiving all required API keys, Bot tokens, and flow logic from the Client. Delays in receiving client inputs will postpone milestones by an equivalent length of time.</p>
            <p class="doc-para"><strong>Revisions Policy:</strong> The Client is entitled to 2 complete revision cycles on bot logic and conversational flows during testing phase. Extra logic updates or revisions beyond these cycles are charged at a flat rate of <strong style="color:var(--nextgen-green);">${data.revision_rate}</strong> per round, quoted beforehand.</p>
            <p class="doc-para"><strong>Payment Schedule:</strong> The upfront advance must be paid to initiate development. Final deployment, server configurations, and source code handover will be completed once the final 50% balance has been cleared via ${data.payment_desc}.</p>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  �  NextGen Web Studio  �  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 3 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 4: Clauses & Signatures -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Acceptance & Signature</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section">
            <h2 class="doc-section-title">3. Ownership, Warranty & Law</h2>
            <p class="doc-para" style="font-size:11.5px; margin-bottom:8px;"><strong>Copyright:</strong> Upon receipt of full and final payment, ownership of the custom bot code, scripts, and assets built specifically for this project transfers to the Client.</p>
            <p class="doc-para" style="font-size:11.5px; margin-bottom:8px;"><strong>Warranty:</strong> Service Provider provides a 30-day bug warranty starting on deployment day, covering functional issues in the initial scope. Warranty does not cover API rate limit issues, changes to Telegram API, or server downtime outside our control.</p>
            <p class="doc-para" style="font-size:11.5px; margin-bottom:8px;"><strong>Governing Law:</strong> This agreement is governed by the laws of India. Any legal disputes arising will be subject to the exclusive jurisdiction of the courts of Tamil Nadu, India.</p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Acceptance Handover Checklist</h2>
            <div class="check-grid">
              <div class="check-item"><span class="check-box"></span> Bot Deployed</div>
              <div class="check-item"><span class="check-box"></span> Commands Active</div>
              <div class="check-item"><span class="check-box"></span> DB Connected</div>
              <div class="check-item"><span class="check-box"></span> APIs Integrated</div>
              <div class="check-item"><span class="check-box"></span> Webhooks Set</div>
              <div class="check-item"><span class="check-box"></span> Errors Handled</div>
              <div class="check-item"><span class="check-box"></span> Server Secured</div>
              <div class="check-item"><span class="check-box"></span> Code Handover</div>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Acceptance Signatures</h2>
            <div class="signature-section">
              <div class="sig-block">
                <div class="sig-title">For NextGen Web Studio</div>
                <div class="stamp-box">COMPANY SEAL & SIGNATURE</div>
                <div class="sig-line">___________________________</div>
                <div class="sig-date">Date: ____ / ____ / 2026</div>
              </div>
              <div class="sig-block">
                <div class="sig-title">For the Client (${data.client_company})</div>
                <div class="stamp-box">CLIENT STAMP & SIGNATURE</div>
                <div class="sig-line">___________________________</div>
                <div class="sig-date">Date: ____ / ____ / 2026</div>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  �  NextGen Web Studio  �  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 4 of 4</span>
        </div>
      </div>

      <div class="doc-page-separator"></div>

      <!-- PAGE 5: Change Request Rider Sheet -->
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Rider: Scope Changes</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section" style="margin-bottom:30px;">
            <h2 class="doc-section-title">Scope Change Request Form (Rider A)</h2>
            <p class="doc-para">Use this rider page to document features, additions, or integrations requested during or after development that fall outside the main Agreement's scope of work. Each line must be approved by the Client.</p>
          </div>

          <div class="doc-table-wrapper">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Requested Feature / Modification</th>
                  <th>Estimated Cost</th>
                  <th>Timeline Impact</th>
                  <th>Client Signature Approval</th>
                </tr>
              </thead>
              <tbody>
                <tr style="height: 60px;">
                  <td>1. </td>
                  <td></td>
                  <td></td>
                  <td style="opacity: 0.3; font-size: 10px; font-style:italic;">Sign:</td>
                </tr>
                <tr style="height: 60px;">
                  <td>2. </td>
                  <td></td>
                  <td></td>
                  <td style="opacity: 0.3; font-size: 10px; font-style:italic;">Sign:</td>
                </tr>
                <tr style="height: 60px;">
                  <td>3. </td>
                  <td></td>
                  <td></td>
                  <td style="opacity: 0.3; font-size: 10px; font-style:italic;">Sign:</td>
                </tr>
                <tr style="height: 60px;">
                  <td>4. </td>
                  <td></td>
                  <td></td>
                  <td style="opacity: 0.3; font-size: 10px; font-style:italic;">Sign:</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="doc-section" style="margin-top: 40px;">
            <p class="doc-para" style="font-size: 11px;">By signing this rider sheet, both parties acknowledge and agree to add these features to the bot deliverables at the estimated costs and timelines noted above.</p>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  �  NextGen Web Studio  �  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Rider Page</span>
        </div>
      </div>
    `
  },
  proposal: {
    name: "Client Website Proposal",
    fields: [
      { id: "prop_client", label: "Client Target Business", type: "text", default: "Boomers Gaming Cafe" },
      { id: "prop_date", label: "Proposal Date", type: "text", default: "30 July 2026" },
      { id: "prop_problem", label: "Client Business Goal", type: "textarea", default: "Replacing the manual offline spreadsheet booking system with a conversion-optimized web portal to drive 40%+ online reservation growth." },
      { id: "prop_scope", label: "Scope Deliverables Detail", type: "textarea", default: "Custom high-fidelity UI layout designed in Figma; Next.js frontend code; integrated interactive reservation calendars; automatic Razorpay payment checkout; Google Map APIs; SEO tags." },
      { id: "prop_cost", label: "Estimated Cost (₹)", type: "text", default: "₹24,999" },
      { id: "prop_timeline", label: "Estimated Duration", type: "text", default: "4 Weeks" }
    ],
    render: (data) => `
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Client Web Proposal</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-hero" style="min-height: auto; padding: 20px 0; margin-bottom: 30px;">
            <div class="doc-hero-content" style="gap: 12px;">
              <p class="doc-hero-pre" style="color:var(--nextgen-green);">Client Proposal Project</p>
              <h1 style="font-size: 34px; font-family:'Outfit'; font-weight:800;">Designing Your Digital Engine</h1>
              <p class="doc-para">Prepared exclusively for <strong>${data.prop_client}</strong></p>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Project Goal</h2>
            <div class="founder-message">
              <div class="founder-quote" style="font-size: 13.5px; font-weight: normal; font-style: normal; line-height: 1.6;">"${data.prop_problem}"</div>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Proposed Architecture & Scope</h2>
            <p class="doc-para">${data.prop_scope}</p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Timeline & Cost Estimate</h2>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th>Project Stage</th>
                    <th>Timeline</th>
                    <th>Deliverables Included</th>
                    <th>Investment Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Phase 1: UI/UX & Prototypes</strong></td>
                    <td>Week 1-2</td>
                    <td>Figma designs, brand layout, grid system blueprint</td>
                    <td rowspan="2" style="vertical-align: middle; text-align: center; font-size: 18px; font-weight: 700; color: var(--nextgen-green);">${data.prop_cost}</td>
                  </tr>
                  <tr>
                    <td><strong>Phase 2: Launch Code & SEO</strong></td>
                    <td>Week 3-4</td>
                    <td>Next.js frontend build, payment connections, domain launch</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 1 of 1</span>
        </div>
      </div>
    `
  },
  invoice: {
    name: "Client Invoice",
    fields: [
      { id: "inv_no", label: "Invoice Number", type: "text", default: "NG-2026-081" },
      { id: "inv_date", label: "Invoice Date", type: "text", default: "30 / 07 / 2026" },
      { id: "inv_client", label: "Client Business Name", type: "text", default: "Boomers Gaming Cafe" },
      { id: "inv_client_addr", label: "Client Address/Details", type: "text", default: "Anna Nagar, Chennai, Tamil Nadu" },
      { id: "inv_item1", label: "Item 1 Description", type: "text", default: "Website Design & Front-End React Development" },
      { id: "inv_item1_val", label: "Item 1 Price (₹)", type: "text", default: "19,999" },
      { id: "inv_item2", label: "Item 2 Description", type: "text", default: "CMS Portal & Payment Integration" },
      { id: "inv_item2_val", label: "Item 2 Price (₹)", type: "text", default: "5,000" }
    ],
    render: (data) => {
      const v1 = parseFloat(data.inv_item1_val.replace(/,/g, '')) || 0;
      const v2 = parseFloat(data.inv_item2_val.replace(/,/g, '')) || 0;
      const subtotal = v1 + v2;
      const tax = Math.round(subtotal * 0.18);
      const grandTotal = subtotal + tax;

      return `
        <div class="doc-page">
          <div class="doc-header">
            <div class="doc-header-logo">
              <img class="header-icon" src="assets/logo-icon.png">
              <img class="header-text" src="assets/logo-text.png">
            </div>
            <div class="doc-header-meta" style="color:var(--nextgen-green); font-weight:700;">INVOICE</div>
          </div>

          <div class="doc-page-content">
            <div class="invoice-top">
              <div>
                <h1 style="font-size:24px; font-family:'Outfit'; font-weight:800; margin-bottom:4px;">TAX INVOICE</h1>
                <span class="invoice-meta-value" style="color:var(--nextgen-green);">${data.inv_no}</span>
              </div>
              <div style="text-align:right;">
                <div class="invoice-meta-item">
                  <span class="invoice-meta-label">Date Issued</span>
                  <span class="invoice-meta-value">${data.inv_date}</span>
                </div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px; margin-bottom:4px;">
              <div class="invoice-bill-to">
                <span class="invoice-meta-label" style="display:block; margin-bottom:6px;">Billed To:</span>
                <strong style="display:block; font-size:14px; font-family:'Outfit';">${data.inv_client}</strong>
                <p class="doc-para" style="font-size:11.5px; margin-top:4px; line-height:1.4;">${data.inv_client_addr}</p>
              </div>
              <div class="invoice-bill-to">
                <span class="invoice-meta-label" style="display:block; margin-bottom:6px;">Sent From:</span>
                <strong style="display:block; font-size:14px; font-family:'Outfit';">NextGen Web Studio</strong>
                <p class="doc-para" style="font-size:11.5px; margin-top:4px; line-height:1.4;">Tamil Nadu, India<br>nextgenwebstudio63@gmail.com</p>
              </div>
            </div>

            <div class="doc-table-wrapper" style="margin-top:20px;">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th>Service / Item Description</th>
                    <th style="text-align:right; width: 120px;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${data.inv_item1}</td>
                    <td style="text-align:right; font-weight:600;">₹${v1.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td>${data.inv_item2}</td>
                    <td style="text-align:right; font-weight:600;">₹${v2.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="invoice-totals">
              <div class="invoice-total-row">
                <span>Subtotal</span>
                <span>₹${subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div class="invoice-total-row">
                <span>GST (18%)</span>
                <span>₹${tax.toLocaleString('en-IN')}</span>
              </div>
              <div class="invoice-total-row grand-total">
                <span>Grand Total</span>
                <span>₹${grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style="margin-top:40px; padding:16px; border-radius:12px; background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.05); font-size:11px;">
              <strong style="display:block; margin-bottom:4px; font-family:'Outfit';">Payment terms:</strong>
              <p class="doc-para" style="margin-bottom:0; font-size:11px;">Please pay this invoice within 7 business days of delivery. Remit payments through Razorpay link shared via email or direct bank transfer. Thank you for your business!</p>
            </div>
          </div>

          <div class="doc-footer">
            <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
            <span class="page-num-placeholder">Page 1 of 1</span>
          </div>
        </div>
      `;
    }
  },
  receipt: {
    name: "Payment Receipt",
    fields: [
      { id: "rcp_no", label: "Receipt Number", type: "text", default: "REC-2026-081" },
      { id: "rcp_date", label: "Receipt Date", type: "text", default: "30 / 07 / 2026" },
      { id: "rcp_client", label: "Received From (Client)", type: "text", default: "Boomers Gaming Cafe" },
      { id: "rcp_invoice", label: "Linked Invoice No", type: "text", default: "NG-2026-081" },
      { id: "rcp_method", label: "Payment Channel", type: "text", default: "Razorpay / UPI" },
      { id: "rcp_val", label: "Amount Received (₹)", type: "text", default: "29,499" }
    ],
    render: (data) => `
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta" style="color:var(--nextgen-green); font-weight:700;">RECEIPT</div>
        </div>

        <div class="doc-page-content">
          <div class="invoice-top" style="margin-bottom:40px;">
            <div>
              <h1 style="font-size:24px; font-family:'Outfit'; font-weight:800; margin-bottom:4px;">PAYMENT RECEIPT</h1>
              <span class="invoice-meta-value" style="color:var(--nextgen-green);">${data.rcp_no}</span>
            </div>
            <div style="text-align:right;">
              <div class="invoice-meta-item">
                <span class="invoice-meta-label">Payment Date</span>
                <span class="invoice-meta-value">${data.rcp_date}</span>
              </div>
            </div>
          </div>

          <div style="border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.015); border-radius:16px; padding:30px; margin-bottom:40px; text-align:center;">
            <div style="font-size:13px; color:#a1a1aa; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">Total Amount Received</div>
            <div style="font-size:42px; font-family:'Outfit'; font-weight:800; color:var(--nextgen-green); margin-bottom:12px;">₹${data.rcp_val}</div>
            <div class="table-icon-check" style="font-size:13px; font-weight:700;">✅ Transaction Completed Successfully</div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Receipt Breakdown</h2>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <tbody>
                  <tr>
                    <td><strong>Billed Customer</strong></td>
                    <td>${data.rcp_client}</td>
                  </tr>
                  <tr>
                    <td><strong>For Invoice Reference</strong></td>
                    <td>${data.rcp_invoice}</td>
                  </tr>
                  <tr>
                    <td><strong>Payment Method Channel</strong></td>
                    <td>${data.rcp_method}</td>
                  </tr>
                  <tr>
                    <td><strong>Payment Status</strong></td>
                    <td style="color:var(--nextgen-green); font-weight:700;">PAID IN FULL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="signature-section" style="margin-top:50px;">
            <div class="sig-block">
              <div class="sig-title">Acknowledged By</div>
              <div class="stamp-box" style="border-color:var(--nextgen-green); color:var(--nextgen-green);">PAID - THANK YOU</div>
              <div class="sig-line">___________________________</div>
              <div class="sig-date">NextGen Web Studio Representative</div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 1 of 1</span>
        </div>
      </div>
    `
  },
  maintenance: {
    name: "Maintenance Plans",
    fields: [
      { id: "mn_starter", label: "Starter Monthly Cost (₹)", type: "text", default: "₹1,999" },
      { id: "mn_business", label: "Business Monthly Cost (₹)", type: "text", default: "₹4,999" },
      { id: "mn_premium", label: "Premium Monthly Cost (₹)", type: "text", default: "₹9,999" }
    ],
    render: (data) => `
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Maintenance Packages</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section" style="text-align:center; margin-bottom:30px;">
            <p class="doc-hero-pre" style="color:var(--nextgen-green);">Post-Launch Support</p>
            <h1 style="font-size:30px; font-family:'Outfit'; font-weight:800; margin-bottom:8px;">Website Maintenance Plans</h1>
            <p class="doc-para">Ensure your digital assets remain fast, secure, and fully updated.</p>
          </div>

          <div class="glass-grid" style="margin-bottom:30px;">
            <div class="glass-card" style="text-align:center;">
              <h3 style="font-family:'Outfit'; font-size:15px; margin-bottom:6px;">Starter Support</h3>
              <div style="font-size:20px; font-weight:800; color:var(--nextgen-green); margin-bottom:12px;">${data.mn_starter} <span style="font-size:10px; font-weight:normal; color:#a1a1aa;">/ mo</span></div>
              <p class="doc-para" style="font-size:11px; line-height:1.45;">Ideal for basic portfolio sites. Includes weekly plugins checking, monthly backups, email support.</p>
            </div>
            <div class="glass-card" style="text-align:center; border-color:var(--nextgen-green);">
              <h3 style="font-family:'Outfit'; font-size:15px; margin-bottom:6px; color:var(--nextgen-green);">Business Growth</h3>
              <div style="font-size:20px; font-weight:800; color:var(--nextgen-green); margin-bottom:12px;">${data.mn_business} <span style="font-size:10px; font-weight:normal; color:#a1a1aa;">/ mo</span></div>
              <p class="doc-para" style="font-size:11px; line-height:1.45;">Ideal for CMS and active startups. Daily backups, performance audits, up to 2 hrs of monthly updates.</p>
            </div>
            <div class="glass-card" style="text-align:center;">
              <h3 style="font-family:'Outfit'; font-size:15px; margin-bottom:6px;">Premium Agency</h3>
              <div style="font-size:20px; font-weight:800; color:var(--nextgen-green); margin-bottom:12px;">${data.mn_premium} <span style="font-size:10px; font-weight:normal; color:#a1a1aa;">/ mo</span></div>
              <p class="doc-para" style="font-size:11px; line-height:1.45;">Ideal for online stores. 24/7 server monitoring, up to 5 hrs of developer changes, Stripe support audits.</p>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Support Coverage Comparison</h2>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th>Feature Scope</th>
                    <th>Starter</th>
                    <th>Business</th>
                    <th>Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Database & Code Backups</td>
                    <td>Monthly</td>
                    <td>Daily</td>
                    <td>Real-Time</td>
                  </tr>
                  <tr>
                    <td>Security Scans</td>
                    <td>Monthly</td>
                    <td>Weekly</td>
                    <td>Continuous</td>
                  </tr>
                  <tr>
                    <td>Developer Custom Changes</td>
                    <td>Charged Extra</td>
                    <td>2 hours / mo</td>
                    <td>5 hours / mo</td>
                  </tr>
                  <tr>
                    <td>Response Priority Status</td>
                    <td>48 Business Hrs</td>
                    <td>24 Business Hrs</td>
                    <td>4 Emergency Hrs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 1 of 1</span>
        </div>
      </div>
    `
  },
  brand_guidelines: {
    name: "Agency Brand Guidelines",
    fields: [
      { id: "bg_headings", label: "Heading Font Family", type: "text", default: "Outfit" },
      { id: "bg_body", label: "Body Text Font Family", type: "text", default: "Inter" },
      { id: "bg_colors", label: "Brand Primary Colors", type: "text", default: "Neon Lime Green (#a3e635), Electric Blue (#2563eb), Matte Black (#000000)" }
    ],
    render: (data) => `
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Brand Book</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section" style="text-align:center; margin-bottom:30px;">
            <p class="doc-hero-pre" style="color:var(--nextgen-green);">Identity Specifications</p>
            <h1 style="font-size:32px; font-family:'Outfit'; font-weight:800; margin-bottom:8px;">NextGen Brand Guidelines</h1>
            <p class="doc-para">Rules governing logo layouts, typography hierarchies, and color schemes.</p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">1. Color Palette System</h2>
            <div class="check-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom:20px;">
              <div style="background:#a3e635; color:#000; padding:20px; border-radius:12px; text-align:center;">
                <strong style="display:block; font-size:12px;">Lime Green Accent</strong>
                <span style="font-size:10px;">HEX #a3e635</span>
              </div>
              <div style="background:#2563eb; color:#fff; padding:20px; border-radius:12px; text-align:center;">
                <strong style="display:block; font-size:12px;">Electric Blue</strong>
                <span style="font-size:10px;">HEX #2563eb</span>
              </div>
              <div style="background:#09090b; color:#fff; padding:20px; border-radius:12px; text-align:center; border:1px solid rgba(255,255,255,0.1);">
                <strong style="display:block; font-size:12px;">Matte Black</strong>
                <span style="font-size:10px;">HEX #09090b</span>
              </div>
            </div>
            <p class="doc-para" style="font-size:11.5px;">Palette variables config: <strong>${data.bg_colors}</strong></p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">2. Typography Structure</h2>
            <div style="border:1px solid rgba(255,255,255,0.05); padding:20px; border-radius:12px; background:rgba(255,255,255,0.01);">
              <div style="margin-bottom:12px;">
                <span style="font-size:10px; color:#a1a1aa; text-transform:uppercase;">Primary Headings Style:</span>
                <div style="font-family:'Outfit', sans-serif; font-size:20px; font-weight:700; color:#fff; margin-top:4px;">${data.bg_headings} Font family</div>
              </div>
              <div>
                <span style="font-size:10px; color:#a1a1aa; text-transform:uppercase;">Body Paragraphs Style:</span>
                <div style="font-family:'Inter', sans-serif; font-size:14px; color:#a1a1aa; margin-top:4px; line-height:1.6;">${data.bg_body} Font Family. Standard paragraphs are styled here with 1.6x line heights for clean, high-readability interfaces.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 1 of 1</span>
        </div>
      </div>
    `
  },
  handover: {
    name: "Website Handover Guide",
    fields: [
      { id: "hd_domain", label: "Active Project Domain", type: "text", default: "www.boomersgamingcafe.com" },
      { id: "hd_hosting", label: "Hosting Platform Provider", type: "text", default: "Vercel Enterprise CDN" },
      { id: "hd_db", label: "Database Client Host", type: "text", default: "MongoDB Atlas Cloud" },
      { id: "hd_support", label: "Support Ending Date", type: "text", default: "30 August 2026 (30-day support included)" }
    ],
    render: (data) => `
      <div class="doc-page">
        <div class="doc-header">
          <div class="doc-header-logo">
            <img class="header-icon" src="assets/logo-icon.png">
            <img class="header-text" src="assets/logo-text.png">
          </div>
          <div class="doc-header-meta">Handover Guide</div>
        </div>

        <div class="doc-page-content">
          <div class="doc-section" style="text-align:center; margin-bottom:30px;">
            <p class="doc-hero-pre" style="color:var(--nextgen-green);">Client Handover Guide</p>
            <h1 style="font-size:30px; font-family:'Outfit'; font-weight:800; margin-bottom:8px;">Website Handover Guide</h1>
            <p class="doc-para">Instructions, dashboard credentials, and hosting configs for your new website.</p>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">Deployment Specifics</h2>
            <div class="doc-table-wrapper">
              <table class="doc-table">
                <tbody>
                  <tr>
                    <td><strong>Website Live URL</strong></td>
                    <td><a href="https://${data.hd_domain}" target="_blank" style="color:var(--nextgen-green); font-weight:700;">https://${data.hd_domain}</a></td>
                  </tr>
                  <tr>
                    <td><strong>Frontend Hosting Provider</strong></td>
                    <td>${data.hd_hosting}</td>
                  </tr>
                  <tr>
                    <td><strong>Database Host</strong></td>
                    <td>${data.hd_db}</td>
                  </tr>
                  <tr>
                    <td><strong>Support Coverage Period</strong></td>
                    <td>Ends: <strong>${data.hd_support}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="doc-section">
            <h2 class="doc-section-title">3-Step Admin Checklist</h2>
            <div class="timeline-container" style="margin-top: 16px;">
              <div class="timeline-line"></div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-title">1. Connect Your Domain Nameservers</span>
                  <span class="timeline-desc">Navigate to your domain registrar (GoDaddy, Namecheap) and input the Vercel nameserver configuration pointers provided in the invoice.</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-title">2. Login to Your Admin CMS Dashboard</span>
                  <span class="timeline-desc">Navigate to /admin, and type the credentials shared in your handover email. Here you can edit prices, review statistics, and add portfolios.</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-title">3. Configure Razorpay Gateway API Keys</span>
                  <span class="timeline-desc">Login to your dashboard, switch API keys to live mode, and insert the client token inside your server settings.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <span>Confidential  ·  NextGen Web Studio  ·  nextgenwebstudio.in</span>
          <span class="page-num-placeholder">Page 1 of 1</span>
        </div>
      </div>
    `
  }
};

let activeTemplate = "agreement"; // Default to Website Design Agreement as requested by user

function initDocumentCenter() {
  const templateSelector = document.getElementById("docTemplateSelector");
  const themeToggle = document.getElementById("docThemeToggle");
  const logoToggle = document.getElementById("docLogoToggle");
  const marginToggle = document.getElementById("docMarginToggle");
  const printBtn = document.getElementById("docPrintBtn");

  if (!templateSelector) return; // Only init if tab exists on page

  loadTemplate(activeTemplate);

  templateSelector.addEventListener("change", (e) => {
    activeTemplate = e.target.value;
    loadTemplate(activeTemplate);
  });

  themeToggle.addEventListener("change", (e) => {
    const previewContainer = document.getElementById("docPreviewContainer");
    if (!previewContainer) return;
    if (e.target.checked) {
      previewContainer.classList.add("preview-dark");
      previewContainer.classList.remove("preview-light");
    } else {
      previewContainer.classList.add("preview-light");
      previewContainer.classList.remove("preview-dark");
    }
  });

  logoToggle.addEventListener("change", (e) => {
    const logos = document.querySelectorAll(".doc-header-logo, .doc-hero-logo");
    logos.forEach(logo => {
      logo.style.visibility = e.target.checked ? "visible" : "hidden";
    });
  });

  marginToggle.addEventListener("change", (e) => {
    const pages = document.querySelectorAll(".doc-page");
    pages.forEach(page => {
      if (e.target.checked) {
        page.style.padding = "30px 40px";
      } else {
        page.style.padding = "10px";
      }
    });
  });

  printBtn.addEventListener("click", () => {
    window.print();
  });
}

function loadTemplate(templateId) {
  const template = templates[templateId];
  if (!template) return;

  const container = document.getElementById("docDynamicFields");
  if (!container) return;
  container.innerHTML = "";

  const state = {};
  template.fields.forEach(field => {
    state[field.id] = field.default;

    const fieldWrapper = document.createElement("div");
    fieldWrapper.className = "field-wrapper";

    const label = document.createElement("label");
    label.innerText = field.label;
    fieldWrapper.appendChild(label);

    let input;
    if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.className = "sidebar-textarea";
      input.rows = 3;
    } else {
      input = document.createElement("input");
      input.type = "text";
      input.className = "sidebar-input";
    }

    input.id = `input-${field.id}`;
    input.value = field.default;
    
    input.addEventListener("input", (e) => {
      state[field.id] = e.target.value;
      updatePreview(templateId, state, field.id);
    });

    fieldWrapper.appendChild(input);
    container.appendChild(fieldWrapper);
  });

  updatePreview(templateId, state);
}

function updatePreview(templateId, data, updatedFieldId = null) {
  const previewContainer = document.getElementById("docPreviewContainer");
  if (!previewContainer) return;
  const template = templates[templateId];
  if (!template) return;

  // Render main template HTML
  previewContainer.innerHTML = template.render(data);

  // Compute and inject dynamic page numbering (e.g. Page 1 of 4)
  const pages = previewContainer.querySelectorAll(".doc-page");
  const totalPages = pages.length;
  pages.forEach((page, index) => {
    const pageNumPlaceholder = page.querySelector(".page-num-placeholder");
    if (pageNumPlaceholder) {
      pageNumPlaceholder.innerText = `Page ${index + 1} of ${totalPages}`;
    }
  });

  try {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (err) {
    console.warn("Lucide icons failed to render:", err);
  }

  // Highlight edited input fields temporarily
  if (updatedFieldId) {
    const highlights = previewContainer.querySelectorAll(`[data-var="${updatedFieldId}"]`);
    highlights.forEach(el => {
      el.classList.add("live-val-highlight");
      setTimeout(() => {
        el.classList.remove("live-val-highlight");
      }, 1000);
    });
  }

  // Handle headers state
  const logoToggle = document.getElementById("docLogoToggle");
  if (logoToggle) {
    const logoChecked = logoToggle.checked;
    const logos = document.querySelectorAll(".doc-header-logo, .doc-hero-logo");
    logos.forEach(logo => {
      logo.style.visibility = logoChecked ? "visible" : "hidden";
    });
  }

  // Handle page padding margins state
  const marginToggle = document.getElementById("docMarginToggle");
  if (marginToggle) {
    const marginChecked = marginToggle.checked;
    const pagesElements = document.querySelectorAll(".doc-page");
    pagesElements.forEach(page => {
      if (marginChecked) {
        page.style.padding = "30px 40px";
      } else {
        page.style.padding = "10px";
      }
    });
  }
}

// Bind load listener on dashboard navigation
document.addEventListener("DOMContentLoaded", initDocumentCenter);
