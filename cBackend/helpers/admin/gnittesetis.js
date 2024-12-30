const catchAsync = require("../../utils/cnysa_hctac")
const { CMS_SERVICE, ADMIN_SERVICE, REG_SERVICE } = require('../../services/niam')
const LOGGER = require("../../config/reggol")
const { getCurrentIp, uploadImage, api_key_exptime } = require("../../common/nommoc")

exports.getSiteSetting = catchAsync(async (req, res) => {
    let siteDetails = await CMS_SERVICE.getSiteSetting()
    res.json({
        status: true, site: siteDetails, message: "Successfully get all the values.."
    })
})

exports.createCms = catchAsync(async (req, res) => {
    let asd = await CMS_SERVICE.unEscapeRemoveHtml(req.body.description)
    let create = await CMS_SERVICE.createCms(req.body.title, asd)
    res.json({
        status: true, CMS: create, message: "Successfully Created"
    })
})

exports.getAllCms = catchAsync(async (req, res) => {
    const options = {
        page: req.body.page,
        limit: req.body.limit,
        searchFields: ['title'],
        searchValue: req.body.search,
        sortBy: { createdAt: -1 },
    }
    let get = await CMS_SERVICE.getAllCms(options)

    res.json({
        status: true, data: get
    })
})

exports.getCmsId = catchAsync(async (req, res) => {
    let getcms = await CMS_SERVICE.getCmsId(req.params.id)
    res.json({
        status: true, data: getcms
    })
})

exports.getCmsIdFront = catchAsync(async (req, res) => {
    let getcms = await CMS_SERVICE.getCmsId(req.body.id)
    res.json({
        status: true, data: getcms
    })
})

exports.updateCms = catchAsync(async (req, res) => {
    await CMS_SERVICE.getCmsId(req.params.id)
    let asd = await CMS_SERVICE.unEscapeRemoveHtml(req.body.description)
    let updatecms = await CMS_SERVICE.updateCms(req.params.id, req.body.title, asd)
    res.json({
        status: true, message: "Successfully Update the CMS"
    })
})

exports.updateSiteSetting = catchAsync(async (req, res) => {

    await CMS_SERVICE.updateSiteSetting(req.body);
    res.json({
        status: true,
        message: "Updated Successfully",
    });

})

exports.addFAQ = catchAsync(async (req, res) => {
    let addFaq = await CMS_SERVICE.addFAQ(req.body)
    res.json({
        status: true, FAQ: addFaq, message: "Successfully Add the FAQ"
    })
})

exports.getAllFAQ = catchAsync(async (req, res) => {
    let getAllFaq = await CMS_SERVICE.getAllFAQ()
    res.json({
        status: true, FAQ: getAllFaq, message: "Successfully get all the FAQ"
    })
})

exports.getFAQId = catchAsync(async (req, res) => {
    let getFAQ = await CMS_SERVICE.getFAQId(req.params.id)
    res.json({
        status: true, FAQ: getFAQ,
    })
})

exports.updateFAQ = catchAsync(async (req, res) => {
    await CMS_SERVICE.getFAQId(req.params.id)
    let updateFAQ = await CMS_SERVICE.updateFAQ(req.params.id, req.body.question, req.body.answer)
    res.json({
        status: true, message: "Successfully Update the FAQ"
    })
})


exports.updateProfile = catchAsync(async (req, res) => {

    let admin = await ADMIN_SERVICE.getAdmin()
    await ADMIN_SERVICE.updateKYCVerification(admin._id, { name: req.body.name, email: req.body.email, profileImage: req.body.profileImage })
    res.json({
        status: true,
        message: "Updated Successfully",
    });

})

exports.getProfile = catchAsync(async (req, res) => {
    let admin = await ADMIN_SERVICE.getAdmin()

    res.json({
        status: true, data: admin
    })

})

exports.imageUpload = catchAsync(async (req, res) => {
    let filepath = (req.files != undefined) ? req.files.logo : false;
    if (filepath) {
        var resp = await uploadImage(filepath[0].path)
        if (resp.success == false) {
            res.json({ status: false, message: "File size less than 5MB are allowed!" })
        }
        else {
            res.json({ status: true, data: resp.Location })

        }
    }

})

exports.userCount = catchAsync(async (req, res) => {
    let data = await REG_SERVICE.countDocuments()

    res.json({ status: true, data: data })
})