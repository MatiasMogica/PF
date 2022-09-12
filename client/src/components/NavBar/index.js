import React, { useState } from "react";
import styled from 'styled-components'
/* import image from "../../images/logo.png" */
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink,NavLinkHome,NavLinkAdmin} from "./NavBarStyle";
/* import { useDispatch, useSelector } from "react-redux"; */
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogOut from "../LogOut/LogOut";
import {CartIcon} from "../../icons/Icons"
import "./index.css";
import { useLocation } from "react-router-dom";
import {AiOutlineShoppingCart,AiOutlineHome} from 'react-icons/ai'
import {FiUsers} from 'react-icons/fi'
import {IoGameControllerOutline} from 'react-icons/io5'
import userIcon from '../../images/user.png'
export default function NavBar({usuario}) {
  /* let {amount} = useSelector((state) => state.cart) */
  const [user] = useState(JSON.parse(localStorage.getItem("email")));
  const userapi = useSelector((state) => state.logIn.logIn);
  const {pathname}=useLocation()
  let { amount } = useSelector((state) => state.cart);

  
  const history = useHistory();
  const logout = () => {
    localStorage.clear();

    history.replace("/");
  };
  return (
    //

    <>
      
      { console.log(pathname)}
      {pathname==='/adminPanel'?
       <Container>
       <ProfileContainer >
           <Avatar src = {userapi.image}/>
           <Name>{userapi.username}</ Name >
           <Div> <LogOut></LogOut></Div>
        </ProfileContainer>
        <NavMenuAdmin>
          <NavLinkHome to="/home">
            <AiOutlineHome/>
            <HLinks>Home</HLinks>
          </NavLinkHome>
          <div className="user">
          <BtnUser onClick={usuario}>
          <FiUsers color='white'/>
          <HLinks>Users</HLinks>
          </BtnUser></div>
          <NavLink to="/videogame/add">
            <IoGameControllerOutline/>
            <HLinks>Create</HLinks>
          </NavLink>
        </NavMenuAdmin>
       
     </Container >
      :(<Nav>
        <NavLink to="/">
          <h1>ZTEAM</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLinkHome to="/home">Home</NavLinkHome>
          <NavLink to="/videogame/wishList">WishList</NavLink>
          <div className="cartIcon">
            <NavLink to="/cart" >
              <CartIcon />
              {amount}
            </NavLink>
          </div>
        </NavMenu>
        <NavBtn>
          {user ? (
            <>
              <h4>{user.user}</h4>
              <NavBtnLink onClick={logout} to="/">
                logout
              </NavBtnLink>
            </>
          ) : userapi.status ? (
            <div className="userMenu">
              <NavLink to="/profile">
                {userapi.username}
              </NavLink>
              <div className="dropdownmenu">
                <div className="LogOut">
                  <LogOut></LogOut>
                </div>
                {userapi.admin ? (
                  <NavLinkAdmin to="/adminPanel">
                    Admin Panel
                  </NavLinkAdmin>
                ) : null}
              </div>
            </div>
          ) : (
            <NavBtnLink to="/signIn">Sign In</NavBtnLink>
          )}
        </NavBtn>
        </Nav>
    )
      
      
      
      }
    </>
  );
}
const Container=styled.div`
width : 20% ;
min-height : 97vh;
border-radius : 2rem ;
background-color :#545479;
display : flex ;
flex-direction : column ;
align-items : center ;
gap:3rem;
align-self : flex-start;
position:sticky;
top:0.7rem;
overflow : hidden;
width:20%;

`

const ProfileContainer=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
`
const Avatar=styled.img`
height :7rem;
border-radius : 6rem;
margin-top:20%;

`
const Name=styled.h3`
color:white;
font:0.5rem;
font-weight:400;
margin:0.8rem 0 0.5rem 0;
`
const Div= styled.div`
  padding : 0.3rem 1rem ;
  border-radius : 1rem ;
  font-weight : 500 ;
  color: white ;
  background-color :#5A8DD4;
  cursor: pointer ;
  `
const NavMenuAdmin=styled.div`
heigth:100% ;
width:100% ;
align-items : center ;
justify-content : center;
border-radius :2rem;
display :flex;
background-color:#545479;
flex-direction: column;
line-height :3rem;
&:hover{

  color:#81E6D9;
}

`
const HLinks=styled.h3`
padding-left:0.5rem;
color: #FFFFFF;
&:hover{
   color:#81E6D9;
}
`
const BtnUser=styled.button`
border:none;
background-color: transparent;
color:#FFFFF;
cursor:pointer;
appearance: none;
display:flex;
justify-content: center;
align-items: center;
font-size:1rem;




`