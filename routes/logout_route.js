import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  console.log("logout");
  req.session.destroy(err => {
    req.logout();
    res.clearCookie("token");
    res.redirect("/dashboard");
  });
  
});

export default router;
