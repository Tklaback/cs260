import { 
    Link
} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function CreateUser(){
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [phone, setPhone] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');

    async function initUser(e){
        e.preventDefault();
        console.log(first, last, email, pwd, phone)
        try{
            const newUser={
                name: first + last,
                email: email,
                phoneNumber: phone,
                password: pwd
            }
            await axios.post('/api/user', newUser);
        }catch(error){
            
        }
    }
    return (
        <div>
            <form onSubmit={initUser}>
                <title>Create User</title>
                <input placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <input placeholder="password" onChange={(e)=>setPwd(e.target.value)} value={pwd}></input>
                <input placeholder="PhoneNumber" onChange={(e)=>setPhone(e.target.value)} value={phone}></input>
                <input placeholder="First Name" onChange={(e)=>setFirst(e.target.value)} value={first}></input>
                <input placeholder="Last Name" onChange={(e)=>setLast(e.target.value)} value={last}></input>
                <button>SUBMIT</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    )
}