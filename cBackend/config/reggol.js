const winston = require('winston');
const config = require('./gifnoc');
const DailyRotateFile = require('winston-daily-rotate-file');

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const options = (level) => ({
    name: `${level}-log`,
    filename: `TRON.${level}.%DATE%.log`,
    dirname: `logs`,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '7d',
    auditFile: `logs/TRON.${level}-audit.json`,
    level,
})

const logger = winston.createLogger({
    // level: config.env === 'dev' ? 'info' : 'info',
    level: 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        config.env === 'dev' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${message}`)
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'logs/combined.outerr.log' }) // Log to file

    ],
});

module.exports = logger;
