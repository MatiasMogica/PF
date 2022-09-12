import { configureStore } from "@reduxjs/toolkit";
import videogames from "../slices/videogamesSlice";
import cart from "../slices/cartSlice";
import modal from "../slices/modalSlice";
import users from "../slices/usersSlice";
import logIn from "../slices/logInSlice";
export default configureStore({
  reducer: {
    videogames,
    cart,
    modal,
    users,
    logIn,
  },
});
