import { logIn } from "../../redux/slices/logInSlice";
import axios from "axios";
export const LogInActionApi =
  (data, setloginData, loginData) => async (dispatch) => {
    return fetch(`http://localhost:3001/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((d) => {
        if (d.error) {
          setloginData({
            ...loginData,
            error: d.error,
          });
        } else {
          const logindata = {
            userData: d.userForToken,
            token: d.token,
          };
          dispatch(logIn(logindata));
        }
      });
  };

export const GoogleLogIn = (res) => async (dispatch) => {
  console.log(res);
  axios({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    url: "http://localhost:3001/auth/google",
    data: { id_token: res.tokenId },
  }).then((response) => {
    const logindata = {
      userData: response.data.userForToken,
      token: response.data.token,
    };
    dispatch(logIn(logindata));
  });
};