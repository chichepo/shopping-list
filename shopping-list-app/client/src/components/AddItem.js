import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/itemsSlice';

const AddItem = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cleaning Products');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem({ name, category }));
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="itemName" className="form-label">Item Name</label>
        <input 
          type="text" 
          className="form-control" 
          id="itemName" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemCategory" className="form-label">Category</label>
        <select 
          className="form-select" 
          id="itemCategory" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Cleaning Products</option>
          <option>Dairy</option>
          <option>Fruits and Vegetables</option>
          <option>Meat and Fish</option>
          <option>Bakery</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Item</button>
    </form>
  );
};

export default AddItem;
