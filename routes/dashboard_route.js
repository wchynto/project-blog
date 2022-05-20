import express from "express";
import passport from "passport";

const router = express.Router();

const ensureAuthentcated = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("/");
};

router.get("/", ensureAuthentcated, (req, res) => {
  console.log(req.user);
  res.render("dashboard", { name: "dashboard", user: req.user });
});

export default router;
