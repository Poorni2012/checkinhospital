const CONFIG = require("../config/gifnoc")
const MOMENT = require('moment');
const JWT = require('jsonwebtoken')
const TOKEN_DET = require('../model/sliated_nekot')
const TOKEN = require('../config/snekot');
//const { ADMIN_SERVICE, REG_SERVICE } = require('./niam')
const REG_SERVICE = require("../services/secivres_retsiger")
const ADMIN_SERVICE = require("../services/ecivres_nimda");


const generateToken = (userId, expires, tokenType, secret = CONFIG.jwt.secret) => {
    let payload = {
        sub: userId,
        iat: MOMENT().unix(),
        exp: expires.unix(),
        tokenType,
    };
    return JWT.sign(payload, secret);
};

const saveToken = async (userToken, userId, expires, tokenType, blacklisted = false) => {
    let tokenDoc = await TOKEN_DET.create({
        userToken,
        userId: userId,
        expires: expires.toDate(),
        tokenType: tokenType,
        blacklisted,
    });
    return tokenDoc;
};

exports.generateVerifyEmailToken = async (user) => {
    let expires = MOMENT().add(CONFIG.jwt.verifyEmailExpirationMinutes, 'minutes');
    let verifyEmailToken = generateToken(user.id, expires, TOKEN.VERIFY_EMAIL);
    await saveToken(verifyEmailToken, user.id, expires, TOKEN.VERIFY_EMAIL);
    return verifyEmailToken;
};

exports.verifyToken = async (token, type) => {
    let tokVerify = JWT.verify(token, CONFIG.jwt.secret)
    let tokFind = await TOKEN_DET.findOne({ userToken: token, tokenType: type, userId: tokVerify.sub, blacklisted: false });
    if (!tokFind) {
        throw new Error("Token not found");
    }
    return tokFind
}

exports.generateSecurityVerifyToken = async (user) => {
    let expires = MOMENT().add(CONFIG.jwt.securityVerificationMinutes, 'minutes');
    let securityVerifyToken = generateToken(user.id, expires, TOKEN.SECURITY_VERIFY);
    await saveToken(securityVerifyToken, user.id, expires, TOKEN.SECURITY_VERIFY);
    return securityVerifyToken;
}

exports.generateLoginToken = async (user) => {
    let accessTokenExpires = MOMENT().add(CONFIG.jwt.accessExpirationMinutes, 'minutes');
    let accessToken = generateToken(user.id, accessTokenExpires, TOKEN.ACCESS)
    await saveToken(accessToken, user.id, accessTokenExpires, TOKEN.ACCESS)
    return accessToken
}

exports.generateResetPassword = async (email) => {
    let ademail = await ADMIN_SERVICE.getAdminEmail(email)
    let resetPasswordExpires = MOMENT().add(CONFIG.jwt.resetPasswordExpirationMinutes, 'minutes')
    let resetPasswordToken = generateToken(ademail._id, resetPasswordExpires, TOKEN.RESET_PASSWORD)
    await saveToken(resetPasswordToken, ademail._id, resetPasswordExpires, TOKEN.RESET_PASSWORD)
    return resetPasswordToken
}

exports.generateResetPattern = async (email) => {
    let admin = await ADMIN_SERVICE.getAdminEmail(email)
    let resetPatternExpires = MOMENT().add(CONFIG.jwt.resetPatternExpirationMinutes, 'minutes')
    let resetPatternToken = generateToken(admin._id, resetPatternExpires, TOKEN.RESET_PATTERN)
    await saveToken(resetPatternToken, admin._id, resetPatternExpires, TOKEN.RESET_PATTERN)
    return resetPatternToken
}

exports.generateUserResetPassword = async (email) => {
    let user = await REG_SERVICE.getUserByEmail(email)
    let resetPasswordExpires = MOMENT().add(CONFIG.jwt.resetPasswordExpirationMinutes, 'minutes')
    let resetPasswordToken = generateToken(user._id, resetPasswordExpires, TOKEN.RESET_PASSWORD)
    await saveToken(resetPasswordToken, user._id, resetPasswordExpires, TOKEN.RESET_PASSWORD)
    return resetPasswordToken
}

exports.generateUserResetPattern = async (email) => {
    let user = await REG_SERVICE.getUserByEmail(email)
    let resetPatternExpires = MOMENT().add(CONFIG.jwt.resetPatternExpirationMinutes, TOKEN.RESET_PATTERN)
    let resetPatternToken = generateToken(user._id, resetPatternExpires, TOKEN.RESET_PATTERN)
    await saveToken(resetPatternToken, user._id, resetPatternExpires, TOKEN.RESET_PATTERN)
    return resetPatternToken
}