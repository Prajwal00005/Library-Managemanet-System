import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PROJECT_NAME: process.env.PROJECT_NAME,
  PROJECT_VERSION: process.env.PROJECT_VERSION,
};

export default config;
