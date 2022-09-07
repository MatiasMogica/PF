import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import React from "react";
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink,NavLinkLogo} from './NavBarStyle'



export default function NavBar() {

  const user = useSelector((state) => state.videogames.logIn);

        <Nav>
            <NavLinkLogo to='/'>
                <h1>ZTEAM</h1>
            </NavLinkLogo>
            <Bars/>
            <NavMenu>                                  
                <NavLink to="/videogame/add" >
                    Create
                </NavLink>
                <NavLink to="/videogame/signUp" >
                    Sign Up
                </NavLink>               
            </NavMenu>
            <NavBtn>
            {user.status ? (
            <NavLink to="/videogame/wishList" >
                    WishList
            </NavLink>
            <NavLink to="/user">
              {user.user}
            </NavLink>
        ) : (
          <NavBtn>
            <NavBtnLink to="/login">
              Sign In
            </NavBtnLink>
          </NavBtn>
        )}
        </Nav>
        </>
    )
}