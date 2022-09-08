import { configureStore } from "@reduxjs/toolkit";
import videogames from "../slices/videogamesSlice";
import cart from "../slices/cartSlice";

export default configureStore({
  reducer: {
    videogames: videogames,
    cart: cart,
  },
});
