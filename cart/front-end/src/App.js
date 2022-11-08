import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product.js';
import Cart from './Cart.js'
import Error from './Error.js';
import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetchProducts = async() => {
    try{
      const response = await axios.get("/api/products");
      const arr = response.data;
      let sortedArr = [...arr].sort((a, b) => {return a.name > b.name});
      setProducts(sortedArr);
    } catch(err){
      setError(err);
    }
  }
  
  const fetchCart = async() => {
    try{
      const response = await axios.get("/api/cart");
      const arr = (response.data);
      setCart(arr);
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
    <div className='main-section'>
      <Error error={error}/>
      <div className='products'>
      <h2>Products</h2>
        {products.map((element) => {
          return (
            <Product key={element.id} object={element} setUpdate={setUpdate} setError={setError} update={update}/>
          )
        })}
      </div>
      <div className='cart'>
        <h2>Cart</h2>
        <Cart arr={cart} products={products} setUpdate={setUpdate} setError={setError} update={update}/>
      </div>
    </div>
  );
}

export default App;
