const catchAsync = require("../../utils/cnysa_hctac")
const { ADMIN_EMAIL_TEMPLATE, CMS_SERVICE } = require('../../services/niam')

exports.addEmailTemplate = catchAsync(async (req, res) => {
    let asd = await CMS_SERVICE.unEscapeRemoveHtml(req.body)

    let mail = await ADMIN_EMAIL_TEMPLATE.addEmailTemplate(asd)
    res.json({
        status: true, email: mail, message: "Successfully Added the Email Template"
    })

})

exports.deleteEmailTemplate = catchAsync(async (req, res) => {
    await ADMIN_EMAIL_TEMPLATE.getEmailTemplateById(req.params.id)
    let deleteEmail = await ADMIN_EMAIL_TEMPLATE.deleteEmailTempleteById(req.params.id)
    res.json({
        status: true, email: deleteEmail, message: "Successfully Delete the Email Template"
    })
})

exports.getEmailTemplateById = catchAsync(async (req, res) => {
    let email = await ADMIN_EMAIL_TEMPLATE.getEmailTemplateById(req.params.id)
    res.json({
        status: true, email: email, message: "Successfully Get the Email Template"
    })
})

exports.getAllEmailTemplate = catchAsync(async (req, res) => {

    const options = {
        page: req.body.page,
        limit: req.body.limit,
        searchFields: ['title'],
        searchValue: req.body.search, 
        sortBy: { createdAt: -1 },
    }
    let getall = await ADMIN_EMAIL_TEMPLATE.getAll(options)
    res.json({
        status: true, email: getall, message: "Get the All Email Template"
    })
})

exports.updateEmailTemplate = catchAsync(async (req, res) => {
    await ADMIN_EMAIL_TEMPLATE.getEmailTemplateById(req.params.id)
    let asd = await CMS_SERVICE.unEscapeRemoveHtml(req.body.template)

    let update = await ADMIN_EMAIL_TEMPLATE.updateEmailTemplate(req.params.id, asd)
    res.json({
        status: true, message: "Successfully Updated the Email Templates"
    })
})