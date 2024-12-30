const MONGOOSE = require('mongoose');
const { PAGINATE, JSON } = require("./plugin/niam")
const config = require("../config/gifnoc")
let emailTemplate = new MONGOOSE.Schema({

    "title": {
        type: String
    },
    "mailSubject": {
        type: String
    },
    "mailContent": {
        type: String
    }

},
    {
        timestamps: true,
    });

// emailtemplateSchema.plugin(toJSON);
//emailtemplateSchema.plugin(paginate);


module.exports = MONGOOSE.model(config.dbPrefix+'etalpmet_liame', emailTemplate);