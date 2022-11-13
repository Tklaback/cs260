import { 
    Link
  } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(props){
    const [usrEmail, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();

    const setLogin = async(e) => {
        e.preventDefault();
        let obj={
            email: usrEmail,
            password: pwd,
        }
        try{
            const response = await axios.get(`/api/user`, {params: obj});
            if (response.data){
                props.setUser(response.data[0]);
                navigate("/homePage");
            }
            setEmail('');
            setPwd('');
        }catch(error){
            console.log("DIDN'T WORK, SORRY!");
        }
    }
    return (
        <div className="page">
            <form className="form" onSubmit={setLogin}>
                <title>Login</title>
                <input placeholder="email" onChange={(e) => setEmail(e.target.value)} value={usrEmail}></input>
                <input placeholder="password" type="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
                <button>SUBMIT</button>
            </form>
            <Link to="/createUser">Create User</Link>
        </div>
    )
}