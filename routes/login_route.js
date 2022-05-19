import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", { name: "login" });
});

export default router;
