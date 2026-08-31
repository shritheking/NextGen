import os

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Add Telegram to terminal commands
old_contact = """    contact: {
      cmd: './contact-info',
      output: [
        'Email ID: nextgenwebstudio63@gmail.com',
        'Mobile No: +91 79045 44101',
        'Address: Coimbatore, Tamil Nadu, India',
        'Status: Accepting projects for Q3/Q4 2026'
      ]
    }"""
new_contact = """    contact: {
      cmd: './contact-info',
      output: [
        'Email ID: nextgenwebstudio63@gmail.com',
        'Mobile No: +91 63791 40067',
        'WhatsApp: https://api.whatsapp.com/send?phone=916379140067',
        'Status: Accepting projects for Q3/Q4 2026'
      ]
    },
    telegram: {
      cmd: './telegram',
      output: [
        'Telegram Bot Development',
        '------------------------',
        'Automation ........ [READY]',
        'Payments .......... [READY]',
        'APIs .............. [READY]',
        'Databases ......... [READY]',
        'Notifications ..... [READY]',
        'Admin Systems ..... [READY]',
        'MT5 Integration ... [READY]',
        'Deployment ........ [READY]'
      ]
    }"""
content = content.replace(old_contact, new_contact)

# Add URL parameter parsing to form
old_form = """      projectTypeInput.value = selected.join(', ');
    });
  });"""
new_form = """      projectTypeInput.value = selected.join(', ');
    });
  });

  // Pre-select from URL parameter (e.g. ?service=Telegram+Bot)
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    tagChips.forEach(chip => {
      if (chip.dataset.value === serviceParam) {
        chip.classList.add('selected');
      }
    });
    // Update hidden input
    const selected = [];
    tagChips.forEach(c => {
      if (c.classList.contains('selected')) {
        selected.push(c.dataset.value);
      }
    });
    projectTypeInput.value = selected.join(', ');
  }"""
content = content.replace(old_form, new_form)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated app.js successfully.")
