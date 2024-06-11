// File: shopping-list-app/server/db_scripts/initItems.js
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
        { name: 'Bleach', quantity: 4 },
        { name: 'Glass Cleaner', quantity: 5 },
        { name: 'Floor Cleaner', quantity: 1 },
        { name: 'Disinfectant Wipes', quantity: 6 },
        { name: 'Scrub Brush', quantity: 2 },
        { name: 'Sponges', quantity: 3 },
        { name: 'Dish Soap', quantity: 4 },
        { name: 'Toilet Cleaner', quantity: 1 },
        { name: 'Mop', quantity: 1 },
        { name: 'Broom', quantity: 2 }
      ]
    },
    { 
      name: 'Dairy',
      products: [
        { name: 'Milk', quantity: 5 },
        { name: 'Cheese', quantity: 1 },
        { name: 'Butter', quantity: 2 },
        { name: 'Yogurt', quantity: 6 },
        { name: 'Cream', quantity: 3 },
        { name: 'Cottage Cheese', quantity: 2 },
        { name: 'Sour Cream', quantity: 1 },
        { name: 'Whipped Cream', quantity: 4 },
        { name: 'Ice Cream', quantity: 3 },
        { name: 'Buttermilk', quantity: 2 },
        { name: 'Milk Powder', quantity: 1 },
        { name: 'Ghee', quantity: 1 }
      ]
    },
    { 
      name: 'Fruits and Vegetables',
      products: [
        { name: 'Apple', quantity: 10 },
        { name: 'Banana', quantity: 7 },
        { name: 'Carrot', quantity: 8 },
        { name: 'Broccoli', quantity: 2 },
        { name: 'Tomato', quantity: 9 },
        { name: 'Potato', quantity: 5 },
        { name: 'Spinach', quantity: 4 },
        { name: 'Onion', quantity: 6 },
        { name: 'Garlic', quantity: 3 },
        { name: 'Ginger', quantity: 2 },
        { name: 'Pepper', quantity: 4 },
        { name: 'Cucumber', quantity: 3 }
      ]
    },
    { 
      name: 'Meat and Fish',
      products: [
        { name: 'Chicken', quantity: 3 },
        { name: 'Fish', quantity: 4 },
        { name: 'Beef', quantity: 2 },
        { name: 'Pork', quantity: 1 },
        { name: 'Lamb', quantity: 2 },
        { name: 'Salmon', quantity: 3 },
        { name: 'Tuna', quantity: 1 },
        { name: 'Shrimp', quantity: 5 },
        { name: 'Crab', quantity: 2 },
        { name: 'Lobster', quantity: 1 },
        { name: 'Turkey', quantity: 2 },
        { name: 'Duck', quantity: 1 }
      ]
    },
    { 
      name: 'Bakery',
      products: [
        { name: 'Bread', quantity: 8 },
        { name: 'Croissant', quantity: 2 },
        { name: 'Bagel', quantity: 3 },
        { name: 'Muffin', quantity: 4 },
        { name: 'Donut', quantity: 5 },
        { name: 'Baguette', quantity: 1 },
        { name: 'Roll', quantity: 2 },
        { name: 'Bun', quantity: 3 },
        { name: 'Pretzel', quantity: 2 },
        { name: 'Scone', quantity: 1 },
        { name: 'Cake', quantity: 1 },
        { name: 'Pie', quantity: 2 }
      ]
    },
  ];

  try {
    for (const category of categories) {
      const existingCategory = await Category.findOne({ name: category.name });
      if (existingCategory) {
        existingCategory.products = category.products;
        await existingCategory.save();
      } else {
        await Category.create(category);
      }
    }
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
