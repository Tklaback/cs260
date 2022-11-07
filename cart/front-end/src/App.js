import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product.js';
import Error from './Error.js';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetchProducts = async() => {
    try{
      const response = await axios.get("/api/products");
      const arr = response.data;
      arr.sort((a, b) => {return a.name > b.name});
      setProducts(arr);
    } catch(err){
      setError(err);
    }
  }
  
  const fetchCart = async() => {
    try{
      const response = await axios.get("/api/cart");
      setCart(response.data);
      // setUpdate(false);
    }catch(error){
      setError(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  },[]);

  useEffect(() => {
    fetchCart();
  }, [update])

  return (
    <>
      <Error error={error}/>
      <h1>Products</h1>
      {products.map((element) => {
        return (
          <Product key={element.id} setUpdate={setUpdate} object={element} setError={setError} setCart={setCart}/>
        )
      })}
    </>
  );
}

export default App;
