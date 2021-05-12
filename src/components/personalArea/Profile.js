import "../../css/Form.css";
import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function Profile() {
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.push('/login');
        } catch {
            setError('Failed to logout.')
        }
    }

    return(
        <div className="Form">
            <div className="form" >
                <h3 className="error">{error}</h3>

                <h2>ACCOUNT</h2>

                <h3>Email: {currentUser.email}</h3>

                <h3><Link to="/update-profile" >Update profile</Link></h3>
                
                <button type="button" onClick={handleLogout}>LOGOUT</button>   
            </div>   
        </div>
    )
}

export default Profile;