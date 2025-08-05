import express from "express";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import seedAdmin from "./seeder/adminSeed.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.json({
    status: "OK",
    name: config.PROJECT_NAME,
    version: config.PROJECT_VERSION,
    port: config.PORT,
    message: "Server running sucessfully",
  });
});

app.use("/api/auth", authRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at port ${PORT}`);
    });
  })
  .then(() => {
    seedAdmin();
  })
  .catch((e) => {
    console.log(e.message);
  });
