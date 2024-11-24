const multer = require("multer");
const path = require("path");

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directory where files will be stored
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename (with date and original file extension)
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname)
    );
  },
});

// Set file filter to allow only images
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, and .png formats are allowed!"), false);
  }
};

// Initialize `multer` with storage and fileFilter
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
