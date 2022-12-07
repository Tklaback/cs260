import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/home.css'

export default function Users(props){
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(()=> {
        async function fetchData(){
            try {
                const response = await axios.get('/user/users');
                setUsers(response.data);
            }catch(error){
                console.log("DIDNT work");
            }
        }
        fetchData();
    }, [])

    const addFriend = (friend) => {
        
    }

    return (
        <div className="users">
            <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="search users"/>
            {users && users.filter(word => word.username.includes(search)).map((el) => (
                <div key={el._id}>
                    <button onClick={(e) => addFriend(el)}>add</button>
                    <p >{el.username}</p>
                </div >
            ))}
        </div>
    )
}