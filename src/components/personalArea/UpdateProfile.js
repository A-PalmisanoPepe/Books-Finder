import "../../css/Form.css";
import React, {useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {currentUser, updateEmail, updatePassword} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match.');
        }

        const promises = [];
        setLoading(true);
        setError('');

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/personal-area')
        }).catch(() => {
            setError('Failed to update account.')
        }).finally(() => {
            setLoading(false)
        })
    }

    return(
        <div className="Form">
            

            <form className="form" onSubmit={handleSubmit}>
                <h3 className="error">{error}</h3>

                <h2>UPDATE PROFILE</h2>

                <div className="input-form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" defaultValue={currentUser.email} ref={emailRef} required></input>
                </div>

                <div className="input-form">
                    <label htmlFor="password">New password:</label>
                    <input type="password" id="password" name="password" placeholder="Leave blank to keep the same" ref={passwordRef} minlength="6"></input>
                </div>

                <div className="input-form">
                    <label htmlFor="confirm-password">Confirm new password:</label>
                    <input type="confirm-password" id="confirm-password" name="confirm-password" placeholder="Leave blank to keep the same" ref={confirmPasswordRef}></input>
                </div>

                <button disabled={loading} type="submit">UPDATE</button>
                
            </form>

            <h3 className="extra-text">
                <Link to="/personal-area">Close</Link>
            </h3>
        </div>
    )
}

export default UpdateProfile;