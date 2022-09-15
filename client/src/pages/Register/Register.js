import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modals from "../../components/Modals";
import { useModal } from "../../components/Modals/useModal";
import register from '../../images/register.png'
import './ModalRegister.css'
import "./Register.css";

export default function Register() {
  const [isOpenModal, openedModal, closeModal] = useModal(false)
  const [newUser, setNewUser] = useState({
    image: { value: "", error: "" },
    userName: { value: "", error: "" },
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: {
      password: "",
      error: "",
      identical: false,
    },
    api: { creado: false, error: "" },
  });

  async function handleImage(e) {
    const formData = new FormData();

    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "gu6gzzkc");

    await fetch("https://api.cloudinary.com/v1_1/dhyz4afz7/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setNewUser({
          ...newUser,
          image: { value: data.secure_url, error: "" },
        });
      })

      .catch((err) =>
        setNewUser({
          ...newUser,

          image: {
            value: "",
            error:
              "An error occurred while uploading the image, please try again",
          },
        })
      );
  }

  function handleUserName(e) {
    if (
      e.target.value.length < 50 &&
      e.target.value.length > 2 &&
      /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test(
        e.target.value
      )
    ) {
      setNewUser({
        ...newUser,
        userName: { value: e.target.value, error: "" },
      });
    } else {
      setNewUser({
        ...newUser,
        userName: {
          value: "",
          error:
            "It should have between 6 and 18 characters, only contain letter,number",
        },
      });
    }
  }

  function handleName(e) {
    if (e.target.value.length < 50 && e.target.value.length > 2) {
      setNewUser({
        ...newUser,
        name: { value: e.target.value, error: "" },
      });
    } else {
      setNewUser({
        ...newUser,
        name: {
          value: "",
          error: "It should have between 2 and 50 characters",
        },
      });
    }
  }

  function handleEmail(e) {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setNewUser({
        ...newUser,
        email: {
          value: e.target.value,
          error: "",
        },
      });
    } else {
      setNewUser({
        ...newUser,
        email: {
          value: "",
          error: "Please Enter a valid email direction",
        },
      });
    }
  }
  function handlePassword(e) {
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(e.target.value)) {
      setNewUser({
        ...newUser,
        password: {
          password: e.target.value,
          error: "",
        },
      });
    } else {
      setNewUser({
        ...newUser,
        password: {
          password: "",
          error:
            "Password must have, one digit, one lowercase character, one uppercase character and be at least 8 characters in length but no more than 32",
        },
      });
    }
  }
  function handleConfirmPassword(e) {
    if (newUser.password.password === e.target.value) {
      setNewUser({
        ...newUser,
        password: {
          ...newUser.password,
          identical: true,
        },
      });
    } else {
      setNewUser({
        ...newUser,
        password: {
          ...newUser.password,
          identical: false,
        },
      });
    }
  }

  function handleButton() {
    if (
      !newUser.email.error &&
      !newUser.name.error &&
      !newUser.userName.error &&
      !newUser.image.error &&
      !newUser.password.error &&
      newUser.password.identical
    ) {
      return (
        <button type="submit" className="buttonregister" onClick={openedModal}>
          Register
        </button>
      );
    } else {
      return (
        <button type="submit" className="buttonregister" disabled>
          Register
        </button>
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, userName, email, password, image } = newUser;

    const arg = {
      name: name.value,
      username: userName.value,
      email: email.value,
      password: password.password,
      image: image.value,
    };

    await fetch(`http://localhost:3001/users/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setNewUser({
            image: { value: "", error: "" },
            userName: { value: "", error: "" },
            name: { value: "", error: "" },
            email: { value: "", error: "" },
            password: {
              password: "",
              error: "",
              confirmPassword: "",
              identical: false,
            },
            api: { creado: true, error: "" },
          });
          document.getElementById("register_username").value = "";
          document.getElementById("register_name").value = "";
          document.getElementById("register_email").value = "";
          document.getElementById("register_password").value = "";
          document.getElementById("register_password_confirm").value = "";
          document.getElementById("register_image").value = "";
        } else {
          setNewUser({
            ...newUser,
            api: { creado: false, error: data.error },
          });
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="register-boty">
      <NavBar />
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Registration Form</h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="register_username">Username:</label>
            <div className="input_field">
              <span>
                <i aria-hidden="true" className="fa fa-lock"></i>
              </span>
              <input
                id="register_username"
                type="text"
                onChange={(e) => handleUserName(e)}
              ></input>
            </div>

            {newUser.userName.error ? (
              <p className="register_error">{newUser.userName.error} </p>
            ) : null}

            <label htmlFor="register_name">Name:</label>
            <div className="input_field">
              <span>
                <i aria-hidden="true" className="fa fa-lock"></i>
              </span>
              <input
                id="register_name"
                type="text"
                onChange={(e) => handleName(e)}
              ></input>
            </div>

            {newUser.name.error ? (
              <p className="register_error">{newUser.name.error} </p>
            ) : null}

            <label htmlFor="register_email">Email:</label>
            <div className="input_field">
              <span>
                <i aria-hidden="true" className="fa fa-lock"></i>
              </span>
              <input
                id="register_email"
                type="email"
                onChange={(e) => handleEmail(e)}
              ></input>
            </div>
            {newUser.email.error ? (
              <p className="register_error">{newUser.email.error} </p>
            ) : null}

            <label htmlFor="register_password">Password:</label>
            <div className="input_field">
              <span>
                <i aria-hidden="true" className="fa fa-lock"></i>
              </span>
              <input
                id="register_password"
                type="password"
                onChange={(e) => handlePassword(e)}
              ></input>
            </div>
            {newUser.password.error ? (
              <p className="register_error">{newUser.password.error} </p>
            ) : null}

            <label htmlFor="register_password_confirm">Confirm Password:</label>
            <div className="input_field">
              <span>
                <i aria-hidden="true" className="fa fa-lock"></i>
              </span>
              <input
                id="register_password_confirm"
                type="password"
                onChange={(e) => handleConfirmPassword(e)}
              ></input>
            </div>
            {newUser.password.identical ? null : newUser.password.password
                .length > 1 ? (
              <p className="register_error">Passwords dont match</p>
            ) : null}

            <label htmlFor="register_image">Image:</label>
            <div className="input_field">
              <span>
                <i aria-hidden="true" className="fa fa-lock"></i>
              </span>
              <input
                id="register_image"
                type="file"
                onChange={(e) => handleImage(e)}
              ></input>
            </div>
            {newUser.image.value ? (
              <img src={newUser.image.value} alt="your profile"></img>
            ) : (
              <p className="register_error">{newUser.image.value} </p>
            )}

            {handleButton()}
            {newUser.api.error ? (
              <p>{newUser.api.error}</p>
            ) : newUser.api.creado ? (
               //<p>Creado con exito</p>
               <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
               <h2 className="modal-register-title">Welcome to ZTEAM!</h2>
               <img src={register} alt="register" className="modal-register-img"/>
               <p className="modal_text">Thank you for joining our community, explore and download the video games that you like the most!</p>
               <button className='modal-register-close' onClick={closeModal}>CLOSE</button>
              </Modals>
            ) : null}
          </form>
          <div>
            <p>
              Or{" "}
              <Link to="/signIn" className="linkstyleregister">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
