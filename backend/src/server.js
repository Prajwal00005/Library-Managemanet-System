import express from "express";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import seedAdmin from "./seeder/adminSeed.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import multer from "multer";

const app = express();

const PORT = config.port;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ Storage: multer.memoryStorage() });

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
app.use("/api", upload.array("images", 5), bookRoutes);

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
  .then(() => {
    connectCloudinary();
  })
  .catch((e) => {
    console.log(e.message);
  });
