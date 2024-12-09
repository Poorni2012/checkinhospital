// const { TOK_SERVICE, REG_SERVICE } = require("./niam")
const TOK_SERVICE = require("../services/secivres_nekot")
const REG_SERVICE = require("../services/secivres_retsiger")
const { TOKEN_DET } = require("../model/niam")
const TOKEN = require("../config/snekot");
const ApiError = require("../utils/rorre");
const HTTP_STATUS = require('http-status')
const CRYPTR = require('cryptr')
const CRYPTER = new CRYPTR('myTotallySecretKey');

exports.verifyToken = async (verifytoken) => {

    try {
        let verifyEmail = await TOK_SERVICE.verifyToken(verifytoken, TOKEN.VERIFY_EMAIL);
        let user = await REG_SERVICE.getUserById(verifyEmail.userId)
        if (!user) {
            throw new Error();
        }
        await TOKEN_DET.deleteMany({ userId: user._id, tokenType: TOKEN.VERIFY_EMAIL });
        return await REG_SERVICE.updateUserById(user._id, { verifyUser: true });
    }
    catch (error) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Email Verifiartion failed')
    }
}

exports.securityVerifyToken = async (securityVerify) => {
    try {
        let securityEmail = await TOK_SERVICE.verifyToken(securityVerify, TOKEN.SECURITY_VERIFY);
        let user = await REG_SERVICE.getUserById(securityEmail.userId)
        if (!user) {
            throw new Error();
        }
        await TOKEN_DET.deleteMany({ userId: user._id, tokenType: TOKEN.SECURITY_VERIFY });
        await REG_SERVICE.updateUserById(user._id, { securityVerify: "Active" });
    }
    catch (error) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Security Verifiartion failed')

    }
}

exports.userEncrypt = async (enValues) => {
    return CRYPTER.encrypt(enValues)
}

exports.userDecrypt = async (deValues) => {
    return CRYPTER.decrypt(deValues)
}
