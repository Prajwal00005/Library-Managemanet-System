import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    if (!config.mongodbUrl) {
      throw new Error("MongoDB URL is not defined in environment variables");
    }

    const connection = await mongoose.connect(config.mongodbUrl);

    console.log(` MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(` MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
