import express from "express";
import morgan from "morgan";
import session from "express-session";
import expressFlash from "express-flash";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";

import "./config/database.js";

const port = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//import routes
import homeRoute from "./routes/home_route.js";
import postsRoute from "./routes/posts_route.js";
import aboutRoute from "./routes/about_route.js";
import dashboardRoute from "./routes/dashboard_route.js";
import usersRoute from "./routes/users_route.js";

app.set("view engine", "ejs");
app.set("views", "public/views");
app.use(express.static(path.join(__dirname, "public/")));
app.use(morgan("combined"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "session",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(expressFlash());
app.use(passport.initialize());
app.use(passport.session());

//route on here
app.use("/", homeRoute);
app.use("/posts", postsRoute);
app.use("/about", aboutRoute);
app.use("/dashboard", dashboardRoute);
app.use("/users", usersRoute);
app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
