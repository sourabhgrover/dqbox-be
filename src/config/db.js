import mongoose from "mongoose";

import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
