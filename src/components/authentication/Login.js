import "../../css/Form.css";
import React, {useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError('Failed to login.')
        }

        setLoading(false);
    }

    return(
        <div className="Form">
            

            <form className="form" onSubmit={handleSubmit}>
                <h3 className="error">{error}</h3>

                <h2>LOGIN</h2>

                <div className="input-form">
                    <label f
                    htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" ref={emailRef} required></input>
                </div>

                <div className="input-form">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" ref={passwordRef} required></input>
                </div>

                <button type="submit" disabled={loading}>LOGIN</button>
                <h3><Link to="/forgot-password" >Forgot password?</Link></h3>
            </form>

            <h3 className="extra-text">Need an account?
                <Link to="/sign-in">&nbsp;Sign In</Link>
            </h3>
        </div>
    )
}

export default Login;