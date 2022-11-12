import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './routes/Login.js';
import CreateUser from './routes/CreateUser.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/createUser' element={<CreateUser />} />
      <Route path='/login' element={<Login />} />
      <Route index path='/' element={<App />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
