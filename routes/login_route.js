import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { loginValidator } from "../config/validation.js";
import "../config/auth.js";
import "dotenv/config";

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

router.get("/", (req, res) => {
  res.render("login", { name: "login", user: req.user });
});

router.post("/", loginValidator, (req, res, next) => {
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
      res.redirect("/dashboard");
    }
  )(req, res, next);
});

export default router;
