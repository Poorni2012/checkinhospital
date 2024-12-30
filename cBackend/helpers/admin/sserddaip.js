const catchAsync = require("../../utils/cnysa_hctac")
const { IP_ADDRESS,ADMIN_SERVICE } = require('../../services/niam')
const COMMON = require("../../common/nommoc")

exports.addIp = catchAsync(async (req, res) => {
    let ipaddress = req.body.ipaddress || req.headers['x-client-ip'] || req.headers['cf-connecting-ip'] || req.connection.remoteAddress.replace("::ffff:", "");
    const ipDetails = await IP_ADDRESS.addIp(ipaddress)
    res.json({
        status: true, IP: ipDetails, message: "Successfully Added"
    })
})


exports.checkWhiteListIp = catchAsync(async (req, res) => {
    let ipvalue = req.headers['x-client-ip'] || req.headers['cf-connecting-ip'] || req.headers['fastly-client-ip'] || req.headers['true-client-ip'] || req.headers['x-real-ip'] || req.headers['x-cluster-client-ip'] || req.headers['x-forwarded'] || req.headers['forwarded-for'] || req.connection.remoteAddress.replace("::ffff:", "");
    if (ipvalue.indexOf(",") === -1) {
        ipvalue = ipvalue
    }
    else {
        ipvalue = ipvalue.split(",")
        ipvalue = ipvalue[0]
    }
    const ipDetails = await IP_ADDRESS.checkWhiteListIp(ipvalue)
    if (ipDetails) {
        res.json({
            status: true, IP: ipvalue, message: "Ip is a whitelisted ip",
        })
    }
    else {
        res.json({
            status: false, IP: ipvalue, message: "Ip is not whitelisted ip",
        })
    }

})


exports.getAllIp = catchAsync(async (req, res) => {
    const options = {
        page: req.body.page,
        limit: req.body.limit,
        searchFields: ['ip'],
        searchValue: req.body.search, 
        sortBy: { createdAt: -1 },
    }
    const allIpDetails = await IP_ADDRESS.getAllIp(options)
    res.json({
        status: true, IP: allIpDetails, message: "Get all Ip Details"
    })
})

exports.updateIp = catchAsync(async (req, res) => {
    const updateDetails = await IP_ADDRESS.updateIp(req.params.id, req.body)
    res.json({
        status: true, IP: updateDetails, message: "Successfully Update the Ip Values"
    })
})

exports.getIp = catchAsync(async (req, res) => {
    const getDetails = await IP_ADDRESS.getIp(req.params.id)
    res.json({
        status: true, IP: getDetails, message: "Successfully Get Current Details"
    })
})

exports.deleteIp = catchAsync(async (req, res) => {
    const deleteDetails = await IP_ADDRESS.deleteIp(req.params.id)
    res.json({
        status: true, message: "Successfully Delete IP Details"
    })
})

exports.addBlockIP = catchAsync(async (req, res) => {
    const ip = await IP_ADDRESS.addAdminBlockIP(req.body.ip)
    res.json({ status: true, message: "Successfully Add Blocked IP" })
})

exports.listBlockIP = catchAsync(async (req, res) => {
    const options = {
        page: req.body.page,
        limit: req.body.limit,
        searchFields: ['ip'],
        searchValue: req.body.search, 
        sortBy: { createdAt: -1 },
    }
    const ip = await IP_ADDRESS.listBlockIP(options)
    res.json({ status: true, ip: ip, message: "List IP" })
})

exports.deleteBlockIp = catchAsync(async (req, res) => {
    const ip = await IP_ADDRESS.deleteBlockIp(req.params.id)
    res.json({
        status: true, message: "Successfully Deleted"
    })
})

exports.removeBlockIp = catchAsync(async (req, res) => {
    let ipaddress = req.body.ipaddress || req.headers['x-client-ip'] || req.headers['cf-connecting-ip'] || req.connection.remoteAddress.replace("::ffff:", "");

    const ip = await IP_ADDRESS.removeBlockIp(ipaddress)
    res.json({
        status: true, message: "Successfully Removed"
    })
})

exports.checkIPBlockList = catchAsync(async (req, res) => {
    let ipvalue = req.headers['x-client-ip'] || req.headers['x-forwarded-for'] || req.headers['cf-connecting-ip'] || req.headers['fastly-client-ip'] || req.headers['true-client-ip'] || req.headers['x-real-ip'] || req.headers['x-cluster-client-ip'] || req.headers['x-forwarded'] || req.headers['forwarded-for'] || req.connection.remoteAddress.replace("::ffff:", "");
    const ipDetails = await IP_ADDRESS.checkBlockListIP(ipvalue)
    res.json({
        status: true, message: "Ip is Blocked"
    })
})

exports.ipBlocked = catchAsync(async (req, res) => {
    const up = await IP_ADDRESS.updateIpBlock(req.params.id, { status: 1 })
    res.json({
        status: true, message: "IP Blocked"
    })
})

exports.ipBlock = (async (req, res) => {

    let info = req.body;
    let ip = await COMMON.getIP(req)
    let search = { "ipAddress": ip };
    let blockObj = {
        "ipAddress": ip,
        "email": info.email,
        "status": true
    }
    let data = await IP_ADDRESS.getIPRestrictCount(ip)
    if (data) {
        if (data.attemptCount > 4) {
            let add = await IP_ADDRESS.addBlockIp(blockObj)
            if (add) {
                res.json({ status: false, message: "Your IP has been Blocked" })
            }
            else {
                res.json({ status: false, message: "Something Went Wrong" })
            }
        }
        else {
            info['attemptCount'] = data.attemptCount + 1;
            info['_id'] = data._id;
            await IP_ADDRESS.updateRestrict(info)
            res.json({ status: false, message: `Invalid Login Credential , You Have ${5 - info.attemptCount}` })
        }

    }
    else if (data == null) {
        blockObj['attemptCount'] = 1;
        let add = await IP_ADDRESS.addBlockkIp(blockObj)
        res.json({ status: false, message: "Invalid login credentials, You have 4 attempts left" })
    }

})