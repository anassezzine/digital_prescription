const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/patient');



module.exports = async function (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
    };

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            
            const user = await User.findById(jwt_payload.patient._id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    }));
}
