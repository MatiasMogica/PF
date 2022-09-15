import NavBar from "../../components/NavBar";
import Login from "../../components/Login/Login";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { GoogleLogIn } from "../../redux/actions/LogInActions";

export default function SignIn() {
  const dispatch = useDispatch();
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

  return (
    <div>
      <NavBar />
      <div>
        <Login />

        <h1>Google Sign In</h1>
        <hr />
        <GoogleLogin
          clientId="189786706143-f1m6squ261r1itibbv9fdtupfmb3v9cn.apps.googleusercontent.com"
          buttonText="Sign In"
          onSuccess={googleSuccess}
          onFailure={() => {}}
          cookiePolicy={"single_host_origin"}
        />
        <p>
          Or
          <Link to="/register" className={"linkStyle"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
