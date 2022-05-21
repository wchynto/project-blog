import express from "express";

import { register } from "../controllers/user_controller.js";
import { registerValidator } from "../config/validation.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("register", { name: "register", user: req.user });
});
router.post("/", registerValidator, register);

export default router;
