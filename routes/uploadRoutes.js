const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');

// Multer upload configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
        // Optional file type validation, currently handled by Cloudinary storage logic mostly
        // but adding an extra layer is safer
        const allowedTypes = /jpg|jpeg|png|pdf|epub/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname || mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Only Images and PDFs/EPUBs are allowed!'));
        }
    }
});

router.post('/', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.error('Multer Error:', err);
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            console.error('Upload Error:', err);
            return res.status(500).json({ error: err.message });
        }

        // Everything went fine.
        if (!req.file) {
            console.error('No file received');
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('File uploaded successfully:', req.file.path);
        
        // Return the Cloudinary URL directly
        // The frontend handles full URLs correctly (as seen in api.js getImageUrl)
        try {
            res.send(req.file.path);
        } catch (error) {
            console.error('Response Error:', error);
            res.status(500).json({ error: 'Failed to return file path' });
        }
    });
});

module.exports = router;
