// src/routes/connectionRoutes.js
import express from "express";
import {
  createConnection,
  getConnections,
  getConnectionById,
  updateConnection,
  deleteConnection,
} from "../controllers/connectionController.js";
import { validateConnection } from "../validators/connectionValidator.js";
import multer from "multer";

const router = express.Router();
const upload = multer(); // For handling multipart/form-data requests

// Create a new connection
router.post(
  "/",
  upload.fields([{ name: "file" }, { name: "logo" }]),
  validateConnection,
  createConnection
);

// Get all connections
router.get("/", getConnections);

// Get a single connection by ID
router.get("/:id", getConnectionById);

// Update a connection
router.put(
  "/:id",
  upload.fields([{ name: "file" }, { name: "logo" }]),
  validateConnection,
  updateConnection
);

// Delete a connection
router.delete("/:id", deleteConnection);

export default router;
