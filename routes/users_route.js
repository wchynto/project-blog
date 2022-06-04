import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register } from "../controllers/user_controller.js";
import { loginValidator, registerValidator } from "../config/validation.js";
import "../config/auth.js";
import "dotenv/config";

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

//render view register
router.get("/register", (req, res) => {
  res.render("register", { name: "register", user: req.user });
});

//register route
router.post("/register", registerValidator, register);

//render view login
router.get("/login", (req, res) => {
  res.render("login", { name: "login", user: req.user });
});

//login route
router.post("/login", loginValidator, (req, res, next) => {
  passport.authenticate(
    "login",
    {
      failureRedirect: "/login",
      failureFlash: true,
      session: false,
    },
    (err, user) => {
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        secretKey
      );
      res.cookie("token", token);
      res.redirect(`/dashboard/${user._id}`);
    }
  )(req, res, next);
});

//logout route
router.post("/logout", (req, res) => {
  console.log("logout");
  req.session.destroy((err) => {
    req.logout();
    res.clearCookie("token");
    res.redirect("/home");
  });
});

export default router;
