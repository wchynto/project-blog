import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { loginValidator } from "../config/validation.js";
import { login } from "../controllers/user_controller.js";
import "../config/auth.js";

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
    console.log(req.body);
    res.redirect("/");
  }
);

export default router;
