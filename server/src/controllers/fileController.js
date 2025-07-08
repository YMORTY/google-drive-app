
const googleDriveService = require('../services/googleDrive');

exports.listFiles = async (req, res) => {
  const accessToken = req.query.accessToken;

  if (!accessToken) {
    return res.status(401).send('Access token is missing.');
  }

  try {
    const files = await googleDriveService.listFiles(accessToken);
    res.json(files);
  } catch (error) {
    console.error('Error in listFiles controller:', error);
    res.status(500).send(error.message);
  }
};

exports.createFile = async (req, res) => {
  const accessToken = req.query.accessToken;
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
  const accessToken = req.query.accessToken;
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
  const accessToken = req.query.accessToken;
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
  const accessToken = req.query.accessToken;
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
