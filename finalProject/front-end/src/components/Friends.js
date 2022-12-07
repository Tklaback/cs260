import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/home.css'

export default function Friends(props){
    const [friends, setFriends] = useState([]);

    useEffect(()=> {
        async function fetchData(){
            try {
                const response = await axios.get('/user/friends');
                setFriends(response.data);
            }catch(error){
                console.log("Friends DIDNT work");
            }
        }
        fetchData();
    }, [])

    const removeFriend = (friend) => {
        
    }

    return (
        <div className="users">
            <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="search users"/>
            {friends && users.filter(word => word.username.includes(search)).map((el) => (
                <div key={el._id}>
                    <button onClick={(e) => removeFriend(el)}>add</button>
                    <p >{el.username}</p>
                </div >
            ))}
        </div>
    )
}