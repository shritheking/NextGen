import re

with open("js/documents.js", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("79045 44101", "63791 40067")
content = content.replace("7904544101", "6379140067")

with open("js/documents.js", "w", encoding="utf-8") as f:
    f.write(content)
