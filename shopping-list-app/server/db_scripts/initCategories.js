// File: shopping-list/shopping-list-app/server/db_scripts/initCategories.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Category = require('../models/Category');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('MONGO_URI:', process.env.MONGO_URI); // Debug to ensure the URI is loaded

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to database:', process.env.MONGO_URI);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Initialize categories
const initCategories = async () => {
  const categories = [
    { name: 'Cleaning Products' },
    { name: 'Dairy' },
    { name: 'Fruits and Vegetables' },
    { name: 'Meat and Fish' },
    { name: 'Bakery' },
  ];

  try {
    await Category.deleteMany(); // Clear existing categories
    await Category.insertMany(categories);
    console.log('Categories initialized');
  } catch (error) {
    console.error('Error initializing categories:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
const run = async () => {
  await connectDB();
  await initCategories();
};

run();
