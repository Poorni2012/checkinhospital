const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('../config/gifnoc');
const TOKEN = require('../config/snekot');
const { ADMIN } = require('../model/niam');
const ORIGIN = require('../config/nigiro')

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    var origin = req.headers["origin"];

    var originvalidation = ORIGIN.includes(origin)
    if (originvalidation) {
      if ((payload.tokenType !== TOKEN.ACCESS)) {
        throw new Error('Invalid token type');
      }
      const user = await ADMIN.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    }
    else {
      throw new Error("Unauthorized Origin")
    }

  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};

//this file used for jwt token (important)