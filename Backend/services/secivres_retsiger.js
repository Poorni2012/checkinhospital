const HTTP_STATUS = require("http-status");
const TOKEN = require("../config/snekot");
const { REGISTER, SYSTEM_DET, TOKEN_DET, WALLET_ADDRESS, USER_DEP_AMOUNT, USER_TRADE_BALANCE, CHECKIN, CHECKINHISTORY } = require("../model/niam")
const ApiError = require("../utils/rorre");
const TOK_SERVICE = require("../services/secivres_nekot");
const AUTH_SERVICE = require("../services/secivres_htua")
const TRON_WEB = require('tronweb');
const COINKEY = require('coinkey');
const WEB3 = require('web3')
let Web3 = new WEB3()
exports.createUser = async (userDetails) => {
    let user = await REGISTER.findOne({ userEmail: userDetails.userEmail });
    if (user == null) {
        return REGISTER.create(userDetails)
    }
    else if ((await REGISTER.isEmailTaken(userDetails.userEmail, user._id))) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Email already exist');
    }
};

exports.storeUserLoginDetails = async (user) => {
    return SYSTEM_DET.create(user)
}

exports.getUserById = async (id) => {
    return REGISTER.findById({ _id: id })
}
exports.getUserByEmail = async (email) => {
    return REGISTER.findOne({ userEmail: email })
}
exports.getUserDetails = async () => {
    return REGISTER.find({})
}

exports.updateUserById = async (userId, updateBody) => {

    let user = await this.getUserById(userId)
    if (!user) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }
    if (updateBody.userEmail && await REGISTER.isEmailTaken(updateBody.userEmail, userId)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Email already taken')
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
}

exports.updateReferCount = async (email) => {
    let rCount = REGISTER.findOneAndUpdate({ userEmail: email }, { $inc: { referCount: +1 } })
    if (rCount.referCount >= 5) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Not Permission of this referral code')
    }
    else {
        return rCount;
    }
}

exports.updateReferId = async (email, id) => {
    return REGISTER.findOneAndUpdate({ userEmail: email }, { $set: { referById: id } })
}

exports.loginUser = async (loginUser) => {
    let lUser = await REGISTER.findOne({ userEmail: loginUser.userEmail });

    if (lUser == null) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Register Your Mail');
    }
    else if (lUser.userStaus == "Active") {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Already login');
    }
    else {
        let uActive = REGISTER.findOneAndUpdate({ userEmail: loginUser.userEmail },
            { $set: { userStatus: "Active" } });
        return uActive;
    }
}

exports.checkUserPassword = async (email, password) => {
    let user = await this.getUserByEmail(email);
    if (!(await user.isPasswordMatch(password))) {
        await REGISTER.findOneAndUpdate({ userEmail: email },
            { $set: { userStatus: "InActive" } });
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Login failed');
    }
    return user;
}

exports.updateSecurityVerification = async (id) => {
    return REGISTER.findOneAndUpdate({ _id: id }, { $set: { securityVerify: "InActive" } })
}

exports.updateKYCVerification = async (email, updateBody) => {
    return REGISTER.findOneAndUpdate({ userEmail: email }, updateBody)
}

exports.verifiedKYC = async (userDetails) => {
    if (userDetails.KYCStatus == "Verified") {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'You already Updated');

    }
    else if (userDetails.KYCStatus == "Pending") {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Admin could not approve the KYC');
    }
    return userDetails;
}

exports.getPendingStatus = async () => {
    return REGISTER.find({ KYCStatus: "Pending" })
}

exports.userResetPassword = async (resetPasswordToken, newPassword) => {

    try {
        let resetPassword = await TOK_SERVICE.verifyToken(resetPasswordToken, TOKEN.RESET_PASSWORD)
        let user = await this.getUserById(resetPassword.userId)
        if (!user) {
            throw new Error();
        }
        await this.updateUserById(user._id, { userPassword: newPassword })
        await TOKEN_DET.deleteMany({ userId: user._id, tokenType: TOKEN.RESET_PASSWORD })
    }
    catch (e) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Password Reset Failed')
    }
}

exports.userChangePassword = async (userPassword, userNewPassword, userConfirmPassword) => {
    let userDetails = await this.getUserDetails()
    let usEmail = await this.getUserByEmail(userDetails[0].userEmail)
    if (await usEmail.isPasswordMatch(userPassword)) {
        if (userPassword == userNewPassword) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Old password and New password are same...')
        }
        else {
            if (userNewPassword == userConfirmPassword) {
                await this.updateUserById(userDetails[0]._id, { userPassword: userConfirmPassword })
            }
            else {
                throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'New password and Confirm password are different...')
            }
        }
    }
    else {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Old Password does not same...')
    }
}

exports.checkKycVerified = async (userEmail) => {
    let check = await this.getUserByEmail(userEmail)
    if (check.KYCStatus == "Not Verified") {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Verify the KYC...')
    }
    else {
        return check
    }
}

exports.createWalletAddress = async (userDetails) => {
    //userTradeBalanceSchema
    USER_TRADE_BALANCE.create({ userId: userDetails._id, userEmail: userDetails.userEmail })
    //trx
    let trx = await TRON_WEB.createAccount()
    let trxAdd = await WALLET_ADDRESS.create({
        currencySymbol: "TRX",
        userId: userDetails._id,
        walletAddress: trx.address.base58,
        userPrivateKey: await AUTH_SERVICE.userEncrypt(trx.privateKey),
        userPublicKey: trx.publicKey,
        userHexAddress: trx.address.hex
    })
    USER_DEP_AMOUNT.create({
        userId: userDetails._id,
        currencySymbol: "TRX",
        currencyAddress: trx.address.base58,
        currencyId: trxAdd._id,
        balance: 0
    })

    //BTC
    let btc = new COINKEY.createRandom();
    let btcAdd = await WALLET_ADDRESS.create({
        currencySymbol: "BTC",
        userId: userDetails._id,
        walletAddress: btc.publicAddress,
    })
    USER_DEP_AMOUNT.create({
        userId: userDetails._id,
        currencySymbol: "BTC",
        currencyAddress: btc.publicAddress,
        currencyId: btcAdd._id,
        balance: 0
    })

    //MATIC
    let web3 = new WEB3("https://rpc-mumbai.maticvigil.com")
    let maticAcc = web3.eth.accounts.create()
    let maticAdd = await WALLET_ADDRESS.create({
        currencySymbol: "MATIC",
        userId: userDetails._id,
        walletAddress: maticAcc.address,
        walletAddressLower: maticAcc.address.toLowerCase(),
        userPrivateKey: await AUTH_SERVICE.userEncrypt(maticAcc.privateKey)
    })
    USER_DEP_AMOUNT.create({
        userId: userDetails._id,
        currencySymbol: "MATIC",
        currencyAddress: maticAcc.address,
        currencyId: maticAdd._id,
        balance: 0
    })
}

exports.checkin = async (data) => {
    let userToken = await TOK_SERVICE.verifyToken(data.token, TOKEN.ACCESS)

    let check = await CHECKIN.findOne({ userId: userToken.userId })
    if (check) {
        const { token, ...restData } = data;
        let createDate = { userId: userToken.userId, ...restData }
        let update = await CHECKIN.updateMany({ userId: userToken.userId }, { $set: { ...data } })
        await CHECKINHISTORY.create(createDate)
    } else {
        const { token, ...restData } = data;

        let createDate = { userId: userToken.userId, ...restData }
        return await CHECKIN.create(createDate)
    }

}

exports.getCheckIn = async (data) => {
    let userToken = await TOK_SERVICE.verifyToken(data.token, TOKEN.ACCESS)

    let check = await CHECKIN.findOne({ userId: userToken.userId })
    return check
}

exports.checkInHistory = async (values) => {
    console.log("🚀 ~ exports.checkInHistory= ~ values:", values)
    let userToken = await TOK_SERVICE.verifyToken(values.searchValue, TOKEN.ACCESS)
    console.log("🚀 ~ exports.checkInHistory= ~ userToken:", userToken)
    values.searchValue = userToken.userId
    return await CHECKINHISTORY.paginate(values)

}
