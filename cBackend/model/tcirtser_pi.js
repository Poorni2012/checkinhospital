const MONGOOSE = require('mongoose');
const { PAGINATE, JSON } = require("./plugin/niam")
const config = require("../config/gifnoc")

let ipAddress = new MONGOOSE.Schema({

    email: { type: String, lowercase: true },
    ipAddress: { type: String, default: "" },
    type: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    attemptCount: { type: Number, default: 1 },


},
    {
        timestamps: true,
    });

// ipAddress.plugin(toJSON);
ipAddress.plugin(PAGINATE);
// ipAddress.statics.isIpTaken = async function (ip, excludeIp) {
//     const ipAddr = await this.findOne({ ip, _id: { $ne: excludeIp } });
//     return !!ipAddr;
// };

module.exports = MONGOOSE.model(config.dbPrefix+'tcirtser_pi', ipAddress);