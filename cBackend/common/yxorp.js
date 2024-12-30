const { IP2Proxy } = require("ip2proxy-nodejs");
let ip2proxy = new IP2Proxy();
const { PROXY } = require('../model/niam')



exports.getIP = (req, res, next) => {
  if (ip2proxy.open("./FOPmltBbWp.BIN") == 0) {
   
    let ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
    ip = ip.replace("::ffff:", "");
    ip = ip.split(",").length > 0 ? ip.split(",")[0] : ip;

    // let ip = "43.241.71.120";

    if (ip2proxy.isProxy(ip) == 0 || ip == 1) {
      next()
     
    } else {
      let proxyData = new PROXY();
      proxyData.ipAddress = ip;
      proxyData.isProxy = ip2proxy.isProxy(ip);
      proxyData.ProxyType = ip2proxy.getProxyType(ip);
      proxyData.CountryShort = ip2proxy.getCountryShort(ip);
      proxyData.CountryLong = ip2proxy.getCountryLong(ip);
      proxyData.Region = ip2proxy.getRegion(ip);
      proxyData.City = ip2proxy.getCity(ip);
      proxyData.ISP = ip2proxy.getISP(ip);
      proxyData.Domain = ip2proxy.getDomain(ip);
      proxyData.UsageType = ip2proxy.getUsageType(ip);
      proxyData.ASN = ip2proxy.getASN(ip);
      proxyData.AS = ip2proxy.getAS(ip);
      proxyData.LastSeen = ip2proxy.getLastSeen(ip);
      proxyData.Threat = ip2proxy.getThreat(ip);
      proxyData.Provider = ip2proxy.getProvider(ip);
      proxyData.save();
      return res.status(401).json({message: "The VPN connection is not allowed via a local proxy!!" })  

    
    }
  } else {
    console.log("Error reading BIN file.");
  }
  ip2proxy.close();
}


