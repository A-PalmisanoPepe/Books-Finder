import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CSSTransition} from "react-transition-group";
import {openMobileNavBar, closeMobileNavBar} from '../../../actions';
import NavLinks from "./NavLinks";
import {IoMdMenu} from "react-icons/io";
import {IoMdClose} from "react-icons/io";

export default function NavigationMobile() {
    const navMobileState = useSelector(state => state);
    const dispatch = useDispatch();

    const hamburger =   <CSSTransition in={navMobileState} timeout={300} className="hamburger">
                        <IoMdMenu size="40px" color="#220066" onClick={() => dispatch(openMobileNavBar())}/>
                        </CSSTransition>;
    
    const close =   <CSSTransition in={navMobileState} timeout={300} className="close">
                    <IoMdClose size="40px" color="#220066" onClick={() => dispatch(closeMobileNavBar())}/>
                    </CSSTransition>;
     
    const closeMobileMenu = () => dispatch(closeMobileNavBar());

    return (
        <div className="NavigationMobile">
            {navMobileState ? close : hamburger }

            <NavLinks isMobile = {true} closeMobileMenu = {closeMobileMenu}/>  
        </div>
    )
}
