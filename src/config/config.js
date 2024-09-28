import 'dotenv/config';

const config = {
  port: process.env.PORT || 3001,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', // Default value
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret', // Default value for development
  nodeEnv: process.env.NODE_ENV || 'development',
  azureStorageConn: process.env.AZURE_STORAGE_CONNECTION_STRING || 'development',
  // Add more configurations here as needed
};

export default config;
