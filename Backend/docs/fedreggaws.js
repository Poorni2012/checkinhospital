const { version } = require('../package.json');
const CONFIG = require('../config/gifnoc');

const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'TRADE',
        description: 'TRADE API',
        version,
    },
    servers: [
        {
            url: `http://localhost:${CONFIG.port}/`,
        },
    ],
};

module.exports = swaggerDef;
