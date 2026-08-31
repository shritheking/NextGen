import os

with open("telegram-bot-development.html", "r", encoding="utf-8") as f:
    content = f.read()

def remove_between(html, start_str, end_str):
    if start_str not in html: return html
    start_idx = html.find(start_str)
    end_idx = html.find(end_str, start_idx)
    if end_idx != -1:
        end_idx += len(end_str)
        return html[:start_idx] + html[end_idx:]
    return html

# 1. Update the tech stack and case study layout

new_case_study_and_tech = """    <!-- TECH STACK -->
    <section class="block" id="tech-stack" style="padding-bottom: 30px; border-bottom: none;">
      <div class="path-label">~/tech-stack</div>
      <div class="section-head">
        <h2>Telegram Bot Stack</h2>
      </div>
      <div class="filters" style="justify-content: center; margin-top: 30px; display: flex; flex-wrap: wrap; gap: 12px; max-width: 800px; margin-left: auto; margin-right: auto;">
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
    <section class="block" id="case-study" style="padding-top: 30px; border-top: none;">
      <div class="path-label">~/case-study</div>
      
      <div class="section-head" style="margin-bottom: 40px;">
        <h2 style="font-size: clamp(24px, 3vw, 32px); margin-bottom: 8px;">CASE STUDY // TELEGRAM AUTOMATION</h2>
        <p class="section-note" style="font-family: var(--font-mono); color: var(--accent); font-size: 14px;">Infinity Trader — MT5 License &amp; Delivery System</p>
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
          
          @keyframes pulse-arrow {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }
          @media (prefers-reduced-motion: reduce) {
            .arch-arrow i { animation: none; }
          }

          /* Desktop Grid Layout */
          .arch-desktop {
            display: grid;
            grid-template-columns: auto auto auto auto auto auto auto;
            align-items: center;
            justify-items: center;
            gap: 16px 20px;
            max-width: 900px;
            margin: 0 auto;
          }

          /* Mobile Vertical Layout */
          .arch-mobile {
            display: none;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          @media (max-width: 900px) {
            .arch-desktop { display: none; }
            .arch-mobile { display: flex; }
          }
        </style>

        <!-- DESKTOP S-CURVE ARCHITECTURE -->
        <div class="arch-desktop">
          <!-- Row 1 -->
          <div class="arch-node primary">Telegram Client</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-right"></i></div>
          <div class="arch-node">FastAPI Backend</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-right"></i></div>
          <div class="arch-node">License System</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-right"></i></div>
          <div class="arch-node">Compile Queue</div>
          
          <!-- Row 2 (Down Arrow on Right) -->
          <div style="grid-column: 1 / 7;"></div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          
          <!-- Row 3 (Right to Left) -->
          <div class="arch-node output">Storage</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-left"></i></div>
          <div class="arch-node output">EX5 Binary</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-left"></i></div>
          <div class="arch-node">MetaEditor</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-left"></i></div>
          <div class="arch-node">Docker + Wine</div>
          
          <!-- Row 4 (Down Arrow on Left) -->
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div style="grid-column: 2 / 8;"></div>
          
          <!-- Row 5 -->
          <div class="arch-node primary">Telegram Delivery</div>
          <div style="grid-column: 2 / 8;"></div>
        </div>

        <!-- MOBILE VERTICAL ARCHITECTURE -->
        <div class="arch-mobile">
          <div class="arch-node primary">Telegram Client</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node">FastAPI Backend</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node">License System</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node">Compile Queue</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node">Docker + Wine</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node">MetaEditor</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node output">EX5 Binary</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node output">Storage</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node primary">Telegram Delivery</div>
        </div>

      </div>
    </section>

    <!-- CTA SECTION -->
"""

start_idx = content.find('    <!-- TECH STACK -->')
end_idx = content.find('    <!-- CTA SECTION -->')

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_case_study_and_tech + content[end_idx + len('    <!-- CTA SECTION -->'):]

with open("telegram-bot-development.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated tech stack and case study sections.")
