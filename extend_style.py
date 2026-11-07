# -*- coding: utf-8 -*-
"""
Append Apple / Google / PlayStation / Figma Design System rules to style.css
"""

additions = """
/* ==========================================================================
   Apple / Google / PlayStation / Figma Enhanced Design Extensions
   ========================================================================== */

/* Ambient PlayStation / Apple Glow Elements */
.ambient-glow-sphere {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(224, 255, 79, 0.08) 0%, rgba(0, 112, 209, 0.04) 50%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  filter: blur(60px);
}

.ambient-glow-sphere.top-right {
  top: -100px;
  right: -100px;
}

.ambient-glow-sphere.bottom-left {
  bottom: -150px;
  left: -150px;
}

/* Figma-inspired Canvas Status Bar */
.canvas-status-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: rgba(18, 18, 18, 0.85);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  backdrop-filter: blur(12px);
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--ink-soft);
  margin-bottom: 24px;
  width: fit-content;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

body.light-theme .canvas-status-bar {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.canvas-status-bar .pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #4ADE80;
  box-shadow: 0 0 10px #4ADE80;
  animation: pulseGreen 2s infinite;
}

@keyframes pulseGreen {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
}

.canvas-status-bar .sep {
  color: var(--border);
}

/* Apple-style Segmented Console Tabs */
.console-tab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #141414;
  border-bottom: 1px solid var(--border);
  padding: 6px 12px;
}

.console-tabs {
  display: flex;
  gap: 4px;
}

.console-tab-btn {
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  color: var(--ink-faint);
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all var(--transition-fast);
}

.console-tab-btn:hover {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.05);
}

.console-tab-btn.active {
  color: #0A0A0A;
  background: var(--accent);
  box-shadow: 0 2px 8px rgba(224, 255, 79, 0.3);
}

/* PlayStation Interactive Project Card Glow */
.work-card {
  position: relative;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease;
}

.work-card:hover {
  transform: translateY(-6px);
  border-color: rgba(224, 255, 79, 0.35);
  box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 35px -5px rgba(224, 255, 79, 0.12);
}

.work-image-container img {
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.work-card:hover .work-image-container img {
  transform: scale(1.04);
}

/* Bento Grid Capability Showcase */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  margin-top: 32px;
}

.bento-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bento-card:hover {
  border-color: var(--border-focus);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.bento-card.span-8 { grid-column: span 8; }
.bento-card.span-4 { grid-column: span 4; }
.bento-card.span-6 { grid-column: span 6; }
.bento-card.span-12 { grid-column: span 12; }

@media (max-width: 900px) {
  .bento-card.span-8, .bento-card.span-4, .bento-card.span-6 {
    grid-column: span 12;
  }
}

.bento-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--bg-alt);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--accent);
  margin-bottom: 20px;
}

.bento-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--ink);
}

.bento-desc {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 24px;
}

.bento-badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Interactive Case Study Modal Drawer */
.case-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(16px);
  z-index: 3000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.case-modal-overlay.open {
  display: flex;
}

.case-modal-window {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  max-width: 720px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
}

.case-modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-alt);
  border: 1px solid var(--border);
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all var(--transition-fast);
}

.case-modal-close:hover {
  background: var(--ink);
  color: var(--bg);
}
"""

with open("style.css", "a", encoding="utf-8") as f:
    f.write(additions)

print("Appended enhanced styling to style.css successfully!")
