import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import image from "../../images/logo.png";
import { useSelector } from "react-redux";
import "./index.css";

import React from "react";
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink,NavLinkLogo} from './NavBarStyle'



export default function NavBar() {
  let history = useHistory();
  const user = useSelector((state) => state.videogames.logIn);

  function handleClick() {
    history.goBack();
  }


  return (
    <div className={"navContainer"}>
      <div className="left_container">
        <button className={"button"} onClick={handleClick}>
          {"<Go Back"}
        </button>
        <Link to="/" className={"linkStyle"}>
          Home
        </Link>
        <Link to="/videogame/add" className={"linkStyle"}>
          Create game
        </Link>
      </div>
      <div>
        <img className="logo" src={image} alt="logo" />
      </div>
      <div className="right_container">
        <Link className={"linkStyle"}>Contact</Link>
        {user.status ? (
          <div className="logedin">
            <Link className={"linkStyle"}>Wish List</Link>
            <Link to="/user" className={"linkStyle"}>
              {user.user}
            </Link>
          </div>
        ) : (
          <div className="right_container">
            <Link to="/login" className={"linkStyle"}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

