import User from "../models/user_model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
      req.flash("error", "Username dan password minimal 8 karakter");
      res.redirect("/register");
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new User(req.body);
      await user.save();
      req.flash("success", "Berhasil menambahkan akun");
      res.redirect("/register");
    }
  } catch (error) {
    console.log(error);
  }
};

export { register };
