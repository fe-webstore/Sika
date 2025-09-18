// Google Apps Script for Sika Glow Shop Benin
// Paste this code in Google Sheets > Extensions > Apps Script

const SHEET_NAME = 'Orders'; // Change if you want a different sheet/tab name
const ALLOWED_ORIGINS = ['*']; // Replace with your domain(s) if you want to restrict

// Create sheet header on first run
function ensureSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, 10).setValues([[
      'Timestamp',
      'Name',
      'Phone',
      'Items (JSON)',
      'Total',
      'Currency',
      'Source',
      'User Agent',
      'IP',
      'Note'
    ]]);
  }
  return sheet;
}

function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doPost(e) {
  try {
    const sheet = ensureSheet();

    const origin = (e?.parameter?.origin) || (e?.headers?.origin);
    const corsOrigin = ALLOWED_ORIGINS.includes('*') ? '*' :
      (ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);

    const body = e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(body);

    const timestamp = new Date();
    const name = String(data.name || '');
    const phone = String(data.phone || '');
    const items = JSON.stringify(data.items || []);
    const total = Number(data.total || 0);
    const currency = String(data.currency || 'FCFA');
    const source = String(data.source || '');
    const userAgent = e?.headers?.['user-agent'] || '';
    const ip = e?.headers?.['x-forwarded-for'] || '';

    sheet.appendRow([
      timestamp,
      name,
      phone,
      items,
      total,
      currency,
      source,
      userAgent,
      ip,
      ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

function doGet() {
  return ContentService.createTextOutput('OK');
}
