function extractJobApplications() {
  const labelName = "naukri"; // Gmail label name
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const threads = GmailApp.getUserLabelByName(labelName).getThreads();

  for (let i = 0; i < threads.length; i++) {
    const messages = threads[i].getMessages();
    const message = messages[messages.length - 1]; // Latest message
    const subject = message.getSubject();
    const body = message.getPlainBody();
    const date = message.getDate();

    // Skip if already logged
    const loggedSubjects = sheet.getRange("E2:E" + sheet.getLastRow()).getValues().flat();
    if (loggedSubjects.includes(subject)) continue;

    let company = "N/A";
    let position = "N/A";
    let appliedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");

    // Extract company (line after "Your application was sent to")
    const lines = body.split('\n').map(line => line.trim()).filter(Boolean);

    const appIndex = lines.findIndex(line => line.toLowerCase().includes("your application was sent to"));
    if (appIndex !== -1 && lines.length > appIndex + 2) {
      company = lines[appIndex + 1];
      position = lines[appIndex + 2];
    }

    // Extract applied date (fallback-safe)
    const appliedDateMatch = body.match(/Applied on ([^\n]+)/i);
    if (appliedDateMatch) {
      try {
        appliedDate = Utilities.formatDate(new Date(appliedDateMatch[1].trim()), Session.getScriptTimeZone(), "yyyy-MM-dd");
      } catch (e) {
        // fallback to email date
      }
    }

    sheet.appendRow([
      appliedDate,
      position,
      company,
      body.substring(0, 100),
      subject
    ]);
  }
}
