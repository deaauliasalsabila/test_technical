const multer = require("multer");
const path = require("path");

const allowedExtensions = [".jpeg", ".jpg", ".png"];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const originalname = file.originalname;

    const sanitizedOriginalName = originalname
      .replace(/ /g, "_")
      .replace(/[()]/g, "_");
    cb(null, `${timestamp}-${sanitizedOriginalName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Format Image tidak sesuai"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1000 * 1000, // 3 MB
  },
  fileFilter: fileFilter,
});

module.exports = upload;
