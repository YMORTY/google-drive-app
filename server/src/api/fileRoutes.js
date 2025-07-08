
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.get('/', fileController.listFiles);
router.post('/', fileController.createFile);
router.put('/:fileId', fileController.updateFile);
router.get('/:fileId', fileController.readFile);
router.delete('/:fileId', fileController.deleteFile);

module.exports = router;
