import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {useAuth} from "../../../context/AuthContext";
import {CSSTransition} from "react-transition-group";

export default function NavLinksIfLogged(props) {
    const { currentUser } = useAuth();
    const navMobileState = useSelector(state => state);

    if (!currentUser) {
        return (
            <CSSTransition
            in={navMobileState}
            timeout={800}
            classNames="nav-links"
            >
                <li className="nav-link" onClick = {() => props.isMobile && props.closeMobileMenu()}> 
                    <Link to="/login">LOGIN</Link>
                </li>
            </CSSTransition>
        )
    } else {
        return (
            <CSSTransition
            in={navMobileState}
            timeout={800}
            classNames="nav-links"
            >
                <li className="nav-link" onClick = {() => props.isMobile && props.closeMobileMenu()}>
                    <Link to="/personal-area">PERSONAL AREA</Link>
                </li>
            </CSSTransition>
        )
    }
}
