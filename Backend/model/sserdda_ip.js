const MONGOOSE = require('mongoose');
const config = require("../config/gifnoc")

let ipAddress = new MONGOOSE.Schema({

    "ip": { type: String }

});
// {
//     timestamps: true,
// });

// ipAddress.plugin(toJSON);
//ipAddress.plugin(paginate);
ipAddress.statics.isIpTaken = async function (ip, excludeIp) {
    const ipAddr = await this.findOne({ ip, _id: { $ne: excludeIp } });
    return !!ipAddr;
};

module.exports = MONGOOSE.model(config.dbPrefix+'sserdda_pi', ipAddress);