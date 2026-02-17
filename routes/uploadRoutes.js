const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        // Generate random filename with no spaces
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `file-${uniqueSuffix}${ext}`);
    },
});



// Custom file filter with logging
const fileFilter = (req, file, cb) => {
    console.log('Incoming file:', file.originalname, file.mimetype);
    const filetypes = /jpg|jpeg|png|pdf|epub/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        console.error('File type error:', file.mimetype, path.extname(file.originalname));
        cb(new Error('Error: Only Images and PDFs/EPUBs are allowed!'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: fileFilter
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
        try {
            res.send(req.file.filename);
        } catch (error) {
            console.error('Response Error:', error);
            res.status(500).json({ error: 'Failed to process file path' });
        }
    });
});

module.exports = router;
