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
```
curl -X GET http://localhost:3000/api/blob
```

2. Upload File
Endpoint: POST /upload

Description: Uploads a file to the specified container in Azure Blob Storage.

Request:

form-data:
file: The file to be uploaded.
Response:

200 OK: Returns a success message if the file is uploaded successfully.
500 Internal Server Error: Returns an error message if there is an issue uploading the file.
Example:
```
curl -X POST http://localhost:3000/upload -F "file=@path_to_your_file"
```

3. Read XLSX File
Endpoint: GET /read-xlsx/:blobName

Description: Reads the content of an .xlsx file from Azure Blob Storage and returns it as JSON.

Parameters:

blobName: The name of the blob (file) to be read.
Response:

200 OK: Returns the content of the .xlsx file as JSON.
500 Internal Server Error: Returns an error message if there is an issue reading the file.
Example:
```
curl -X GET http://localhost:3000/read-xlsx/your_blob_name.xlsx
```


Running the Server
Start the server:

```
npm run dev
```
The server will start 

The server will start on port 3000 by default. You can access the APIs at http://localhost:3000.