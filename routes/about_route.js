import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("about", { name: "about" });
});

export default router;
