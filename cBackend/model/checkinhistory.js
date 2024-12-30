const MONGOOSE = require('mongoose');
const config = require("../config/gifnoc")
const { PAGINATE, JSON } = require("./plugin/niam")

let checkInHistorySchema = new MONGOOSE.Schema({
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
    "file": String
},
    {
        timestamps: true,
    });

checkInHistorySchema.plugin(JSON);
checkInHistorySchema.plugin(PAGINATE);

module.exports = MONGOOSE.model(config.dbPrefix + 'checkinhistory', checkInHistorySchema);

