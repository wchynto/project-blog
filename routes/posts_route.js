import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("posts", { name: "posts", user: req.user });
});

export default router;
