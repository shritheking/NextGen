import markdown
from fpdf import FPDF

md_text = """# Infinity_Trend_V4 - License Integration Instructions
*Specific guide for this buyers exact code*
*Prepared by NextGen Web Studio | @shridharsan1*

***

## WHAT WE FOUND IN YOUR CODE

Your EA already has its own expiry system using these lines:

**Line 186:**  `string expdate = "2026.06.03 00:00:01";`  
**Line 187:**  `bool validationcheck = false;`

And inside `OnInit()` at Line 192:

```cpp
   if(TimeCurrent() > (datetime)expdate && !validationcheck)
   {
      validationcheck = true;
      Alert("EA validity Expired");
      ExpertRemove();
      return (0);
   }
```

This old system uses a HARDCODED date that cannot be changed automatically.
You need to REPLACE it with the new dynamic licensing system below.

***

## STEP 1 - REMOVE these 2 old lines (around Line 186-187)

**DELETE this:**
```cpp
   string expdate = "2026.06.03 00:00:01";
   bool validationcheck = false;
```

**REPLACE WITH:**
```cpp
   int ALLOWED_MT5_ID = 0;
   datetime LICENSE_EXPIRY = D'2099.01.01';
```

**WARNING:** The variable names must be EXACTLY as shown above. Do NOT rename them. The licensing system searches for these exact names.

***

## STEP 2 - REPLACE the old expiry check inside OnInit()

**DELETE this entire block:**

```cpp
   if(TimeCurrent() > (datetime)expdate && !validationcheck)
   {
      validationcheck = true;
      Alert("EA validity Expired");
      ExpertRemove();
      return (0);
   }
```

**REPLACE WITH:**

```cpp
   // \u2500\u2500 InfinityTrader License Check \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   int currentAccount = (int)AccountInfoInteger(ACCOUNT_LOGIN);
   if(currentAccount != ALLOWED_MT5_ID)
   {
      Alert("\u274c Invalid MT5 ID. This EA is not licensed for this account.");
      ExpertRemove();
      return(INIT_FAILED);
   }
   if(TimeCurrent() > LICENSE_EXPIRY)
   {
      Alert("\u274c License Expired. Please renew via the bot.");
      ExpertRemove();
      return(INIT_FAILED);
   }
   Print("\u2705 License Validated! MT5 ID: ", currentAccount, " | Expiry: ", LICENSE_EXPIRY);
   // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
```

***

## STEP 3 - SAVE AND TEST

1. Press `Ctrl+S` to save the file
2. Click the "Compile" button in MetaEditor
3. Make sure it shows 0 errors in the bottom panel
4. The EA is now ready to upload

***

## STEP 4 - UPLOAD TO ADMIN PORTAL

1. Open your Admin Web Portal
2. Go to EA Templates
3. Click "Upload New Version"
4. Select your updated `Infinity_Trend_V4.mq5` file
5. Click Upload

From this point, every customer who orders the bot will automatically receive a compiled `.ex5` file with:
- Their MT5 ID injected at `ALLOWED_MT5_ID`
- Their expiry date injected at `LICENSE_EXPIRY`

***

## SUMMARY OF ALL CHANGES

| What to do | Old Code | New Code |
| :--- | :--- | :--- |
| Variable 1 | string expdate = "2026.06.03..."; | int ALLOWED_MT5_ID = 0; |
| Variable 2 | bool validationcheck = false; | datetime LICENSE_EXPIRY = D'2099.01.01'; |
| Expiry check | if(TimeCurrent() > expdate) | Full license check block (Step 2) |
| MT5 ID check | Did not exist | Added in Step 2 |

Total changes: 3 small edits. Everything else in your EA stays exactly the same.

***
(c) NextGen Web Studio | @shridharsan1 | Confidential
"""

# FPDF2 supports a write_html method
html = markdown.markdown(md_text, extensions=['tables', 'fenced_code'])

class PDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 15)
        self.cell(0, 10, 'NextGen Web Studio', 0, 1, 'C')
        
    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

pdf = PDF()
pdf.add_page()

# Need to map some fonts to Unicode if we want emojis, but fpdf2 built-in html uses helvetica/times.
# Let's clean emojis out to avoid font errors, or rely on unicode font fallback if available.
import re
html = html.replace('\u274c', '[X]')
html = html.replace('\u2705', '[OK]')
html = html.replace('\u2500', '-')

pdf.write_html(html)

out_path = r"C:\Users\shrid\.gemini\antigravity\brain\9c7c21b2-cd51-463f-8302-e268cbacb817\scratch\Infinity_Trend_V4_Instructions.pdf"
pdf.output(out_path)

print(f"Generated PDF at {out_path}")

