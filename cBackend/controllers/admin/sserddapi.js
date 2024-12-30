const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const PATH = require("../../helpers/admin/sserddaip")
const { authAdmin } = require('../../middleware/htua');

ROUTER.post('/pidda', PATH.addIp)

ROUTER.post("/check-white-list", PATH.checkWhiteListIp)

ROUTER.post('/get-all-ip', authAdmin(), PATH.getAllIp)

ROUTER.post('/update-ip/:id', authAdmin(), PATH.updateIp)

ROUTER.get('/get-ip/:id', authAdmin(), PATH.getIp)

ROUTER.post('/delete-ip/:id', authAdmin(), PATH.deleteIp)

ROUTER.post('/add-block-ip', authAdmin(), PATH.addBlockIP)

ROUTER.post('/get_all_block_ip', authAdmin(), PATH.listBlockIP)

ROUTER.post('/delete-block-ip/:id', authAdmin(), PATH.deleteBlockIp)

ROUTER.post('/check-block-ip', authAdmin(), PATH.checkIPBlockList)

ROUTER.post('/ip-blocked/:id', authAdmin(), PATH.ipBlocked)

ROUTER.post('/ip-remove-block', PATH.removeBlockIp)

module.exports = ROUTER