const FOLDER_ID = '1iHMpQr3fs_DjzZuyNgRoDZlH5zKqGAG6';
const APPLICATION_RECIPIENTS = 'blatch76@yahoo.com,jnnfrlyn@yahoo.com,sra3193@gmail.com';

function doGet() {
  const files = DriveApp.getFolderById(FOLDER_ID).getFiles();
  const results = [];
  while (files.hasNext()) {
    const file = files.next();
    if (!file.getName().toUpperCase().includes('FINAL')) continue;
    results.push({
      name: file.getName(),
      type: file.getMimeType().includes('pdf') ? 'PDF' : 'Document',
      date: Utilities.formatDate(file.getLastUpdated(), Session.getScriptTimeZone(), 'MMM dd, yyyy'),
      url: file.getUrl(),
    });
  }
  results.sort((a, b) => a.name.localeCompare(b.name));
  return ContentService.createTextOutput(JSON.stringify(results)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const values = JSON.parse(e.postData.contents);
  const body = Object.entries(values)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
  MailApp.sendEmail(APPLICATION_RECIPIENTS, 'New TCF Non-Member Participation Application', body);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
