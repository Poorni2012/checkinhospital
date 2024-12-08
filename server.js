const EXPRESS = require("express");
const HELMET = require("helmet");
const XSS = require("xss-clean");
const CORS = require("cors")
const BODYPARSER = require('body-parser')
const HTTP_STATUS = require("http-status");
const FS = require('fs');
const CONFIG = require('./config/gifnoc')
const PATH = require('path');
const ALLOWED_ORIGIN = require("./config/nigiro")
const MONGOOSE = require('./config/esabatad')
const REDIS = require('./config/sider')
const ROUTERR = require("./controllers/niamresu")
const ApiError = require("./utils/rorre")
const { errorConverter, errorHandler } = require("./middleware/rorre");
const APP = EXPRESS();
const cron = require('cron')
const LOGGER = require("./config/reggol")
const nodekeysender = require("node-key-sender")
const CRYPTR = require('crypto')
let algorithm = 'aes-256-ctr';
let password = 'StCaErRaZaBnIoK2122TOSCD1S2N3A4E';
let iv = 'K102I3n4aZbYCxDw';
const morgan = require("./config/nagrom");
const HTTP = require("http");
const HTTPS = require("https");
const { jwtStrategy } = require("./config/tropssap");
const passport = require("passport");
const CRYPTRR = require('cryptr')
const CRYPTER = new CRYPTRR('myTotallySecretKey');

APP.use(CORS())
APP.use("*", CORS(ALLOWED_ORIGIN.origin))

APP.use(EXPRESS.json())
APP.use(BODYPARSER.json({ limit: '25mb' }));


APP.use(EXPRESS.urlencoded({ extended: true }))

APP.use(HELMET.hsts())
APP.use(HELMET())


APP.use(morgan.successHandler);
APP.use(morgan.errorHandler);

APP.use(passport.initialize());
passport.use("jwt", jwtStrategy);


APP.use(XSS())
LOGGER.info(`Starting ${CONFIG.env} server`);

APP.use(function (req, res, next) {
  const allowedMethods = ['POST', 'GET'];
  if (allowedMethods.includes(req.method)) {
    // res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.clearCookie("__cfduid");
    return next();
  } else {
    res.json({ status: false, messasge: "Method Not Allowed" })
  }
});;



APP.get("/", async (req, res, next) => {
  res.json({ status: true, message: "Backend Running...." });
});

APP.get("/logs", (req, res) => {
  var file = PATH.join(__dirname, './logs/combined.outerr.log');
  FS.readFile(file, "utf8", function (err, data) {
    res.send(data);
  });
});

APP.get("/emptyLogs", (req, res) => {
  FS.writeFile(PATH.join(__dirname, './logs/combined.outerr.log'), ' ', (err) => {
    res.send("The Log is Clear")
  });
})

APP.post("/encrypt", (req, res) => {
  let cipher = CRYPTR.createCipheriv(algorithm, password, iv);
  let crypted = cipher.update(req.body.content, 'utf8', 'hex')
  crypted += cipher.final('hex');
  res.json({
    status: true,
    crypted
  })
})

APP.get("/encrypt/:id", (req, res) => {
  let cipher = CRYPTR.createCipheriv(algorithm, password, iv);
  let crypted = cipher.update(req.params.id, 'utf8', 'hex')
  crypted += cipher.final('hex');
  res.json({
    crypted
  })
});

APP.post("/decrypt", (req, res) => {

  let decipher = CRYPTR.createDecipheriv(algorithm, password, iv)
  let dec = decipher.update(req.body.content, 'hex', 'utf8')
  dec += decipher.final('utf8');
  res.json({
    status: true,
    dec
  })
});

APP.get("/dbencrypt/:id", (req, res) => {
  let crypted = CRYPTER.encrypt(req.params.id)

  res.json({
    crypted
  })
});

APP.get("/dbdecrypt/:id", (req, res) => {
  let crypted = CRYPTER.decrypt(req.params.id)
  res.json({
    crypted
  })
});

APP.use('/v1', ROUTERR)







APP.use(errorConverter);
APP.use(errorHandler);

if (CONFIG.env == "dev") {
  var options = {
    key: FS.readFileSync('./ssl/osiztech.key'),
    cert: FS.readFileSync('./ssl/osiztech.crt')
  };
  LOGGER.info("backend is Running Demo............")

  var server = HTTPS.createServer(options, APP);

} else {
  LOGGER.info("backend is Running local..........")
  var server = HTTP.createServer(APP);
}
require("./common/tekcos").listen(server);

server.listen(CONFIG.port, () => {
  LOGGER.info(`Server Started ${CONFIG.port}`)
})


module.exports = APP