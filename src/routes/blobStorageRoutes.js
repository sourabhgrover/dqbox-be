const { BlobServiceClient } = require('@azure/storage-blob');
const express = require('express');
const router = express.Router();



// Environment variables for your Azure Storage account
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING; // Use environment variables for security

if (!AZURE_STORAGE_CONNECTION_STRING) {
  console.error("AZURE_STORAGE_CONNECTION_STRING is not defined in the environment variables.");
  process.exit(1); // Exit the process if connection string is missing
}

router.get('/', async (req, res) => {
  
  try {
    const containerName = 'raw';

    // Create BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    let blobList = [];

    // List blobs
    for await (const blob of containerClient.listBlobsFlat()) {
      blobList.push(blob.name);
    }

    res.json(blobList);
  } catch (error) {
    console.error("Error fetching blobs:", error.message);
    res.status(500).json({ error: 'Error fetching blobs' });
  }
});



module.exports = router;