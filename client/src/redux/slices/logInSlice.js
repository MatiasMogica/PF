import { createSlice } from "@reduxjs/toolkit";

const logInSlice = createSlice({
  name: "modal",
  initialState: {
    logIn: { status: false },
  },

  reducers: {
    localStorageUser: (state, action) => {
      return { ...state, logIn: action.payload };
    },
    logIn: (state, action) => {
      if (action.payload.error) {
        return {
          ...state,
          logIn: {
            status: false,
            error: action.payload.error,
          },
        };
      } else {
        return {
          ...state,
          logIn: {
            status: true,
            ...action.payload.userData,
          },
        };
      }
    },
  },
});

export const { logIn, localStorageUser } = logInSlice.actions;
export default logInSlice.reducer;
