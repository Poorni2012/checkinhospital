const ApiError = require("../utils/rorre");
const HTTP_STATUS = require('http-status')
const { CMS_UPDATE, CMS_SETT, FAQ_UPDATE } = require("../model/niam");

exports.getSiteSetting = async () => {
    return await CMS_UPDATE.find({})
}

exports.createCms = async (title, content) => {
    return await CMS_SETT.create({
        title: title,
        description: content
    })
}

exports.getAllCms = async (options) => {
    return await CMS_SETT.paginate(options)
}

exports.getCmsId = async (id) => {
    return await CMS_SETT.findById(id)
}

exports.updateCms = async (id, title, description) => {
    return CMS_SETT.findOneAndUpdate({ _id: id }, { $set: { title: title, description: description } })
}

exports.updateSiteSetting = async (updateDetails) => {
    let site = await CMS_UPDATE.findOne({})
    return CMS_UPDATE.findOneAndUpdate({ _id: site._id }, { $set: { ...updateDetails } })
}

exports.createSiteSetting = async (createDetails, image) => {
    return await CMS_UPDATE.create({
        "logo": image,
        "copyright": "@copyrights ETL-2022",
        "aboutUs": "<p>about us</p>",
        ...createDetails
    })
}

exports.addFAQ = async (addDetails) => {
    return await FAQ_UPDATE.create(addDetails)
}

exports.getAllFAQ = async () => {
    return await FAQ_UPDATE.find({}).sort({ createdAt: -1 }).exec()
}

exports.getFAQId = async (id) => {
    return await FAQ_UPDATE.findById(id)
}

exports.updateFAQ = async (id, question, answer) => {
    return FAQ_UPDATE.findOneAndUpdate({ _id: id }, { $set: { question: question, answer: answer } })
}

exports.unEscapeRemoveHtml = async (htmlStr) => {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, "\"");
    htmlStr = htmlStr.replace(/&#39;/g, "\'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
}