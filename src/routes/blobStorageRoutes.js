const { BlobServiceClient } = require('@azure/storage-blob');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });
const xlsx = require('xlsx');



// Environment variables for your Azure Storage account
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING; // Use environment variables for security

if (!AZURE_STORAGE_CONNECTION_STRING) {
  console.error("AZURE_STORAGE_CONNECTION_STRING is not defined in the environment variables.");
  process.exit(1); // Exit the process if connection string is missing
}

const containerName = 'raw';

router.get('/', async (req, res) => {
  
  try {
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

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
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

  // API endpoint for reading an xlsx file and returning its content as JSON
router.get('/read-xlsx/:blobName', async (req, res) => {
  try {
    const blobName = req.params.blobName;
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Download the blob content to a buffer
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    const downloadedContent = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);

    // Parse the xlsx file
    const workbook = xlsx.read(downloadedContent, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonContent = xlsx.utils.sheet_to_json(worksheet);

    res.status(200).json(jsonContent);
  } catch (error) {
    console.error("Error reading xlsx file:", error.message);
    res.status(500).json({ error: 'Error reading xlsx file' });
  }
});

// Helper function to convert a readable stream to a buffer
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}



module.exports = router;