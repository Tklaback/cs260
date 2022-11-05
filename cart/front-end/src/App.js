import { useState } from 'react';
import axios from 'axios';

function App() {
  const [apiResponse, setApiResponse] = useState('');
  const [textVal, setTextVal] = useState('');
  function handleSubmit(e){
    e.preventDefault();
    axios.post('/api/products', {name: "ty", price: "45"})
    .then(response => {
      console.log(response.data);
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={textVal} onChange={(e)=>{setTextVal(e.target.value)}} />
      </form>
    </>
  );
}

export default App;
