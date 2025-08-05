import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    if (!config.MONGODB_URL) {
      throw new Error("MongoDB URL is not defined in environment variables");
    }

    const connection = await mongoose.connect(config.MONGODB_URL);

    console.log(` MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(` MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
