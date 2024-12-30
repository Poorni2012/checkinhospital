const MONGOOSE = require('mongoose')
const { PAGINATE, JSON } = require("./plugin/niam")
const config = require("../config/gifnoc")

let siteFAQSchema = MONGOOSE.Schema({
    "question": String,
    "answer": String

}, { timestamps: true });



// siteFAQSchema.plugin(toJSON);
//siteFAQSchema.plugin(paginate);


module.exports = MONGOOSE.model(config.dbPrefix+'qaf_etis', siteFAQSchema);