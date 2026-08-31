import os

with open("telegram-bot-development.html", "r", encoding="utf-8") as f:
    content = f.read()

# Remove background colors from sections
content = content.replace('<section class="block" id="workflow" style="background-color: var(--bg-alt);">', '<section class="block" id="workflow">')
content = content.replace('<section class="block" id="case-study" style="padding-top: 40px; padding-bottom: 80px; border-top: 1px dashed var(--border); background-color: var(--bg-alt);">', '<section class="block" id="case-study" style="padding-top: 60px; padding-bottom: 80px; border-top: 1px solid var(--border);">')
content = content.replace('<section class="block" id="pricing" style="background-color: var(--bg-alt); padding: 80px 0;">', '<section class="block" id="pricing">')
content = content.replace('<section class="block" id="tech-stack" style="padding-bottom: 60px; border-bottom: none;">', '<section class="block" id="tech-stack">')

# Also, the user might be complaining about how far apart the H2 and the P tags are in the section-head. 
# We can fix that globally for this page by making section-head align-items flex-start and not space-between if it's too far?
# No, index.html uses space-between. If I remove the background colors, it will look completely normal and match the main homepage perfectly.

with open("telegram-bot-development.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Removed ugly gray backgrounds.")
