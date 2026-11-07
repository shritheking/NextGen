# -*- coding: utf-8 -*-
"""
Upgrade index.html with Apple, Google, PlayStation, and Figma-inspired architecture.
"""

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add Canvas Status Bar above h1 in Hero
canvas_bar = """      <div class="canvas-status-bar">
        <span class="pulse-dot"></span>
        <span>STUDIO ENGINE: ACTIVE</span>
        <span class="sep">&bull;</span>
        <span>COIMBATORE, TN</span>
        <span class="sep">&bull;</span>
        <span>&lt;20MS LATENCY</span>
        <span class="sep">&bull;</span>
        <span>100% CLIENT IP OWNERSHIP</span>
      </div>
"""

if '<div class="canvas-status-bar">' not in html:
    target = '<div class="hero-text-content">'
    html = html.replace(target, target + "\n" + canvas_bar, 1)
    print("Added canvas status bar to hero!")

# 2. Add Apple-style Console Tabs inside the terminal header
old_term_bar = """            <div class="term-bar">
              <div class="term-dot close"></div>
              <div class="term-dot minimize"></div>
              <div class="term-dot expand"></div>
              <span class="term-title">bash — nextgen-studio</span>
            </div>"""

new_term_bar = """            <div class="term-bar">
              <div class="term-dot close"></div>
              <div class="term-dot minimize"></div>
              <div class="term-dot expand"></div>
              <div class="console-tabs" style="margin-left: 14px;">
                <button type="button" class="console-tab-btn active" data-pane="bash"><i class="fa-solid fa-terminal"></i> bash</button>
                <button type="button" class="console-tab-btn" data-pane="ai"><i class="fa-solid fa-brain"></i> agentic-ai</button>
                <button type="button" class="console-tab-btn" data-pane="mt5"><i class="fa-brands fa-telegram"></i> mt5-bot</button>
              </div>
            </div>"""

if old_term_bar in html:
    html = html.replace(old_term_bar, new_term_bar, 1)
    print("Added console tabs to terminal header!")

# 3. Add all 7 projects to the Work section
old_filters = """      <div class="filters">
        <button class="filter-btn active" data-filter="all"><i class="fa-solid fa-square"></i> All Projects (4)</button>
        <button class="filter-btn" data-filter="fullstack"><i class="fa-solid fa-server"></i> Full-Stack (4)</button>
      </div>"""

new_filters = """      <div class="filters">
        <button class="filter-btn active" data-filter="all"><i class="fa-solid fa-square"></i> All Projects (7)</button>
        <button class="filter-btn" data-filter="web"><i class="fa-solid fa-code"></i> Web Apps (3)</button>
        <button class="filter-btn" data-filter="saas"><i class="fa-solid fa-layer-group"></i> SaaS (2)</button>
        <button class="filter-btn" data-filter="ai"><i class="fa-solid fa-brain"></i> AI Solutions (2)</button>
        <button class="filter-btn" data-filter="automation"><i class="fa-solid fa-gears"></i> Automation (2)</button>
      </div>"""

if old_filters in html:
    html = html.replace(old_filters, new_filters, 1)
    print("Updated filter bar to 7 projects!")

# Projects 5, 6, 7 code to append after Project 4
extra_projects = """
        <!-- Project 5: AI Interview Assistant -->
        <div class="work-card" data-cat="ai">
          <div class="browser-frame">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="work-image-container">
              <img src="/images/ai_assistant.jpg" alt="AI Interview Assistant Platform Mockup" loading="lazy">
            </div>
          </div>
          <div class="work-info">
            <div class="work-meta">
              <span class="work-badge featured"><i class="fa-solid fa-sparkles"></i> AI Engine</span>
              <span class="work-badge live">Sandbox</span>
              <span class="work-tag">AI Solutions</span>
            </div>
            <h3>AI Interview Assistant</h3>
            <p>Real-time speech transcription, dynamic technical question generation, and structured rubric grading powered by OpenAI Whisper and LLMs.</p>
            <ul class="work-metrics">
              <li><i class="fa-solid fa-circle-check"></i> Real-time Audio Streaming</li>
              <li><i class="fa-solid fa-circle-check"></i> Objective Rubric Scoring</li>
              <li><i class="fa-solid fa-circle-check"></i> Anti-Cheat Telemetry</li>
            </ul>
            <div class="work-stack">
              <span class="tech-react"><i class="fa-brands fa-python"></i> Python</span>
              <span class="tech-node"><i class="fa-solid fa-bolt"></i> FastAPI</span>
              <span class="tech-mongo"><i class="fa-solid fa-brain"></i> Whisper / LLM</span>
            </div>
            <a href="portfolio.html?project=interview" class="work-view-link">Explore Architecture <i class="fa-solid fa-arrow-right-long"></i></a>
          </div>
        </div>

        <!-- Project 6: AEGIS-ORBIT Space Debris Tracking -->
        <div class="work-card" data-cat="ai automation">
          <div class="browser-frame">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="work-image-container" style="background: linear-gradient(135deg, #090D16 0%, #111A2E 100%); display:flex; align-items:center; justify-content:center; min-height: 220px;">
              <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" style="width:140px; opacity:0.85;">
                <circle cx="100" cy="60" r="40" fill="none" stroke="#E0FF4F" stroke-width="1.5" stroke-dasharray="4 4"/>
                <circle cx="100" cy="60" r="22" fill="#1E293B" stroke="#0070D1" stroke-width="2"/>
                <circle cx="128" cy="42" r="4" fill="#F43F5E"/>
                <circle cx="78" cy="80" r="3" fill="#10B981"/>
                <line x1="100" y1="60" x2="128" y2="42" stroke="rgba(244,63,94,0.6)" stroke-width="1"/>
              </svg>
            </div>
          </div>
          <div class="work-info">
            <div class="work-meta">
              <span class="work-badge" style="background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3);"><i class="fa-solid fa-lightbulb"></i> Illustrative Preview</span>
              <span class="work-tag">Aerospace Concept</span>
            </div>
            <h3>AEGIS-ORBIT Debris Tracker</h3>
            <p>Real-time low-Earth orbit (LEO) trajectory predictor utilizing SGP4 mathematical propagators to alert satellite constellation operators of collision risks.</p>
            <ul class="work-metrics">
              <li><i class="fa-solid fa-circle-check"></i> SGP4 Orbital Propagator</li>
              <li><i class="fa-solid fa-circle-check"></i> 3D WebGL Visualization</li>
              <li><i class="fa-solid fa-circle-check"></i> Proximity Risk Analysis</li>
            </ul>
            <div class="work-stack">
              <span class="tech-react"><i class="fa-brands fa-python"></i> Python</span>
              <span class="tech-node"><i class="fa-solid fa-cube"></i> Three.js</span>
              <span class="tech-mongo"><i class="fa-solid fa-satellite"></i> TLE Data</span>
            </div>
            <a href="portfolio.html?project=aegis" class="work-view-link">Explore Architecture <i class="fa-solid fa-arrow-right-long"></i></a>
          </div>
        </div>

        <!-- Project 7: SkyDrop Drone Delivery Concept -->
        <div class="work-card" data-cat="automation saas">
          <div class="browser-frame">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="work-image-container" style="background: linear-gradient(135deg, #0D131A 0%, #182330 100%); display:flex; align-items:center; justify-content:center; min-height: 220px;">
              <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" style="width:140px; opacity:0.85;">
                <path d="M70,50 L130,50 M100,30 L100,75 M70,50 L55,35 M130,50 L145,35 M70,50 L55,65 M130,50 L145,65" stroke="#E0FF4F" stroke-width="2" stroke-linecap="round"/>
                <circle cx="100" cy="50" r="10" fill="#241B35" stroke="#0070D1" stroke-width="2"/>
                <rect x="90" y="75" width="20" height="15" fill="#E0FF4F" rx="3"/>
              </svg>
            </div>
          </div>
          <div class="work-info">
            <div class="work-meta">
              <span class="work-badge" style="background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3);"><i class="fa-solid fa-lightbulb"></i> Illustrative Preview</span>
              <span class="work-tag">Logistics Concept</span>
            </div>
            <h3>SkyDrop Drone Delivery</h3>
            <p>Autonomous medical fleet dispatch simulator featuring geo-fenced flight corridors, battery telemetry consumption models, and automated drop confirmations.</p>
            <ul class="work-metrics">
              <li><i class="fa-solid fa-circle-check"></i> Waypoint Telemetry Tracking</li>
              <li><i class="fa-solid fa-circle-check"></i> Airspace Geo-fencing</li>
              <li><i class="fa-solid fa-circle-check"></i> Automated Release Triggers</li>
            </ul>
            <div class="work-stack">
              <span class="tech-react"><i class="fa-brands fa-node-js"></i> Node.js</span>
              <span class="tech-node"><i class="fa-solid fa-map-location-dot"></i> Mapbox GL</span>
              <span class="tech-mongo"><i class="fa-solid fa-bolt"></i> WebSockets</span>
            </div>
            <a href="portfolio.html?project=skydrop" class="work-view-link">Explore Architecture <i class="fa-solid fa-arrow-right-long"></i></a>
          </div>
        </div>
"""

# Update data-cat attributes on projects 1-4
html = html.replace('data-cat="fullstack"', 'data-cat="web saas"', 2) # Boomers & GoatTurf
html = html.replace('data-cat="fullstack"', 'data-cat="web"', 1)     # NeiMozhi
html = html.replace('data-cat="fullstack"', 'data-cat="saas automation"', 1) # NextGen Billing

if '<!-- Project 5: AI Interview Assistant -->' not in html:
    # Insert after project 4
    proj4_end = '<!-- Project 4: NextGen Billing System -->'
    if proj4_end in html:
        # Find the end of project 4 work-card
        p4_idx = html.find(proj4_end)
        card_end = html.find('</div>\n        </div>\n\n      </div>', p4_idx)
        if card_end != -1:
            insertion_point = card_end + len('</div>\n        </div>')
            html = html[:insertion_point] + "\n" + extra_projects + html[insertion_point:]
            print("Appended Projects 5, 6, and 7 to workGrid!")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Upgraded index.html successfully!")
