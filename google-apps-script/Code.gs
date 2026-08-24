const FOLDER_ID = '1iHMpQr3fs_DjzZuyNgRoDZlH5zKqGAG6';
const APPLICATION_RECIPIENTS = 'blatch76@yahoo.com';
const APPLICATION_TEMPLATE_ID = '1dvsDEc34UKI9HV9yeYXNW5B9dIsxUo00';
const APPLICATION_OUTPUT_FOLDER_ID = '193dbmP0F0bUr_Xep2F1FtjNUCkxM8SG-';

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
  const values = e.parameter;
  const studentName = values.studentName || 'Unnamed student';
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HHmm');
  const outputName = `TCF Participation Application - ${studentName} - ${timestamp}`;
  const outputFolder = DriveApp.getFolderById(APPLICATION_OUTPUT_FOLDER_ID);
  const documentFile = DriveApp.getFileById(APPLICATION_TEMPLATE_ID).makeCopy(outputName, outputFolder);
  const document = DocumentApp.openById(documentFile.getId());
  const documentBody = document.getBody();
  Object.entries(values).forEach(([label, value]) => {
    const displayValue = value === 'on' ? 'Yes' : String(value);
    documentBody.replaceText(`\\{\\{${label}\\}\\}`, displayValue);
  });
  documentBody.appendParagraph('');
  documentBody.appendParagraph('Submitted application details').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  Object.entries(values).forEach(([label, value]) => {
    documentBody.appendParagraph(`${label}: ${value === 'on' ? 'Yes' : value}`);
  });
  document.saveAndClose();
  const bodyText = Object.entries(values)
    .map(([label, value]) => `${label}: ${value === 'on' ? 'Yes' : value}`)
    .join('\n');
  MailApp.sendEmail(APPLICATION_RECIPIENTS, 'New TCF Participation Application', `${bodyText}\n\nCreated document: ${documentFile.getUrl()}`);
  return ContentService.createTextOutput(JSON.stringify({ ok: true, documentUrl: documentFile.getUrl() })).setMimeType(ContentService.MimeType.JSON);
}
