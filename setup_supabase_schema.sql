-- ========================================================
-- NextGen Web Studio - Supabase Database Schema Setup
-- Run these queries inside your Supabase SQL Editor
-- ========================================================

-- 1. ALTER USERS TABLE (Add missing fields)
ALTER TABLE users ADD COLUMN IF NOT EXISTS company TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS gst TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';
ALTER TABLE users ADD COLUMN IF NOT EXISTS portal_enabled BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT true;

-- 2. ALTER PROJECTS TABLE (Add missing fields)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS progress INT DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS current_stage TEXT DEFAULT 'Discovery';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS developer_id TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS deadline TIMESTAMP DEFAULT NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS started_at TIMESTAMP DEFAULT NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP DEFAULT NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS next_milestone TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS eta TEXT DEFAULT '';

-- 3. CREATE INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    name TEXT DEFAULT '',
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    budget TEXT DEFAULT '',
    "projectType" TEXT DEFAULT '',
    message TEXT DEFAULT '',
    status TEXT DEFAULT 'New',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. CREATE RECEIPTS TABLE
CREATE TABLE IF NOT EXISTS receipts (
    id TEXT PRIMARY KEY,
    "receiptCode" TEXT DEFAULT '',
    "clientName" TEXT DEFAULT '',
    "clientEmail" TEXT DEFAULT '',
    "clientPhone" TEXT DEFAULT '',
    "clientAddress" TEXT DEFAULT '',
    "projectName" TEXT DEFAULT '',
    "projectDescription" TEXT DEFAULT '',
    items JSONB DEFAULT '[]'::jsonb,
    subtotal NUMERIC DEFAULT 0,
    "advancePaid" NUMERIC DEFAULT 0,
    "taxRate" NUMERIC DEFAULT 0,
    "taxAmount" NUMERIC DEFAULT 0,
    "totalAmount" NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'Pending',
    "razorpayPaymentId" TEXT DEFAULT '',
    "razorpaySignature" TEXT DEFAULT '',
    date TEXT DEFAULT '',
    invoice_number TEXT DEFAULT '',
    due_date TIMESTAMP DEFAULT NULL,
    payment_date TIMESTAMP DEFAULT NULL,
    currency TEXT DEFAULT 'INR',
    payment_method TEXT DEFAULT '',
    receipt_url TEXT DEFAULT '',
    invoice_pdf TEXT DEFAULT ''
);

-- 5. CREATE CHATBOT_MESSAGES TABLE
CREATE TABLE IF NOT EXISTS chatbot_messages (
    id TEXT PRIMARY KEY,
    "userEmail" TEXT DEFAULT '',
    "userMessage" TEXT DEFAULT '',
    botResponse TEXT DEFAULT '',
    read BOOLEAN DEFAULT false,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. CREATE CRM_LEADS TABLE
CREATE TABLE IF NOT EXISTS crm_leads (
    id TEXT PRIMARY KEY,
    name TEXT DEFAULT '',
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    budget TEXT DEFAULT '',
    source TEXT DEFAULT '',
    stage TEXT DEFAULT 'New',
    project_type TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. CREATE TASKS TABLE
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT DEFAULT '',
    assigned_to TEXT DEFAULT 'Admin',
    priority TEXT DEFAULT 'med',
    stage TEXT DEFAULT 'Todo',
    project_id TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP DEFAULT NULL,
    completed_at TIMESTAMP DEFAULT NULL
);

-- 8. CREATE SUPPORT_TICKETS TABLE
CREATE TABLE IF NOT EXISTS support_tickets (
    id TEXT PRIMARY KEY,
    ticket_number TEXT DEFAULT '',
    subject TEXT DEFAULT '',
    client_email TEXT DEFAULT '',
    category TEXT DEFAULT 'General',
    priority TEXT DEFAULT 'low',
    status TEXT DEFAULT 'Open',
    message TEXT DEFAULT '',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_to TEXT DEFAULT '',
    resolved_at TIMESTAMP DEFAULT NULL,
    last_reply TEXT DEFAULT '',
    internal_notes TEXT DEFAULT ''
);

-- 9. CREATE ACTIVITY_LOGS TABLE
CREATE TABLE IF NOT EXISTS activity_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT DEFAULT '',
    action TEXT DEFAULT '',
    description TEXT DEFAULT '',
    entity TEXT DEFAULT '',
    entity_id TEXT DEFAULT '',
    ip_address TEXT DEFAULT '',
    browser TEXT DEFAULT '',
    created_by TEXT DEFAULT 'System',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. CREATE PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    receipt_id TEXT DEFAULT '',
    invoice_id TEXT DEFAULT '',
    amount NUMERIC DEFAULT 0,
    currency TEXT DEFAULT 'INR',
    gateway TEXT DEFAULT 'Razorpay',
    fee NUMERIC DEFAULT 0,
    tax NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'Pending',
    transaction_id TEXT DEFAULT '',
    paid_at TIMESTAMP DEFAULT NULL
);

-- 11. CREATE CLIENT_NOTES TABLE
CREATE TABLE IF NOT EXISTS client_notes (
    id TEXT PRIMARY KEY,
    user_id TEXT DEFAULT '',
    note TEXT DEFAULT '',
    pinned BOOLEAN DEFAULT false,
    private BOOLEAN DEFAULT false,
    created_by TEXT DEFAULT 'Admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. CREATE NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT DEFAULT '',
    title TEXT DEFAULT '',
    message TEXT DEFAULT '',
    type TEXT DEFAULT 'info',
    priority TEXT DEFAULT 'Medium',
    icon TEXT DEFAULT 'fa-info-circle',
    action_url TEXT DEFAULT '',
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT NULL
);

-- 13. CREATE PROJECT_FILES TABLE
CREATE TABLE IF NOT EXISTS project_files (
    id TEXT PRIMARY KEY,
    project_id TEXT DEFAULT '',
    title TEXT DEFAULT '',
    file_name TEXT DEFAULT '',
    file_size NUMERIC DEFAULT 0,
    mime_type TEXT DEFAULT '',
    category TEXT DEFAULT 'Other',
    file_url TEXT DEFAULT '',
    version TEXT DEFAULT 'V1',
    uploaded_by TEXT DEFAULT 'Admin',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. CREATE PREVIEW_LINKS TABLE
CREATE TABLE IF NOT EXISTS preview_links (
    id TEXT PRIMARY KEY,
    project_id TEXT DEFAULT '',
    url TEXT DEFAULT '',
    password TEXT DEFAULT '',
    active BOOLEAN DEFAULT false,
    expires_at TIMESTAMP DEFAULT NULL
);

-- 15. CREATE INTERNAL_COMMENTS TABLE
CREATE TABLE IF NOT EXISTS internal_comments (
    id TEXT PRIMARY KEY,
    user_id TEXT DEFAULT '',
    sender_name TEXT DEFAULT '',
    text TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 16. CREATE DEVELOPERS TABLE
CREATE TABLE IF NOT EXISTS developers (
    id TEXT PRIMARY KEY,
    name TEXT DEFAULT '',
    email TEXT DEFAULT ''
);
