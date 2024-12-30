const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const PATH = require('../../helpers/admin/gnittesetis')
const PATHH = require('path')
const MULTER = require('multer')
const { auth, authAdmin } = require('../../middleware/htua');

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false); // if validation failed then generate error
    }
};

const storage = MULTER.diskStorage({
    filename: (req, file, callback) => {

        callback(null, Date.now() + '_' + file.originalname);

    }
});

const UPLOAD = MULTER({ storage: storage, fileFilter: fileFilter })

ROUTER.get('/get-site-setting', PATH.getSiteSetting)

ROUTER.post("/create-cms", authAdmin(), PATH.createCms)

ROUTER.post("/get-all-cms", PATH.getAllCms)

ROUTER.get("/get-cms-id/:id", authAdmin(), PATH.getCmsId)

ROUTER.get("/gett-cmss-id", PATH.getCmsIdFront)

ROUTER.post("/update-cms/:id", authAdmin(), PATH.updateCms)

ROUTER.post("/image-upload", authAdmin(), UPLOAD.fields([{ name: 'logo', maxCount: 1 }]), PATH.imageUpload)

ROUTER.post('/update-site-setting', authAdmin(), PATH.updateSiteSetting)

ROUTER.post('/add-faq', PATH.addFAQ)

ROUTER.get('/get-all-faq', PATH.getAllFAQ)

ROUTER.get('/get-faq-id/:id', PATH.getFAQId)

ROUTER.post('/update-faq/:id', PATH.updateFAQ)

ROUTER.post('/update-profile', PATH.updateProfile)

ROUTER.get('/get-profile', authAdmin(), PATH.getProfile)

ROUTER.post('/count-user', authAdmin(), PATH.userCount)



module.exports = ROUTER