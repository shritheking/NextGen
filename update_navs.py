import os
import re

def update_file(filename):
    if not os.path.exists(filename): return
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    original = content
    
    # Fix "/#section" to "index.html#section"
    content = content.replace('href="/#services"', 'href="index.html#services"')
    content = content.replace('href="/#work"', 'href="index.html#work"')
    content = content.replace('href="/#process"', 'href="index.html#process"')
    content = content.replace('href="/#contact"', 'href="index.html#contact"')

    # Inject telegram bots link into desktop nav
    # Case 1: Without nav-num (client.html)
    if 'href="index.html#work">work</a>' in content and 'telegram-bot-development.html">telegram bots</a>' not in content:
        content = content.replace('href="index.html#work">work</a>', 'href="index.html#work">work</a>\n            <a href="telegram-bot-development.html">telegram bots</a>')
    
    # Case 2: With nav-num (privacy, terms, refunds)
    # The numbers are 01, 02, 03, 04, 05. We can just add telegram bots as 03 and shift the rest if we want, or not number it.
    # Actually, it's easier to just insert it after work.
    if 'href="index.html#work"><span class="nav-num">02.</span>work</a>' in content and 'telegram-bot-development.html' not in content:
        content = content.replace(
            'href="index.html#work"><span class="nav-num">02.</span>work</a>', 
            'href="index.html#work"><span class="nav-num">02.</span>work</a>\n            <a href="telegram-bot-development.html"><span class="nav-num">03.</span>telegram bots</a>'
        )
        # Fix subsequent numbers if we care, or just leave it. Let's just update the numbers
        content = content.replace('<span class="nav-num">03.</span>process', '<span class="nav-num">04.</span>process')
        content = content.replace('<span class="nav-num">04.</span>contact', '<span class="nav-num">05.</span>contact')
        content = content.replace('<span class="nav-num">05.</span>client portal', '<span class="nav-num">06.</span>client portal')
        content = content.replace('<span class="nav-num">04.</span>pricing', '<span class="nav-num">04.</span>pricing') # If any

    # Inject telegram bots link into mobile drawer
    # Case 1: Without nav-num (client.html)
    # Actually, the same logic applies if we just replace it globally.
    # Wait, the mobile drawer in privacy.html etc is DIFFERENT.
    # Let's check mobile drawer in privacy/terms/refunds
    if 'href="index.html#work"><span class="nav-num">04.</span>pricing</a>' in content:
        content = content.replace(
            'href="index.html#work"><span class="nav-num">04.</span>pricing</a>',
            'href="index.html#work"><span class="nav-num">03.</span>work</a>\n      <a href="telegram-bot-development.html"><span class="nav-num">04.</span>telegram bots</a>\n      <a href="index.html#work"><span class="nav-num">05.</span>pricing</a>'
        )
        # Wait, the above logic is too fragile. Let's just find the drawer links directly.
    
    # More robust mobile drawer replacement for client.html
    if 'href="index.html#work">work</a>\n        <a href="index.html#process">process</a>' in content:
        content = content.replace('href="index.html#work">work</a>\n        <a href="index.html#process">process</a>', 'href="index.html#work">work</a>\n        <a href="telegram-bot-development.html">telegram bots</a>\n        <a href="index.html#process">process</a>')

    if content != original:
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filename}")

files_to_update = ["client.html", "privacy.html", "terms.html", "refunds.html"]
for f in files_to_update:
    update_file(f)

print("Done updating navs.")
