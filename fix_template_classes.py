import re

with open('js/documents.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Target only the ea_automation_quotation section
start_idx = content.find('ea_automation_quotation: {')
if start_idx == -1:
    print("Could not find ea_automation_quotation")
    exit(1)

end_idx = content.find('  },', start_idx)

template_content = content[start_idx:end_idx]

# Replace doc-content with doc-page-content
template_content = template_content.replace('class="doc-content"', 'class="doc-page-content"')

# Replace doc-header-brand with doc-header-logo
template_content = template_content.replace('class="doc-header-brand"', 'class="doc-header-logo"')

# Replace doc-mini-icon with header-icon
template_content = template_content.replace('class="doc-mini-icon"', 'class="header-icon"')

# Add doc-para to all <p> tags that don't have a class
template_content = re.sub(r'<p>', '<p class="doc-para">', template_content)
template_content = re.sub(r'<p style="', '<p class="doc-para" style="', template_content)

# Fix NextGen Studio text in header to be the logo text instead, matching the old template
# Or just give it a class that makes it look okay. The old template used logo-text.png
template_content = template_content.replace('<span>NextGen Studio</span>', '<img class="header-text" src="assets/logo-text.png" alt="NextGen">')

# Also add doc-section-title class if missing, but we already have h2 class="doc-section-title".

new_content = content[:start_idx] + template_content + content[end_idx:]

with open('js/documents.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Alignment CSS classes fixed in documents.js")
