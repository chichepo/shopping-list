const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('../../routes/itemRoutes');
const Category = require('../../models/Category');
require('../setup'); // Add this line to import the setup

const app = express();
app.use(express.json());
app.use('/api', itemRoutes);

describe('Items Controller', () => {
  describe('GET /api/categories', () => {
    it('should return all categories', async () => {
      const category = new Category({ name: 'Test Category', products: [{ name: 'Test Product', quantity: 10 }] });
      await category.save();

      const res = await request(app).get('/api/categories');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe('Test Category');
    });
  });

  describe('DELETE /api/delete-item', () => {
    it('should delete an item from a category', async () => {
      const category = new Category({ name: 'Test Category', products: [{ name: 'Test Product', quantity: 10 }] });
      await category.save();

      const res = await request(app)
        .delete('/api/delete-item')
        .send({ categoryName: 'Test Category', itemName: 'Test Product' });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('The item "Test Product" has been deleted from the category "Test Category".');

      const updatedCategory = await Category.findOne({ name: 'Test Category' });
      expect(updatedCategory.products.length).toBe(0);
    });

    it('should return 404 if category not found', async () => {
      const res = await request(app)
        .delete('/api/delete-item')
        .send({ categoryName: 'Nonexistent Category', itemName: 'Test Product' });
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Category not found');
    });
  });
});
