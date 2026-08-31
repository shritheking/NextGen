import re

with open("js/documents.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the style pattern for the code blocks
pattern = r"background:\s*var\(--bg-alt\);\s*padding:\s*15px;\s*border-radius:\s*6px;\s*font-family:\s*monospace;"
replacement = r"background: #111; color: #fff; padding: 15px; border-radius: 6px; font-family: monospace;"

new_content = re.sub(pattern, replacement, content)

with open("js/documents.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replaced background colors safely in UTF-8.")
