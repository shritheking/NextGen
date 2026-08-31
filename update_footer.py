import glob
import re

html_files = glob.glob("*.html")

old_services = """        <div class="footer-links-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Web Design</a></li>
            <li><a href="#services">Full-stack builds</a></li>
            <li><a href="#services">E-Commerce</a></li>
            <li><a href="#services">Product scoping</a></li>
          </ul>
        </div>"""

new_services = """        <div class="footer-links-col">
          <h4>Services</h4>
          <ul>
            <li><a href="index.html#services">Web Design</a></li>
            <li><a href="index.html#services">Full-stack builds</a></li>
            <li><a href="index.html#services">E-Commerce</a></li>
            <li><a href="telegram-bot-development.html">Telegram Bots</a></li>
            <li><a href="index.html#services">Product scoping</a></li>
          </ul>
        </div>"""

old_socials = """          <div class="footer-socials">
            <a href="https://github.com" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          </div>"""

new_socials = """          <div class="footer-socials">
            <a href="https://github.com" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://t.me/InfinityTraderOfficialBot" target="_blank" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
          </div>"""

old_connect = """        <div class="footer-links-col">
          <h4>Direct Connect</h4>
          <ul class="footer-contact-list">
            <li><i class="fa-solid fa-envelope"></i> <a href="mailto:nextgenwebstudio63@gmail.com">nextgenwebstudio63@gmail.com</a></li>
            <li><i class="fa-solid fa-phone"></i> <a href="https://api.whatsapp.com/send?phone=916379140067" target="_blank">+91 63791 40067</a></li>
            <li><i class="fa-solid fa-location-dot"></i> Coimbatore, Tamil Nadu</li>
          </ul>
        </div>"""

new_connect = """        <div class="footer-links-col">
          <h4>Direct Connect</h4>
          <ul class="footer-contact-list">
            <li><i class="fa-solid fa-envelope"></i> <a href="mailto:nextgenwebstudio63@gmail.com">nextgenwebstudio63@gmail.com</a></li>
            <li><i class="fa-solid fa-phone"></i> <a href="https://api.whatsapp.com/send?phone=916379140067" target="_blank">+91 63791 40067</a></li>
            <li><i class="fa-solid fa-location-dot"></i> Coimbatore, Tamil Nadu</li>
            <li><i class="fa-solid fa-clock"></i> Mon-Sat, 9:00 AM - 6:00 PM</li>
          </ul>
        </div>"""

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check if this file has the footer structure
    if "footer-links-col" in content:
        # Standardize anchor links in the Services column to make sure they work from subpages
        content = content.replace(old_services, new_services)
        # Fallback if already modified slightly
        if old_services not in content and '<li><a href="#services">Web Design</a></li>' in content:
             content = content.replace('<li><a href="#services">Product scoping</a></li>', '<li><a href="telegram-bot-development.html">Telegram Bots</a></li>\n            <li><a href="index.html#services">Product scoping</a></li>')
             content = content.replace('href="#services"', 'href="index.html#services"')

        content = content.replace(old_socials, new_socials)
        content = content.replace(old_connect, new_connect)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

# Update CSS for footer padding
with open("style.css", "r", encoding="utf-8") as f:
    css_content = f.read()
    
css_content = css_content.replace('padding: 80px 0 110px; /* Increased bottom padding to 110px to prevent floating buttons overlap */', 'padding: 80px 0 60px; /* Reduced to avoid huge empty space at bottom */')
css_content = css_content.replace('padding: 60px 0 100px !important; /* Raise footer bottom padding on mobile */', 'padding: 60px 0 80px !important; /* Reduced mobile bottom padding */')

with open("style.css", "w", encoding="utf-8") as f:
    f.write(css_content)

print("Footer updates injected into all HTML files and CSS fixed.")
