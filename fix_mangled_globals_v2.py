import os

def fix_mangled_file(filename):
    if not os.path.exists(filename): return
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "\ufffd" not in content:
        return

    content = content.replace('\ufffd?"', '—')
    content = content.replace('\ufffd,', '₹')
    content = content.replace('\ufffd+\'', '→')
    content = content.replace('\ufffdo.', '✅')
    content = content.replace('\ufffd?O', '❌')
    content = content.replace('\ufffd', '')  # Remove any other stray replacement characters

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

for root, _, files in os.walk("."):
    for file in files:
        if file.endswith((".html", ".js", ".css")):
            fix_mangled_file(os.path.join(root, file))

print("Fixed known mangled characters.")
