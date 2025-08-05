import express from "express";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import seedAdmin from "./seeder/adminSeed.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const PORT = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.json({
    status: "OK",
    name: config.projectName,
    version: config.projectVersion,
    port: config.port,
    message: "Server running sucessfully",
  });
});

app.use("/api/auth", authRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .then(async () => {
    const message = await seedAdmin();
    console.log(message);
  })
  .catch((e) => {
    console.log(e.message);
  });
