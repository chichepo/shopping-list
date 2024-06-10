// File: shopping-list\shopping-list-app\server\routes\itemRoutes.js
const express = require('express');
const router = express.Router();
const { getCategories, deleteItem } = require('../controllers/itemsController');

router.get('/categories', getCategories);
router.delete('/delete-item', deleteItem);  // Add this line

module.exports = router;
