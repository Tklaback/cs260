import { useState } from 'react';
import Login from './routes/Login.js';
import CreateUser from './routes/CreateUser.js';

function App() {
  const [curUser, setCurUser] = useState({});
  
  return (
    <div>
          {/* <Route path='/createUser' element={<CreateUser email={email} setEmail={setEmail} pwd={pwd} setPwd={setPwd}/>} /> */}
          <Login />
    </div>
  );
}


export default App;
