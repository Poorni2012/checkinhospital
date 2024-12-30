const ApiError = require("../utils/rorre");
const HTTP_STATUS = require('http-status')
const { EMAIL_TEMP } = require("../model/niam");



exports.addEmailTemplate = async (emailDetaila) => {
    return await EMAIL_TEMP.create(emailDetaila)
}

exports.getEmailTemplateById = async (id) => {
    return await EMAIL_TEMP.findOne({ _id: id })
}

exports.getAll = async (options) => {
    return await EMAIL_TEMP.paginate(options)
}

exports.deleteEmailTempleteById = async (id) => {
    let email = await this.getEmailTemplateById(id)
    if (email) {
        return await EMAIL_TEMP.remove(email)
    }
    else {
        throw new ApiError(HTTP_STATUS.BAD_GATEWAY, 'Wrong Id')
    }
}

exports.updateEmailTemplate = async (id, updateDetails) => {
    return await EMAIL_TEMP.findOneAndUpdate({ _id: id }, { $set: { template: updateDetails } })
}

