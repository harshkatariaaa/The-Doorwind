const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`)
});
const fileFilter = (req, file, cb) => {
  /jpeg|jpg|png|webp/.test(file.mimetype) ? cb(null, true) : cb(new Error('Images only'));
};
module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });