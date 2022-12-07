import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../styles/home.css';
import Users from "./Users";

export default function Home(props){
    var userObject = props.currentUser;
    const navigate = useNavigate();
    if (typeof(userObject) == 'string'){
        userObject = JSON.parse(userObject);
    }

    const deleteAccount = async (e) => {
        e.preventDefault();
        try {
            await axios.delete('/user', {data: {username: userObject.username}});
            localStorage.clear();
            props.setLoggedIn(false);
            navigate('/');
        }catch(error){
            console.log("NOT WORKING!")
        }
    }


    if (props.loggedIn){
        return (
            <div className="main">
                <div>
                    <h1>Welcome Back {userObject.firstName ? 
                        userObject.firstName[0].toUpperCase() +  userObject.firstName.substring(1,): userObject.username}!
                    </h1>
                    <h3>Bio</h3>
                    <p>{userObject.bio}</p>
                    <Link to="/edit">Edit</Link>
                    <button onClick={deleteAccount}>delete account</button>
                </div>
                <Users currentUser={props.currentUser}/>
            </div>
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