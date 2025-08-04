import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    // Step 1: Ensure MongoDB URL is defined in environment
    if (!config.MONGODB_URL) {
      throw new Error("MongoDB URL is not defined in environment variables");
    }

    // Step 2: Attempt to connect to MongoDB
    const connection = await mongoose.connect(config.MONGODB_URL);

    // Step 3: Log success message with host info
    console.log(` MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    // Step 4: Log connection error and exit process
    console.error(` MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
