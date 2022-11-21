import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserHome(props){
    const storedInfo = {usrName: localStorage.getItem('name'), 
                        usrMessage: localStorage.getItem('message'),
                        };
    const navigate = useNavigate();
    const [name, setName] = useState(storedInfo.usrName ? storedInfo.usrName : 0);
    const [message, setMessage] = useState(storedInfo.usrMessage ? storedInfo.usrMessage : 0);
    const [edit, setEdit] = useState(true);
    
    function signOut(){
        localStorage.clear();
        navigate('/');
        // window.history.pushState(null, document.title, window.location.href);
        //   window.addEventListener('popstate', function(event) {
        //     window.history.pushState(null, document.title, window.location.href);
        //   });
        
    }
    
    async function deleteAcc(){
        try{
            const response = await axios.delete(`/api/user/${localStorage.getItem('id')}`);
            navigate('/');
        }catch(error){

        }
    }

    async function updateMessageDB(){
        try{
            const response = await axios.put("/api/user/messageField", {_id: localStorage.getItem('id'), message: message});
            // setMessage(response.data.message);
        }catch(error){
            console.log("didnt work");
        }
    }
    async function getInfo(){
        try{
            // console.log(props.curUser.id);
            const response = await axios.get(`/api/user/${props.curUser.id}`);
            localStorage.setItem('id', response.data[0]._id ? response.data[0]._id : localStorage.getItem('id'));
            setMessage(response.data[0].message);
            setName(response.data[0].name);
        }catch(error){
            console.log("ERROR WITH GET");
        }
        
    }

    useEffect(() => {
        getInfo();
        localStorage.setItem('name', name);
        localStorage.setItem('message', message);
    }, [message, name])

    //if (!edit) updateMessageDB()
    return (
        <div>
            <div>
            <div className="page">
                <div>
                    <button onClick={(e)=>deleteAcc()}>DELETE ACCOUNT</button>
                    <button onClick={(e)=>signOut()}>Sign Out</button>
                </div>
                {edit ? (
                    <>
                        <h1>Welcome back {name}!</h1>
                        <h2>Write Some Stuff</h2>
                        <p>{message}</p>
                        <button onClick={(e) => {setEdit(!edit)}}>Edit</button>
                    </>
                ) : (
                    <>
                        <h1>Welcome back {name}!</h1>
                        <h2>Write Some Stuff</h2>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)}>{message}</textarea>
                        <button onClick={(e)=>{updateMessageDB(); setEdit(!edit)}}>Save</button>
                    </>
                )}
                </div>
            </div>
        </div>
    )
}