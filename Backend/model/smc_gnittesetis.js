const MONGOOSE = require('mongoose')
const config = require("../config/gifnoc")

let siteSettingSchema = MONGOOSE.Schema({

    "siteName": String,
    "copyright": String,
    "logo": { type: String, default: '' },
    "facebook": { type: String, default: 'http://www.facebook.com' },
    "twitter": { type: String, default: 'http://www.twitter.com' },
    "linkedin": { type: String, default: 'http://www.linkin.com' },
    "telegram": { type: String, default: 'http://web.telegram.org' },
    "instagram": { type: String, default: 'http://www.instragram.com' },
    "youtube": { type: String, default: 'http://www.youtube.com' },
    // "aboutUs": { type: String, default: '' },
    // "termsAndCondition": { type: String, default: '' },
    // "privacyPolicy": { type: String, default: '' },
    "footer": { type: String, default: '' },
    "address": String,
    "city": String,
    "state": String,
    "country": String,
    "pincode": Number,
    "contactEmail": String,
    "phoneNo": { type: Number, default: '' },
    "contactNo": { type: Number, default: '' }
}, { timestamps: true });



// siteSettingSchema.plugin(toJSON);
//siteSettingSchema.plugin(paginate);


module.exports = MONGOOSE.model(config.dbPrefix+'smc_gnittes_etis', siteSettingSchema);