// File: shopping-list\shopping-list-app\server\server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');  // Import the routes

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

app.use('/api', itemRoutes);  // Use the routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
