const MONGOOSE = require('mongoose');
const TOKEN = require('../config/snekot');
const { PAGINATE, JSON } = require("./plugin/niam")
const config = require("../config/gifnoc")

let tokenDetails = MONGOOSE.Schema(
    {
        userToken: {
            type: String,
            index: true,
        },
        userId: {
            type: MONGOOSE.SchemaTypes.ObjectId,
            ref: 'User',
        },
        tokenType: {
            type: String,
            enum: [TOKEN.REFRESH, TOKEN.RESET_PASSWORD, TOKEN.VERIFY_EMAIL, TOKEN.RESET_PATTERN, TOKEN.ACCESS,TOKEN.SECURITY_VERIFY],
        },
        expires: {
            type: Date,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
// tokenSchema.plugin(toJSON);

module.exports = MONGOOSE.model(config.dbPrefix+'nekot_user', tokenDetails);

