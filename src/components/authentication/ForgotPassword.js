import "../../css/Form.css";
import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function ForgotPassword() {
    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setMessage('Chech your inbox for further instructions.')
            
        } catch {
            setError('Failed to reset password.')
        }

        setLoading(false);
    }
    return(
        <div className="Form">
            

            <form className="form" onSubmit={handleSubmit}>
                <h3 className="error">{error}</h3>
                
                <h3 className="message">{message}</h3>
                
                <h2>PASSWORD RESET</h2>

                <div className="input-form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" ref={emailRef} required></input>
                </div>

                <button type="submit" disabled={loading}>RESET PASSWORD</button>

                <h3><Link to="/login">Login</Link></h3>
                
            </form>

            <h3 className="extra-text">Need an account?
                <Link to="/sign-in">&nbsp;Sign In</Link>
            </h3>
        </div>
    )
}

export default ForgotPassword;