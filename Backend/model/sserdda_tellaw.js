const MONGOOSE = require('mongoose');
const config = require("../config/gifnoc")

let walletAddressSchema = new MONGOOSE.Schema({
    "walletAddress": String,
    "userPrivateKey": String,
    "userPublicKey": String,
    "userHexAddress": String,
    "trxValue": Number,
    "currencySymbol": String,
    "userId": String,
    "currencyId": String,
    "amount": Number,
    "walletAddressLower": String

},
    {
        timestamps: true,
    });

// walletAddressSchema.plugin(toJSON);
//walletAddressSchema.plugin(paginate);


module.exports = MONGOOSE.model(config.dbPrefix+'sserdda_tellaw', walletAddressSchema);

