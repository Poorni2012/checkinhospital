exports.password = (value, helpers) => {
    if (value.length < 8) {
        return helpers.message('Password must be atleast 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/)) {
        return helpers.message("Password must contain 1A 1a 1@ 1number ")
    }
    return value;
}

exports.pattern = (value, helpers) => {
    if (value.length < 4) {
        return helpers.message("Pattern must be 4 characters")
    }
    return value;
}