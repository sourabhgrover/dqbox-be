// db.js
const mongoose = require("mongoose");
const connectionString = process.env.MONGODB_URI;
async function connectDB() {
  try {
    await mongoose.connect(connectionString, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }
}

module.exports = connectDB;
