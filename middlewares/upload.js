// middlewares/upload.js
import multer from 'multer';
import path from 'path';

// Configure where and how the files are saved
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure you create an 'uploads' folder in your project root!
  },
  filename: (req, file, cb) => {
    // Generates a unique filename: e.g., image-1678901234.jpg
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Create the upload middleware (limit file size to 5MB)
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, 
  fileFilter: (req, file, cb) => {
    // Only accept images
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  }
});