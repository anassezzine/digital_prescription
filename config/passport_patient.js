const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const Patient = require('../models/patient');
const Professionnel = require('../models/professionnel');

module.exports = function(passport) {
  // Configuration for patient authentication
  const patient_opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PATIENT_SECRET,
  };

  passport.use('patient-jwt', new JwtStrategy(patient_opts, async (jwt_payload, done) => {
    try {
      const user = await Patient.findById(jwt_payload.user._id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }));

  // Configuration for Professionnel authentication
  const professionnel_opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PROFESSIONNEL_SECRET,
  };

  passport.use('professionnel-jwt', new JwtStrategy(professionnel_opts, async (jwt_payload, done) => {
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
};