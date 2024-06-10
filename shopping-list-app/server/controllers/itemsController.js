// File: shopping-list\shopping-list-app\server\controllers\itemsController.js
const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { categoryName, itemName } = req.body;

  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.products = category.products.filter(product => product.name !== itemName);
    await category.save();

    res.json({ message: `The item "${itemName}" has been deleted from the category "${categoryName}".` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};
