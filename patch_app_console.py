# -*- coding: utf-8 -*-
with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

target = "  // Button Click Triggers"
new_code = """  // Console Tab Switching (bash, agentic-ai, mt5-bot)
  const consoleTabBtns = document.querySelectorAll('.console-tab-btn');
  if (consoleTabBtns.length > 0) {
    consoleTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        consoleTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const pane = btn.dataset.pane;
        termHistory.innerHTML = '';

        if (pane === 'bash') {
          printLine('whoami', 'term-line');
          printLine('NextGen Web Studio — Coimbatore, Tamil Nadu, India', 'output');
          printLine('&nbsp;');
          printLine('ls services/', 'term-line');
          printLine('agentic-ai/  full-stack-web/  telegram-bots/  mt5-licensing/  cloud-apis/', 'output');
        } else if (pane === 'ai') {
          printLine('[AGENTIC AI COGNITIVE MESH ACTIVE]', 'info-output');
          printLine('&bull; Ingesting user prompt: "Deploy autonomous customer support agent"', 'output');
          printLine('&bull; LangGraph orchestration: planner -> tool_caller -> evaluator [OK]', 'output');
          printLine('&bull; Vector search in Supabase pgvector (1536 dims) [OK]', 'output');
          printLine('&bull; Zero-retention enterprise privacy guardrail: ENGAGED', 'output');
          printLine('&bull; Automated execution completed in 420ms!', 'success-output');
        } else if (pane === 'mt5') {
          printLine('[MT5 DYNAMIC LICENSING COMPILER]', 'info-output');
          printLine('&bull; Ingesting buyer MT5 Account ID: 9841249', 'output');
          printLine('&bull; Regex injecting ALLOWED_MT5_ID and LICENSE_EXPIRY [OK]', 'output');
          printLine('&bull; Running headless Wine MetaEditor64 inside Render Docker [OK]', 'output');
          printLine('&bull; Binary compiled: Infinity_Trend_V4.ex5 (Zero errors) [OK]', 'output');
          printLine('&bull; Automated file dispatch to Telegram buyer: COMPLETE!', 'success-output');
        }
      });
    });
  }

"""

if "const consoleTabBtns" not in js:
    js = js.replace(target, new_code + target, 1)
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(js)
    print("Added console tab switching to app.js!")
else:
    print("Already added.")
