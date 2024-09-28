// src/models/connectionModel.js
import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["excel", "csv", "database"],
      required: true,
    },
    fileUrl: { type: String },
    dbUrl: { type: String },
    authType: {
      type: String,
      enum: ["username-password"],
      required: function () {
        return this.type === "database";
      },
    },
    username: {
      type: String,
      required: function () {
        return this.type === "database";
      },
    },
    password: {
      type: String,
      required: function () {
        return this.type === "database";
      },
    },
    logoUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Connection", connectionSchema);
