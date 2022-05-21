import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("verifyJwt", {session: false, failureRedirect: '/'}),
  (req, res) => {
    res.render("dashboard", { name: "dashboard", user: req.user });
  }
);

export default router;
