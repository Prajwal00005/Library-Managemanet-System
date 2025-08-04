import express from "express";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import { version } from "os";
import auth from "./middleware/auth.js";
import { isAdmin } from "./middleware/roleBasedAuth.js";

const app = express();

const PORT = config.PORT;

app.get("/", async (req, res) => {
  res.json({
    status: "OK",
    name: config.PROJECT_NAME,
    version: config.PROJECT_VERSION,
    port: config.PORT,
    message: "Server running sucessfully",
  });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
