const { google } = require('googleapis');

// This function will be used to get an authenticated Google Drive client
// It expects an accessToken to be passed, which will come from the frontend
const getDriveClient = (accessToken) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.drive({ version: 'v3', auth: oauth2Client });
};

// Function to list files from Google Drive
const listFiles = async (accessToken, folderId = 'root', searchQuery = '') => {
  const drive = getDriveClient(accessToken);
  try {
    let query = `'${folderId}' in parents`;

    if (searchQuery) {
      const sanitizedQuery = searchQuery.replace(/'/g, "\\'");
      query = `name contains '${sanitizedQuery}'`; // Temporarily remove folderId filter for search
    }

    console.log(`Attempting drive.files.list with query: "${query}"`);
    const res = await drive.files.list({
      q: query,
      pageSize: 100,
      fields: 'nextPageToken, files(id, name, mimeType)',
    });

    console.log(`Executing query: "${query}"`);
    console.log(`Files and folders received (folder: ${folderId}, search: '${searchQuery}'):`);
    res.data.files.forEach(item => console.log(`  Name: ${item.name}, MimeType: ${item.mimeType}`));
    return res.data.files;
  } catch (error) {
    console.error('Error listing files:', error.message);
    throw new Error('Could not list files from Google Drive.');
  }
};

const createFile = async (accessToken, fileName, fileContent) => {
  const drive = getDriveClient(accessToken);
  try {
    const fileMetadata = {
      name: fileName,
      mimeType: 'text/plain',
    };
    const media = {
      mimeType: 'text/plain',
      body: fileContent,
    };
    const res = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, name',
    });
    return res.data;
  } catch (error) {
    console.error('Error creating file:', error.message);
    throw new Error('Could not create file in Google Drive.');
  }
};

const updateFile = async (accessToken, fileId, fileContent) => {
  const drive = getDriveClient(accessToken);
  try {
    const media = {
      mimeType: 'text/plain',
      body: fileContent,
    };
    const res = await drive.files.update({
      fileId: fileId,
      media: media,
      fields: 'id, name',
    });
    return res.data;
  } catch (error) {
    console.error('Error updating file:', error.message);
    throw new Error('Could not update file in Google Drive.');
  }
};

const readFile = async (accessToken, fileId) => {
  const drive = getDriveClient(accessToken);
  try {
    const res = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    });
    return res.data;
  } catch (error) {
    console.error('Error reading file:', error.message);
    throw new Error('Could not read file from Google Drive.');
  }
};

const deleteFile = async (accessToken, fileId) => {
  const drive = getDriveClient(accessToken);
  try {
    await drive.files.delete({ fileId: fileId });
    return { message: 'File deleted successfully.' };
  } catch (error) {
    console.error('Error deleting file:', error.message);
    throw new Error('Could not delete file from Google Drive.');
  }
};

module.exports = {
  getDriveClient,
  listFiles,
  createFile,
  updateFile,
  readFile,
  deleteFile,
};