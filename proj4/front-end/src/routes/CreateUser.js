import { 
    Link
} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./styles.css";

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
            
            const response = await axios.post('/api/user', newUser);
            if (!response){
                setEmail('');
                setFirst('');
                setLast('');
                setPwd('');
                setPhone('');
            }else{navigate('/');}
        }catch(error){
            
        }
    }
    return (
        <div className="page">
            <h1>Create An Account</h1>
            <div className="form">
                <form className="fields" onSubmit={initUser}>
                    <title>Create User</title>
                    <input className="txt-field" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                    <input className="txt-field" placeholder="password" type="password" onChange={(e)=>setPwd(e.target.value)} value={pwd}></input>
                    <input className="txt-field" placeholder="PhoneNumber" onChange={(e)=>setPhone(e.target.value)} value={phone}></input>
                    <input className="txt-field" placeholder="First Name" onChange={(e)=>setFirst(e.target.value)} value={first}></input>
                    <input className="txt-field" placeholder="Last Name" onChange={(e)=>setLast(e.target.value)} value={last}></input>
                    <button className="btn">SUBMIT</button>
                </form>
            <Link to="/">Login</Link>
            </div>
        </div>
    )
}