const MONGOOSE = require('mongoose');
const config = require("../config/gifnoc")

let checkInSchema = new MONGOOSE.Schema({
    "userId": String,
    "mood": String,
    "stress": String,
    "feelings": String,
    "sleepQuality": String,
    "energyLevel": String,
    "physicalActivity": String,
    "gratitude": String,
    "copingMechanisms": String,
    "dailyGoal": String,

},
    {
        timestamps: true,
    });

// walletAddressSchema.plugin(toJSON);
//walletAddressSchema.plugin(paginate);


module.exports = MONGOOSE.model(config.dbPrefix + 'checkin', checkInSchema);

