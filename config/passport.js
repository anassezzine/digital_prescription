const JwtStrategy = require('passport-jwt'). Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');



module.exports = async function (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
    };

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload);
            console.log(jwt_payload.user._id);
            const user = await User.findById(jwt_payload.user._id);
            console.log(user);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    }));
}
