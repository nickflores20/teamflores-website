// Google Apps Script — Team Flores Lead Form
// Deploy as Web App: Execute as Me, Anyone can access
// After updating, re-deploy and copy the new /exec URL if it changes.

function doPost(e) {
  try {
    var raw = e.parameter.data;
    var data = JSON.parse(raw);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    sheet.appendRow([
      new Date(),                          // A: Date
      data.firstName || '',                // B: First Name
      data.lastName || '',                 // C: Last Name
      data.email || '',                    // D: Email
      data.phone || '',                    // E: Phone
      data.zipCode || '',                  // F: Zip Code
      data.loanType || '',                 // G: Loan Type
      data.vaLoan || '',                   // H: VA Loan
      data.propertyType || '',             // I: Property Type
      data.creditScore || '',              // J: Credit Score
      data.firstTimeBuyer || '',           // K: First Time Buyer
      data.purchaseSituation || '',        // L: Purchase Situation
      data.propertyUse || '',              // M: Property Use
      data.purchasePrice || '',            // N: Purchase Price
      data.downPayment || '',              // O: Down Payment
      data.rateType || '',                 // P: Rate Type
      data.annualIncome || '',             // Q: Annual Income
      data.employmentStatus || '',         // R: Employment Status
      data.bankruptcy || '',               // S: Bankruptcy
      data.proofOfIncome || '',            // T: Proof of Income
      data.realEstateAgent || '',          // U: Real Estate Agent
      data.howDidYouHear || '',            // V: How Found
      data.rebelPathLead || 'No',          // W: Rebel Path Lead
      data.rebelPathURL || 'N/A',          // X: Rebel Path URL
      data.date || '',                     // Y: Date Submitted
      data.time || '',                     // Z: Time Submitted
      data.browser || '',                  // AA: Browser
      data.submittedAt || new Date().toISOString(), // AB: Submitted At
      'New',                               // AC: Status
      ''                                   // AD: Notes
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Team Flores Lead Form endpoint is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
