import { useState } from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './routes/Login.js';
import CreateUser from './routes/CreateUser.js';
import UserHome from './routes/UserHome.js';

function App() {
  const [curUser, setUser] = useState('');
  return (
    <Router>
      <Routes>
        <Route path='/createUser' element={<CreateUser/>} />
        <Route index path='/' element={<Login curUser={curUser} setUser={setUser}/>} />
        <Route path="/homePage" element={<UserHome setUser={setUser} curUser={curUser} />} />
      </Routes>
    </Router>
  );
}


export default App;
