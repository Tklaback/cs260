import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/home.css'

export default function Users(props){
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(()=> {
        async function fetchData(){
            try {
                const response = await axios.get('/user/users', {params: {username: props.currentUser.username}});
                setUsers(response.data);
            }catch(error){
                console.log("DIDNT work");
            }
        }
        fetchData();
    }, [])

    const addFriend = async (friend) => {
        try{
            const response = await axios.put('/user/friend', {
                _id: props.currentUser._id, 
                friendId: friend._id,
            })
            props.setUpdate(!props.update);
            console.log(response.data);
        }catch(error){
            console.log("Add friend didn't work");
        }
    }

    function inFriends(username){
        if (props.friends){
            for (let friendObject of props.friends){
                if(friendObject.username === username){
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    return (
        <div className="users">
            <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="search users"/>
            {users && users.filter(word => word.username.includes(search)).map((el) => (
                <div key={el._id}>
                    {!inFriends(el.username) &&
                    <>
                        <button onClick={(e) => addFriend(el)}>add</button>
                        <div className="user">
                            <h4>{el.username}</h4>
                            <p>{el.firstName ? el.firstName[0].toUpperCase() + el.firstName.substring(1,) : ''} {el.lastName ? el.lastName[0].toUpperCase() + el.lastName.substring(1,) : ''}</p>
                        </div>
                    </>
                    }
                </div >
            ))}
        </div>
    )
}