const REDIS = require('redis')

const redisDB = REDIS.createClient({

});



const api_key_exptime = {
    "price_management": 60,
    "transactionhash_data": 60 * 10,      
    "block_data": 60 * 10,  
    "char_daliy_transaction_home": 3600,   
    "market_data": 20,
    "footer_content_site": 60 * 10,
    "getsitesettings": 60 * 3,
    "lastest_block_transaction": 60,
    "PKD_marketcap": 10,
    "UBID_marketcap": 30,
    "BIBT_marketcap": 60,
    "RIRT_marketcap": 60,
    "WIWT_marketcap": 60,
    "user_validator_leaderboard": 60 * 30,
    "top20_receivertranscount": 60 * 3,
    "top20_sendertranscount": 60 * 3,
    "top20_receiver": 60 * 3
}
module.exports = { redisDB, api_key_exptime }