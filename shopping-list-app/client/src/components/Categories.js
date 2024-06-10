import React from 'react';

const Categories = ({ items }) => {
  const categories = [
    'Cleaning Products',
    'Dairy',
    'Fruits and Vegetables',
    'Meat and Fish',
    'Bakery'
  ];

  return (
    <div>
      {categories.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {items.filter(item => item.category === category).map((item, index) => (
              <li key={index}>{item.name} ({item.quantity})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Categories;
