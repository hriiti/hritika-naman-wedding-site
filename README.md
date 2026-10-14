# Hritika & Naman Wedding Invitation

This package keeps the current wedding website design and its existing interactions. The RSVP form is prepared to submit guest responses to Google Sheets through Google Apps Script.

## RSVP integration status
- The website RSVP form and `Code.gs` backend are included.
- The response-value mismatch between the form and backend has been corrected.
- `Hritika_Naman_RSVP_Sheet_Template.xlsx` is a starter workbook with the matching RSVP columns and setup steps.
- **The spreadsheet ID and deployed Apps Script `/exec` endpoint are now configured in the included files.** The live flow still needs a test submission from the published/hosted website.

## Connect the RSVP form
1. Upload `Hritika_Naman_RSVP_Sheet_Template.xlsx` to Google Drive and open it with Google Sheets. Keep the sheet private.
2. In the Google Sheet, open **Extensions → Apps Script** and paste the included `Code.gs`.
3. The spreadsheet ID is already filled into the included `Code.gs`: `1nTyApsnFz9jLUOHT-fp-X-6Ec4QhiAP0`. If you use a different spreadsheet, replace it with that sheet’s ID.
4. Save and choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone** so invited guests can submit.
5. Copy the deployment URL ending in `/exec`.
6. The current deployment URL is already set in `index.html`. If you create a new Apps Script deployment with a different URL, update `RSVP_ENDPOINT`.
7. Redeploy the website, submit a test RSVP, and confirm the response appears on the `RSVP` tab.

The Apps Script creates the `RSVP` tab and headers if they do not exist. The website does not claim a response was saved when the endpoint is blank. Keep the spreadsheet itself private; public access is only for the submission endpoint.

## Preview locally
Open `index.html` in a modern browser or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Before sharing the invitation
- Confirm the configured Google Sheet ID and Apps Script URL are still current.
- Test a real submission on desktop and mobile.
- Confirm the exact Google Maps pins for both venues.
