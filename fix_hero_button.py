import os

with open("telegram-bot-development.html", "r", encoding="utf-8") as f:
    content = f.read()

old_hero = """          <div class="hero-actions" style="display: flex; gap: 16px;">
            <a href="#contact?service=Telegram+Bot" class="btn-primary" onclick="document.querySelector('[data-value=\\'Telegram Bot\\']').click();">start a project <i class="fa-solid fa-arrow-right"></i></a>
            <a href="#capabilities" class="btn-ghost">view capabilities</a>
            <a href="https://t.me/InfinityTraderOfficialBot" target="_blank" class="btn-ghost" style="border-color: #0088cc; color: #0088cc;"><i class="fa-brands fa-telegram" style="margin-right: 8px;"></i> chat with demo bot</a>
          </div>"""

new_hero = """          <div class="hero-actions">
            <a href="#contact?service=Telegram+Bot" class="btn-primary" onclick="document.querySelector('[data-value=\\'Telegram Bot\\']').click();">start a project <i class="fa-solid fa-arrow-right"></i></a>
            <a href="#capabilities" class="btn-ghost">view capabilities</a>
          </div>
          <div style="margin-top: 24px; font-family: var(--font-mono); font-size: 13px;">
            <a href="https://t.me/InfinityTraderOfficialBot" target="_blank" style="color: var(--ink-soft); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--ink-soft)'">
              <i class="fa-brands fa-telegram" style="font-size: 16px;"></i> Test our live Telegram demo bot &rarr;
            </a>
          </div>"""

content = content.replace(old_hero, new_hero)

with open("telegram-bot-development.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated hero section demo link.")
