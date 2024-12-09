const JOI = require('joi')
const { password } = require("./dilav_motsuc")

exports.register = {
    body: JOI.object().keys({
        userName: JOI.string().required(),
        userEmail: JOI.string().required().email(),
        userPassword: JOI.string().required().custom(password),
        userConfirmPassword: JOI.string().required(),
    })
}

exports.login = {
    body: JOI.object().keys({
        userEmail: JOI.string().required().email(),
        userPassword: JOI.string().required().custom(password),
    })
}




