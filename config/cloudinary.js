const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine the resource type based on the file mimetype
    let resource_type = 'auto';
    if (file.mimetype === 'application/epub+zip') {
      resource_type = 'raw'; // Handle EPUBs as raw files
    } else if (file.mimetype === 'application/pdf') {
      resource_type = 'auto'; // PDFs can be auto or raw
    }
    
    return {
      folder: 'bookora_uploads',
      resource_type: resource_type,
      // allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'epub'], // Optional validation
      public_id: file.originalname.split('.')[0].replace(/\s+/g, '-') + '-' + Date.now(), // Sanitized filename
    };
  },
});

module.exports = { cloudinary, storage };
