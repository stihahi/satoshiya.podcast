/**
 * Google Apps Script to handle feedback form submissions.
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any code in the editor and paste this entire script.
 * 4. Save the project (File > Save).
 * 5. Click "Deploy" > "New deployment".
 * 6. Select type: "Web app".
 * 7. Description: "Feedback Form Backend".
 * 8. Execute as: "Me" (your email).
 * 9. Who has access: "Anyone" (IMPORTANT: This allows the public to submit).
 * 10. Click "Deploy".
 * 11. Copy the "Web App URL" and provide it to the frontend configuration.
 * 
 * SETUP:
 * The script automatically adds a header row if the sheet is empty.
 * Columns: Timestamp, Type, Name, Message/Topic/Question, Details
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Setup headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Type', 'Name', 'Content', 'Details']);
    }

    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    
    // Map frontend fields to columns
    // Frontend sends: { type: 'feedback'|'request'|'question', name, message|topic|question, details }
    
    let content = '';
    let details = '';
    
    if (data.type === 'feedback') {
      content = data.message;
    } else if (data.type === 'request') {
      content = data.topic;
      details = data.details;
    } else if (data.type === 'question') {
      content = data.question;
    }

    sheet.appendRow([
      timestamp,
      data.type,
      data.name || 'Anonymous',
      content,
      details
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Handle CORS (Cross-Origin Resource Sharing) for preflight requests
function doOptions(e) {
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  return ContentService.createTextOutput(' ').setMimeType(ContentService.MimeType.TEXT).setHeaders(headers);
}
