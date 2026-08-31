import os

with open("telegram-bot-development.html", "r", encoding="utf-8") as f:
    content = f.read()

# Update Demo Bot Link
content = content.replace(
    'href="https://t.me/your_demo_bot"',
    'href="https://t.me/InfinityTraderOfficialBot"'
)

# Remove the explicit prices (₹) and replace with "Custom Quote"
content = content.replace(
    '<div style="font-size: 32px; font-weight: 700; margin-bottom: 30px; font-family: var(--font-display);">Starts at ₹15k</div>',
    '<div style="font-size: 24px; font-weight: 700; margin-bottom: 30px; font-family: var(--font-display); color: var(--accent);">Custom Quote</div>'
)

content = content.replace(
    '<div style="font-size: 32px; font-weight: 700; margin-bottom: 30px; font-family: var(--font-display);">Starts at ₹35k</div>',
    '<div style="font-size: 24px; font-weight: 700; margin-bottom: 30px; font-family: var(--font-display); color: var(--accent);">Custom Quote</div>'
)

content = content.replace(
    '<div style="font-size: 32px; font-weight: 700; margin-bottom: 30px; font-family: var(--font-display);">Starts at ₹75k</div>',
    '<div style="font-size: 24px; font-weight: 700; margin-bottom: 30px; font-family: var(--font-display); color: var(--accent);">Custom Quote</div>'
)

# Also update the section note to remove the word "investment" which implies pricing
content = content.replace(
    '<p class="section-note">Clear investment options for telegram automation.</p>',
    '<p class="section-note">Flexible architecture packages for telegram automation.</p>'
)
# And the title from "Transparent Pricing" to "Bot Packages"
content = content.replace(
    '<h2>Transparent Pricing</h2>',
    '<h2>Bot Packages</h2>'
)

with open("telegram-bot-development.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updates applied.")
