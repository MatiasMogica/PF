import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import LogOut from "../LogOut/LogOut";
import React from "react";
import image from "../../images/logo.png";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavLinkLogo,
} from "./NavBarStyle";

export default function NavBar() {
  const user = useSelector((state) => state.videogames.logIn);

  return (
    <div className={"navContainer"}>
      <div className="left_container">
        <button className={"button"} onClick={""}>
          {"Go Back"}
        </button>
        <Link to="/" className={"linkStyle"}>
          Home
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
            <div className="userMenu">
              <Link to="/user" className={"linkStyle"}>
                {user.user}
              </Link>
              <div className="dropdownmenu">
                <div className="LogOut">
                  <LogOut></LogOut>
                </div>
                {user.admin ? (
                  <Link to="/adminPanel" className="adminpanel">
                    Admin Panel
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <NavBtn>
            <NavBtnLink to="/login">Sign In</NavBtnLink>
          </NavBtn>
        )}
      </div>
    </div>
  );
}








// <>

        //     <nav className="navBar">
        //         <h2 className="logo">Logo<span className="span">app</span></h2>
        //         <ul>
        //             <li><a href=''>Create game</a></li>
        //             <li><a href=''>Wish List</a></li>
        //             <li><a href=''>Contact</a></li>
        //         </ul>
        //         <button className="boton">Login</button>
        //     </nav>

        // </>