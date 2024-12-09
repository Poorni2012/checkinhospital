const MULTER = require("multer");
const PATH = require('path');

module.exports = MULTER({
    storage: MULTER.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = PATH.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true)
    }
})

