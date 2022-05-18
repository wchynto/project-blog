import express from "express";
import morgan from "morgan";

import "./config/database.js";

const port = 3000;
const app = express();

app.set("view engine", "ejs");

app.use(morgan("short"));

//route on here
app.get("/", (req, res) => {
  res.render("home", {
    name: "home",
  });
});

app.get("/posts", (req, res) => {
  res.render("posts", {
    name: "posts",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "about",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    name: "register",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    name: "login",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
