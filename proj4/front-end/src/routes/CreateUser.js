import { 
    Link
} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateUser(){
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [phone, setPhone] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');

    const navigate = useNavigate();

    function titleCase(str){
        return str[0].toUpperCase() + str.substring(1, str.length);
    }

    async function initUser(e){
        e.preventDefault();
        try{
            const newUser={
                name: titleCase(first) + ' ' + titleCase(last),
                email: email,
                phoneNumber: phone,
                password: pwd,
                message: '',
            }
            await axios.post('/api/user', newUser);
            setEmail('');
            setFirst('');
            setLast('');
            setPwd('');
            setPhone('');
            navigate('/');
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
            <Link to="/">Login</Link>
        </div>
    )
}