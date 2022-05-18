import mongoose from "mongoose";
import "dotenv/config";

const URL = process.env.DATABASE_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("Failed to connect database");
});

db.once("connected", () => {
  console.log("Database connected");
});
