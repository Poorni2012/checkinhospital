// const { DATABASE: { NAME, USER, PASS, PORTT, IP } } = require('../t20r18a1d4e5/d4a1t20a1')
const { PORT: { PORT } } = require('../t20r18a1d4e5/p16o15r18t20')
// const { EMAIL: { HOST, EPORT, EUSER, EPASS, FROM } } = require('../t20r18a1d4e5/e9m25a8i73l')
const { DRECT_JWT: { JWT_SECRET, JWT_VERIFY_EMAIL_EXPIRATION_MINUTES, JWT_SECURITY_VERIFY_MINUTES, JWT_ACCESS_EXPIRATION_MINUTES, JWT_RESET_PASSWORD_EXPIRATION_MINUTES, JWT_RESET_PATTERN_EXPIRATION_MINUTES } } = require('../t20r18a1d4e5/j10w23t20T20')
const ENC_DEC = require("../config/tpyrced_tpyrcne")
const CRYPTR = require('cryptr')
const CRYPTER = new CRYPTR('myTotallySecretKey');
const LOGGER = require("../config/reggol")
const CryptoJS = require("crypto-js");



// const dbName = ENC_DEC.decrypt(NAME)
// const userName = ENC_DEC.decrypt(USER)
// const passName = ENC_DEC.decrypt(PASS)
// const portName = ENC_DEC.decrypt(PORTT)
// const ipName = ENC_DEC.decrypt(IP)
console.log("DEcrypt",ENC_DEC.decrypt("6b616c6972616a616e6e706f6f726e697bb183259628155d425756b436d42b3020607233eaf5f1d81965bab9d04bc055"))
module.exports = {
    env: 'local',
    port: PORT,
    mongoose: {
        url: `mongodb://localhost:27017/basic`,
        // url: `mongodb://${userName}:${passName}@${ipName}:${portName}/${dbName}`, //demo
    
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: JWT_SECRET,
        accessExpirationMinutes: JWT_ACCESS_EXPIRATION_MINUTES,
        resetPasswordExpirationMinutes: JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        resetPatternExpirationMinutes: JWT_RESET_PATTERN_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
        securityVerificationMinutes: JWT_SECURITY_VERIFY_MINUTES
    },
    // email: {
    //     smtp: {
    //         host: HOST,
    //         port: EPORT,
    //         auth: {
    //             user: EUSER,
    //             pass: EPASS
    //         },
    //     },
    //     from: FROM
    // },
    dbPrefix:"BA_"
};