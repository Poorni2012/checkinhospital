const MONGOOSE = require('mongoose')
const REFERRAL_CODE_GENERATOR = require('referral-code-generator')
const BCRYPT = require('bcryptjs')
const config = require("../config/gifnoc")

let registerDetails = MONGOOSE.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userConfirmPassword: {
        type: String
    },
    userReferralCode: {
        type: String
    },
    userCode: {
        type: String,
        default: REFERRAL_CODE_GENERATOR.alphaNumeric('lowercase', 3, 1)
    },
    userStatus: {
        type: String,
        default: "InActive"
    },
    verifyUser: { type: String, default: false },

    // userNewPassword: {
    //     type: String
    // },
    identifyFrontDocument: {
        type: String
    },
    identifyBackDocument: {
        type: String
    },
    handHeldIdentifyDocument: {
        type: String
    },
    userKYCCountry: {
        type: String
    },
    userFirstName: {
        type: String
    },
    userLastName: {
        type: String
    },
    identifyDocumentType: {
        type: String
    },
    documentTypeIdNumber: {
        type: String
    },
    KYCStatus: {
        type: String,
        default: "Not Verified"
    },
    // BTC: {
    //     type: Number
    // },
    // USDT: {
    //     type: Number
    // },
    // ETH:{
    //     type:Number
    // },
    // TRX:{
    //     type:Number
    // },
    // orderType: {
    //     type: String
    // },
    securityVerify: {
        type: String,
        default: "Active"
    },
    // createdTime: {
    //     type: Date,
    //     default: Date.now
    // },
    // browserName: {
    //     type: String
    // },
    // browserOs: {
    //     type: String
    // },
    // ipAddress: {
    //     type: String
    // },
    // browserVersion: {
    //     type: String
    // },
    // walletAddress: {
    //     type: String
    // },
    referCount: {
        type: Number,
        default: 0
    },
    registerId: {
        type: String
    },
    // registerStatus: {
    //     type: Boolean, default: false
    // },
    // otp:{
    //     type:Number
    // },
    // forgetId:{
    //     type:String
    // },
    referById: {
        type: String
    },
    // sOtp:{
    //     type:Number
    // },
    KYCFrontDocument: {
        type: String,
        default: "Not Verified"
    },
    KYCBackDocument: {
        type: String,
        default: "Not Verified"
    },
    KYCHandDocument: {
        type: String,
        default: "Not Verified"
    },
    tfaStatus: {
        type: String,
        default: "InActive"
    },
    profileImage: {
        type: String
    },
    // tfaURL:{
    //     type:String
    // },
    // tfaKey:{
    //     type:String
    // },
    // tfaCode:{
    //     type:String
    // }

},
    { timestamps: true }

)

registerDetails.statics.isEmailTaken = async function (userEmail, excludeUserId) {
    const user = await this.findOne({ userEmail: userEmail, _id: excludeUserId });
    return !!user;
};


//  Check if password matches the user's password

registerDetails.methods.isPasswordMatch = async function (userPassword) {
    const user = this;
    return BCRYPT.compare(userPassword, user.userPassword);
};

registerDetails.pre('save', async function (next) {
    const user = this;
    if (user.isModified('userPassword', 'userConfirmPassword')) {
        user.userPassword = await BCRYPT.hash(user.userPassword, 8);
        user.userConfirmPassword = await BCRYPT.hash(user.userConfirmPassword, 8)
    }
    next();
});


module.exports = MONGOOSE.model(config.dbPrefix+'retsiger_resu', registerDetails)