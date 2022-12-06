import { useState } from 'react';
import axios from 'axios';

export default function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    async function submit(e){
        e.preventDefault();
        try{
            const response = await axios.post('/user/signup', {username: username, password: password});
            console.log(response);
        }catch(error){
            console.log("Shoot, that didn't work!")
        }
        
    }
    
    return (
        <>
            <h1>SignUp</h1>
            <form onSubmit={submit}>
                <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="username" />
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="password" />
                <button>Submit</button>
            </form>
        </>
    )
}