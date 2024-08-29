const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require("./db.js");

dotenv.config();

 
const app = express();
// Enable CORS
app.use(cors());

// Connect to the database
// connectDB();

// Middleware
// app.use(bodyParser.json());

// Import routes
const blobStorageRoutes = require("./src/routes/blobStorageRoutes");


// Middleware to parse JSON bodies
app.use(express.json());

// Use routes with specific base paths
app.use("/api/blobs", blobStorageRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
