import express from "express";
import morgan from "morgan";
import session from "express-session";
import expressFlash from "express-flash";
import cookieParser from "cookie-parser";

import "./config/database.js";

const port = 3000;
const app = express();

//import routes
import homeRoute from "./routes/home_route.js";
import postsRoute from "./routes/posts_route.js";
import aboutRoute from "./routes/about_route.js";
import registerRoute from "./routes/register_route.js";
import loginRoute from "./routes/login_route.js";

app.set("view engine", "ejs");
app.use(morgan("short"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "my secret",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(expressFlash());

//route on here
app.use("/", homeRoute);
app.use("/posts", postsRoute);
app.use("/about", aboutRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
