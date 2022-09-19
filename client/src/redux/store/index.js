import { configureStore } from "@reduxjs/toolkit";
import videogames from "../slices/videogamesSlice";
import cart from "../slices/cartSlice";
import modal from "../slices/modalSlice";
import users from "../slices/usersSlice";
import logIn from "../slices/logInSlice";
import wishList from "../slices/wishListSlice"
import profile from "../slices/profileSlice";
import friend from "../slices/friendSlice";
import reviews from "../slices/reviewsSlice";

export default configureStore({
  reducer: {
    videogames,
    cart,
    modal,
    users,
    logIn,
    wishList,
    profile,
    friend,
    reviews,
  },
});
