// src/config/azureBlob.js
import { BlobServiceClient } from '@azure/storage-blob';
// import dotenv from 'dotenv';
import config from '../config/config.js';  

// dotenv.config();

// const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!config.azureStorageConn) {
  throw new Error("Azure storage connection string is not defined in environment variables.");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(config.azureStorageConn);

export default blobServiceClient;
