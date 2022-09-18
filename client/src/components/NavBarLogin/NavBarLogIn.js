import Dropdown from "react-bootstrap/Dropdown";
import "./NavBarLogin.css";
import { Link } from "react-router-dom";
import { LogInActionApi } from "../../redux/actions/LogInActions";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import userBlocked from "../../images/userBlocked.png";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { GoogleLogIn } from "../../redux/actions/LogInActions";

function NavBarLogIn() {
  // eslint-disable-next-line no-unused-vars
  const [isOpenModal, openedModal, closeModal] = useModal(true);
  const [loginData, setloginData] = useState({
    username: "",
    password: "",
    error: "",
  });

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "189786706143-f1m6squ261r1itibbv9fdtupfmb3v9cn.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const googleSuccess = async (res) => {
    dispatch(GoogleLogIn(res));
  };

  const dispatch = useDispatch();

  function handlePassword(e) {
    setloginData({ ...loginData, password: e.target.value });
  }
  function handleUserName(e) {
    setloginData({ ...loginData, username: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const arg = { username: loginData.username, password: loginData.password };
    dispatch(LogInActionApi(arg, setloginData, loginData));
  }

  return (
    <div id="container_navbarlogin">
      <Dropdown>
        <Dropdown.Toggle id="login_navbar_boostrap" variant="secondary">
          Log In
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <form className="px-4 py-3" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="exampleDropdownFormEmail1">Username</label>
              <input
                type="input"
                className="form-control"
                id="exampleDropdownFormEmail1"
                placeholder="Username"
                onChange={(e) => handleUserName(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleDropdownFormPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleDropdownFormPassword1"
                placeholder="Password"
                onChange={(e) => handlePassword(e)}
              />
            </div>
            <div className="form-check"></div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
          <div id="googleLogIn_navbar">
            <GoogleLogin
              clientId="189786706143-f1m6squ261r1itibbv9fdtupfmb3v9cn.apps.googleusercontent.com"
              buttonText="Sign In"
              onSuccess={googleSuccess}
              onFailure={() => {}}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          {loginData.error ? (
            // <p>{loginData.error}</p>
            loginData.error === "User is blocked" ? (
              <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                <h2 className="modal-blocked-title">Error!</h2>
                <img src={userBlocked} alt="blocked" className="modal_img" />
                <p className="modal_text">
                  Your account is blocked. Please contact us
                </p>
                <div className="buttons-blocked-container">
                  <Link to="/contact">
                    <button
                      className="modal-blocked-contact"
                      onClick={closeModal}
                    >
                      CONTACT
                    </button>
                  </Link>
                  {/* Listo xD */}
                  <button className="modal-blocked-close" onClick={closeModal}>
                    CLOSE
                  </button>
                </div>
              </Modals>
            ) : (
              <p className="loginNavBar_error">{loginData.error}</p>
            )
          ) : null}

          <div className="dropdown-divider"></div>

          <s className="dropdown-item">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign Up
            </Link>
          </s>
          <s className="dropdown-item">
            <Link
              to="/Remplazame-Por-la-page-para-recuperar-password-cuando-la-tengas"
              style={{ textDecoration: "none", color: "white" }}
            >
              Forgot Password?
            </Link>
          </s>
          <s className="dropdown-item">
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "white" }}
            >
              Contact
            </Link>
          </s>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default NavBarLogIn;
