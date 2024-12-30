const IP = require('ip')
const AWS = require('aws-sdk');
const FS = require('fs')
const { redisDB } = require("../config/sider")
// const { S3BUCKET: { AWS_ACCESS_KEY, AWS_SECRET_KEY } } = require('../t20r18a1d4e5/a1w23s19')
const CRYPTR = require('cryptr')
const CRYPTER = new CRYPTR('myTotallySecretKey');
const path = require("path")
exports.getCurrentIp = () => {
    return IP.address();
}
function randomNumber() {
    const characters = '0123456789';
    let randomString = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

exports.uploadImage = async (pathh) => {
    try {
        const s3 = new AWS.S3({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY })
        let filee = FS.statSync(pathh)
        const maxFileSize = 5 * 1024 * 1024;
        if (filee.size >= maxFileSize) {
            return {
                success: false,
            }
        }
        else {

            let file = FS.readFileSync(pathh);
            let gm = randomNumber()
            let params = { Bucket: "trondemo/images", Body: file, Key: gm + pathh, ACL: "public-read" };
            let resp = await s3.upload(params).promise()
            return {
                ...resp,
                success: true
            }
        }
    } catch (e) {
        console.info(e)
        console.info(e.toString())
        console.error(e)
        return {
            success: false,
            error: e
        }
    }
}

exports.mathRound = async (values) => {
    return Math.round(100 * values) / 10
}

exports.getIP = async (request) => {
    return await request.headers['x-client-ip'] || request.headers['cf-connecting-ip'] || request.headers['fastly-client-ip'] || request.headers['true-client-ip'] || request.headers['x-real-ip'] || request.headers['x-cluster-client-ip'] || request.headers['x-forwarded'] || request.headers['forwarded-for'] || request.connection.remoteAddress.replace("::ffff:", "");

    // return ip;
}

exports.api_key_exptime = {
    "price_management": 60,
    "transactionhash_data": 60 * 10,      // trans hash search data 
    "block_data": 60 * 10,  // block number search data 
    "char_daliy_transaction_home": 3600,  // 1hour 
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

exports.randomGenerater = async (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}



// Example: Generate a random string of length 10

