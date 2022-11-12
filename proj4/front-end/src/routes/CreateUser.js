import { 
    Link
} from 'react-router-dom';
import { useState } from 'react';

export default function CreateUser(){
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    function initUser(e){
        e.preventDefault();
        console.log(email, pwd)
    }
    return (
        <div>
            <form onSubmit={initUser}>
                <title>Create User</title>
                <input placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <input placeholder="password" onChange={(e)=>setPwd(e.target.value)} value={pwd}></input>
                <button>SUBMIT</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    )
}