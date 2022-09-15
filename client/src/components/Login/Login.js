import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import userBlocked from "../../images/userBlocked.png";
import "./logIn.css";
import { LogInActionApi } from "../../redux/actions/LogInActions";

function Login() {
  const [isOpenModal, openedModal, closeModal] = useModal(true);
  const [loginData, setloginData] = useState({
    username: "",
    password: "",
    error: "",
  });

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
    <form onSubmit={(e) => handleSubmit(e)} className="form_login">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        onChange={(e) => handleUserName(e)}
      ></input>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        onChange={(e) => handlePassword(e)}
      ></input>
      <button type="submit">Log In</button>
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
                <button className="modal-blocked-contact" onClick={closeModal}>
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
          <p>{loginData.error}</p>
        )
      ) : null}
    </form>
  );
}

export default Login;
