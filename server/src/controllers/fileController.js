const googleDriveService = require('../services/googleDrive');

const getGoogleAccessToken = (req) => {
  const token = req.headers['x-google-access-token'];
  // Return null if the token is literally 'undefined' (as a string) or truly undefined/null
  if (token === 'undefined' || !token) {
    return null;
  }
  return token;
};

exports.listFiles = async (req, res) => {
  console.log("listFiles controller hit. Request headers:", req.headers);
  const { folderId, searchQuery } = req.query;
  const accessToken = getGoogleAccessToken(req);

  // If no Google token, it means the user is not logged in with Google.
  // Return an empty array immediately instead of causing an error.
  if (!accessToken) {
    console.log("No Google access token found. Returning empty array.");
    return res.json([]);
  }

  try {
    console.log("Google access token found. Proceeding to list files.");
    const files = await googleDriveService.listFiles(accessToken, folderId, searchQuery);
    res.json(files);
  } catch (error) {
    console.error('Error in listFiles controller:', error);
    // If the error is due to invalid credentials (like a GitHub token being used),
    // return an empty array as if there are no files. This is expected for non-Google logins.
    if (error.message && error.message.toLowerCase().includes('invalid credentials')) {
      return res.json([]);
    }
    // For all other errors, respond with a 500 status.
    res.status(500).send(error.message);
  }
};

exports.createFile = async (req, res) => {
  const accessToken = getGoogleAccessToken(req);
  const { fileName, fileContent } = req.body;

  if (!accessToken || !fileName || fileContent === undefined) {
    return res.status(400).send('Missing required parameters for file creation.');
  }

  try {
    const newFile = await googleDriveService.createFile(accessToken, fileName, fileContent);
    res.status(201).json(newFile);
  } catch (error) {
    console.error('Error in createFile controller:', error);
    res.status(500).send(error.message);
  }
};

exports.updateFile = async (req, res) => {
  const accessToken = getGoogleAccessToken(req);
  const { fileId } = req.params;
  const { fileContent } = req.body;

  if (!accessToken || !fileId || fileContent === undefined) {
    return res.status(400).send('Missing required parameters for file update.');
  }

  try {
    const updatedFile = await googleDriveService.updateFile(accessToken, fileId, fileContent);
    res.json(updatedFile);
  } catch (error) {
    console.error('Error in updateFile controller:', error);
    res.status(500).send(error.message);
  }
};

exports.readFile = async (req, res) => {
  const accessToken = getGoogleAccessToken(req);
  const { fileId } = req.params;

  if (!accessToken || !fileId) {
    return res.status(400).send('Missing required parameters for file read.');
  }

  try {
    const fileContent = await googleDriveService.readFile(accessToken, fileId);
    res.send(fileContent);
  } catch (error) {
    console.error('Error in readFile controller:', error);
    res.status(500).send(error.message);
  }
};

exports.deleteFile = async (req, res) => {
  const accessToken = getGoogleAccessToken(req);
  const { fileId } = req.params;

  if (!accessToken || !fileId) {
    return res.status(400).send('Missing required parameters for file deletion.');
  }

  try {
    const result = await googleDriveService.deleteFile(accessToken, fileId);
    res.json(result);
  } catch (error) {
    console.error('Error in deleteFile controller:', error);
    res.status(500).send(error.message);
  }
};
