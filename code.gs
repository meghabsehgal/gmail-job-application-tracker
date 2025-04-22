function extractJobApplications() {
  const labelName = "naukri";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const threads = GmailApp.getUserLabelByName(labelName).getThreads();

  for (let i = 0; i < threads.length; i++) {
    const messages = threads[i].getMessages();
    const message = messages[messages.length - 1];
    const subject = message.getSubject();
    const body = message.getPlainBody();
    const emailDate = message.getDate(); // original email date
    let appliedDate = Utilities.formatDate(emailDate, Session.getScriptTimeZone(), "yyyy-MM-dd");

    // Skip if already logged
    const loggedSubjects = sheet.getRange("E2:E" + sheet.getLastRow()).getValues().flat();
    if (loggedSubjects.includes(subject)) continue;

    let company = "N/A";
    let position = "N/A";

    const lines = body.split('\n').map(line => line.trim()).filter(Boolean);
    const appIndex = lines.findIndex(line => line.toLowerCase().includes("your application was sent to"));

    if (appIndex !== -1 && lines.length > appIndex + 2) {
      if (lines[appIndex + 1]) company = lines[appIndex + 1];
      if (lines[appIndex + 2]) position = lines[appIndex + 2];
    }

    // Try to extract "Applied on" date, fallback to original date if invalid
    const appliedDateMatch = body.match(/Applied on ([^\n]+)/i);
    if (appliedDateMatch) {
      const parsedDate = new Date(appliedDateMatch[1].trim());
      if (!isNaN(parsedDate)) {
        appliedDate = Utilities.formatDate(parsedDate, Session.getScriptTimeZone(), "yyyy-MM-dd");
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
