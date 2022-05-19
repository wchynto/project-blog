import express from "express";
import morgan from "morgan";

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

//route on here
app.get("/", homeRoute);
app.get("/posts", postsRoute);
app.get("/about", aboutRoute);
app.get("/register", registerRoute);
app.get("/login", loginRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
