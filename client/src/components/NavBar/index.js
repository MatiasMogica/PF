import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import image from "../../images/logo.png";
import { useSelector } from "react-redux";
import "./index.css";
import LogOut from "../LogOut/LogOut";

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
