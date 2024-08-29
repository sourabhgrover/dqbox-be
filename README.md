# Blob Storage Routes

This project provides API endpoints to interact with Azure Blob Storage. The following APIs are available:

1. **List Blobs**
2. **Upload File**
3. **Read XLSX File**

## Prerequisites

- **Node.js**: Make sure you have Node.js installed.
- **Azure Storage Account**: You need an Azure Storage Account to use this service.
- **Environment Variable**: Set the `AZURE_STORAGE_CONNECTION_STRING` with your Azure Storage connection string.


## Installation

Follow these steps to set up the project:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
    ```
2. **Install dependencies** 
   ```sh
   npm install
   ```

3. **Set the environment variable:** 
   ```sh
   export AZURE_STORAGE_CONNECTION_STRING="your_connection_string"
   ```

API Endpoints
1. List Blobs
Endpoint: GET /

Description: Lists all blobs in the specified container.

Response:

200 OK: Returns a JSON array of blobs.
500 Internal Server Error: Returns an error message if there is an issue fetching blobs.

Example:

