const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [productSchema],
});

module.exports = mongoose.model('Category', categorySchema);
