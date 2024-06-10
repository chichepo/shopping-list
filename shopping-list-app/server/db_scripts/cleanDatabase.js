// File: shopping-list\shopping-list-app\server\db_scripts\cleanDatabase.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Clean the database
const cleanDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log('Database cleaned');
  } catch (error) {
    console.error('Error cleaning the database:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
const run = async () => {
  await connectDB();
  await cleanDatabase();
};

run();
