import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [newUser, setNewUser] = useState({
    image: { value: "", error: "Upload your profile photo" },
    userName: { value: "", error: "Your Username" },
    name: { value: "", error: "Your Name" },
    email: { value: "", error: "Your email" },
    password: {
      password: "",
      error:
        "Password must have, one digit, one lowercase character, one uppercase character and be at least 8 characters in length but no more than 32",
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
    if (e.target.value.length < 50 && e.target.value.length > 2) {
      setNewUser({
        ...newUser,
        userName: { value: e.target.value, error: "" },
      });
    } else {
      setNewUser({
        ...newUser,
        userName: {
          value: "",
          error: "It should have between 2 and 50 characters",
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
      !newUser.password.error
    ) {
      return <button type="submit">Register</button>;
    } else {
      return (
        <button type="submit" disabled>
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

    await fetch(`/users/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setNewUser({
            image: { value: "", error: "Upload your profile photo" },
            userName: { value: "", error: "Your Username" },
            name: { value: "", error: "Your Name" },
            email: { value: "", error: "Your email" },
            password: {
              password: "",
              error:
                "Password must have, one digit, one lowercase character, one uppercase character and be at least 8 characters in length but no more than 32",
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
    <div>
      <NavBar />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="register_username">Username:</label>
        <input
          id="register_username"
          type="text"
          onChange={(e) => handleUserName(e)}
        ></input>

        {newUser.userName.error ? newUser.userName.error : null}

        <label htmlFor="register_name">Name:</label>
        <input
          id="register_name"
          type="text"
          onChange={(e) => handleName(e)}
        ></input>

        {newUser.name.error ? newUser.name.error : null}

        <label htmlFor="register_email">Email:</label>
        <input
          id="register_email"
          type="email"
          onChange={(e) => handleEmail(e)}
        ></input>

        {newUser.email.error ? newUser.email.error : null}

        <label htmlFor="register_password">Password:</label>
        <input
          id="register_password"
          type="password"
          onChange={(e) => handlePassword(e)}
        ></input>

        {newUser.password.error ? newUser.password.error : null}

        <label htmlFor="register_password_confirm">Confirm Password:</label>
        <input
          id="register_password_confirm"
          type="password"
          onChange={(e) => handleConfirmPassword(e)}
        ></input>

        {newUser.password.identical ? null : <p>Passwords dont match</p>}

        <label htmlFor="register_image">Image:</label>
        <input
          id="register_image"
          type="file"
          onChange={(e) => handleImage(e)}
        ></input>
        {newUser.image.value ? (
          <img src={newUser.image.value} alt="your profile"></img>
        ) : (
          newUser.image.error
        )}

        {handleButton()}
        {newUser.api.error ? (
          <p>{newUser.api.error}</p>
        ) : newUser.api.creado ? (
          <p>Creado con exito</p>
        ) : null}
      </form>
      <div>
        <p>
          Or
          <Link to="/signIn" className={"linkStyle"}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
