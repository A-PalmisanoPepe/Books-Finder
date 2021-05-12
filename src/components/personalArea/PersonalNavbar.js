import "../../css/PersonalNavbar.css";
import user from "../../images/user.png";
import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function PersonalNavbar() {
  const { currentUser } = useAuth();

  function IsLoggedNav() {
    if (currentUser) {
      return (
        <div className="Personal-navbar">
          <Link to="/profile">
            <img src={user} alt="" className="img-user"/>
            <h4>{currentUser.email}</h4>
          </Link>
        </div>
      );
    } else {
        return(
            null
        )
    }
  }

  return(
    <IsLoggedNav/>
  )
}

export default PersonalNavbar;
