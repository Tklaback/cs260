import axios from "axios"
import { useState, useEffect } from "react"

export default function Edit(props){
    var userObject = props.currentUser;
    if (typeof(userObject) == 'string'){
        userObject = JSON.parse(userObject);
    }
    const [email, setEmail] = useState(userObject.email ? userObject.email : '');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/user/edit', {email : email})
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }




    return (
        <form onSubmit={onSubmit}>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="email" />
            <button>Submit</button>
        </form>
    )
}