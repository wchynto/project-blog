import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("posts", { name: "posts" });
});

export default router;
