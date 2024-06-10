import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, category } = action.payload;
      const existingItem = state.items.find(item => item.name === name && item.category === category);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, category, quantity: 1 });
      }
      state.total += 1;
    }
  }
});

export const { addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
