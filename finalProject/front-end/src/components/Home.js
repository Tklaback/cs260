import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Home(props){
    var userObject = props.currentUser;
    const navigate = useNavigate();
    const [users, setUsers] = useState(null);
    if (typeof(userObject) == 'string'){
        userObject = JSON.parse(userObject);
    }

    const deleteAccount = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete('/user', {data: {username: userObject.username}});
            console.log(response)
            localStorage.clear();
            props.setLoggedIn(false);
            navigate('/');
        }catch(error){
            console.log("NOT WORKING!")
        }
    }

    useEffect(()=> {
        async function fetchData(){
            try {
                const response = await axios.get('/user/users');
                console.log(response);
            }catch(error){
                console.log("DIDNT work");
            }
        }
        fetchData();
    }, [])

    if (props.loggedIn){
        return (
            <>
                <h1>Welcome Back {userObject.username}!</h1>
                <h2>Your Email: {userObject.email}</h2>
                <Link to="/edit">Edit</Link>
                <button onClick={deleteAccount}>delete account</button>
            </>
        )
    }
    else{
        return (
            <>
                <h1>Log in to see your information!</h1>
            </>
        )
    }
    
}