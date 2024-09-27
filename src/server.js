
import express from 'express';
import connectDB from './config/db.js';
import config from './config/config.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Your routes and other middleware here
app.use('/api/users', userRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
