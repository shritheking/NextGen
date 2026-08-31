import os

# --- terms.html ---
with open("terms.html", "r", encoding="utf-8") as f:
    terms = f.read()

terms = terms.replace(
    '<li>Product consulting and MVP prototyping</li>',
    '<li>Product consulting and MVP prototyping</li>\n          <li>Custom Telegram Bot Development &amp; Automation</li>'
)

terms = terms.replace(
    '<h2 id="responsibilities">6. Client Responsibilities</h2>',
    '<h2 id="responsibilities">6. Client Responsibilities</h2>\n        <p>For Telegram bot projects, clients are responsible for creating and providing their own Telegram Bot Token via BotFather, and for ensuring their bot\'s use case complies with Telegram\'s Bot API Terms (<a href="https://core.telegram.org/bots/terms" target="_blank" style="color:var(--accent);">https://core.telegram.org/bots/terms</a>) and platform content policies. NextGen Web Studio is not liable for bot suspension or removal resulting from client-side policy violations.</p>'
)

terms = terms.replace(
    '<h2 id="property">7. Intellectual Property</h2>',
    '<h2 id="property">7. Intellectual Property</h2>\n        <p>For Telegram bot projects, the Telegram bot account and token remain the property of the client, as they are tied to the client\'s Telegram identity. NextGen Web Studio retains rights to reusable backend architecture, scripts, and code patterns unless otherwise agreed in writing.</p>'
)

terms = terms.replace(
    '<li>Razorpay gateway transactions or checkout downtime.</li>',
    '<li>Razorpay gateway transactions or checkout downtime.</li>\n          <li>Telegram platform policy changes, Bot API deprecations, or account/bot suspensions initiated by Telegram.</li>\n          <li>Outcomes of automation involving trading, licensing, or payment logic \u2014 NextGen Web Studio is not a financial advisor, and clients are responsible for regulatory compliance in their jurisdiction.</li>'
)

with open("terms.html", "w", encoding="utf-8") as f:
    f.write(terms)


# --- privacy.html ---
with open("privacy.html", "r", encoding="utf-8") as f:
    privacy = f.read()

privacy = privacy.replace(
    '<h2 id="collect">2. Information We Collect</h2>',
    '<h2 id="collect">2. Information We Collect</h2>\n        <p>For Telegram bot projects, data collected through a deployed bot (e.g. Telegram user IDs, order details, license information) is separate from data collected via our website, and is handled per the data scope agreed in the individual project contract. For deployed Telegram bots, the client is generally the data controller for their bot\'s end-users, unless NextGen Web Studio directly hosts and operates the bot\'s backend under a separate hosting agreement.</p>'
)

privacy = privacy.replace(
    '<li><strong>Render &amp; Vercel</strong>: Operates server runtime environments and serverless hosting distributions.</li>',
    '<li><strong>Render &amp; Vercel</strong>: Operates server runtime environments and serverless hosting distributions.</li>\n          <li><strong>Telegram</strong>: Bot messages, commands, and user interactions are transmitted through Telegram\'s infrastructure, subject to Telegram\'s own Privacy Policy.</li>'
)

with open("privacy.html", "w", encoding="utf-8") as f:
    f.write(privacy)


# --- refunds.html ---
with open("refunds.html", "r", encoding="utf-8") as f:
    refunds = f.read()

refunds = refunds.replace(
    '<h2 id="exclusions">1. Custom Service Exclusions</h2>',
    '<h2 id="exclusions">1. Custom Service Exclusions</h2>\n        <p>For Telegram bot development projects, payments are non-refundable once Telegram Bot Token integration or backend development work has started, as this work is client-specific and not resellable.</p>'
)

with open("refunds.html", "w", encoding="utf-8") as f:
    f.write(refunds)

print("Legal clauses injected successfully.")
