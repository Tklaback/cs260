import { 
    Link
  } from 'react-router-dom';
import { useState } from 'react';
export default function Login(){
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const setLogin = (e) => {
        e.preventDefault();
        console.log(email, pwd);
        setEmail('');
        setPwd('');
    }
    return (
        <div>
            <form onSubmit={setLogin}>
                <title>Login</title>
                <input placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <input placeholder="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
                <button>SUBMIT</button>
            </form>
            <Link to="/createUser">Create User</Link>
        </div>
    )
}