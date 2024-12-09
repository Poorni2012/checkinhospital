const JOI = require('joi')
const { password, pattern } = require("./dilav_motsuc")

exports.login = {
    body: JOI.object().keys({
        email: JOI.string().required().email(),
        password: JOI.string().required().custom(password),
        pattern: JOI.string().required().custom(pattern)
    })
}

exports.resetPassword = {
    body: JOI.object().keys({
        password: JOI.string().required().custom(password),
        confirmPassword: JOI.string().required().custom(password)
    })
}

exports.resetPattern = {
    body: JOI.object().keys({
        pattern: JOI.string().required().custom(pattern),
        confirmPattern: JOI.string().required().custom(pattern)
    })
}

exports.changePassword = {
    body: JOI.object().keys({
        password: JOI.string().required().custom(password),
        confirmPassword: JOI.string().required().custom(password)
    })
}

exports.changePattern = {
    body: JOI.object().keys({
        pattern: JOI.string().required().custom(pattern),
        confirmPattern: JOI.string().required().custom(pattern)
    })
}