import os

html_files = [f for f in os.listdir(".") if f.endswith(".html")]

for filename in html_files:
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
    
    content = content.replace("79045 44101", "63791 40067")
    content = content.replace("7904544101", "6379140067")
    content = content.replace("wa.me/917904544101", "api.whatsapp.com/send?phone=916379140067")
    content = content.replace("wa.me/916379140067", "api.whatsapp.com/send?phone=916379140067")
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

print("Updated all HTML files safely.")
