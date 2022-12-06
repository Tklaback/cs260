import { Link } from 'react-router-dom';

export default function Nav(props){
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Sign In</Link>
        </>
    )
}