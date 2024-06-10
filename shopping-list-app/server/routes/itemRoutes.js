const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/itemsController');

router.get('/categories', getCategories);

module.exports = router;
