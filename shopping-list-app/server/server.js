const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Category = require('./models/Category');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

app.post('/api/save-categories', async (req, res) => {
  const categories = req.body;

  try {
    for (const category of categories) {
      await Category.findOneAndUpdate(
        { name: category.name },
        { products: category.products },
        { new: true, upsert: true }
      );
    }
    res.status(200).json({ message: 'Categories updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating categories', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
