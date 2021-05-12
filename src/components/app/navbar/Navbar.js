import "../../../css/Navbar.css";
import icon from "../../../images/icon.png";
import React from "react";
import Navigation from "./Navigation";
import NavigationMobile from "./NavigationMobile";
import {TransitionGroup} from "react-transition-group";


function Navbar() {
    return (
        <div className="Navbar">
            <img src={icon} alt=""/>
            <TransitionGroup>
                <Navigation/>

                <NavigationMobile/>
            </TransitionGroup>
        </div>
    );
}

export default Navbar;