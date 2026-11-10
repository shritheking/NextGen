import React, { useState } from 'react';
import { ArrowLeft, Shield, FileText, RefreshCw, Mail, MapPin } from 'lucide-react';

interface LegalPolicyViewProps {
  initialPolicy: 'privacy' | 'terms' | 'refunds';
  onBackToHome: () => void;
}

export const LegalPolicyView: React.FC<LegalPolicyViewProps> = ({ initialPolicy, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refunds'>(initialPolicy);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#111827', fontFamily: '"Manrope", sans-serif' }}>
      {/* Sticky Clean Header without bottom line */}
      <header className="legal-policy-header">
        <div className="legal-policy-header-inner">
          <button
            onClick={onBackToHome}
            className="legal-back-btn"
            title="Return to Main Studio"
          >
            <img src="/logo-icon.png" alt="NextGen" className="legal-back-logo" />
            <span>← Back to Studio</span>
          </button>

          {/* Policy Switcher Tabs */}
          <div className="legal-policy-tabs">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`legal-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveTab('refunds')}
              className={`legal-tab-btn ${activeTab === 'refunds' ? 'active' : ''}`}
            >
              Refund Policy
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '36px 24px 80px' }}>
        {/* =========================================================================
            POLICY 1: PRIVACY POLICY (100% EXACT ORIGINAL COPY)
            ========================================================================= */}
        {activeTab === 'privacy' && (
          <article style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: ' clamp(24px, 4vw, 44px)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>
                ~/legal/privacy-policy
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ width: '6px', height: '36px', background: '#2563eb', borderRadius: '2px', display: 'inline-block' }}></span>
              <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, margin: 0, color: '#111827' }}>
                Privacy Policy
              </h1>
            </div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '12px', color: '#64748b', marginBottom: '32px' }}>
              Last updated: July 2026 • status: active
            </div>

            <div style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155' }}>
              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                1. Introduction
              </h2>
              <p>
                NextGen Web Studio ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, client portal, and bespoke web development services.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                2. Information We Collect
              </h2>
              <p>
                For Telegram bot projects, data collected through a deployed bot (e.g. Telegram user IDs, order details, license information) is separate from data collected via our website, and is handled per the data scope agreed in the individual project contract. For deployed Telegram bots, the client is generally the data controller for their bot's end-users, unless NextGen Web Studio directly hosts and operates the bot's backend under a separate hosting agreement.
              </p>
              <p>
                We collect information necessary to deliver high-performance digital solutions, process payments, and communicate regarding project scopes. This includes:
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                <li><strong>Identity &amp; Contact Details</strong>: Name, email address, phone number (optional), and company name (if provided).</li>
                <li><strong>Project &amp; Billing Specifications</strong>: Detailed project requirements, selected budget preferences, and scope details.</li>
                <li><strong>Authentication</strong>: Google account information (profile details and credentials) when signing in securely via Google OAuth.</li>
                <li><strong>Transaction Details</strong>: Razorpay transaction IDs and payment statuses (we do not store your credit/debit card numbers or UPI PINs).</li>
              </ul>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                3. How We Use Information
              </h2>
              <p>
                Your data is strictly utilized to operate our studio workflow and secure client solutions:
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                <li>To respond to scoping inquiries and prepare accurate estimates.</li>
                <li>To construct, compile, and deploy custom web application code.</li>
                <li>To process transactions, generate invoice receipts, and update account states.</li>
                <li>To deliver automated system updates and support messaging.</li>
                <li>To customize website experiences and improve overall system performances.</li>
              </ul>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                4. Payments &amp; Financial Data Security
              </h2>
              <p>
                All billing operations and payments are securely integrated and processed using the <strong>Razorpay</strong> gateway.
              </p>
              <p>
                We strictly comply with financial security practices. NextGen Web Studio <strong>never</strong> collects, intercepts, or stores card numbers, CVVs, net banking logins, or UPI credentials. All payment processing is conducted inside Razorpay's PCI-DSS compliant secure infrastructure.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                5. Third-Party Services
              </h2>
              <p>
                We partner with standard technical service providers to maintain hosting, databases, and secure authentication:
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                <li><strong>Google OAuth</strong>: Provides secure, passwordless authentication logins.</li>
                <li><strong>Razorpay</strong>: Secures, processes, and verifies billing payment transactions.</li>
                <li><strong>Supabase</strong>: Hosts our secure application database storage.</li>
                <li><strong>Resend / SMTP</strong>: Delivers transactional confirmation emails.</li>
                <li><strong>Render &amp; Vercel</strong>: Operates server runtime environments and serverless hosting distributions.</li>
                <li><strong>Telegram</strong>: Bot messages, commands, and user interactions are transmitted through Telegram's infrastructure, subject to Telegram's own Privacy Policy.</li>
              </ul>
              <p>
                These third parties help operate our application services and are selected for their adherence to secure data handling standards.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                6. Cookies
              </h2>
              <p>
                We use cookies to maintain active portal login sessions, persist light/dark visual themes, and facilitate basic page navigation. You can manage cookie preferences directly inside your web browser configuration.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                7. Data Security
              </h2>
              <p>
                We implement secure socket layer (SSL) encryptions, parameterized database inputs, and strict authorization checks to prevent unauthorized access, loss, or leakage of personal details.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                8. User Rights
              </h2>
              <p>
                You have the right to request access to your personal details, correct inaccurate details, or request full deletion of your record history (where database constraints permit). To request updates, contact us directly via email.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                9. Contact Us
              </h2>
              <p>
                For inquiries regarding data practices, reach out to our studio:
              </p>
              <p>
                <strong>NextGen Web Studio</strong><br />
                Email: <a href="mailto:nextgenwebstudio63@gmail.com" style={{ color: '#2563eb' }}>nextgenwebstudio63@gmail.com</a><br />
                Location: Coimbatore, Tamil Nadu, India
              </p>
            </div>
          </article>
        )}

        {/* =========================================================================
            POLICY 2: TERMS & CONDITIONS (100% EXACT ORIGINAL COPY)
            ========================================================================= */}
        {activeTab === 'terms' && (
          <article style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: ' clamp(24px, 4vw, 44px)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>
                ~/legal/terms-and-conditions
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ width: '6px', height: '36px', background: '#2563eb', borderRadius: '2px', display: 'inline-block' }}></span>
              <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, margin: 0, color: '#111827' }}>
                Terms &amp; Conditions
              </h1>
            </div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '12px', color: '#64748b', marginBottom: '32px' }}>
              Last updated: July 2026 • status: active
            </div>

            <div style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155' }}>
              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing the NextGen Web Studio website, creating accounts inside our client portal, or booking project scopes, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not accept these terms, you must discontinue using our services.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                2. Studio Services
              </h2>
              <p>
                We provide professional, customized digital products and coding services, including:
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Bespoke Website Design &amp; Styling</li>
                <li>Full-Stack Application Development (React, Node, etc.)</li>
                <li>Custom E-Commerce Storefronts</li>
                <li>Sports &amp; Appointment Booking Calendar Systems</li>
                <li>Search Engine Optimization (SEO) &amp; Speed Audits</li>
                <li>Product consulting and MVP prototyping</li>
                <li>Custom Telegram Bot Development &amp; Automation</li>
              </ul>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                3. Scoping &amp; Estimates
              </h2>
              <p>
                Any proposals, cost sheets, or pricing estimates generated via our contact form or client portal are preliminary estimates. Final project pricing, project milestones, and deliverables are subject to change and depend entirely on the formally agreed Requirements document before project initiation.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                4. Payments &amp; Billing
              </h2>
              <p>
                To schedule resources and initiate development work, an advance deposit payment is required. The remaining project balance is due prior to final source code delivery, deployment, or hosting handoff, unless explicitly agreed otherwise.
              </p>
              <p>
                All payments are securely processed through the Razorpay gateway. Failure to settle outstanding balances on milestone dates may result in a temporary suspension of scoping or development services.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                5. Timeline &amp; Delivery
              </h2>
              <p>
                Project delivery schedules are calculated based on scope complexity. Estimated timelines are guidelines only. Delays in supplying assets (logos, content text, image files) or securing required client approvals will extend delivery schedules. We are not responsible for project delays caused by a lack of timely client feedback.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                6. Client Responsibilities
              </h2>
              <p>
                For Telegram bot projects, clients are responsible for creating and providing their own Telegram Bot Token via BotFather, and for ensuring their bot's use case complies with Telegram's Bot API Terms (<a href="https://core.telegram.org/bots/terms" target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>https://core.telegram.org/bots/terms</a>) and platform content policies. NextGen Web Studio is not liable for bot suspension or removal resulting from client-side policy violations.
              </p>
              <p>
                Clients are responsible for supplying all copy, imagery, brand assets, and third-party API credentials (such as Google, Razorpay, or domain registry tokens) necessary to implement the project. You warrant that you own or have permission to use all content supplied to us.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                7. Intellectual Property
              </h2>
              <p>
                For Telegram bot projects, the Telegram bot account and token remain the property of the client, as they are tied to the client's Telegram identity. NextGen Web Studio retains rights to reusable backend architecture, scripts, and code patterns unless otherwise agreed in writing.
              </p>
              <p>
                All visual assets and text content supplied by the client remain your intellectual property.
              </p>
              <p>
                Upon receipt of full and final payment, ownership of custom-written codebase files transfers to the client. NextGen Web Studio retains the right to display project screenshots and descriptions in our public portfolios and case study materials for promotional purposes.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                8. Refund Policy
              </h2>
              <p>
                Due to the customized nature of professional web development and coding services, payments made for completed design or coding tasks are non-refundable. For detailed conditions on cancellation refunds, please review our <button onClick={() => setActiveTab('refunds')} style={{ background: 'none', border: 'none', padding: 0, color: '#2563eb', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Refund Policy</button>.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                9. Limitation of Liability
              </h2>
              <p>
                NextGen Web Studio is not liable for business interruptions, data losses, or financial damages arising from:
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Third-party hosting server downtime or network failures.</li>
                <li>Domain registrar expirations or DNS errors.</li>
                <li>Third-party API deprecations or server outages.</li>
                <li>Razorpay gateway transactions or checkout downtime.</li>
                <li>Telegram platform policy changes, Bot API deprecations, or account/bot suspensions initiated by Telegram.</li>
                <li>Outcomes of automation involving trading, licensing, or payment logic — NextGen Web Studio is not a financial advisor, and clients are responsible for regulatory compliance in their jurisdiction.</li>
              </ul>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                10. Modifications to Terms
              </h2>
              <p>
                We reserve the right to edit, modify, or replace these Terms &amp; Conditions at any time. Active clients will be notified of material updates directly via email or the client portal.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                11. Contact Us
              </h2>
              <p>
                For inquiries regarding our service terms:
              </p>
              <p>
                <strong>NextGen Web Studio</strong><br />
                Email: <a href="mailto:nextgenwebstudio63@gmail.com" style={{ color: '#2563eb' }}>nextgenwebstudio63@gmail.com</a><br />
                Location: Coimbatore, Tamil Nadu, India
              </p>
            </div>
          </article>
        )}

        {/* =========================================================================
            POLICY 3: REFUND POLICY (100% EXACT ORIGINAL COPY)
            ========================================================================= */}
        {activeTab === 'refunds' && (
          <article style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: 'clamp(24px, 4vw, 44px)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>
                ~/legal/refund-policy
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ width: '6px', height: '36px', background: '#2563eb', borderRadius: '2px', display: 'inline-block' }}></span>
              <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, margin: 0, color: '#111827' }}>
                Refund Policy
              </h1>
            </div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '12px', color: '#64748b', marginBottom: '32px' }}>
              Last updated: July 2026 • status: active
            </div>

            <div style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155' }}>
              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                1. Custom Service Exclusions
              </h2>
              <p>
                For Telegram bot development projects, payments are non-refundable once Telegram Bot Token integration or backend development work has started, as this work is client-specific and not resellable.
              </p>
              <p>
                NextGen Web Studio specializes in customized, bespoke design, full-stack engineering, and coding solutions. Because all project scopes are engineered to order based on agreed feature criteria, payments made for completed hours, code development, milestones, or finalized layouts are <strong>generally non-refundable</strong>.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                2. Project Deposits &amp; Milestones
              </h2>
              <p>
                Initial design deposits and setup fees are non-refundable once visual layout scoping, server setups, or custom wireframing tasks have started. Subsequent milestone payments (e.g. 50% mockups approval, 75% staging build completion) are non-refundable once development on that corresponding milestone phase begins.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                3. Project Cancellations
              </h2>
              <p>
                Clients may cancel a project contract at any time by sending a written notification via email:
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Upon cancellation, work ceases immediately.</li>
                <li>We will compile a balance sheet detailing completed task items up to the cancellation timestamp.</li>
                <li>Any unbilled hours or unused portions of the deposit (if work has not started on the next milestone) will be evaluated for potential partial refunds on a case-by-case basis.</li>
                <li>All completed codebase files will be handed over to the client for partial billing balance payments.</li>
              </ul>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                4. Dispute Resolutions
              </h2>
              <p>
                If you are unsatisfied with a delivery milestone or believe a scope deliverable has not been met:
              </p>
              <p>
                You must raise a dispute ticket in the client portal or contact us directly within <strong>5 business days</strong> of milestone handover. We will collaborate with your team to review the requirements criteria and implement modifications to align with the agreed scope.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                5. Transaction Failures &amp; Double Billing
              </h2>
              <p>
                In the event of network timeouts, double-billing glitches, or checkout errors on the Razorpay payment gateway:
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                <li>If double billing occurs, we will coordinate with Razorpay support to trigger an immediate refund of the duplicate transaction amount.</li>
                <li>Duplicate transaction refunds generally credit back to your original source payment method (bank account, credit card, or UPI VPA) within <strong>5 to 7 business days</strong>, subject to bank processing cycles.</li>
              </ul>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                6. Refund Method
              </h2>
              <p>
                All approved refund amounts are issued directly to the original bank account or source payment account used during checkout via our payment gateway. We do not issue cash refunds or check payments.
              </p>

              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '28px' }}>
                7. Contact Us
              </h2>
              <p>
                For questions or dispute reviews regarding payments and refunds:
              </p>
              <p>
                <strong>NextGen Web Studio</strong><br />
                Email: <a href="mailto:nextgenwebstudio63@gmail.com" style={{ color: '#2563eb' }}>nextgenwebstudio63@gmail.com</a><br />
                Location: Coimbatore, Tamil Nadu, India
              </p>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};
