
import express from 'express';
import connectDB from './config/db.js';
import config from './config/config.js';
import userRoutes from './routes/userRoutes.js';
import connectionRoutes from './routes/connectionRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Your routes and other middleware here
app.use('/api/users', userRoutes);
// Connection Routes
app.use('/api/connections', connectionRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
