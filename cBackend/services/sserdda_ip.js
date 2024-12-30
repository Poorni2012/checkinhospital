const ApiError = require("../utils/rorre");
const HTTP_STATUS = require('http-status')
const { IP_ADDRESS, IP_BLOCK_ADDRESS, IP_RESTRICT } = require("../model/niam");
const COMMON = require("../common/nommoc");
const { update } = require("../model/tedmetsysresu");

exports.addIp = async (addIp) => {
    if (addIp.length > 15) {
        var split_str = value.split(':');
        value = split_str[6] + split_str[7];
        var ip_1 = parseInt(value.substring(0, 2), 16) & 0xFF;
        var ip_2 = parseInt(value.substring(2, 4), 16) & 0xFF;
        var ip_3 = parseInt(value.substring(4, 6), 16) & 0xFF;
        var ip_4 = parseInt(value.substring(6, 8), 16) & 0xFF;
        addIp = ip_1 + '.' + ip_2 + '.' + ip_3 + '.' + ip_4
    }
    let ipDet = await IP_ADDRESS.find({ ip: addIp })
    if (ipDet.length == 0) {
        return await IP_ADDRESS.create({ ip: addIp })
    }
    else if (ipDet.length > 0) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'IP Already Exists...');
    }
    else {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'IP Already Exists...');
    }
}

exports.checkWhiteListIp = async (ip) => {

    // let ipDet = await IP_BLOCK_ADDRESS.findOne({ ipAddress: ip })
    // if (ipDet) {
    //     throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Ip Blocked');

    // }
    // else {
    return await IP_ADDRESS.findOne({ ip: ip })
    // }

}

exports.getAllIp = async (options) => {
    return await IP_ADDRESS.paginate(options)
}
exports.updateIp = async (id, updateIp) => {
    return await IP_ADDRESS.findByIdAndUpdate({ _id: id }, { $set: { ...updateIp } })
}

exports.getIp = async (id) => {
    return await IP_ADDRESS.findOne({ _id: id })
}

exports.deleteIp = async (id) => {
    let delIp = await this.getIp(id)
    let dele = await delIp.remove()
    return dele

}

exports.addBlockIp = async (ip) => {
    const resolvedIP = await ip.ipAddress;
    ip.ipAddress = resolvedIP
    return await IP_BLOCK_ADDRESS.create({ ...ip })
}

exports.addAdminBlockIP = async (ip) => {
    try {
        let ipDet = await IP_BLOCK_ADDRESS.findOne({ ipAddress: ip.toString() });
        if (ipDet == null) {
            await IP_BLOCK_ADDRESS.create({ ipAddress: ip.toString() });

        } else {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Ip Already Blocked');
        }
    } catch (error) {
        console.error("Error while storing IP address:", error);
        // Handle the error here (e.g., return an error response).
    }

}

exports.addBlockkIp = async (create) => {

    const resolvedIP = await create.ipAddress;

    create.ipAddress = resolvedIP
    return await IP_RESTRICT.create({ ...create })

}

exports.checkip = async (ip) => {
    const resolvedIP = await ip;
    return await IP_BLOCK_ADDRESS.findOne({ ipAddress: resolvedIP.toString() })

}

exports.listBlockIP = async (options) => {
    return await IP_BLOCK_ADDRESS.paginate(options)
}

exports.getBlockIp = async (id) => {
    return await IP_BLOCK_ADDRESS.findOne({ _id: id })
}

exports.updateIpBlock = async (id, updateIp) => {
    return await IP_BLOCK_ADDRESS.findByIdAndUpdate({ _id: id }, { $set: { ...updateIp } })
}

exports.deleteBlockIp = async (id) => {
    let delIp = await this.getBlockIp(id)
    this.updateRestrictIp(delIp.ipAddress)
    return await delIp.remove()

}

exports.removeBlockIp = async (ip) => {
    let delIp = await IP_BLOCK_ADDRESS.findOne({ ip: ip })
    let dele = delIp.remove()
    return dele
}

exports.checkBlockListIP = async (ip) => {
    let ipDet = await IP_BLOCK_ADDRESS.findOne({ ip: ip })
    if (!ipDet) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Ip is not blocklisted ');
    }
    else {
        return ipDet
    }
}

exports.getIPRestrict = async (ip) => {
    return await IP_RESTRICT.findOne({ ipAddress: ip })
}

exports.getIPRestrictCount = async (ip) => {
    const resolvedIP = await ip;

    return await IP_RESTRICT.findOne({ ipAddress: resolvedIP }, { attemptCount: 1 })
}

exports.updateRestrict = async (updateValues) => {

    await IP_RESTRICT.findOneAndUpdate({ _id: updateValues._id }, { $set: { attemptCount: updateValues.attemptCount } })

}

exports.ipCountRestrict = async (ip) => {
    const resolvedIP = await ip;
    return await IP_RESTRICT.find({ ipAddress: resolvedIP }).countDocuments()

}

exports.removeIPRestrict = async (ip) => {
    return await IP_RESTRICT.findOneAndRemove({ ipAddress: ip })

}

exports.updateRestrictIp = async (ip) => {
    const resolvedIP = await ip;
    return await IP_RESTRICT.findOneAndUpdate({ ipAddress: resolvedIP }, { $set: { attemptCount: 0 } })

}