import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/slices/logInSlice";

function Login() {
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

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
      {loginData.error ? <p>{loginData.error}</p> : null}
    </form>
  );
}

export default Login;