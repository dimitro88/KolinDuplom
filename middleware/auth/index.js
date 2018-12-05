const co = require('co');
const passport = require("passport");  
const passportJWT = require("passport-jwt");  
const ExtractJwt = passportJWT.ExtractJwt;  
const Strategy = passportJWT.Strategy;  

const config = require('../../config/config.json');

const User = require('./../../models/UserModel');

const params = {  
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function () {
  let strategy = new Strategy(params, function (payload, done) {
    co(function* () {
      let user = yield User.findById(payload._id).exec();
      done(null, user);
    })
      .catch((err) => done(err, null));
  })
  passport.use(strategy);
  return {
    initialize: function() {
            return passport.initialize();
        },
  }
};