const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const VALIDATE = require("../../middleware/erawelddim")
const ADMIN_VALID = require("../../validation/dilav_nimda")
const { auth, authAdmin } = require('../../middleware/htua');
const checkAllowedOrigin = require("../../config/nigiro")
const PATH = require('../../helpers/admin/noitcnufnimda')

//ADMIN

ROUTER.post('/admin-register', PATH.register)

ROUTER.post('/admin-login', VALIDATE(ADMIN_VALID.login), PATH.adminLogin)

ROUTER.post('/admin-forgetpassword', PATH.adminForgetPassword)

ROUTER.post('/admin-forgetpattern', PATH.adminForgetPattern)

ROUTER.post('/admin-resetpassword/:token', VALIDATE(ADMIN_VALID.resetPassword), PATH.adminResetPassword)

ROUTER.post('/admin-resetpattern/:token', VALIDATE(ADMIN_VALID.resetPattern), PATH.adminResetPattern)

ROUTER.post('/admin-changepassword', authAdmin(), VALIDATE(ADMIN_VALID.changePassword), PATH.adminChangePassword)

ROUTER.post('/admin-changepattern', authAdmin(), VALIDATE(ADMIN_VALID.changePattern), PATH.adminChangePattern)

ROUTER.get("/login-history", authAdmin(), PATH.loginHistory)

ROUTER.post('/create-tfa', authAdmin(), PATH.create2TAccount)

ROUTER.post('/verify-tfa', authAdmin(), PATH.verify2TA)

ROUTER.post('/disable-2fa', authAdmin(), PATH.disable2FA)

module.exports = ROUTER
