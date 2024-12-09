const CRYPTR = require('cryptr')
const CRYPTER = new CRYPTR('myTotallySecretKey');
const HTTP_STATUS = require("http-status")
const catchAsync = require("../utils/cnysa_hctac")
const { REG_SERVICE, TOK_SERVICE, EMAIL_SERVICE, AUTH_SERVICE,ADMIN_SERVICE } = require('../services/niam')
const { getCurrentIp, uploadImage } = require("../common/nommoc")
const LOGGER = require('../config/reggol');

exports.dispaly = (req, res) => {
    res.json('Router is working')
   
}

// exports.userRegister = catchAsync(async (req, res) => {
//     let userDetails = await REG_SERVICE.createUser(req.body)
//     let tokens = await TOK_SERVICE.generateVerifyEmailToken(userDetails);
//     await EMAIL_SERVICE.sendVerificationEmail(req.body.userEmail, tokens)
//     res.status(HTTP_STATUS.OK).send({
//         status: HTTP_STATUS.OK,
//         userDetails, tokens, message: "Registered Successfully.. Verify your mail",
//     });

// })

exports.verifyRegister = catchAsync(async (req, res) => {
    let verify = await AUTH_SERVICE.verifyToken(req.params.token)

    res.send({
        status: 200,
        message: 'Email Verified'
    })
    await REG_SERVICE.createWalletAddress(verify)

})

exports.getUserDetails = catchAsync(async (req, res) => {
    let uDetails = await REG_SERVICE.getUserDetails()
    res.json({
        status: 200,
        data: uDetails
    })
})

exports.userRefferralCode = catchAsync(async (req, res) => {
    let uDetails = await REG_SERVICE.getUserDetails()
    for (let ud = 0; ud < uDetails.length; ud++) {
        if (req.body.userReferralCode == uDetails[ud].userCode) {
            let uId = uDetails[ud]._id
            let uEmail = uDetails[ud].userEmail

            let rCount = await REG_SERVICE.updateReferCount(uEmail)
            let userDetails = await REG_SERVICE.createUser(req.body)
            await REG_SERVICE.updateReferId(req.body.userEmail, uId)
            let tokens = await TOK_SERVICE.generateVerifyEmailToken(userDetails);
            await EMAIL_SERVICE.sendVerificationEmail(req.body.userEmail, tokens)
            res.status(HTTP_STATUS.OK).send({
                status: HTTP_STATUS.OK,
                userDetails, tokens, message: "Registered Successfully.. Verify your mail",
            });
        }
    }
})

exports.userLogin = catchAsync(async (req, res) => {
    let userDetails = await REG_SERVICE.loginUser(req.body)
    let tokens = await TOK_SERVICE.generateSecurityVerifyToken(userDetails);

    if (userDetails.securityVerify == "Active") {
        await EMAIL_SERVICE.sendSecurityVerificationEmail(userDetails.userEmail, tokens)
        let checkLogin = await REG_SERVICE.checkUserPassword(req.body.userEmail, req.body.userPassword)
        let ip = await getCurrentIp()
        let systemDetails = {
            userEmail: req.body.userEmail,
            ip: ip,
            loginType: 'user',
        }
        await REG_SERVICE.storeUserLoginDetails(systemDetails)
        res.json({
            status: 200,
            data: checkLogin,
            message: "Login Success..check Your Mail",
        })
    }
    else {
        let checkLogin = await REG_SERVICE.checkUserPassword(req.body.userEmail, req.body.userPassword)
        let ip = await getCurrentIp()
        let systemDetails = {
            userEmail: req.body.userEmail,
            ip: ip,
            loginType: 'user',
        }
        await REG_SERVICE.storeUserLoginDetails(systemDetails)
        res.json({
            status: 200,
            data: checkLogin,
            message: "Login Success",
        })
    }
})

exports.securityVerify = catchAsync(async (req, res) => {
    let sOtp = req.body.sOtp
    await AUTH_SERVICE.securityVerifyToken(req.params.token)
    res.send({
        status: 200,
        data: sOtp,
        message: 'Security Verification Active'
    })
})

exports.disableSecurityVerify = catchAsync(async (req, res) => {
    let user = await REG_SERVICE.getUserDetails();
    for (let s = 0; s < user.length; s++) {
        if (user[s]._id == req.params.id) {
            var userId = user[s]._id == req.params.id
        }
    }
    if (userId) {
        await REG_SERVICE.updateSecurityVerification(req.params.id)
        res.send({
            status: 200,
            message: 'Disable Security Verification InActive'
        })
    }
})

exports.resendEmailSecurityVerify = catchAsync(async (req, res) => {
    await EMAIL_SERVICE.resendEmailSecurityVerify(req.body.userEmail, req.body.token)
    res.send({
        status: 200,
        message: 'Resend Security Verification Email'
    })
})

exports.getCurrentUserDetails = catchAsync(async (req, res) => {
    let userDetails = await REG_SERVICE.getUserByEmail(req.body.userEmail)
    res.send({
        status: 200,
        message: userDetails
    })
})

exports.kycVerification = catchAsync(async (req, res) => {
    var imageName;
    var images = [];
    for (let i = 0; i <= 2; i++) {
        if (i == 0) {
            imageName = req.files.identifyFrontDocument[0]
        }
        else if (i == 1) {
            imageName = req.files.identifyBackDocument[0]
        }
        else {
            imageName = req.files.handHeldIdentifyDocument[0]
        }
        var path = imageName.path

        var resp = await uploadImage(path)
        images.push(resp)
    }

    if (resp.success) {
        let userDetails = await REG_SERVICE.getUserByEmail(req.body.userEmail)
        if (userDetails.userEmail) {
            let updateDetails = await REG_SERVICE.updateKYCVerification(req.body.userEmail, {
                userKYCCountry: req.body.userKYCCountry,
                userFirstName: req.body.userFirstName,
                userLastName: req.body.userLastName,
                identifyDocumentType: req.body.identifyDocumentType,
                documentTypeIdNumber: req.body.documentTypeIdNumber,
                identifyFrontDocument: images[0].Location,
                identifyBackDocument: images[1].Location,
                handHeldIdentifyDocument: images[2].Location,
                KYCStatus: "Pending",
                KYCFrontDocument: "Pending",
                KYCBackDocument: "Pending",
                KYCHandDocument: "Pending"
            })
            await REG_SERVICE.verifiedKYC(userDetails)

            res.json({
                status: 200,
                message: "Inserted Successfully",
            });
        }
        else { }
    }
    else { }

})

exports.businessKycVerification = catchAsync(async (req, res) => {
    var imageName;
    var images = [];
    for (let i = 0; i <= 4; i++) {
        if (i == 0) {
            imageName = req.files.certOfIncorporation[0]
        }
        else if (i == 1) {
            imageName = req.files.bankAccount[0]
        }
        else if (i == 2) {
            imageName = req.files.sourceOfFunds[0]
        }
        else if (i == 3) {
            imageName = req.files.sourceOfWealth[0]
        }
        else {
            imageName = req.files.proofOfAddress[0]
        }
        var path = imageName.path

        var resp = await uploadImage(path)
        images.push(resp)
    }

    if (resp.success) {
        let userDetails = await REG_SERVICE.getUserByEmail(req.body.userEmail)
        if (userDetails.userEmail) {
            let updateDetails = await REG_SERVICE.updateKYCVerification(req.body.userEmail, {
                userCompanyName: req.body.userCompanyName,
                userCompanyReferenceNo: req.body.userCompanyReferenceNo,
                natureOfBusiness: req.body.natureOfBusiness,
                userCompanyAddress1: req.body.userCompanyAddress1,
                userCompanyAddress2: req.body.userCompanyAddress2,
                userKYCCountry: req.body.userKYCCountry,
                userCompanyCity: req.body.userCompanyCity,
                userCompanyZipcode: req.body.userCompanyZipcode,
                certOfIncorporation: images[0].Location,
                bankAccount: images[1].Location,
                sourceOfFunds: images[2].Location,
                sourceOfWealth: images[3].Location,
                proofOfAddress: images[4].Location,
                companyKYCStatus: "Pending",
                companyCertOfIncorporation: "Pending",
                companyBankAccount: "Pending",
                companySourceOfFunds: "Pending",
                companySourceOfWealth: "Pending",
                companyProofOfAddress: "Pending"
            })
            await REG_SERVICE.verifiedKYC(userDetails)

            res.json({
                status: 200,
                message: "Inserted Successfully",
            });
        }
        else { }
    }
    else { }

})
exports.userForgetPassword = catchAsync(async (req, res) => {

    let resetPasswordToken = await TOK_SERVICE.generateUserResetPassword(req.body.userEmail)
    await EMAIL_SERVICE.sendUserResetPasswordEmail(req.body.userEmail, resetPasswordToken)
    res.json({
        status: 200, token: "resetPasswordToken", message: "Successfully send the Reset Password Mail"
    })
})

exports.userResetPassword = catchAsync(async (req, res) => {
    await REG_SERVICE.userResetPassword(req.params.token, req.body.userPassword)
    res.json({
        status: 200, message: "Successfully Reset the Password"
    })
})

exports.userLogout = catchAsync(async (req, res) => {
    let userDetails = await REG_SERVICE.getUserDetails()
    for (let u = 0; u < userDetails.length; u++) {
        if (userDetails[u]._id == req.params.id) {
            var userId = userDetails[u]._id == req.params.id
        }
    }
    if (userId) {
        await REG_SERVICE.updateUserById(req.params.id, { userStatus: "InActive" })
        res.json({
            status: 200, message: "Logout Success"
        })
    }
})

exports.userChangePassword = catchAsync(async (req, res) => {
    let { userPassword, userNewPassword, userConfirmPassword } = req.body
    await REG_SERVICE.userChangePassword(userPassword, userNewPassword, userConfirmPassword)
    res.json({
        status: 200, message: "Password Updated Successfully..."
    })
})

exports.updateProfile = catchAsync(async (req, res) => {
    var imageName;
    var images = [];
    for (let i = 0; i < 1; i++) {
        if (i == 0) {
            imageName = req.files.profileImage[0]
        }
        var path = imageName.path

        var resp = await uploadImage(path)
        images.push(resp)
    }
    if (resp.success) {
        let userDetails = await REG_SERVICE.getUserByEmail(req.body.userEmail)
        if (userDetails.userEmail) {
            let updateDetails = await REG_SERVICE.updateKYCVerification(req.body.userEmail, {
                profileImage: images[0].Location
            })
            res.json({
                status: 200,
                message: "Updated Profile Image",
            });
        }
        else { }
    }
    else { }
})


exports.checkIn = catchAsync(async (req, res) => {
    let details = await REG_SERVICE.checkin(req.body)
    res.json({ status: true, message: "Checkin" })
})

exports.getCheckIn = catchAsync(async(req,res)=>{
    let data = await REG_SERVICE.getCheckIn(req.body)
    res.json({status:true,data:data})
})

exports.checkInHistory = catchAsync(async(req,res)=>{
    const options = {
        page: req.body.page,
        limit: req.body.limit,
        searchFields: ['userId'],
        searchValue: req.body.search, 
        sortBy: { createdAt: -1 },
    }
    const allIpDetails = await REG_SERVICE.checkInHistory(options)
    res.json({
        status: true, data: allIpDetails, message: "Check In Details"
    })

})

exports.userRegister = catchAsync(async (req, res) => {
    const user = await ADMIN_SERVICE.newAdmin(req.body);
    res.json({
        status: 200,
        data: user,
        message: "Registered Successfully"
    })
});

exports.userCount = catchAsync(async (req, res) => {
    const user = await ADMIN_SERVICE.userCount();
    res.json({
        status: 200,
        data: user,
        message: "Registered Successfully"
    })
});

exports.userList=catchAsync(async(req,res)=>{
    const list = await ADMIN_SERVICE.getAdmin()

    res.json({status:true,data:list})
})


exports.changePassword = catchAsync(async (req, res) => {
    let { password, newPassword, confirmPassword ,token} = req.body;
    await ADMIN_SERVICE.changePassword(token,password, newPassword, confirmPassword)
    res.json({
        status: true,
        message: "Password Updated Successfully"
    })
})

exports.changePattern = catchAsync(async (req, res) => {
    let { pattern, newPattern, confirmPattern,token } = req.body;
    await ADMIN_SERVICE.changePattern(token,pattern, newPattern, confirmPattern)
    res.json({
        status: true,
        message: "Pattern Updated Successfully"
    })

})