import { 
    Link
  } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./styles.css";

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
            <h1>Login to your account</h1>
            <div className="form">
                <form className="fields" onSubmit={setLogin}>
                    <title>Login</title>
                    <input className="txt-field" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={usrEmail}></input>
                    <input className="txt-field" placeholder="password" type="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
                    <button className="btn">SUBMIT</button>
                </form>
                <Link to="/createUser">Create User</Link>
            </div>
        </div>
    )
}