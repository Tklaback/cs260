import { useLocation, Link } from "react-router-dom";
export default function Home(props){
    var userObject = props.currentUser;
    if (typeof(userObject) == 'string'){
        userObject = JSON.parse(userObject);
    }
    if (props.loggedIn){
        return (
            <>
                <h1>Welcome Back {userObject.username}!</h1>
                <Link to="/edit">Edit</Link>
            </>
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