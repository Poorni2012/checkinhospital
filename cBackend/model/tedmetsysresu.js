const MONGOOSE = require('mongoose');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const result = parser.getResult();
const { detect } = require('detect-browser');
const BROWSER = detect()
const { PAGINATE, JSON } = require("./plugin/niam")
const config = require("../config/gifnoc")

let userSystemDetails = new MONGOOSE.Schema({
    "ip": { type: String },
    "osName": { type: String, },
    "osVersion": { type: String, },
    "browserName": { type: String, },
    "browserVersion": { type: String,},
    "userId": { type: String },
    "userEmail": { type: String },
    "email": { type: String },
    "loginType": { type: String },
    "userName": { type: String },
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
userSystemDetails.plugin(JSON);
userSystemDetails.plugin(PAGINATE);

module.exports = MONGOOSE.model(config.dbPrefix+'sliated_metsys', userSystemDetails);