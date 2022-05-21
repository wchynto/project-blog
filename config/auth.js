import passport from "passport";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user_model.js";
import "dotenv/config";

const secretKey = process.env.SECRET_KEY;
const localStrategy = passportLocal.Strategy;
const jwtStrategy = passportJwt.Strategy;

const cookieExtractor = (req) => {
  let token = req.cookies.token;
  return token;
};

passport.use(
  "login",
  new localStrategy({
    usernameField: 'email',
  passwordField: 'password'
    
  },
    (email, password, done) => {
      User.findOne({email: email}, (err, user) => {
        if (!user) {
          return done(null, false, { message: "Email atau password salah" });
        }
        bcrypt.compare(password, user.password, (err, same) => {
          if (!same) {
            return done(null, false, { message: "Email atau password salah" });
          }
          return done(null, user);
        });
      });
    }
  )
);

passport.use(
  "verifyJwt",
  new jwtStrategy(
    {
      secretOrKey: secretKey,
      jwtFromRequest: cookieExtractor,
    },
    (jwt_payload, done) => {
      User.findOne({email: jwt_payload.email}, (err, user) => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
