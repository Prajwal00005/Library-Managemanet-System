import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  mongodbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  projectName: process.env.PROJECT_NAME,
  projectVersion: process.env.PROJECT_VERSION,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apikey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  gemini: {
    apiUrl: process.env.GEMINI_URL,
    apikey: process.env.GEMINI_API_KEY,
  },
};

export default config;
