const MONGOOSE = require('mongoose');
const { PAGINATE, JSON } = require("./plugin/niam")
const config = require("../config/gifnoc")

let ipBlockAddress = new MONGOOSE.Schema({

    "ipAddress": { type: String, default: "" },
    "email": { type: String, default: "" },
    "status": { type: Number, default: 0 }

},
    {
        timestamps: true,
    });

// ipBlockAddress.plugin(toJSON);
ipBlockAddress.plugin(PAGINATE);
// ipBlockAddress.statics.isIpTaken = async function (ip, excludeIp) {
//     const ipAddr = await this.findOne({ ip, _id: { $ne: excludeIp } });
//     return !!ipAddr;
// };

module.exports = MONGOOSE.model(config.dbPrefix+'sserdda_kcolb_pi', ipBlockAddress);