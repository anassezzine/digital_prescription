const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const Professionnel = require('../models/professionnel');

module.exports = function (passport_professionnel) {
  const professionnel_opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET2,
  };

  passport_professionnel.use(new JwtStrategy(professionnel_opts, async (jwt_payload, done) => {
    console.log("not");
    try {
      const user = await Professionnel.findById(jwt_payload.user._id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }));
}
