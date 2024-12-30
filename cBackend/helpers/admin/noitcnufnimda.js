const catchAsync = require("../../utils/cnysa_hctac")
const { getCurrentIp, uploadImage } = require("../../common/nommoc")
const { REG_SERVICE, TOK_SERVICE, EMAIL_SERVICE, AUTH_SERVICE, ADMIN_SERVICE, IP_ADDRESS } = require('../../services/niam')
const PICK = require("../../utils/kcip")
const OMIT = require("../../utils/timo")
const SPEAKEASY = require('speakeasy')
const QRCODE = require('qrcode')
const HTTP_STATUS = require('http-status')
const { IoTRoboRunner } = require("aws-sdk")
const LOGGER = require("../../config/reggol")
const USER_AGENT = require('express-useragent');
const COMMON = require('../../common/nommoc')
const IPRES = require('./sserddaip')
const ApiError = require("../../utils/rorre")
const { ObjectId } = require("mongoose");
const ENC_DEC = require("../../config/tpyrced_tpyrcne")
exports.register = catchAsync(async (req, res) => {
    const user = await ADMIN_SERVICE.newAdmin(req.body);
    res.json({
        status: 200,
        data: user,
        message: "Registered Successfully"
    })
});
exports.adminLogin = catchAsync(async (req, res) => {
    try {
        let { email, password } = req.body;
        let ipp = await COMMON.getIP(req);
        let ipres = await IP_ADDRESS.checkip(ipp);

        if (ipres == null) {
            let ademail = await ADMIN_SERVICE.getAdminEmail(email);
            console.log("🚀 ~ exports.adminLogin=catchAsync ~ ademail:", ademail)

            if (ademail == null) {
                throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Incorrect Email');
            } else if (await ademail.isPasswordMatch1(password)) {
                let token = await TOK_SERVICE.generateLoginToken(ademail);
                let ip = await getCurrentIp(req);
                let agent = USER_AGENT.parse(req.headers['user-agent']);
                let adminDetails = {
                    browserName: agent.browser.name,
                    osName: agent.os.name,
                    ip: ip,
                    email: req.body.email,
                    loginType: 'admin'
                };
                // const newUserId = new ObjectId(ENC_DEC.encrypt(ademail._id)); 
                // console.log("🚀 ~ exports.adminLogin=catchAsync ~ newUserId:", newUserId)
                await REG_SERVICE.storeUserLoginDetails(adminDetails);

                let ipcount = await IP_ADDRESS.ipCountRestrict(ipp);

                if (ipcount !== 0 && ipcount == null) {
                    let remove = await IP_ADDRESS.removeIPRestrict(ipp);
                    if (remove) {
                        return res.json({
                            status: true,
                            token: token,
                            tfaStatus: ademail.tfaStatus,
                            subAdminStatus: false,
                            // id: new ObjectId(ENC_DEC.encrypt(ademail._id).toString()),
                            message: "Login Successfully",
                        });
                    } else {
                        return res.json({
                            status: false,
                            message: "Login Failed",
                        });
                    }
                } else {
                    await IP_ADDRESS.updateRestrictIp(ipp);
                    return res.json({
                        status: true,
                        token: token,
                        tfaStatus: ademail.tfaStatus,
                        subAdminStatus: false,
                        // id: new ObjectId(ENC_DEC.encrypt(ademail._id).toString()),
                        message: "Login Successfully",
                    });
                }
            } else {
                await IPRES.ipBlock(req, res);
            }
        } else {
            await IPRES.ipBlock(req, res);
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({
            status: false,
            message: "An error occurred during login. Please try again later.",
        });
    }
});


exports.adminForgetPassword = catchAsync(async (req, res) => {
    let resetPasswordToken = await TOK_SERVICE.generateResetPassword(req.body.email)
    await EMAIL_SERVICE.sendResetPasswordEmail(req.body.email, resetPasswordToken)
    res.json({
        status: true,
        token: resetPasswordToken,
        message: "Mail Sent for Forgot Password"
    })
})

exports.adminForgetPattern = catchAsync(async (req, res) => {
    let resetPatternToken = await TOK_SERVICE.generateResetPattern(req.body.email)
    await EMAIL_SERVICE.sendResetPatternEmail(req.body.email, resetPatternToken)
    res.json({
        status: true,
        token: resetPatternToken,
        message: "Mail Sent for Forgot Pattern"
    })
})

exports.adminResetPassword = catchAsync(async (req, res) => {
    await ADMIN_SERVICE.resetPassword(req.params.token, req.body.password, req.body.confirmPassword);
    res.json({
        status: true,
        message: "Successfully Reset the Password"
    })
})

exports.adminResetPattern = catchAsync(async (req, res) => {
    await ADMIN_SERVICE.resetPattern(req.params.token, req.body.pattern, req.body.confirmPattern);
    res.json({
        status: true,
        message: "Successfully Reset the Pattern"
    })

})

exports.adminChangePassword = catchAsync(async (req, res) => {
    let { password, newPassword, confirmPassword ,token} = req.body;
    await ADMIN_SERVICE.changePassword(token,password, newPassword, confirmPassword)
    res.json({
        status: true,
        message: "Password Updated Successfully"
    })
})

exports.adminChangePattern = catchAsync(async (req, res) => {
    let { pattern, newPattern, confirmPattern,token } = req.body;
    await ADMIN_SERVICE.changePattern(token,pattern, newPattern, confirmPattern)
    res.json({
        status: true,
        message: "Pattern Updated Successfully"
    })

})


exports.loginHistory = catchAsync(async (req, res) => {
    const options = {
        searchFields: ['loginType', 'ip'], // Fields to search in
        searchValue: req.body.search, // Search value
        sortBy: { createdAt: -1 },
        limit: req.body.limit,
        page: req.body.page,
    };
    let loginHistory = await ADMIN_SERVICE.getLoginHistory(options)

    res.json({ status: true, login: loginHistory, message: "Login History" })
})

exports.create2TAccount = catchAsync(async (req, res) => {

    var details = await ADMIN_SERVICE.getAdmin()
    if (details._id) {
        var secret = SPEAKEASY.generateSecret({
            length: 10,
            name: "admin:" + details.email
        });
        QRCODE.toDataURL(secret.otpauth_url, function (err, data_url) {
            var url = data_url
            if (details.tfaStatus == "InActive") {
                let qrValyes = ADMIN_SERVICE.createTFA(details._id, data_url, secret)
                res.json({
                    status: true, data: secret, Qrcode: url
                })
            }
            else if (details.tfaStatus == "Active") {
                res.json({
                    status: false,
                    message: "Already Enable the TFA"
                })
            }
        })
    }
    else {
        res.json({
            status: false,
            message: "Wrong Id"
        })
    }
})

exports.verify2TA = catchAsync(async (req, res) => {
    let tfaCode = req.body.tfaCode
    if (tfaCode == "" || tfaCode == null) {
        res.json({
            status: false, message: "TFA Code is Required"
        })
    }
    else {
        let details = await ADMIN_SERVICE.getAdmin()

        let adDetails = await ADMIN_SERVICE.getAdminById(details._id)
        let verified = SPEAKEASY.totp.verify({
            secret: adDetails.tfaKey,
            encoding: 'base32',
            token: tfaCode,
            window: 6
        })
        if (verified) {
            ADMIN_SERVICE.updateTFAvalues(details._id, { tfaStatus: "Active" })
            res.json({
                status: true, message: "TFA Enabled"
            })
        }
        else {
            res.json({
                status: false, message: "Invalid TFA Code...."
            })
        }
    }
})

exports.disable2FA = catchAsync(async (req, res) => {
    let tfaCode = req.body.tfaCode
    if (tfaCode == "") {
        res.json({
            status: false, message: "TFA Code is Required"
        })
    }
    else {
        let details = await ADMIN_SERVICE.getAdmin()
        let verified = SPEAKEASY.totp.verify({
            secret: details.tfaKey,
            encoding: 'base32',
            token: tfaCode,
            window: 6
        })
        var secret = SPEAKEASY.generateSecret({
            length: 10,
            name: "TRON_ROLL_ADMIN:" + details.email
        });
        if (verified) {
            QRCODE.toDataURL(secret.otpauth_url, function (err, data_url) {

                ADMIN_SERVICE.updateTFAvalues(details._id, { tfaStatus: "InActive", tfaURL: data_url, tfaKey: secret.base32 })

                res.json({
                    status: true, message: "TFA Disabled"
                })
            })
        }
        else {
            res.json({
                status: false, message: "TFA Code Wrong"
            })
        }
    }
})
