import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function Signin(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(null);
    
    const submit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.get('/user/signin', 
            { params: {
                username: username,
                password: password
            }});
            if (!response.data.error){
                localStorage.setItem('user', JSON.stringify(response.data))
                props.setUser(response.data);
                props.logIn(true);
                setRedirect('/');
            }
        }catch(error){
            console.log("DID NOT WORK");
        }
        
    }
    if (redirect){
        return <Navigate to={{pathname: redirect}} />
    }
    return (
        <>
            <h1>Signin</h1>
            <form onSubmit={submit}>
                <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="username" />
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="password" />
                <button>Submit</button>
            </form>
        </>
    )
}