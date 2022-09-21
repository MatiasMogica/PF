import { configureStore } from "@reduxjs/toolkit";
import videogames from "../slices/videogamesSlice";
import cart from "../slices/cartSlice";
import modal from "../slices/modalSlice";
import users from "../slices/usersSlice";
import logIn from "../slices/logInSlice";
import profile from "../slices/profileSlice";
import friend from "../slices/friendSlice";
import orders from "../slices/orderSlice";
import wishList from "../slices/wishListSlice";
export default configureStore({
  reducer: {
    videogames,
    cart,
    modal,
    users,
    logIn,
    profile,
    friend,
    orders,
    wishList
  },
});
