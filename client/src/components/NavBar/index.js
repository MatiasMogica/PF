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
import Dropdown from "react-bootstrap/Dropdown";
import settingslogo from "../../icons/settings.ico";
import bell from "../../icons/bell.png";
import NavBarLogIn from "../NavBarLogin/NavBarLogIn";

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
          {user.status ? (
            <div className="menu_user_loged_navbar">
              {friendRequests.length > 0 ? (
                <div>
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle id="bell" variant="secondary">
                        <div>
                          <div className="number_bell_notifications">
                            {friendRequests.length}
                          </div>
                          <img
                            src={bell}
                            alt="no notifications"
                            className="bell_notification"
                          ></img>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu variant="dark">
                        {friendRequests.map((x, i) => (
                          <div key={x}>
                            <Dropdown.Item href={"#/action-" + i} active>
                              <NavLink to={`/profile/${x}`}>
                                Friend Request
                              </NavLink>
                            </Dropdown.Item>
                          </div>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              ) : (
                <img
                  src={bell}
                  alt="no notifications"
                  className="bell_notification"
                ></img>
              )}

              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                >
                  {user.username || "Error Loading Username"}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                  <Dropdown.Item href="/" active>
                    <NavLinkAdmin to={`/profile/${user.id}`}>
                      <div className="just_white_text">Your Profile</div>
                    </NavLinkAdmin>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-1" active>
                    <NavLinkAdmin to={`/settings`}>
                      <div className="just_white_text">
                        <img
                          src={settingslogo}
                          alt="settings"
                          className="settings_logo"
                        ></img>
                        Settings
                      </div>
                    </NavLinkAdmin>
                  </Dropdown.Item>
                  {user.admin ? (
                    <Dropdown.Item href="#/action-1" active>
                      <NavLinkAdmin to="/adminPanel">
                        <div className="just_white_text">Admin Panel</div>
                      </NavLinkAdmin>
                    </Dropdown.Item>
                  ) : null}

                  <Dropdown.Item href="#/action-1" active>
                    <LogOut></LogOut>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <NavBarLogIn />
          )}
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
