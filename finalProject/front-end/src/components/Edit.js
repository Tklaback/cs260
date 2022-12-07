import axios from "axios"
import { useState, useEffect } from "react"

export default function Edit(props){
    var userObject = props.currentUser;
    if (typeof(userObject) == 'string'){
        userObject = JSON.parse(userObject);
    }
    const [email, setEmail] = useState('');
    console.log()

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
            const response = await axios.put('/user/edit', {username: userObject.username, email : email})
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        setEmail(userObject.email);
    }, [])

    return (
        <form onSubmit={onSubmit}>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="email" />
            <button type="submit">Submit</button>
        </form>
    )
}