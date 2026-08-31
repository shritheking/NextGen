import glob
import os

html_files = glob.glob("*.html")

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update the Telegram link to @shridharsan1 across the ENTIRE site
    content = content.replace("https://t.me/InfinityTraderOfficialBot", "https://t.me/shridharsan1")
    
    # 2. Fix the Services list in the footer
    old_services_wrong = """        <div class="footer-links-col">
          <h4>Services</h4>
          <ul>
            <li><a href="index.html#services">Web Design</a></li>
            <li><a href="index.html#services">Full-stack builds</a></li>
            <li><a href="index.html#services">E-Commerce</a></li>
            <li><a href="index.html#services">Product scoping</a></li>
          </ul>
        </div>"""
        
    new_services_fixed = """        <div class="footer-links-col">
          <h4>Services</h4>
          <ul>
            <li><a href="index.html#services">Web Design</a></li>
            <li><a href="index.html#services">Full-stack builds</a></li>
            <li><a href="index.html#services">E-Commerce</a></li>
            <li><a href="telegram-bot-development.html">Telegram Bots</a></li>
            <li><a href="index.html#services">Product scoping</a></li>
          </ul>
        </div>"""

    content = content.replace(old_services_wrong, new_services_fixed)
    
    # Just in case there's another variation missing the Telegram link
    if "telegram-bot-development.html" not in content and "<h4>Services</h4>" in content:
        # manual injection
        content = content.replace('<li><a href="index.html#services">Product scoping</a></li>', 
                                '<li><a href="telegram-bot-development.html">Telegram Bots</a></li>\n            <li><a href="index.html#services">Product scoping</a></li>')

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Updated links and fixed footer globally.")
