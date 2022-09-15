import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/slices/logInSlice";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import userBlocked from '../../images/userBlocked.png'
import "./logIn.css";

function Login() {
  const [isOpenModal, openedModal, closeModal] = useModal(true)
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

    await fetch(`http://localhost:3001/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setloginData({
            ...loginData,
            error: data.error,
          });
        } else {
          const logindata = {
            userData: data.userForToken,
            token: data.token,
          };
          dispatch(logIn(logindata));
        }
      });
  }
  console.log(loginData.error)

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
      {loginData.error ? 
      (
      // <p>{loginData.error}</p>
      loginData.error === 'User is blocked' ? 
      <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
      <h2 className="modal-blocked-title">Error!</h2>
      <img src={userBlocked} alt="blocked" className="modal_img"/>
      <p className="modal_text">Your account is blocked. Please contact us</p>
      <div className="buttons-blocked-container">
      <button className='modal-blocked-contact' onClick={closeModal}>CONTACT</button>
      {/* PONER RUTA DE CONTACTO!!!!! */}
      <button className='modal-blocked-close' onClick={closeModal}>CLOSE</button>
      </div>
      </Modals> :
      <p>{loginData.error}</p>
      ):
       null}
    </form>
  );
}

export default Login;
