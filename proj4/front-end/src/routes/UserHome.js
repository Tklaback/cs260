import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserHome(props){
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [edit, setEdit] = useState(true);
    
    async function updateMessageDB(){
        try{
            const response = await axios.put("/api/user/messageField", {_id: props.curUser.id, message: message});
            // setMessage(response.data.message);
        }catch(error){
            console.log("didnt work");
        }
    }
    async function getInfo(){
        try{
            // console.log(props.curUser.id);
            const response = await axios.get(`/api/user/${props.curUser.id}`);
            console.log(response.data)
            setMessage(response.data[0].message);
        }catch(error){
            console.log("ERROR WITH GET");
        }
        
    }

    useEffect(() => {
        getInfo();
    }, [])

    //if (!edit) updateMessageDB()
    return (
        <div>
            <h1>Welcome back {props.curUser.name}!</h1>
            <div>
                {edit ? (
                    <div>
                        <p>{message}</p>
                        <button onClick={(e) => {setEdit(!edit)}}>Edit</button>
                    </div>
                ) : (<div>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)}>{message}</textarea>
                        <button onClick={(e)=>{updateMessageDB(); setEdit(!edit)}}>Save</button>
                    </div>
                )}
            </div>
            
        </div>
    )
}