const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
    windowMs: 1000, // 1 minutes
    max: 15,
    statusCode: 400,
    message: "Too Many Request" // limit each IP to 100 requests per windowMs
});

module.exports = limiter