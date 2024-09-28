// src/services/connectionService.js
import blobServiceClient from "../config/azureBlob.js";
import { v4 as uuidv4 } from "uuid";

const containerName = "raw"; // Make sure this container exists in your Azure Blob Storage

const uploadFileToBlob = async (file) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = `${uuidv4()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer);
    return blockBlobClient.url;
  } catch (error) {
    throw new Error("File upload failed");
  }
};

export default { uploadFileToBlob };
