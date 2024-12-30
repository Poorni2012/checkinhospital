const { EMAIL_TEMP } = require('../model/niam')
const CONFIG = require('../config/gifnoc')
const NODEMAILER = require('nodemailer')

// const transport = NODEMAILER.createTransport(CONFIG.email.smtp);


const sendEmail = async (to, token, type) => {

    let specialVar = {}
    let from;
    let mailTemp = await EMAIL_TEMP.findOne({ title: type });

    if (type == "Register Email Verification") {
        specialVar = {
            "###USER###": "Welcome to MY TRADE",
            "###URL###": `http://localhost:4200/verifyregister/${token}`,
        };
    }
    else if (type == "Security Verification Email") {
        var OTP = ''
        var digits = '0123456789';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        specialVar = {
            "###USER###": "Welcome to MY TRADE",
            "###URL###": `http://localhost:4200/security-verification/${token}`,
            "###OTP###": OTP
        };
    }
    else if (type == "Forget Password Email") {
        specialVar = {
            "###LINK###": `http://localhost:4300/admin/auth/resetpassword/${token}`,
            "###URL###": `http://localhost:4300/admin/auth/resetpassword/${token}`,
            "###USER###": "admin",
        };
    }
    else if (type == "Forget Pattern Email") {
        specialVar = {
            "###LINK###": `http://localhost:4300/admin/auth/resetpattern/${token}`,
            "###URL###": `http://localhost:4300/admin/auth/resetpattern/${token}`,
            "###USER###": "admin",
        };
    }
    else if (type == "User Forget Password Email") {
        specialVar = {
            "###LINK###": `http://localhost:4200/reset-password/${token}`,
            "###URL###": `http://localhost:4200/reset-password/${token}`,
            "###USER###": "User",
        };
    }

    if (type == "contactus") {
        //from = specialVar.usermail;
        //to = tempContent[0].contactMail;
    } else {
        from = CONFIG.email.from;
    }

    specialVar = Object.assign(specialVar);
    let mailsubject = mailTemp.mailSubject;
    let mailcontent = mailTemp.mailContent;

    for (let key in specialVar) {
        if (specialVar.hasOwnProperty(key)) {
            mailsubject = mailsubject.replace(key, specialVar[key]);
        }
    }
    for (let key in specialVar) {
        if (specialVar.hasOwnProperty(key)) {
            mailcontent = mailcontent.replace(key, specialVar[key]);
        }
    }
    let mailOptions = {
        from: from,
        to: to,
        subject: mailsubject,
        html: mailcontent,
    };
    await transport.sendMail(mailOptions)
}


exports.sendVerificationEmail = async (to, token) => {
    // replace this url with the link to the email verification page of your front-end app
    var link = `http://localhost:4200/verifyregister?token=${token}`;

    const text = `Dear user,
  To verify your email, click on this link: ${link}
  If you did not create an account, then ignore this email.`;
    await sendEmail(to, token, "Register Email Verification");
};

exports.sendSecurityVerificationEmail = async (to, token) => {
    var link = `http://localhost:4200/security-verification?token=${token}`;

    const text = `Dear user,
  To security verify your email, click on this link: ${link}
  If you did not create an account, then ignore this email.`;
    await sendEmail(to, token, "Security Verification Email");
}

exports.resendEmailSecurityVerify = async (to, token) => {
    var link = `http://localhost:4200/security-verification?token=${token}`;

    const text = `Dear user,
  To resend security verify your email, click on this link: ${link}
  If you did not create an account, then ignore this email.`;
    await sendEmail(to, token, "Security Verification Email");
}

exports.sendResetPasswordEmail = async (to, token) => {
    var link = `http://localhost:4300/admin/auth/resetpassword?token=${token}`;

    const text = `Dear user,
  To send reset password email, click on this link: ${link}
  If you did not create an account, then ignore this email.`;
    await sendEmail(to, token, "Forget Password Email");
}

exports.sendResetPatternEmail = async (to, token) => {
    var link = `http://localhost:4300/admin/auth/resetpattern?token=${token}`;
    const text = `Dear user,
  To send reset pattern email, click on this link: ${link}
  If you did not create an account, then ignore this email.`;
    await sendEmail(to, token, "Forget Pattern Email");
}

exports.sendUserResetPasswordEmail = async (to, token) => {
    var link = `http://localhost:4300/admin/auth/resetpassword?token=${token}`;

    const text = `Dear user,
  To send reset password email, click on this link: ${link}
  If you did not create an account, then ignore this email.`;
    await sendEmail(to, token, "User Forget Password Email");
}