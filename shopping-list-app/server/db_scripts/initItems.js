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

// Initialize categories with items
const initItems = async () => {
  const categories = [
    { 
      name: 'Cleaning Products',
      products: [
        { name: 'Soap', quantity: 2 },
        { name: 'Detergent', quantity: 3 },
      ]
    },
    { 
      name: 'Dairy',
      products: [
        { name: 'Milk', quantity: 5 },
        { name: 'Cheese', quantity: 1 },
      ]
    },
    { 
      name: 'Fruits and Vegetables',
      products: [
        { name: 'Apple', quantity: 10 },
        { name: 'Banana', quantity: 7 },
      ]
    },
    { 
      name: 'Meat and Fish',
      products: [
        { name: 'Chicken', quantity: 3 },
        { name: 'Fish', quantity: 4 },
      ]
    },
    { 
      name: 'Bakery',
      products: [
        { name: 'Bread', quantity: 8 },
        { name: 'Croissant', quantity: 2 },
      ]
    },
  ];

  try {
    await Category.deleteMany(); // Clear existing categories
    await Category.insertMany(categories);
    console.log('Categories and items initialized');
  } catch (error) {
    console.error('Error initializing categories and items:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
const run = async () => {
  await connectDB();
  await initItems();
};

run();
