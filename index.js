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
// const dataBricksSchemaRoutes = require("./src/routes/dataBricksSchemaRoutes");
// const tableListRoutes = require("./src/routes/tableListRoutes");
// const businessTermRoutes = require("./src/routes/businessTermRoutes.js")
// const useCaseRoutes = require("./src/routes/useCaseRoutes.js")

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));
// Use routes with specific base paths
app.use("/api/blobs", blobStorageRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/schemas", dataBricksSchemaRoutes);
// app.use("/api/tables", tableListRoutes);
// app.use("/api/businessTerms", businessTermRoutes)
// app.use("/api/useCase", useCaseRoutes)

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
