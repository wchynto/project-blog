import express from "express";
import { getOnePost } from "../controllers/post_controller.js";

const router = express.Router();

router.get("/:id", getOnePost, (req, res) => {
  res.render("posts", { name: "posts", user: req.user });
});

export default router;
