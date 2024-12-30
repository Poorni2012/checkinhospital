const ApiError = require("../utils/rorre");
const HTTP_STATUS = require('http-status')
const { REGISTER, ADMIN, TOKEN_DET, SYSTEM_DET } = require("../model/niam");
const TOK_SERVICE = require("../services/secivres_nekot");
const TOKEN = require("../config/snekot");
const ENC_DEC = require("../config/tpyrced_tpyrcne")

exports.newAdmin = async (details) => {
    details.email = ENC_DEC.encrypt(details.email)
    let data = ENC_DEC.decrypt(details.email)
    console.log("🚀 ~ exports.newAdmin= ~ data:", data)
    let user = await ADMIN.findOne({ email: details.email });
    if (user == null) {
        return ADMIN.create(details)
    }
    else if ((await ADMIN.isEmailTaken(details.email, user._id))) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Email already exist');
    }
}

exports.getAdmin = async () => {
    const admins = await ADMIN.find({});
    const decryptedAdmins = admins.map(admin => {
        const decryptedEmail = ENC_DEC.decrypt(admin.email);
        return {
            ...admin._doc,
            email: decryptedEmail
        };
    });

    return decryptedAdmins;
}
exports.userCount = async () => {
    return ADMIN.find().count()
}

exports.getAdminEmail = async (email) => {
    console.log("wwwww", ENC_DEC.encrypt(email))
    return ADMIN.findOne({ email: ENC_DEC.encrypt(email) })
}

exports.getAdminById = async (id) => {
    return ADMIN.findById({ _id: id })
}

exports.login = async (email, password, pattern) => {
    let ademail = await this.getAdminEmail(email)
    if (!ademail || !(await ademail.isPatternMatch(pattern)) || !(await ademail.isPasswordMatch1(password))) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Incorrect Credentials');
    }
    return email
}

exports.updateAdminById = async (adminId, updateBody) => {

    let admin = await this.getAdminById(adminId)
    if (!admin) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Admin Not Found')
    }
    if (updateBody.email && (await ADMIN.isEmailTaken(updateBody.email, adminId))) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Email already here');
    }
    Object.assign(admin, updateBody)
    await admin.save();
    return admin;
}

exports.getPendingDetails = async (id, updateBody) => {
    return REGISTER.findOneAndUpdate({ _id: id }, updateBody)
}
exports.adminApproveKYC = async (kycdetails) => {
    if (kycdetails.KYCFrontDocument == "Pending" && kycdetails.KYCBackDocument == "Pending" && kycdetails.KYCHandDocument == "Pending") {
        await this.getPendingDetails(kycdetails._id, {
            KYCFrontDocument: "Pending", KYCBackDocument: "Pending", KYCHandDocument: "Pending"
        })
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Reject the 3 images...');
    }
    else if (kycdetails.KYCFrontDocument == "Verified" && kycdetails.KYCBackDocument == "Pending" && kycdetails.KYCHandDocument == "Pending") {
        await this.getPendingDetails(kycdetails._id, {
            KYCFrontDocument: "Verified", KYCBackDocument: "Pending", KYCHandDocument: "Pending"
        })
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Verified the front document images...');
    }
    else if (kycdetails.KYCFrontDocument == "Pending" && kycdetails.KYCBackDocument == "Verified" && kycdetails.KYCHandDocument == "Pending") {
        await this.getPendingDetails(kycdetails._id, {
            KYCFrontDocument: "Pending", KYCBackDocument: "Verified", KYCHandDocument: "Pending"
        })
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Verified the back document images...');
    }
    else if (kycdetails.KYCFrontDocument == "Pending" && kycdetails.KYCBackDocument == "Pending" && kycdetails.KYCHandDocument == "Verified") {
        await this.getPendingDetails(kycdetails._id, {
            KYCFrontDocument: "Pending", KYCBackDocument: "Pending", KYCHandDocument: "Verified"
        })
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Verified the hand document images...');
    }
    else if (kycdetails.KYCFrontDocument == "Verified" && kycdetails.KYCBackDocument == "Verified" && kycdetails.KYCHandDocument == "Pending") {
        await this.getPendingDetails(kycdetails._id, {
            KYCFrontDocument: "Verified", KYCBackDocument: "Verified", KYCHandDocument: "Pending"
        })
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Verified the front and back document images...');
    }
    else if (kycdetails.KYCFrontDocument == "Pending" && kycdetails.KYCBackDocument == "Verified" && kycdetails.KYCHandDocument == "Verified") {
        await this.getPendingDetails(kycdetails._id, {
            KYCFrontDocument: "Pending", KYCBackDocument: "Verified", KYCHandDocument: "Verified"
        })
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Verified the back and hand document images...');
    }
    else if (kycdetails.KYCFrontDocument == "Verified" && kycdetails.KYCBackDocument == "Pending" && kycdetails.KYCHandDocument == "Verified") {
        await this.getPendingDetails(kycdetails._id, {
            KYCFrontDocument: "Verified", KYCBackDocument: "Pending", KYCHandDocument: "Verified"
        })
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Verified the front and hand document images...');
    }
    else {
        return kycdetails;
    }
}

exports.resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        let resetPassword = await TOK_SERVICE.verifyToken(resetPasswordToken, TOKEN.RESET_PASSWORD)
        let user = await this.getAdminById(resetPassword.userId)
        if (!user) {
            throw new Error();
        }
        await this.updateAdminById(user._id, { password: newPassword });
        await TOKEN_DET.deleteMany({ userId: user._id, tokenType: TOKEN.RESET_PASSWORD })
    }
    catch (e) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Password Reset Failed')
    }
}

exports.resetPattern = async (resetPatternToken, newPattern) => {
    try {
        let resetPattern = await TOK_SERVICE.verifyToken(resetPatternToken, TOKEN.RESET_PATTERN)
        let user = await this.getAdminById(resetPattern.userId)
        if (!user) {
            throw new Error();
        }
        await this.updateAdminById(user._id, { pattern: newPattern })
        await TOKEN_DET.deleteMany({ userId: user._id, tokenType: TOKEN.RESET_PATTERN })
    }
    catch (e) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Pattern Reset Failed')

    }
}

exports.changePassword = async (token, password, newPassword, confirmPassword) => {
    let userid = await TOK_SERVICE.verifyToken(token, TOKEN.ACCESS)

    let adminDetails = await this.getAdminById(userid.userId)
    let ecv = ENC_DEC.decrypt(adminDetails.email)
    let ademail = await this.getAdminEmail(ecv)

    if ((await ademail.isPasswordMatch1(password))) {
        if (password == newPassword) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Old password and New password are same...');
        }
        else {
            if (newPassword == confirmPassword) {
                await this.updateAdminById(adminDetails._id, { password: confirmPassword });
            }
            else {
                throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'New password and Confirm password are different...');
            }
        }
    }
    else {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Old Password does not same...');
    }
}

exports.changePattern = async (token, pattern, newPattern, confirmPattern) => {
    let userid = await TOK_SERVICE.verifyToken(token, TOKEN.ACCESS)

    let adminDetails = await this.getAdminById(userid.userId)
    let ecv = ENC_DEC.decrypt(adminDetails.email)
    let ademail = await this.getAdminEmail(ecv)
    if ((await ademail.isPatternMatch(pattern))) {
        if (pattern == newPattern) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Old pattern and New pattern are same...');
        }
        else {
            if (newPattern == confirmPattern) {
                await this.updateAdminById(adminDetails._id, { pattern: confirmPattern });
            }
            else {
                throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'New pattern and Confirm pattern are different...');
            }
        }
    }
    else {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Old Pattern does not same...');
    }
}

exports.getLoginHistory = async (filter, options) => {
    return SYSTEM_DET.paginate(filter, options)

}

exports.createTFA = async (id, qrValues) => {
    return await ADMIN.findOneAndUpdate({ _id: id }, { $set: { tfaStatus: "InActive", tfaURL: qrValues.otpauth_url, tfaKey: qrValues.base32 } })
}

exports.updateTFAvalues = async (id, updatedetails) => {
    return await ADMIN.findOneAndUpdate({ _id: id }, { $set: { ...updatedetails } })

}