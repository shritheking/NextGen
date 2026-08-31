import os

with open("telegram-bot-development.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix Terminal Panel (it's always dark, so it needs explicit neon green)
content = content.replace(
    '<div class="term-line output" style="color: var(--accent);">BOT STATUS</div>',
    '<div class="term-line output" style="color: #E0FF4F;">BOT STATUS</div>'
)
content = content.replace(
    '<span style="color: var(--accent);">nextgen@server:~$</span>',
    '<span style="color: #E0FF4F;">nextgen@server:~$</span>'
)

# 2. Fix the "Most Popular" badge (it has hardcoded color: #000 which fails if background becomes black in light mode)
content = content.replace(
    'background: var(--accent); color: #000;',
    'background: var(--accent); color: var(--bg);'
)

with open("telegram-bot-development.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Light mode contrast fixes applied.")
