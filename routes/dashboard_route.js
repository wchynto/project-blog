import express from "express";
import passport from "passport";
import {
  getAllPost,
  getPostByUser,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post_controller.js";

const router = express.Router();

// dashboard route
router.get(
  "/:id",
  passport.authenticate("verifyJwt", { failureRedirect: "/" }),
  getAllPost,
  (req, res) => {
    res.render("dashboard", { name: "dashboard", user: req.user });
  }
);

router.get(
  "/posts/:id",
  passport.authenticate("verifyJwt", { failureRedirect: "/" }),
  getPostByUser,
  (req, res) => {
    res.render("post_dashboard", {
      name: "post_dashboard",
      user: req.user,
    });
  }
);

router.post(
  "/posts/create/:id",
  passport.authenticate("verifyJwt", { failureRedirect: "/" }),
  createPost
);

router.post(
  "/posts/update/:id",
  passport.authenticate("verifyJwt", { failureRedirect: "/" }),
  updatePost
);

router.post(
  "/posts/delete/:id",
  passport.authenticate("verifyJwt", { failureRedirect: "/" }),
  deletePost
);

export default router;
