import { Link, useNavigate } from 'react-router-dom';

export default function Nav(props){
    const navigate = useNavigate();
    const onSignout = (e) => {
        e.preventDefault();
        localStorage.clear();
        props.setLoggedIn(false);
        navigate('/');
    }

    return (
        <>
            <div className="nav-bar">
                <Link to="/">Home</Link>
                {!props.isLoggedIn && (
                    <>
                        <Link to="/signup">Sign up</Link>
                        <Link to="/signin">Sign In</Link>
                    </>
                )}
                {props.isLoggedIn && (
                    <>
                        <button onClick={onSignout}>Sign out</button>
                    </>
                )}
            </div>
        </>
    )
}