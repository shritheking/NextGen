from fpdf import FPDF

class BrandedPDF(FPDF):
    def header(self):
        # Dark background for the whole page
        self.set_fill_color(14, 14, 14) # #0E0E0E
        self.rect(0, 0, 210, 297, 'F')
        
        # NextGen Logo text
        self.set_font('Courier', 'B', 24)
        self.set_text_color(224, 255, 79) # #E0FF4F (Neon Green)
        self.cell(0, 15, 'nextgen', 0, 1, 'L')
        
        # Divider line
        self.set_draw_color(50, 50, 50)
        self.line(10, 25, 200, 25)
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Courier', '', 9)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, '(c) NextGen Web Studio | @shridharsan1 | Confidential', 0, 0, 'C')

pdf = BrandedPDF()
pdf.add_page()

# Title
pdf.set_font('Helvetica', 'B', 16)
pdf.set_text_color(255, 255, 255)
pdf.cell(0, 10, 'Infinity_Trend_V4 - License Integration Instructions', 0, 1)

pdf.set_font('Helvetica', 'I', 10)
pdf.set_text_color(200, 200, 200)
pdf.cell(0, 6, 'Specific guide for this buyers exact code', 0, 1)
pdf.ln(5)

def section_title(title):
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(224, 255, 79) # Neon Green
    pdf.cell(0, 8, title, 0, 1)
    pdf.ln(2)

def normal_text(text):
    pdf.set_font('Helvetica', '', 11)
    pdf.set_text_color(220, 220, 220)
    pdf.multi_cell(0, 6, text)
    pdf.ln(2)

def code_block(lines):
    pdf.set_font('Courier', '', 10)
    pdf.set_fill_color(20, 20, 20) # Darker grey for code
    pdf.set_text_color(224, 255, 79) # Neon Green text
    
    # Draw a bordered box
    pdf.set_draw_color(50, 50, 50)
    
    text = "\n".join(lines)
    pdf.multi_cell(0, 6, text, border=1, fill=True)
    pdf.ln(4)

section_title('WHAT WE FOUND IN YOUR CODE')
normal_text('Your EA already has its own expiry system using these lines:')
code_block(['string expdate = "2026.06.03 00:00:01";', 'bool validationcheck = false;'])
normal_text('And inside OnInit() at Line 192:')
code_block([
    'if(TimeCurrent() > (datetime)expdate && !validationcheck)',
    '{',
    '   validationcheck = true;',
    '   Alert("EA validity Expired");',
    '   ExpertRemove();',
    '   return (0);',
    '}'
])
normal_text('This old system uses a HARDCODED date that cannot be changed automatically. You need to REPLACE it with the new dynamic licensing system below.')
pdf.ln(5)

section_title('STEP 1 - REMOVE these 2 old lines (around Line 186-187)')
normal_text('DELETE this:')
code_block(['string expdate = "2026.06.03 00:00:01";', 'bool validationcheck = false;'])
normal_text('REPLACE WITH:')
code_block(["int ALLOWED_MT5_ID = 0;", "datetime LICENSE_EXPIRY = D'2099.01.01';"])
normal_text('WARNING: The variable names must be EXACTLY as shown above. Do NOT rename them. The licensing system searches for these exact names.')
pdf.ln(5)

section_title('STEP 2 - REPLACE the old expiry check inside OnInit()')
normal_text('DELETE this entire block:')
code_block([
    'if(TimeCurrent() > (datetime)expdate && !validationcheck)',
    '{',
    '   validationcheck = true;',
    '   Alert("EA validity Expired");',
    '   ExpertRemove();',
    '   return (0);',
    '}'
])
normal_text('REPLACE WITH:')
code_block([
    '// --- InfinityTrader License Check ----------------------',
    'int currentAccount = (int)AccountInfoInteger(ACCOUNT_LOGIN);',
    'if(currentAccount != ALLOWED_MT5_ID)',
    '{',
    '   Alert("[X] Invalid MT5 ID. This EA is not licensed.");',
    '   ExpertRemove();',
    '   return(INIT_FAILED);',
    '}',
    'if(TimeCurrent() > LICENSE_EXPIRY)',
    '{',
    '   Alert("[X] License Expired. Please renew via the bot.");',
    '   ExpertRemove();',
    '   return(INIT_FAILED);',
    '}',
    'Print("[OK] License Validated! MT5 ID: ", currentAccount);',
    '// -------------------------------------------------------'
])
pdf.ln(5)

# Page Break if needed, but FPDF handles it automatically.
section_title('STEP 3 - SAVE AND TEST')
normal_text('1. Press Ctrl+S to save the file\n2. Click the "Compile" button in MetaEditor\n3. Make sure it shows 0 errors in the bottom panel\n4. The EA is now ready to upload')
pdf.ln(5)

section_title('STEP 4 - UPLOAD TO ADMIN PORTAL')
normal_text('1. Open your Admin Web Portal\n2. Go to EA Templates\n3. Click "Upload New Version"\n4. Select your updated Infinity_Trend_V4.mq5 file\n5. Click Upload\n\nFrom this point, every customer who orders the bot will automatically receive a compiled .ex5 file with:\n- Their MT5 ID injected at ALLOWED_MT5_ID\n- Their expiry date injected at LICENSE_EXPIRY')


out_path = r"C:\Users\shrid\OneDrive\Desktop\NextGen_License_Instructions.pdf"
pdf.output(out_path)
print(f"Generated beautifully branded PDF at {out_path}")
