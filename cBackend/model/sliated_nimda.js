const MONGOOSE = require('mongoose')
const BCRYPT = require('bcryptjs');
const { PAGINATE, JSON } = require("./plugin/niam")
const config = require("../config/gifnoc")

let adminSchema = MONGOOSE.Schema({
    name: { type: String },
    email: {
        type: String
    },
    password: {
        type: String
    },

    pattern: {
        type: String
    },


    adminStatus: {
        type: String
    },
    userEmail: {
        type: String
    },
    orderType: {
        type: String
    },
    tfaStatus: {
        type: String,
        default: "InActive"
    },
    tfaURL: {
        type: String
    },
    tfaKey: {
        type: String
    },
    tfaCode: {
        type: Number
    },
    blockedTime: {
        type: Number,
        default: 0
    },
    blockedStatus: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
    }
)

adminSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: excludeUserId });

    return !!user;
};

//Check if password matches the user's password
adminSchema.methods.isPasswordMatch1 = async function (password) {
    const user = this;
    return BCRYPT.compare(password, user.password);
};

adminSchema.methods.isPasswordMatch = async function (password) {
    const user = this;

    return BCRYPT.compare(user.password, password);
};

// Check if pattern matches the user's pattern

adminSchema.methods.isPatternMatch = async function (pattern) {
    const user = this;
    return BCRYPT.compare(pattern, user.pattern);
};

adminSchema.methods.isPatternMatch1 = async function (pattern) {
    const user = this;
    console.log("🚀 ~ user:", user)
    return BCRYPT.compare(user.pattern, pattern,);
};

adminSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await BCRYPT.hash(user.password, 8);
    }
    if (user.isModified('pattern')) {
        user.pattern = await BCRYPT.hash(user.pattern, 5)
    }
    next();
});

module.exports = MONGOOSE.model(config.dbPrefix + 'sliated_nimda', adminSchema)