const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const VALIDATE = require("../middleware/erawelddim")
const USER_VALID = require("../validation/dilav_resu")
const PATH = require('../helpers/noitcnufresu')
const PATHH = require('path')
const MULTER = require('multer')

let storage = MULTER.diskStorage({

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + PATHH.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const UPLOAD = MULTER({ storage: storage })

// ROUTER.get('/disp', PATH.dispaly)

ROUTER.post('/register',  PATH.userRegister)

ROUTER.post('/verify-email/:token', PATH.verifyRegister)

ROUTER.get('/get_user_details', PATH.getUserDetails)

ROUTER.post('/referal_register', VALIDATE(USER_VALID.register), PATH.userRefferralCode)

ROUTER.post('/login', VALIDATE(USER_VALID.login), PATH.userLogin)

ROUTER.post('/security-verify/:token', PATH.securityVerify)

ROUTER.post('/disable-security-verify/:id', PATH.disableSecurityVerify)

ROUTER.post('/resend-email-security-verify', PATH.resendEmailSecurityVerify)

ROUTER.post('/get-current-user-details', PATH.getCurrentUserDetails)

ROUTER.post('/kyc-verification', UPLOAD.fields([{ name: 'identifyFrontDocument', maxCount: 1 },
{ name: 'identifyBackDocument', maxCount: 1 }, {
    name: 'handHeldIdentifyDocument', maxCount: 1
}]), PATH.kycVerification)

ROUTER.post('/user-forget-password', PATH.userForgetPassword)

ROUTER.post('/user-reset-password/:token', PATH.userResetPassword)

ROUTER.post('/logout/:id', PATH.userLogout)

ROUTER.post('/user-change-password', PATH.userChangePassword)

ROUTER.post('/update-profile', UPLOAD.fields([{ name: 'profileImage', maxCount: 1 }]), PATH.updateProfile)

ROUTER.post('/checkIn',PATH.checkIn)

ROUTER.post('/getCheckIn',PATH.getCheckIn)

ROUTER.post('/checkInHistory',PATH.checkInHistory)

ROUTER.post('/userCount',PATH.userCount)

ROUTER.post('/userList',PATH.userList)

ROUTER.post('/changepassword',PATH.changePassword)

ROUTER.post('/changepattern',PATH.changePattern)


module.exports = ROUTER
