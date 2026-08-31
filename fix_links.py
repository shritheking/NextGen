import os

def fix_links(filename):
    if not os.path.exists(filename): return
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # Fix absolute links to relative
    content = content.replace('href="/telegram-bot-development.html"', 'href="telegram-bot-development.html"')
    content = content.replace('href="/client.html"', 'href="client.html"')
    content = content.replace('href="/privacy.html"', 'href="privacy.html"')
    content = content.replace('href="/terms.html"', 'href="terms.html"')
    content = content.replace('href="/refunds.html"', 'href="refunds.html"')
    
    # If this is the telegram bot page, fix the navigation links to point back to index.html
    if "telegram-bot-development.html" in filename:
        content = content.replace('href="#home"', 'href="index.html#home"')
        content = content.replace('href="#services"', 'href="index.html#services"')
        content = content.replace('href="#work"', 'href="index.html#work"')
        content = content.replace('href="#process"', 'href="index.html#process"')
        
        # In telegram-bot-development.html, the CTA button is <a href="#contact?service=Telegram+Bot">
        # And the form is at the bottom with id="contact". So #contact works perfectly for this page!
        # But wait, what if the user clicks "contact" in the header nav? That points to href="#contact"
        # and scrolls them down to the contact form on the telegram page. This is correct!
        # No need to change #contact to index.html#contact.

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

for root, _, files in os.walk("."):
    for file in files:
        if file.endswith(".html"):
            fix_links(os.path.join(root, file))

print("Fixed HTML links correctly.")
