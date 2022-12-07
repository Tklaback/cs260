import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(null);
    
    async function submit(e){
        e.preventDefault();
        try{
            const response = await axios.post('/user/signup', {username: username, password: password});
            localStorage.setItem('user', JSON.stringify(response.data))
            props.setUser(response.data);
            props.logIn(true);
            setRedirect('/');
        }catch(error){
            console.log("Shoot, that didn't work!")
        }
        
    }
    if (redirect){
        return <Navigate to={{pathname: redirect}} />
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