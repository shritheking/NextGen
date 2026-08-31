import os

def fix_mangled_file(filename):
    if not os.path.exists(filename): return
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check for known mangled sequences and replace them with their original UTF-8 characters
    # ?" is often a mangled em-dash (—) or en-dash (-)
    content = content.replace('?"', '—')
    
    # , is often a mangled Rupee symbol (₹)
    content = content.replace(',', '₹')
    
    # +' is often a right arrow (→)
    content = content.replace("+'", "→")

    # o. is often a checkmark (✅)
    content = content.replace("o.", "✅")

    # ?O is often a cross (❌)
    content = content.replace("?O", "❌")

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

for root, _, files in os.walk("."):
    for file in files:
        if file.endswith((".html", ".js", ".css")):
            fix_mangled_file(os.path.join(root, file))

print("Fixed known mangled characters.")
