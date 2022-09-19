import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavLinkHome,
  NavLinkAdmin,
} from "./NavBarStyle";
import NavBarAdmin from "./NavBarAdmin"
import { useDispatch, useSelector } from "react-redux";
import LogOut from "../LogOut/LogOut";
import { CartIcon } from "../../icons/Icons";
import "./index.css";
import { useLocation } from "react-router-dom";
import { IncomingRequestsGetData } from "../../redux/actions/friendActions";
import Dropdown from "react-bootstrap/Dropdown";
import settingslogo from "../../icons/settings.ico";
import bell from "../../icons/bell.png";
import NavBarLogIn from "../NavBarLogin/NavBarLogIn";

export default function NavBar() {
  const user = useSelector((state) => state.logIn.logIn);
  const friendRequests = useSelector((state) => state.friend.incomingRequests);

  let { amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id) {
      dispatch(IncomingRequestsGetData({ id: user.id }));
    }
  }, [user.id, dispatch]);

  return (
    //
    <>
      
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
                        {friendRequests.map((x) => (
                          <div key={x[0]}>
                            <s className="dropdown-item">
                              <NavLink to={`/profile/${x[0]}`}>
                                {x[2] + " Wants to be your Friend!"}
                              </NavLink>
                            </s>
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
        </Nav>
    
    </>
  );
}

