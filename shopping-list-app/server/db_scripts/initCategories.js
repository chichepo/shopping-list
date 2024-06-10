// File: shopping-list\shopping-list-app\server\db_scripts\initCategories.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');

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
