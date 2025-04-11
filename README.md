# 📬 Gmail Job Application Tracker (Apps Script Automation)

This Google Apps Script automatically scans your Gmail inbox (under a specific label like `Naukri`) and logs job application details into a connected Google Sheet. It helps you track:
- 📅 When you applied
- 🏢 The company
- 💼 The position
- 📨 Email subject and snippet

No manual tracking. No missed applications.

---

## 💡 Use Case

As a Program Manager navigating multiple job opportunities, I needed a simple way to track my applications without manual effort. This script reads confirmation emails (e.g., from LinkedIn, Naukri), extracts structured info, and logs it neatly into a Google Sheet for follow-up and status updates.

---

## ⚙️ Features

- Extracts data from Gmail (under a specific label like `Naukri`)
- Parses:
  - **Company Name**
  - **Job Title**
  - **Application Date**
  - Email subject
  - Email snippet
- Appends to a Google Sheet
- Skips duplicates (based on subject line)
- Can be scheduled to run automatically (daily/hourly)

---


## 🚀 How to Use

1. **Create a Google Sheet**
   - Add headers in Row 1:
     ```
     Date Applied | Position | Company | Email Snippet | Email Subject
     ```

2. **Go to Apps Script**
   - In your sheet, click `Extensions → Apps Script`
   - Paste the code from `Code.gs`

3. **Update the script**
   - Make sure your Gmail label is named correctly (e.g., `Naukri`)
   - Adjust Sheet name if needed

4. **Run and Authorize**
   - Click ▶️ Run → Authorize permissions

5. **Automate (Optional)**
   - Add a trigger to run daily/hourly from the clock icon in Apps Script

---

## 🛠 Tech Used

- Google Apps Script (JavaScript-based)
- Gmail API
- Google Sheets API

---

## 🧠 Key Learnings

- Automating repetitive tracking improves focus and efficiency
- Parsing email bodies with regex requires tuning for structure variations
- Scheduling and deduplication are key for stable automation

---

## 🙋‍♀️ About Me

I'm a Program Manager passionate about productivity, automation, and mindful work practices. This is one of the ways I bring low-code solutions into my daily workflow.

[Connect on LinkedIn](https://www.linkedin.com/in/meghabsehgal/)

---

## 📌 License

This project is open for personal use and educational sharing. Attribution appreciated.

