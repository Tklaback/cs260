import { useState, useEffect } from 'react';
import {
  Signup,
  Home,
  Nav,
  Signin
} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  console.log(localStorage.getItem('loggedIn'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div >
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route 
            exact path="/" 
            element={<Home loggedIn={isLoggedIn}/>}
          />
          <Route 
            path="/signup" 
            element={<Signup />}
          />
          <Route 
            path="/signin" 
            element={<Signin logIn={setIsLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
