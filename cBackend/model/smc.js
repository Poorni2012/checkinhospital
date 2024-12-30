const MONGOOSE = require('mongoose')
const { PAGINATE, JSON } = require("./plugin/niam")
const config = require("../config/gifnoc")

let cmsSettingSchema = MONGOOSE.Schema({


    "title": { type: String, default: '' },

    "description": { type: String, default: '' },


}, { timestamps: true });



// cmsSettingSchema.plugin(toJSON);
cmsSettingSchema.plugin(PAGINATE);


module.exports = MONGOOSE.model(config.dbPrefix+'smc_gnittes', cmsSettingSchema);