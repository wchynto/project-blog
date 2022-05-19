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

const login = async (req, res) => {
  try {
    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
      req.flash("error", "Username dan password minimal 8 karakter");
      res.redirect("/login");
    } else {
      const user = req.body;
      User.findOne(user.name, (err, results) => {
        if (!results) {
          req.flash("error", "Email dan password salah");
          res.redirect("/login");
        }
        bcrypt.compare(user.password, results.password, (error, same) => {
          if (!same) {
            req.flash("error", "Email atau password salah");
            res.redirect("/login");
          } else {
            req.flash("success", "Login berhasil");
            res.redirect("/");
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { register, login };
