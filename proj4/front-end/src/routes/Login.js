import { 
    Link
  } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
export default function Login(){
    const [usrEmail, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const setLogin = async(e) => {
        e.preventDefault();
        let obj={
            email: usrEmail,
            password: pwd,
        }
        try{
            const response = await axios.get(`/api/user`, {params: obj});
            console.log(response.data);
            setEmail('');
            setPwd('');
        }catch(error){
            console.log("DIDN'T WORK, SORRY!");
        }
    }
    return (
        <div>
            <form onSubmit={setLogin}>
                <title>Login</title>
                <input placeholder="email" onChange={(e) => setEmail(e.target.value)} value={usrEmail}></input>
                <input placeholder="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
                <button>SUBMIT</button>
            </form>
            <Link to="/createUser">Create User</Link>
        </div>
    )
}