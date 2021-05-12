import React, {useState, useContext, useEffect} from 'react';
import {auth} from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = props => {
    const [currentUser, setCorrentUser] = useState('');
    const [loading, setLoading] = useState(true);

    function signin(email, password) {
        return auth.createUserWithEmailAndPassword(email,password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCorrentUser(user);
            setLoading(false);
        }) 
        
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signin,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return(
        <div>
            <AuthContext.Provider value={value}>
                {!loading && props.children}
            </AuthContext.Provider>
        </div>
    )
}