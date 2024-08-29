const { BlobServiceClient } = require('@azure/storage-blob');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });



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
      // console.log(blob);
      blobList.push(blob);
    }

    res.json(blobList);
  } catch (error) {
    console.error("Error fetching blobs:", error.message);
    res.status(500).json({ error: 'Error fetching blobs' });
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  console.log('File:', req.file);

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const containerName = 'raw';
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(req.file.originalname);
  
    // Corrected filePath assignment
    const filePath = path.join(__dirname, '..', '..', 'uploads', req.file.filename);
    const fileStream = fs.createReadStream(filePath);
    const fileSize = fs.statSync(filePath).size;
  
    await blockBlobClient.uploadStream(fileStream, fileSize);
  
    // Clean up the file from the local server
    fs.unlinkSync(filePath);
  
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).json({ error: 'Error uploading file' });
  }
  });



module.exports = router;