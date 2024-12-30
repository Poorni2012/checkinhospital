const MONGOOSE = require('mongoose')
const CONFIG = require('./gifnoc')
const LOGGER = require('../config/reggol');

MONGOOSE.set("strictQuery", false);

MONGOOSE.connect(CONFIG.mongoose.url, CONFIG.mongoose.options, (err, data) => {
    console.log("🚀 ~ MONGOOSE.connect ~ err:", err)
    if (data) {
        LOGGER.info("DB Connected")
    }
    else {
        LOGGER.info("Not Connected")
    }
});


module.exports = MONGOOSE

