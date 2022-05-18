import express from "express";
import ejs from "ejs";
import morgan from "morgan";

import "./config/database.js";

const port = 3000;
const app = express();

app.set("view engine", ejs);

app.use(morgan("combined"));

//route on here

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
