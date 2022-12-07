import axios from "axios"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";

export default function Edit(props){
    var userObject = props.currentUser;
    const navigate = useNavigate();
    if (typeof(userObject) == 'string'){
        userObject = JSON.parse(userObject);
    }
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
            const response = await axios.put('/user/edit', 
            {
                _id: userObject._id, 
                email : email,
                bio: bio,
                firstName: firstName,
                lastName: lastName,
                phone: phone
            })
            localStorage.setItem('user', JSON.stringify(response.data))
            props.setCurrentUser(response.data);
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        setEmail(userObject.email);
        setBio(userObject.bio);
        setFirstName(userObject.firstName);
        setLastName(userObject.lastName);
        setPhone(userObject.phone);
    }, [])

    return (
        <>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="email" />
            <textarea type="text" onChange={(e)=>setBio(e.target.value)} value={bio} placeholder="Bio"></textarea>
            <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName} placeholder="First Name"></input>
            <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName} placeholder="Last Name"></input>
            <input type="text" onChange={(e)=>setPhone(e.target.value)} value={phone} placeholder="phone"></input>
            <button type="submit" onClick={onSubmit}>Submit</button>
        </>
    )
}