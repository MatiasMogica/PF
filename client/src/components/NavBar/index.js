import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavLinkHome,
  NavLinkAdmin,
} from "./NavBarStyle";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogOut from "../LogOut/LogOut";
import { CartIcon } from "../../icons/Icons";
import "./index.css";
import { useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { getFriendRequests } from "../../redux/actions/ProfileActions";

import settingslogo from "../../icons/settings.ico";
export default function NavBar({ usuario }) {
  const user = useSelector((state) => state.logIn.logIn);
  const friendRequests = useSelector((state) => state.profile.friendRequests);
  const { pathname } = useLocation();
  let { amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id) {
      dispatch(getFriendRequests(user.id));
    }
  }, [user.id, dispatch]);

  const history = useHistory();

  return (
    //

    <>
      {pathname === "/adminPanel" ? (
        <Container>
          <ProfileContainer>
            <Avatar src={user.image} />
            <Name>{user.username}</Name>
            <Div>
              <LogOut></LogOut>
            </Div>
          </ProfileContainer>
          <NavMenuAdmin>
            <NavLinkHome to="/home">
              <AiOutlineHome />
              <HLinks>Home</HLinks>
            </NavLinkHome>
            <div className="user">
              <BtnUser onClick={usuario}>
                <FiUsers color="white" />
                <HLinks>Users</HLinks>
              </BtnUser>
            </div>
            <NavLink to="/videogame/add">
              <IoGameControllerOutline />
              <HLinks>Create</HLinks>
            </NavLink>
          </NavMenuAdmin>
        </Container>
      ) : (
        <Nav>
          <NavLink to="/">
            <h1>ZTEAM</h1>
          </NavLink>
          <Bars />
          <NavMenu>
            <NavLinkHome to="/home">Home</NavLinkHome>
            <NavLink to="/videogame/wishList">WishList</NavLink>
            <div className="cartIcon">
              <NavLink to="/cart">
                <CartIcon />
                {amount}
              </NavLink>
            </div>
          </NavMenu>
          <NavBtn>
            {user.status ? (
              <div className="navbar_agrege_notificacion_amigos">
                {friendRequests.length > 0 ? (
                  <div>
                    <div className="userMenu">
                      New Friend Request
                      <div className="dropdownmenu">
                        {friendRequests.map((x) => (
                          <div key={x}>
                            <NavLink to={`/profile/${x}`}>
                              Someone Wants to be your friend!
                            </NavLink>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="userMenu">
                  <NavLink to={`/profile/${user.id}`}>{user.username}</NavLink>
                  <div className="dropdownmenu">
                    <div className="Settingsprofile">
                      <img
                        src={settingslogo}
                        alt="settings"
                        className="settingslogo"
                      ></img>
                      <NavLinkAdmin to={`/settings`}>Settings</NavLinkAdmin>
                    </div>
                    <div className="LogOut">
                      <LogOut></LogOut>
                    </div>
                  </div>
                  {user.admin ? (
                    <NavLinkAdmin to="/adminPanel">Admin Panel</NavLinkAdmin>
                  ) : null}
                </div>
              </div>
            ) : (
              <NavBtnLink to="/signIn">Sign In</NavBtnLink>
            )}
          </NavBtn>
        </Nav>
      )}
    </>
  );
}
const Container = styled.div`
  width: 20%;
  min-height: 97vh;
  border-radius: 2rem;
  background-color: #545479;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  align-self: flex-start;
  position: sticky;
  top: 0.7rem;
  overflow: hidden;
  width: 20%;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Avatar = styled.img`
  height: 7rem;
  border-radius: 6rem;
  margin-top: 20%;
`;
const Name = styled.h3`
  color: white;
  font: 0.5rem;
  font-weight: 400;
  margin: 0.8rem 0 0.5rem 0;
`;
const Div = styled.div`
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  font-weight: 500;
  color: white;
  background-color: #5a8dd4;
  cursor: pointer;
`;
const NavMenuAdmin = styled.div`
  heigth: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  display: flex;
  background-color: #545479;
  flex-direction: column;
  line-height: 3rem;
  &:hover {
    color: #81e6d9;
  }
`;
const HLinks = styled.h3`
  padding-left: 0.5rem;
  color: #ffffff;
  &:hover {
    color: #81e6d9;
  }
`;
const BtnUser = styled.button`
  border: none;
  background-color: transparent;
  color: #FFFFF;
  cursor: pointer;
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;
