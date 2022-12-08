import { useState, useEffect } from 'react';
import {
  Signup,
  Home,
  Nav,
  Signin,
  Edit
} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') ? true : false);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user') ? localStorage.getItem('user') : null);
  
  return (
    <div >
      <BrowserRouter>
        <Nav setLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route 
            exact path="/" 
            element={<Home setLoggedIn={setIsLoggedIn} loggedIn={isLoggedIn} currentUser={currentUser} />}
          />
          <Route 
            path="/signup" 
            element={<Signup logIn={setIsLoggedIn} setUser={setCurrentUser}/>}
          />
          <Route 
            path="/signin" 
            element={<Signin logIn={setIsLoggedIn} setUser={setCurrentUser}/>}
          />
          <Route 
            path="/edit" 
            element={<Edit setCurrentUser={setCurrentUser} currentUser={currentUser}/>}
          />
        </Routes>
      </BrowserRouter>
      <footer style={{marginTop: '15px'}}>
        https://github.com/Tklaback/cs260/tree/master/finalProject
      </footer>
    </div>
  );
}

export default App;
