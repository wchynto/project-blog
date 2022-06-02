import express from "express";
import passport from "passport";
import { getPost, createPost, updatePost, deletePost } from "../controllers/post_controller.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("verifyJwt", { failureRedirect: "/" }),
  getPost
);

router.post('/', passport.authenticate("verifyJwt", { failureRedirect: "/" }), createPost)

router.post('/update/:id', passport.authenticate("verifyJwt", { failureRedirect: "/" }), updatePost)

router.post('/delete/:id', passport.authenticate("verifyJwt", { failureRedirect: "/" }), deletePost)

export default router;
