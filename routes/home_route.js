import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { name: "home", user: req.user });
});

export default router;
