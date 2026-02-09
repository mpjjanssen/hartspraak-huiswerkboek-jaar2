const { google } = require('googleapis');

const MAX_BACKUPS = 4;

async function cleanupOldBackups() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const drive = google.drive({ version: 'v3', auth });

  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id, name, createdTime)',
    orderBy: 'createdTime desc',
  });

  const files = response.data.files || [];
  console.log(`📋 Found ${files.length} backup(s) in Google Drive`);

  if (files.length <= MAX_BACKUPS) {
    console.log(`✅ No cleanup needed (keeping ${MAX_BACKUPS})`);
    return;
  }

  const toDelete = files.slice(MAX_BACKUPS);
  console.log(`🗑️  Deleting ${toDelete.length} old backup(s)...`);

  for (const file of toDelete) {
    await drive.files.delete({ fileId: file.id });
    console.log(`   Deleted: ${file.name}`);
  }

  console.log(`✅ Cleanup complete.`);
}

cleanupOldBackups().catch((error) => {
  console.error('❌ Cleanup failed:', error.message);
  process.exit(1);
});
