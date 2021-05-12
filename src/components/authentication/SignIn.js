import "../../css/Form.css";
import React, {useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function Signin() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {signin} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match.');
        }

        try {
            setError('');
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value);
            history.push("/personal-area");
        } catch {
            setError('Failed to create an account.')
        }

        setLoading(false);
    }

    return(
        <div className="Form">
            

            <form className="form" onSubmit={handleSubmit}> 
                <h3 className="error">{error}</h3>

                <h2>SIGN IN</h2>

                <div className="input-form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" ref={emailRef} required></input>
                </div>

                <div className="input-form">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" ref={passwordRef} minlength="6" required></input>
                </div>

                <div className="input-form">
                    <label htmlFor="confirm-password">Confirm password:</label>
                    <input type="confirm-password" id="confirm-password" name="confirm-password" ref={confirmPasswordRef} required></input>
                </div>

                <button disabled={loading} type="submit">SIGN IN</button>
                
            </form>

            <h3 className="extra-text">Already have an account?
                <Link to="/login">&nbsp;Login</Link>
            </h3>
        </div>
    )
}

export default Signin;