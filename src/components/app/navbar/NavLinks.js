import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import NavLinksIfLogged from "./NavLinksIfLogged";
import {CSSTransition} from "react-transition-group";

export default function NavLinks(props) {
    const navMobileState = useSelector(state => state);
   
    return (  
        <CSSTransition
        in={navMobileState}
        timeout={300}
        classNames="Links"
        >
            <ul className="Links">
                <CSSTransition
                    in={navMobileState}
                    timeout={600}
                    classNames="nav-links"
                >
                    <li className="nav-link" onClick = {() => props.isMobile && props.closeMobileMenu()}><Link to="/">HOME</Link></li>
                </CSSTransition>

                <CSSTransition
                    in={navMobileState}
                    timeout={700}
                    classNames="nav-links"
                >
                    <li className="nav-link" onClick = {() => props.isMobile && props.closeMobileMenu()}><Link to="/about">ABOUT</Link></li>
                </CSSTransition>

                <NavLinksIfLogged isMobile = {props.isMobile} closeMobileMenu = {props.closeMobileMenu}/>
            </ul>
        </CSSTransition>
    )
}
