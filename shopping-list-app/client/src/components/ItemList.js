import React from 'react';
import Categories from './Categories';

const ItemList = ({ items }) => {
  return (
    <div>
      <Categories items={items} />
    </div>
  );
};

export default ItemList;
