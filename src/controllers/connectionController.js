// src/controllers/connectionController.js
import Connection from "../models/connectionModel.js";
import connectionService from "../services/connectionService.js";
import logger from "../utils/logger.js";

export const createConnection = async (req, res) => {
  try {
    const { name, type, dbUrl, username, password, authType } = req.body;
    let fileUrl = null;
    let logoUrl = null;

    if (type === "excel" || type === "csv") {
      if (req.files?.file) {
        fileUrl = await connectionService.uploadFileToBlob(req.files.file[0]);
      }
    }

    if (req.files?.logo) {
      logoUrl = await connectionService.uploadFileToBlob(req.files.logo[0]);
    }

    const newConnection = new Connection({
      name,
      type,
      fileUrl,
      dbUrl,
      username,
      password,
      authType,
      logoUrl,
    });

    const savedConnection = await newConnection.save();
    res.status(201).json(savedConnection);
  } catch (error) {
    logger.error(`Failed to create connection: ${error.message}`);
    res.status(500).json({ error: "Failed to create connection" });
  }
};

export const getConnections = async (req, res) => {
  try {
    const connections = await Connection.find();
    res.json(connections);
  } catch (error) {
    logger.error(`Failed to get connections: ${error.message}`);
    res.status(500).json({ error: "Failed to get connections" });
  }
};

export const getConnectionById = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id);
    if (!connection)
      return res.status(404).json({ error: "Connection not found" });
    res.json(connection);
  } catch (error) {
    logger.error(`Failed to get connection: ${error.message}`);
    res.status(500).json({ error: "Failed to get connection" });
  }
};

export const updateConnection = async (req, res) => {
  try {
    const { name, type, dbUrl, username, password, authType } = req.body;
    let fileUrl = null;
    let logoUrl = null;

    if (type === "excel" || (type === "csv" && req.files?.file)) {
      fileUrl = await connectionService.uploadFileToBlob(req.files.file[0]);
    }

    if (req.files?.logo) {
      logoUrl = await connectionService.uploadFileToBlob(req.files.logo[0]);
    }

    const updatedConnection = await Connection.findByIdAndUpdate(
      req.params.id,
      { name, type, fileUrl, dbUrl, username, password, authType, logoUrl },
      { new: true }
    );
    if (!updatedConnection)
      return res.status(404).json({ error: "Connection not found" });
    res.json(updatedConnection);
  } catch (error) {
    logger.error(`Failed to update connection: ${error.message}`);
    res.status(500).json({ error: "Failed to update connection" });
  }
};

export const deleteConnection = async (req, res) => {
  try {
    const deletedConnection = await Connection.findByIdAndDelete(req.params.id);
    if (!deletedConnection)
      return res.status(404).json({ error: "Connection not found" });
    res.json({ message: "Connection deleted successfully" });
  } catch (error) {
    logger.error(`Failed to delete connection: ${error.message}`);
    res.status(500).json({ error: "Failed to delete connection" });
  }
};
