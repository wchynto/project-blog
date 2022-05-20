import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { loginValidator } from "../config/validation.js";
import { login } from "../controllers/user_controller.js";
import "../config/auth.js";
import "dotenv/config";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", { name: "login" });
});
router.post(
  "/",
  loginValidator,
  passport.authenticate("login", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    const user = req.body;
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(user.email, secretKey, {
      algorithm: "HS256",
    });
    res.cookie("token", token);
    res.redirect("/dashboard");
  }
);

export default router;
