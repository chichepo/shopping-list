import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollapsibleTable from './components/collapsibleTable/collapsibleTable';

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSave = async (categoryData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/save-categories', categoryData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleCancel = () => {
    console.log('Changes canceled');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CollapsibleTable categories={categories} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}

export default App;
