import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Nav1,
  NavLink,
  NavLinkHome,
  NavLinkAdmin,
  NavLink1,
  NavBtn,
} from "./NavBarStyle";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogOut from "../LogOut/LogOut";
import "./index.css";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { IncomingRequestsGetData } from "../../redux/actions/friendActions";
import menu from "../../images/menu.png";
import SearchBar from "../SearchBar/SearchBar";
import NavBarLogIn from "../NavBarLogin/NavBarLogIn";
import Dropdown from "react-bootstrap/Dropdown";
import bell from "../../icons/bell.png";
import settingslogo from "../../icons/settings.ico";
import Logo from "../Logo/Logo";

export default function NavBar({ usuario }) {
  const user = useSelector((state) => state.logIn.logIn);
  const friendRequests = useSelector((state) => state.friend.incomingRequests);
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    history.replace("/");
  };

  useEffect(() => {
    let menu = document.querySelector(".menu-icon");
    let navbar = document.querySelector(".menu");
    menu.onclick = () => {
      navbar.classList.toggle("active");
      menu.classList.toggle("move");
    };
  }, []);

  useEffect(() => {
    if (user.id) {
      dispatch(IncomingRequestsGetData({ id: user.id }));
    }
  }, [user.id, dispatch]);

   
  
    
  return (
    //

    <>
      {pathname === "/adminPanel" ? (
        <Container>
          <ProfileContainer>
            <Avatar src={user.image} />
            <Name>{user.username}</Name>
            <Div>
              {" "}
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
            <NavLink1 to="/videogame/add">
              <IoGameControllerOutline />
              <HLinks>Create</HLinks>
            </NavLink1>
          </NavMenuAdmin>
        </Container>
      ) : (
        <Nav1>
          {/* <div className="menu-logo">
<section class="dark">
<div class="circle_black">
				<p>Menu</p>
		</div>
</section>

          </div> */}
          <div className="menu-icon">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>

          <div className="menu">
            <img src={menu} alt="Cyberpunk image" />
            <div className="nnavbar">
              <Link to="/" className="links">
                <span>Home</span>
              </Link>
              <Link to="/wishList" className="links">
                <span>Wish list</span>
              </Link>
              <Link to="/cart" className="links">
                <span>Cart</span>
              </Link>
            </div>
          </div>

          <Logo />

          {/* <NavLink1 to="/">
          <h1>ZTEAM</h1>
        </NavLink1> */}
          {/* <Bars /> */}

          {/* <NavLinkHome to="/home">Home</NavLinkHome>
          <NavLink1 to="/videogame/wishList">WishList</NavLink1>
          <div className="cartIcon">
            <NavLink1 to="/cart" >
              <CartIcon />
              {amount}
            </NavLink1>
          </div> */}
          
          

          <NavBtn>
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
                          {friendRequests.map((x) => (
                            <s className="dropdown-item" key={x[0]}>
                              <NavLink to={`/profile/${x[0]}`}>
                                {x[2] + " Wants to be your Friend!"}
                              </NavLink>
                            </s>
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
                    {user.username.length > 0
                      ? user.username
                      : "Error Loading Username"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <s className="dropdown-item">
                      <NavLinkAdmin to={`/profile/${user.id}`}>
                        <div className="just_white_text">Your Profile</div>
                      </NavLinkAdmin>
                    </s>
                    <s className="dropdown-item">
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
                    </s>
                    {user.admin ? (
                      <s className="dropdown-item">
                        <NavLinkAdmin to="/adminPanel">
                          <div className="just_white_text">Admin Panel</div>
                        </NavLinkAdmin>
                      </s>
                    ) : null}

                    <s className="dropdown-item">
                      <LogOut></LogOut>
                    </s>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <NavBarLogIn />
            )}
          </NavBtn>
        </Nav1>
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
