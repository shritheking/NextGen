import re

with open('js/documents.js', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('ea_automation_quotation: {')
end_idx = content.find('  },', start_idx)
template_content = content[start_idx:end_idx]

# 1. Wrap each <h2> and its content in <div class="doc-section">
# We can do this by splitting on <h2 class="doc-section-title">
parts = template_content.split('<h2 class="doc-section-title">')
new_parts = [parts[0]]
for i in range(1, len(parts)):
    # Everything in this part until the next </div> or doc-footer is the section content.
    # Wait, splitting blindly might mess up nested divs.
    pass

# A simpler regex approach:
# Replace <h3> with styled <h3>
template_content = re.sub(
    r'<h3>(.*?)</h3>', 
    r'<h3 style="font-family: var(--font-mono); font-size: 13px; color: var(--accent); margin-bottom: 8px; margin-top: 20px;">\1</h3>', 
    template_content
)

# Replace <ul> with <ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
template_content = template_content.replace(
    '<ul>', 
    '<ul class="work-metrics" style="margin-bottom: 16px; font-size: 11.5px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; list-style: none; padding-left: 0;">'
)

# Replace <li> with <li><i class="fa-solid fa-circle-check"></i>
template_content = re.sub(
    r'<li>(.*?)</li>',
    r'<li><i class="fa-solid fa-circle-check" style="color: var(--nextgen-green); margin-right: 6px;"></i> \1</li>',
    template_content
)

# Wrap each h2 section in a doc-section.
# Since it's a bit complex with regex, we can just replace `<h2 class="doc-section-title">` with `<div class="doc-section"><h2 class="doc-section-title">`
# And add a `</div>` before the next `<h2` or `</div>\n        <div class="doc-footer">`.
# Actually, since `.doc-section` just adds `margin-bottom: 30px;`, we can just add that inline to the h2 or wrapping divs.
# Let's just wrap them.
def add_doc_section(text):
    # Split by <div class="doc-page-content">
    pages = text.split('<div class="doc-page-content">')
    for i in range(1, len(pages)):
        page = pages[i]
        # Split by <h2 class="doc-section-title">
        sections = page.split('<h2 class="doc-section-title">')
        if len(sections) > 1:
            new_page = sections[0]
            for j in range(1, len(sections)):
                # find where this section ends. It ends at the last </div> before the end of the page, or before the next section.
                # Since we split by h2, all of sections[j] belongs to this section, UNTIL the </div> that closes doc-page-content.
                if j == len(sections) - 1:
                    # Last section in this page. We need to insert a </div> before the closing </div> of doc-page-content.
                    # Usually it's `</div>\n        <div class="doc-footer">`
                    # We can just put a `<div class="doc-section">` at the start, and close it before the last </div>.
                    end_div_idx = sections[j].rfind('</div>')
                    if end_div_idx != -1:
                        sec_content = sections[j][:end_div_idx] + '</div>' + sections[j][end_div_idx:]
                        new_page += '<div class="doc-section"><h2 class="doc-section-title">' + sec_content
                    else:
                        new_page += '<div class="doc-section"><h2 class="doc-section-title">' + sections[j] + '</div>'
                else:
                    # Not the last section. Just wrap it.
                    new_page += '<div class="doc-section"><h2 class="doc-section-title">' + sections[j] + '</div>'
            pages[i] = new_page
    return '<div class="doc-page-content">'.join(pages)

template_content = add_doc_section(template_content)


new_content = content[:start_idx] + template_content + content[end_idx:]

with open('js/documents.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("CSS styling upgraded for EA Automation System Proposal.")
