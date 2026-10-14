/**
 * Google Apps Script backend for Hritika & Naman wedding RSVP.
 *
 * Setup:
 * 1. Create a Google Sheet and keep it private.
 * 2. Extensions > Apps Script. Paste this file.
 * 3. Set SHEET_ID to the spreadsheet ID in its URL.
 * 4. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone (public guest submissions).
 * 5. Copy the /exec URL into RSVP_ENDPOINT in index.html.
 * 6. Test a submission before publishing the invitation.
 */
const SHEET_ID = "1nTyApsnFz9jLUOHT-fp-X-6Ec4QhiAP0";
const TAB_NAME = "RSVP";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ success: false, message: "Missing request body" });
    }
    const data = JSON.parse(e.postData.contents);
    const name = String(data.guestName || "").trim().slice(0, 200);
    const phone = String(data.guestPhone || "").trim().slice(0, 40);
    const attendees = Number(data.attendees);
    const overall = String(data.overall || "").trim();
    const events = Array.isArray(data.events) ? data.events.map(String) : [];
    const message = String(data.message || "").trim().slice(0, 2000);

    if (!name || !phone || !Number.isInteger(attendees) || attendees < 1 || attendees > 6 ||
        !["Accepting", "Declining"].includes(overall)) {
      return json_({ success: false, message: "Please check the required fields." });
    }
    if (SHEET_ID === "PASTE_YOUR_GOOGLE_SHEET_ID_HERE") {
      return json_({ success: false, message: "Sheet ID is not configured." });
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(TAB_NAME);
    if (!sheet) sheet = ss.insertSheet(TAB_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At", "Guest Name", "Mobile", "Attendees", "Overall Response",
        "Engagement & Sangeet", "Carnival of Love", "Wedding", "Message"
      ]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(), name, phone, attendees, overall === "Accepting" ? "Joyfully accepting" : "Regretfully declining",
      events.includes("Engagement and Sangeet") ? "Yes" : "No",
      events.includes("Carnival of Love") ? "Yes" : "No",
      events.includes("Wedding") ? "Yes" : "No",
      message
    ]);
    return json_({ success: true });
  } catch (err) {
    return json_({ success: false, message: "Unable to save RSVP." });
  }
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}


function doGet() {
  return json_({ success: true, message: "Hritika & Naman RSVP endpoint is ready for submissions." });
}
