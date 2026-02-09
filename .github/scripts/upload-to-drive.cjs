const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function uploadBackup() {
  const filename = process.argv[2];
  if (!filename) {
    console.error('❌ No filename provided');
    process.exit(1);
  }

  const filepath = path.resolve(filename);
  if (!fs.existsSync(filepath)) {
    console.error(`❌ File not found: ${filepath}`);
    process.exit(1);
  }

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const fileSize = fs.statSync(filepath).size;
  console.log(`📦 Uploading ${filename} (${(fileSize / 1024 / 1024).toFixed(2)} MB)...`);

  const response = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [folderId],
    },
    media: {
      mimeType: 'application/gzip',
      body: fs.createReadStream(filepath),
    },
    fields: 'id, name, size',
  });

  console.log(`✅ Uploaded successfully!`);
  console.log(`   File: ${response.data.name}`);
  console.log(`   ID: ${response.data.id}`);
}

uploadBackup().catch((error) => {
  console.error('❌ Upload failed:', error.message);
  process.exit(1);
});
