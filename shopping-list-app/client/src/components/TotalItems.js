import React from 'react';
import { useSelector } from 'react-redux';

const TotalItems = () => {
  const totalItems = useSelector((state) => state.items.total);

  return (
    <div>
      <h2>Total Items: {totalItems}</h2>
    </div>
  );
};

export default TotalItems;
