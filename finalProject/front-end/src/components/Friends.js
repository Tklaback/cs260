import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/home.css'

export default function Friends(props){
    const [search, setSearch] = useState([]);

    useEffect(()=> {
        async function fetchData(){
            try {
                const response = await axios.get('/user/friends', { params: {
                    username: props.currentUser.username,
                }});
                props.setFriends(response.data.friends);
            }catch(error){
                console.log("Friends DIDNT work");
            }
        }
        fetchData();
    }, [props.update])

    const removeFriend = async (friend) => {
        try{
            const response = await axios.delete('/user/friend', 
            {data: {username: props.currentUser.username, friendUserName: friend.username}});
            props.setFriends(response.data.friends);
            props.setUpdate(!props.update);
        }catch(error){
            console.log("REMOVE FRIEND DID NOT WORK")
        }
    }

    return (
        <div className="users">
            <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="search friends"/>
            {props.friends && props.friends.filter(word => word.username.includes(search)).map((el) => (
                <div key={el._id} className="user">
                    <button onClick={(e) => removeFriend(el)}>remove</button>
                    <h4>{el.username}</h4>
                    <p>{el.firstName ? el.firstName[0].toUpperCase() + el.firstName.substring(1,) : ''} {el.lastName ? el.lastName[0].toUpperCase() + el.lastName.substring(1,) : ''}</p>
                </div >
            ))}
        </div>
    )
}