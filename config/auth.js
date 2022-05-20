import passport from "passport";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

const localStrategy = passportLocal.Strategy;
// const jwtStrategy = passportJwt.Strategy;
// const extractJwt = passportJwt.ExtractJwt;

passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      User.findOne(email.email, (err, user) => {
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

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
