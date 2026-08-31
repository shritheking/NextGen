import os
import re

with open("telegram-bot-development.html", "r", encoding="utf-8") as f:
    content = f.read()

def remove_between(html, start_str, end_str):
    if start_str not in html: return html
    start_idx = html.find(start_str)
    end_idx = html.find(end_str, start_idx)
    if end_idx != -1:
        end_idx += len(end_str)
        return html[:start_idx] + html[end_idx:]
    return html

new_workflow = """    <!-- HOW IT WORKS -->
    <section class="block" id="workflow">
      <div class="path-label">~/workflow</div>
      <div class="section-head">
        <h2>How We Build It</h2>
        <p class="section-note">From command to deployment.</p>
      </div>
      <div class="process-list">
        
        <div class="process-item">
          <div class="process-node">01</div>
          <div class="process-content">
            <div class="process-content-header">
              <h3><i class="fa-solid fa-list-check"></i> Define</h3>
              <span class="duration-badge"><i class="fa-solid fa-clock"></i> 1-2 Days</span>
            </div>
            <p>Understand your exact business workflow and Telegram bot requirements.</p>
            <span class="process-accent-cmd">$ run define-workflow</span>
            <ul class="process-deliverables">
              <li><i class="fa-solid fa-check"></i> Requirement Analysis</li>
              <li><i class="fa-solid fa-check"></i> Feature Blueprint</li>
              <li><i class="fa-solid fa-check"></i> API Checklist</li>
            </ul>
          </div>
        </div>

        <div class="process-item">
          <div class="process-node">02</div>
          <div class="process-content">
            <div class="process-content-header">
              <h3><i class="fa-solid fa-sitemap"></i> Design</h3>
              <span class="duration-badge"><i class="fa-solid fa-clock"></i> 1-2 Days</span>
            </div>
            <p>Design commands, menus, states and conversational interaction flow.</p>
            <span class="process-accent-cmd">$ run design-flow</span>
            <ul class="process-deliverables">
              <li><i class="fa-solid fa-check"></i> Command Structure</li>
              <li><i class="fa-solid fa-check"></i> Menu Architecture</li>
              <li><i class="fa-solid fa-check"></i> Error Handling Flow</li>
            </ul>
          </div>
        </div>

        <div class="process-item">
          <div class="process-node">03</div>
          <div class="process-content">
            <div class="process-content-header">
              <h3><i class="fa-solid fa-plug"></i> Connect</h3>
              <span class="duration-badge"><i class="fa-solid fa-clock"></i> 1-2 Weeks</span>
            </div>
            <p>Build the backend and integrate APIs, databases, payments and third-party services.</p>
            <span class="process-accent-cmd">$ run build --api</span>
            <ul class="process-deliverables">
              <li><i class="fa-solid fa-check"></i> Backend Integration</li>
              <li><i class="fa-solid fa-check"></i> Payment Gateways</li>
              <li><i class="fa-solid fa-check"></i> Database Setup</li>
            </ul>
          </div>
        </div>

        <div class="process-item">
          <div class="process-node">04</div>
          <div class="process-content">
            <div class="process-content-header">
              <h3><i class="fa-solid fa-rocket"></i> Deploy</h3>
              <span class="duration-badge"><i class="fa-solid fa-clock"></i> 1 Day</span>
            </div>
            <p>Deploy the bot to reliable cloud infrastructure with active webhooks.</p>
            <span class="process-accent-cmd">$ run deploy --webhook</span>
            <ul class="process-deliverables">
              <li><i class="fa-solid fa-check"></i> Cloud Hosting</li>
              <li><i class="fa-solid fa-check"></i> Webhook Registration</li>
              <li><i class="fa-solid fa-check"></i> Environment Secrets</li>
            </ul>
          </div>
        </div>

        <div class="process-item">
          <div class="process-node">05</div>
          <div class="process-content">
            <div class="process-content-header">
              <h3><i class="fa-solid fa-bolt"></i> Automate</h3>
              <span class="duration-badge"><i class="fa-solid fa-clock"></i> Ongoing</span>
            </div>
            <p>The bot handles the repetitive work automatically. You focus on scaling.</p>
            <span class="process-accent-cmd">$ run scale</span>
            <ul class="process-deliverables">
              <li><i class="fa-solid fa-check"></i> 24/7 Uptime</li>
              <li><i class="fa-solid fa-check"></i> User Management</li>
              <li><i class="fa-solid fa-check"></i> Operations Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
"""

# Replace the old workflow section with the new one
start_idx = content.find('<!-- HOW IT WORKS -->')
end_idx = content.find('<!-- TECH STACK -->')

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_workflow + '\n    ' + content[end_idx:]

with open("telegram-bot-development.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated workflow section.")
