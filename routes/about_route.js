import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("about", { name: "about", user: req.user });
});

export default router;
