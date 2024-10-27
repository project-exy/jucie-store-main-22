// src/App.tsx

import './App.css';
import { Route, Routes, useNavigate,  } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { How } from './pages/How';
import { Products } from './pages/Products';
import { useStoreContext } from './utils/storeContext';
import { useEffect } from 'react';
import { Product } from './pages/Product';
import { Basket } from './pages/Basket';
import { OrderForm } from './pages/OrderForm';
import { Contact } from './pages/Contact';
import { ProductsTypes } from './pages/ProductsTypes';


function App() {
  const { addProducts, addPrices, setIsLoading, products } = useStoreContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching")
  
        const productsResponse = await fetch('/api/products');
        console.log(productsResponse.status)
        if (productsResponse.status == 401){
          navigate("localhost:8090/login")
        }

        const productsData = await productsResponse.json();
     

        addProducts(productsData);
        console.log(productsData);
      

        // Fetch prices
        const pricesResponse = await fetch('/api/prices');
        const pricesData = await pricesResponse.json();
        addPrices(pricesData);
        console.log(pricesData);

        setIsLoading(false);
      
    };
    if (products) fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how" element={<How />} />
        <Route path="/products" element={<Products />} />
        <Route path="/juices/:id" element={<Product />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ProductsTypes" element={<ProductsTypes />} />
      </Routes>
    </>
  );
}

export default App;
