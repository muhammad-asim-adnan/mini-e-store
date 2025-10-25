import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import AddProductForm from '../components/AddProductForm';


const HomePage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1 className='text-center p-3'>Mini eStore</h1>
      <AddProductForm onProductAdded={() => setRefresh(!refresh)} />
      <ProductList key={String(refresh)} />
    </div>
  );
};

export default HomePage;