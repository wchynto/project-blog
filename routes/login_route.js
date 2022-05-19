import express from "express";

import { loginValidator } from "../config/validation.js";
import { login } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", { name: "login" });
});
router.post("/", loginValidator, login);

export default router;
