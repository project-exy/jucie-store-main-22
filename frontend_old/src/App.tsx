
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { How } from './pages/How'
import { Products } from './pages/Products'
import { useStoreContext } from './utils/storeContext'
import { useEffect } from 'react'
import { Product } from './pages/Product'
import { Basket } from './pages/Basket'

function App() {
  const { addProducts, addPrices, setIsLoading } = useStoreContext()
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();
        addProducts(productsData);
        console.log(productsData)
        // Fetch prices
        const pricesResponse = await fetch('/api/prices');
        const pricesData = await pricesResponse.json();
        addPrices(pricesData);
        console.log(pricesData)
        setTimeout(() => setIsLoading(false)
          , 1000)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how" element={<How />} />
        <Route path='/juices' element={<Products />} />
        <Route path="/juices/:id" element={<Product />} />
        <Route path='/basket' element={<Basket />} />
      </Routes>
    </>
  )
}

export default App
