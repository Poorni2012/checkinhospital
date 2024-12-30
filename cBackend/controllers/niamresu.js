const EXPRESS = require("express");
const USER_API = require("./etuorresu");
const ADMIN_API = require("./admin/etuornimda")
const EMAIL_API = require("./admin/etalpmetliame")
const IP_API = require("./admin/sserddapi")
const SITE_API = require("./admin/gnittesetis")
const CONFIG = require("../config/gifnoc");
const ROUTER = EXPRESS.Router();

const prodRoutes = [
  // routes available only in prod mode
  {
    path: "/auth",
    route: USER_API,
  },  
  {
    path: "/admin",
    route: ADMIN_API,
  },
  {
    path: "/admin/email",
    route: EMAIL_API,
  },
  {
    path: "/admin/ip",
    route: IP_API,
  },
  {
    path: "/admin/sitesetting",
    route: SITE_API
  },


];

/* istanbul ignore next */
if (CONFIG.env == "dev") {
  prodRoutes.forEach((route) => {
    ROUTER.use(route.path, route.route);
  });
}
if (CONFIG.env == "prod") {
  prodRoutes.forEach((route) => {
    ROUTER.use(route.path, route.route);
  });
}

if (CONFIG.env == "local") {
  prodRoutes.forEach((route) => {
    ROUTER.use(route.path, route.route);
  });
}

module.exports = ROUTER;
