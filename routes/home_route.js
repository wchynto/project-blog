import express from "express";
import { getAllPost } from "../controllers/post_controller.js";

const router = express.Router();

router.get("/", getAllPost, (req, res) => {
  res.render("home", { name: "home", user: req.user });
});

export default router;
