const Item = require('../models/Item');
const Category = require('../models/Category');

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addItem = async (req, res) => {
  const { name, category } = req.body;

  try {
    let item = await Item.findOne({ name, category });
    if (item) {
      item.quantity += 1;
    } else {
      item = new Item({ name, category, quantity: 1 });
    }
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  addItem,
};
