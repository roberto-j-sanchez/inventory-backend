const express = require('express');
const router = express.Router();

const fileUploader = require('../config/upload-setup/cloudinary');

router.post('/upload-file', fileUploader.single('fileSubmission'), (req, res, next) => {
  // multer puts all of the info about the uploaded file in "req.file"
  console.log('New FILE UPLOAD', req.file);
  
    if (!req.file) {
      next(new Error('No File Uploaded!'));
      return;
    }
    const { originalName, secure_url, format, width, height } = req.file;

    res.json({
      fileName: originalName,
      fileUrl: secure_url,
      format,
      width,
      height
    });
  }
);

module.exports = router;
