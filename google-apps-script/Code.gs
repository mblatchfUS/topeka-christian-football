const FOLDER_ID = '1LUWgtON4iBmO7InVzofRbVWTz6V39YW7';
const APPLICATION_RECIPIENTS = 'blatch76@yahoo.com';
const APPLICATION_TEMPLATE_ID = '1YeZwCaHa4W37h8SyO-zSvm16CFx69G6Ebpzt0r9Rqn8';
const APPLICATION_OUTPUT_FOLDER_ID = '193dbmP0F0bUr_Xep2F1FtjNUCkxM8SG-';

// Friendly labels for the appended summary and email. Field names not listed
// here fall back to a humanized version of the key.
const FIELD_LABELS = {
  studentName: 'Student name',
  grade: 'Grade',
  dateOfBirth: 'Date of birth',
  schoolStatus: 'School status',
  schoolStatusOther: 'School status (other)',
  fatherName: "Father's name",
  fatherPhone: "Father's phone",
  fatherEmail: "Father's email",
  motherName: "Mother's name",
  motherPhone: "Mother's phone",
  motherEmail: "Mother's email",
  address: 'Address',
  statementOfFaithInitialOne: 'Statement of Faith initial (1)',
  statementOfFaithInitialTwo: 'Statement of Faith initial (2)',
  feeAgreementInitial: 'Fee agreement initial',
  volunteerInitial: 'Volunteer initial',
  parentSignatures: 'Parent signatures',
  sponsorName: 'Sponsor name',
};

function doGet() {
  const files = DriveApp.getFolderById(FOLDER_ID).getFiles();
  // Deduplicate by normalized name (extension ignored) so the same document in
  // multiple formats/versions collapses to a single row, keeping the newest.
  const byKey = {};
  while (files.hasNext()) {
    const file = files.next();
    const name = file.getName();
    if (!name.toUpperCase().includes('FINAL')) continue;
    // The Participant application Google Doc is the template used to populate
    // submissions from the online form, so it is never listed for download.
    // The .docx version is the family-facing copy and is kept below.
    if (file.getId() === APPLICATION_TEMPLATE_ID) continue;

    const updated = file.getLastUpdated();
    const key = normalizeName_(name);
    const existing = byKey[key];
    if (!existing || updated.getTime() > existing.updated.getTime()) {
      byKey[key] = {
        name: name,
        type: file.getMimeType().includes('pdf') ? 'PDF' : 'Document',
        date: Utilities.formatDate(updated, Session.getScriptTimeZone(), 'MMM dd, yyyy'),
        url: file.getUrl(),
        updated: updated,
      };
    }
  }
  const results = Object.keys(byKey)
    .map((key) => {
      const item = byKey[key];
      return { name: item.name, type: item.type, date: item.date, url: item.url };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  return ContentService.createTextOutput(JSON.stringify(results)).setMimeType(ContentService.MimeType.JSON);
}

// Strips a trailing file extension so "<name>" and "<name>.docx" collapse to
// the same key when deduplicating multiple versions of one document.
function normalizeName_(name) {
  return name.replace(/\.[^.\s]+$/, '').trim().toLowerCase();
}

function doPost(e) {
  try {
    const values = (e && e.parameter) || {};
    const studentName = values.studentName || 'Unnamed student';
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HHmm');
    const outputName = `TCF Participation Application - ${studentName} - ${timestamp}`;
    const outputFolder = DriveApp.getFolderById(APPLICATION_OUTPUT_FOLDER_ID);

    const documentFile = copyTemplateAsDoc_(outputName, outputFolder);
    const document = DocumentApp.openById(documentFile.getId());
    const documentBody = document.getBody();

    Object.entries(values).forEach(([field, value]) => {
      documentBody.replaceText(`\\{\\{${field}\\}\\}`, displayValue_(value));
    });

    const summary = Object.entries(values).filter(([, value]) => String(value).trim() !== '');
    documentBody.appendParagraph('');
    documentBody.appendParagraph('Submitted application details').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    summary.forEach(([field, value]) => {
      documentBody.appendParagraph(`${labelFor_(field)}: ${displayValue_(value)}`);
    });
    document.saveAndClose();

    const bodyText = summary
      .map(([field, value]) => `${labelFor_(field)}: ${displayValue_(value)}`)
      .join('\n');
    MailApp.sendEmail(APPLICATION_RECIPIENTS, 'New TCF Participation Application', `${bodyText}\n\nCreated document: ${documentFile.getUrl()}`);

    return json_({ ok: true, documentUrl: documentFile.getUrl() });
  } catch (err) {
    // Surface the real failure instead of a generic 500 so the client and the
    // association both learn what actually broke.
    const detail = String((err && err.stack) || err);
    try {
      MailApp.sendEmail(APPLICATION_RECIPIENTS, 'TCF application submission FAILED', detail);
    } catch (_) {}
    return json_({ ok: false, error: String((err && err.message) || err) });
  }
}

// Copies the template into the output folder as a native Google Doc. makeCopy
// preserves the source MIME type, so a .docx template stays a .docx and
// DocumentApp.openById() throws. When the template is not already a Google Doc
// we convert it during copy via the advanced Drive service.
function copyTemplateAsDoc_(outputName, outputFolder) {
  const template = DriveApp.getFileById(APPLICATION_TEMPLATE_ID);
  if (template.getMimeType() === MimeType.GOOGLE_DOCS) {
    return template.makeCopy(outputName, outputFolder);
  }
  if (typeof Drive === 'undefined' || !Drive.Files) {
    throw new Error(
      'Template ' + APPLICATION_TEMPLATE_ID + ' is a ' + template.getMimeType() +
      ', not a Google Doc. Either convert it to a Google Doc (File > Save as Google Docs) ' +
      'or enable the advanced Drive service (Services > Drive API) so it can be converted automatically.'
    );
  }
  const copy = Drive.Files.copy(
    { name: outputName, parents: [outputFolder.getId()], mimeType: MimeType.GOOGLE_DOCS },
    template.getId(),
    { supportsAllDrives: true }
  );
  return DriveApp.getFileById(copy.id);
}

function displayValue_(value) {
  return value === 'on' ? 'Yes' : String(value);
}

function labelFor_(field) {
  if (FIELD_LABELS[field]) return FIELD_LABELS[field];
  // Humanize an unknown camelCase field name, e.g. "someField" -> "Some field".
  const spaced = field.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
