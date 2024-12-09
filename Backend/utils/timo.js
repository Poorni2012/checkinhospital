const OMIT = (object, keys) => {
    object = Object.keys(object).filter(key =>
        keys.indexOf(key) < 0).reduce((obj, key) => {
            obj[key] = object[key];
            return obj;
        }, {}
        );
    return object;
};

module.exports = OMIT;