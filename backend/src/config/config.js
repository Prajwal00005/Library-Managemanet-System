import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  mongodbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  projectName: process.env.PROJECT_NAME,
  projectVersion: process.env.PROJECT_VERSION,
};

export default config;
