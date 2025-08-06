import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";

const connectCloudinary = async () => {
  await cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apikey,
    api_secret: config.cloudinary.apiSecret,
  });

  console.log("cloudinary connected");
};

export default connectCloudinary;
