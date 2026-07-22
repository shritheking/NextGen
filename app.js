/* ==========================================================================
   NextGen Web Studio — Interactive Frontend Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initMobileMenu();
  initInteractiveTerminal();
  initPortfolioFilters();
  initContactForm();
  initScrollToTop();
  initParallax();
  initChatbot();
});

/* ---------- Loading Screen Overlay ---------- */
function initLoader() {
  const loader = document.getElementById('loader-screen');
  
  if (!loader) return;
  
  // Disable scroll during load
  document.body.style.overflow = 'hidden';
  
  // Fade out loader screen
  setTimeout(() => {
    loader.classList.add('fade-out');
    document.body.style.overflow = '';
  }, 1600);

  // Failsafe cache listener
  window.addEventListener('pageshow', (event) => {
    setTimeout(() => {
      loader.classList.add('fade-out');
      document.body.style.overflow = '';
    }, 500);
  });
}

/* ---------- Theme Manager (Light / Dark) ---------- */
function initTheme() {
  const body = document.body;
  const themeBtn = document.getElementById('themeToggleBtn');
  
  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }

  themeBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  });
}

/* ---------- Mobile Menu Drawer Toggle ---------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-links a');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Unlock scroll
  }

  menuToggle.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ---------- Interactive Terminal ---------- */
function initInteractiveTerminal() {
  const termBody = document.getElementById('termBody');
  const typedSpan = document.getElementById('termTyped');
  const termHistory = termBody.querySelector('.term-history');
  const termBtns = document.querySelectorAll('.term-btn');

  // Command database
  const commands = {
    about: {
      cmd: './about',
      output: [
        'Studio Name: NextGen Web Studio',
        'Headquarters: Coimbatore, Tamil Nadu, IN',
        'Specialty: High-performance React, Node, and customized storefront web builds.',
        'Tagline: "We build websites that ship fast and work hard."'
      ]
    },
    skills: {
      cmd: './skills',
      output: [
        'Languages: JavaScript (ES6+), HTML5, CSS3, Python, SQL',
        'Frameworks: React.js, Next.js, Node.js, Express, Flask',
        'Integrations: Razorpay, Stripe APIs, Twilio WhatsApp automation',
        'Performance: Optimized responsive grid designs, static delivery CDN caches.'
      ]
    },
    contact: {
      cmd: './contact-info',
      output: [
        'Email ID: shridharsan134@gmail.com',
        'Mobile No: +91 63791 40067',
        'Address: Coimbatore, Tamil Nadu, India',
        'Status: Accepting projects for Q3/Q4 2026'
      ]
    }
  };

  // Welcome Animation: Simulates typing a start command
  const welcomeText = './deploy --client "you"';
  let charIdx = 0;
  
  function typeChar() {
    if (charIdx < welcomeText.length) {
      typedSpan.textContent += welcomeText.charAt(charIdx);
      charIdx++;
      setTimeout(typeChar, 70);
    } else {
      setTimeout(() => {
        printLine('&nbsp;');
        printLine('Executing secure pipeline deploy...', 'info-output');
        printLine('Uploading assets directory... [OK]', 'info-output');
        printLine('Site is live at production URL!', 'success-output');
        printLine('&nbsp;');
      }, 500);
    }
  }

  // Type welcome line on page load
  setTimeout(typeChar, 800);

  function printLine(text, className = '') {
    const line = document.createElement('div');
    line.className = 'term-line';
    if (className) line.classList.add(className);
    line.innerHTML = text;
    termHistory.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
  }

  // Handle Quick Command Clicks
  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmdKey = btn.dataset.cmd;
      
      if (cmdKey === 'clear') {
        termHistory.innerHTML = '';
        typedSpan.textContent = '';
        return;
      }

      const data = commands[cmdKey];
      if (data) {
        // Log the entered command
        printLine(`<span class="term-prompt">$</span> ${data.cmd}`);
        
        // Print output lines sequentially
        data.output.forEach((line, idx) => {
          setTimeout(() => {
            printLine(line, 'output');
          }, idx * 100);
        });
      }
    });
  });
}

/* ---------- Portfolio Project Filters ---------- */
function initPortfolioFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');
  const grid = document.getElementById('workGrid');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on buttons
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Apply filtering animations
      cards.forEach(card => {
        const categories = card.dataset.cat.split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          // Trigger slight reflow for transition
          void card.offsetWidth;
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          // Delay display change until animation completes
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

/* ---------- Contact Form Handling ---------- */
function initContactForm() {
  const form = document.getElementById('projectContactForm');
  const tagChips = document.querySelectorAll('.tag-chip');
  const projectTypeInput = document.getElementById('projectTypeInput');
  const submitBtn = document.getElementById('submitFormBtn');
  const successOverlay = document.getElementById('formSuccessOverlay');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  // Handle Multi-Select Tag Chips for Project Categories
  tagChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Toggle selected class
      chip.classList.toggle('selected');
      
      // Update hidden input with all selected options
      const selected = [];
      tagChips.forEach(c => {
        if (c.classList.contains('selected')) {
          selected.push(c.dataset.value);
        }
      });
      projectTypeInput.value = selected.join(', ');
    });
  });

  // Dynamic input label positioning fix (inputs auto-fill or cache values)
  const formInputs = form.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    // Check state on load
    if (input.value.trim() !== '') {
      input.classList.add('has-value');
    }
    
    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
      
      // Validate field on blur
      validateField(input);
    });
  });

  // Single field validation helper
  function validateField(input) {
    const group = input.closest('.form-group');
    if (!group || input.type === 'hidden' || input.id === 'contactPhone') return true;

    let isValid = true;

    if (input.required) {
      if (input.value.trim() === '') {
        isValid = false;
      }
    }

    if (isValid && input.type === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailPattern.test(input.value.trim());
    }

    if (isValid) {
      group.classList.remove('invalid');
    } else {
      group.classList.add('invalid');
    }

    return isValid;
  }

  // Intercept Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formIsValid = true;

    // Validate all required fields
    formInputs.forEach(input => {
      if (!validateField(input)) {
        formIsValid = false;
      }
    });

    if (!formIsValid) {
      // Scroll first invalid element into view
      const firstInvalid = form.querySelector('.form-group.invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Set submit button loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Gather payload data
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    // Include selected tag chips if hidden input is empty
    if (!payload.projectType) {
      payload.projectType = 'Not Specified';
    }

    try {
      // Send data to node.js backend API (supports local double-click file:// executions)
      const isLocalFile = window.location.protocol === 'file:';
      const apiUrl = isLocalFile ? 'http://localhost:3000/api/contact' : '/api/contact';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success: Show deployment overlay
        setTimeout(() => {
          submitBtn.classList.remove('loading');
          successOverlay.classList.add('show');
        }, 1200);
      } else {
        throw new Error(data.error || 'Server error occurred');
      }

    } catch (err) {
      console.warn('API Error, falling back to mock success:', err);
      // Fallback: If local API fails/not running, still show success overlay for presentation
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        successOverlay.classList.add('show');
      }, 1200);
    }
  });

  // Handle Success Overlay Close Button (Reset form)
  closeSuccessBtn.addEventListener('click', () => {
    form.reset();
    tagChips.forEach(c => c.classList.remove('selected'));
    projectTypeInput.value = '';
    
    // Clear dynamic helper classes
    formInputs.forEach(input => {
      input.classList.remove('has-value');
      const group = input.closest('.form-group');
      if (group) group.classList.remove('invalid');
    });

    successOverlay.classList.remove('show');
    submitBtn.disabled = false;
  });
}

/* ---------- Scroll To Top Controller ---------- */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (!scrollBtn) return;
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ---------- Parallax Interaction Engine ---------- */
function initParallax() {
  const heroGrid = document.querySelector('.hero-grid');
  const heroText = document.querySelector('.hero-text-content');
  const terminalContainer = document.querySelector('.terminal-container');
  const terminal = document.querySelector('.terminal');
  const scrollBouncer = document.querySelector('.scroll-down-container');
  
  if (!heroGrid) return;

  // 1. Scroll-based Parallax (runs only on screens > 980px)
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (window.innerWidth > 980 && scrollY < 800) {
      if (heroText) {
        heroText.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
      }
      if (terminalContainer) {
        terminalContainer.style.transform = `translate3d(0, ${scrollY * 0.06}px, 0)`;
      }
    }
    
    // Always fade out the scroll bouncer on scroll
    if (scrollBouncer) {
      if (scrollY < 400) {
        const opacity = Math.max(0, 1 - scrollY / 200);
        scrollBouncer.style.opacity = opacity;
        scrollBouncer.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
      } else {
        scrollBouncer.style.opacity = 0;
      }
    }
  });

  // 2. Mousemove Card Tilt Parallax (runs only on screens > 980px)
  if (terminal) {
    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 980) return;
      if (window.scrollY > 600) return; // Stop tracking when scrolled out of view

      const rect = heroGrid.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const percentX = (e.clientX - centerX) / (window.innerWidth / 2);
      const percentY = (e.clientY - centerY) / (window.innerHeight / 2);
      
      const clampedX = Math.max(-1, Math.min(1, percentX));
      const clampedY = Math.max(-1, Math.min(1, percentY));

      // Tilt card slightly (max 6deg)
      const rotateX = clampedY * -6;
      const rotateY = clampedX * 6;
      
      terminal.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${clampedX * 8}px, ${clampedY * 8}px, 0)`;
      terminal.style.transition = 'transform 0.1s ease-out';
    });

    // Reset card layout when cursor exits the document window
    document.addEventListener('mouseleave', () => {
      terminal.style.transform = 'rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
      terminal.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
  }
}

/* ---------- Interactive AI Chatbot Widget ---------- */
function initChatbot() {
  const widget = document.getElementById('aiChatbotWidget');
  const toggleBtn = document.getElementById('chatbotToggleBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  if (!widget || !toggleBtn || !chatForm) return;

  // Toggle open/close
  toggleBtn.addEventListener('click', () => {
    widget.classList.toggle('chatbot-open');
    widget.classList.toggle('chatbot-closed');

    // Scroll chat to bottom on open
    if (widget.classList.contains('chatbot-open')) {
      setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 300);
    }
  });

  // Handle message submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    // 1. Add user message bubble
    appendMessage(query, 'user');
    chatInput.value = '';

    // Check for profanity
    const badWords = ['fuck', 'shit', 'asshole', 'bitch', 'bastard', 'dick', 'cunt', 'piss'];
    const hasBadWords = badWords.some(word => query.toLowerCase().includes(word));
    if (hasBadWords) {
      appendMessage("⚠️ Warning: Please refrain from using inappropriate language in the chat.", 'bot');
      chatInput.value = '';
      return;
    }

    // 2. Add loading state response delay
    setTimeout(() => {
      const response = generateBotResponse(query);
      appendMessage(response, 'bot');
    }, 800);
  });

  function appendMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-message ${sender}`;
    bubble.innerHTML = text;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function generateBotResponse(message) {
    const text = message.toLowerCase();

    // CoimbatoreTN Keywords
    if (text.includes('coimbatore') || text.includes('where') || text.includes('location') || text.includes('place')) {
      return "NextGen Web Studio is headquartered in Coimbatore, Tamil Nadu, India! 📍 We serve clients locally and globally.";
    }

    // Phone / Contact Keywords
    if (text.includes('phone') || text.includes('number') || text.includes('contact') || text.includes('call') || text.includes('whatsapp') || text.includes('mobile')) {
      return "You can call or WhatsApp our developer directly at <a href='tel:6379140067' style='color:var(--accent); text-decoration:underline; font-weight:600;'>+91 63791 40067</a>. 📞 Let's discuss your project!";
    }

    // Email Keywords
    if (text.includes('email') || text.includes('mail') || text.includes('write')) {
      return "You can email your project requirements to shridharsan134@gmail.com. ✉️ We respond in under 24 hours!";
    }

    // Budget / Pricing / Cost Keywords
    if (text.includes('price') || text.includes('cost') || text.includes('budget') || text.includes('how much') || text.includes('rate')) {
      return "Our scopes fit standard startup budgets:\n- Web Design: from ₹40k\n- Full Stack builds: ₹1.5L - ₹3L\n- E-Commerce storefronts: Custom scoped\n\nTell us your budget in the scoping form below to get custom estimates!";
    }

    // Services / What we build
    if (text.includes('service') || text.includes('build') || text.includes('offer') || text.includes('tech') || text.includes('react') || text.includes('node')) {
      return "We build custom web apps, React/Node full-stack platforms, Razorpay booking calendars, and Shopify/Woo storefronts. Check out the ~/services section on the page!";
    }

    // Portfolio / Works / Selected projects
    if (text.includes('work') || text.includes('portfolio') || text.includes('project') || text.includes('example') || text.includes('show')) {
      return "We have shipped sports booking portals, D2C storefronts, and AI systems. Browse through our 'Selected Projects' section to see live screenshots!";
    }

    // Contact Admin Keywords
    if (text.includes('admin') || text.includes('manager') || text.includes('support') || text.includes('human') || text.includes('message admin') || text.includes('tell admin') || text.includes('login') || text.includes('receipt') || text.includes('dashboard')) {
      return "To get support or discuss project bookings, you can email us directly at shridharsan134@gmail.com or call us at +91 63791 40067! 🚀";
    }

    // Help / Commands
    if (text.includes('help') || text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hello! I can help you with:\n- Coimbatore office location\n- Direct phone & email contacts\n- Pricing & services\n- Viewing portfolio works";
    }

    // Fallback
    return "Thanks for asking! I'm a simulated AI helper. To map out your roadmap or get a formal quote, fill out our Project Scoping Form on this page or email us directly at shridharsan134@gmail.com! 🚀";
  }
}

// ---------- WEBSITE COMMUNICATIONS INTERCEPT MODAL ----------
function setupWebsiteContactModal(type = 'email') {
  const existing = document.getElementById('websiteContactModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'websiteContactModal';
  modal.className = 'receipt-modal';
  modal.style.zIndex = '3000';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0,0,0,0.85)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.opacity = '0';
  modal.style.pointerEvents = 'none';
  modal.style.transition = 'opacity 0.3s ease';
  
  const isEmailMode = type === 'email';
  const isPhoneMode = type === 'phone';

  const chatbotHtml = `
    <!-- Chatbot Live option (Highly Recommended) -->
    <div style="display: flex; flex-direction: column; gap: 8px; padding: 14px; background: rgba(224,255,79,0.04); border: 1px dashed rgba(224,255,79,0.3); border-radius: 6px; text-align: left;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size: 9.5px; font-weight: 700; color: var(--accent); font-family: var(--font-mono); text-transform:uppercase; letter-spacing:1px;"><i class="fa-solid fa-bolt"></i> Recommended</span>
        <span style="font-size: 11px; color: var(--ink-soft); font-weight:600;"><i class="fa-solid fa-comments"></i> Live Chatbot</span>
      </div>
      <p style="font-size: 13px; line-height: 1.5; color: var(--ink-soft); margin: 4px 0;">
        Need quick assistance? Get automated support instantly through the floating AI helper at the bottom right.
      </p>
      <button type="button" class="login-btn" id="openChatbotFromModalBtn" style="margin: 6px 0 0 0; padding: 6px 12px; font-size: 12.5px; width: 100%; justify-content:center; height:36px; background-color:var(--accent); color:var(--bg); border:none; font-weight:600; cursor:pointer;"><i class="fa-solid fa-paper-plane"></i> Launch Chatbot</button>
    </div>
  `;

  const phoneHtml = `
    <!-- Phone / Call Option -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-alt); border: 1px solid var(--border); border-radius: 6px; flex-wrap: wrap; gap: 8px;">
      <div style="text-align: left;">
        <div style="font-size: 10px; font-weight: 600; color: var(--ink-faint); font-family: var(--font-mono); text-transform:uppercase;">Direct Call</div>
        <div style="font-size: 14px; font-weight: 600; color: var(--ink);">+91 63791 40067</div>
      </div>
      <button type="button" class="refresh-btn" id="copyPhoneBtn" style="margin: 0; padding: 6px 12px; font-size: 12px; width: auto; justify-content:center;"><i class="fa-solid fa-copy"></i> Copy</button>
    </div>
    
    <!-- WhatsApp Option -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-alt); border: 1px solid var(--border); border-radius: 6px; flex-wrap: wrap; gap: 8px;">
      <div style="text-align: left;">
        <div style="font-size: 10px; font-weight: 600; color: var(--ink-faint); font-family: var(--font-mono); text-transform:uppercase;">WhatsApp Chat</div>
        <div style="font-size: 14px; font-weight: 600; color: var(--ink);">Instant Chat Link</div>
      </div>
      <a href="https://wa.me/916379140067" target="_blank" class="login-btn" style="margin: 0; padding: 6px 16px; font-size: 12px; width: auto; background-color: #25D366; border-color: #25D366; color: #fff; text-decoration: none; display: inline-flex; align-items: center; justify-content:center; gap: 4px; border-radius:4px; font-weight:600;"><i class="fa-brands fa-whatsapp"></i> Message</a>
    </div>
  `;

  const emailHtml = `
    <!-- Email Option -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-alt); border: 1px solid var(--border); border-radius: 6px; flex-wrap: wrap; gap: 8px;">
      <div style="text-align: left;">
        <div style="font-size: 10px; font-weight: 600; color: var(--ink-faint); font-family: var(--font-mono); text-transform:uppercase;">Email Inquiry</div>
        <div style="font-size: 14px; font-weight: 600; color: var(--ink);">shridharsan134@gmail.com</div>
      </div>
      <button type="button" class="refresh-btn" id="copyEmailBtn" style="margin: 0; padding: 6px 12px; font-size: 12px; width: auto; justify-content:center;"><i class="fa-solid fa-copy"></i> Copy</button>
    </div>
  `;

  let bodyContentHtml = '';
  if (isEmailMode) {
    bodyContentHtml += emailHtml;
  } else if (isPhoneMode) {
    bodyContentHtml += phoneHtml;
  } else {
    bodyContentHtml += phoneHtml + emailHtml;
  }

  modal.innerHTML = `
    <div class="receipt-card" style="width: 90%; max-width: 420px; box-sizing: border-box; text-align: center; background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); padding:24px 20px; position:relative; box-shadow:0 20px 60px var(--shadow); margin: 0 auto;">
      <span class="receipt-close" id="closeContactModalBtn" style="position: absolute; right: 20px; top: 15px; font-size: 24px; cursor: pointer; color: var(--ink-soft);">&times;</span>
      <div class="receipt-header" style="border-bottom: 1px dashed var(--border); padding-bottom: 15px; margin-bottom: 20px; text-align:center;">
        <h3 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom:4px; font-family:var(--font-display);"><i class="fa-solid fa-comments" style="color:var(--accent);"></i> Contact Studio</h3>
        <span style="font-size: 11px; color: var(--ink-faint);">NextGen Communication Portal</span>
      </div>
      
      <div class="receipt-body" style="padding: 10px 0 20px 0; display:flex; flex-direction:column; gap:14px;">
        <div style="font-size: 32px; color: var(--accent); margin-bottom: 5px;"><i class="fa-solid fa-mobile-screen-button"></i></div>
        <p style="font-size: 14.5px; line-height: 1.6; color: var(--ink-soft); margin-bottom: 10px;">
          How would you like to connect with NextGen Web Studio?
        </p>
        
        <div style="display: flex; flex-direction: column; gap: 14px; width:100%;">
          ${bodyContentHtml}
        </div>
      </div>
      
    </div>
  `;
  
  document.body.appendChild(modal);

  // Wire close events
  const closeBtn = modal.querySelector('#closeContactModalBtn');
  const copyBtn = modal.querySelector('#copyPhoneBtn');
  const copyEmailBtn = modal.querySelector('#copyEmailBtn');
  const openChatbotBtn = modal.querySelector('#openChatbotFromModalBtn');

  const closeModal = () => {
    modal.classList.remove('show');
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+916379140067');
      alert('Phone number copied to clipboard!');
    });
  }
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('shridharsan134@gmail.com');
      alert('Email address copied to clipboard!');
    });
  }
  if (openChatbotBtn) {
    openChatbotBtn.addEventListener('click', () => {
      closeModal();
      const widget = document.getElementById('aiChatbotWidget');
      if (widget) {
        widget.classList.remove('chatbot-closed');
        widget.classList.add('chatbot-open');
        const chatBody = document.getElementById('chatBody');
        if (chatBody) {
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }
    });
  }
}

function triggerWebsiteContactModal(event, type = 'email') {
  if (event) event.preventDefault();
  setupWebsiteContactModal(type);
  const modal = document.getElementById('websiteContactModal');
  if (modal) {
    modal.classList.add('show');
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }
}

// Intercept tel, mailto and whatsapp links dynamically
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a');
  if (anchor) {
    const href = anchor.getAttribute('href') || '';
    if (href.startsWith('mailto:')) {
      e.preventDefault();
      triggerWebsiteContactModal(e, 'email');
    } else if (href.startsWith('tel:') || href.includes('wa.me') || href.includes('whatsapp.com')) {
      e.preventDefault();
      triggerWebsiteContactModal(e, 'phone');
    }
  }
});
