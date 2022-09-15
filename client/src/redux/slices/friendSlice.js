import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
  name: "friend",
  initialState: {
    relacion: "nada",
    friendList: [],
  },
  reducers: {
    changeFriendStatus: (state, action) => {
      if (
        action.payload.estado === "nada" ||
        "friend" ||
        "prequest" ||
        "irequest"
      )
        state.relacion = action.payload.estado;
    },
    setInitialFriendState: (state, action) => {
      state.relacion = action.payload.estado
        ? action.payload.estado
        : state.relacion;
    },
    getListofFriends: (state, action) => {
      if (action.payload.msg === "All done")
        state.friendList = action.payload.listOfFriends;
    },
    cleanUpFriendSlice: (state) => {
      return { relacion: "nada", friendList: [] };
    },
  },
});

export const {
  changeFriendStatus,
  setInitialFriendState,
  getListofFriends,
  cleanUpFriendSlice,
} = friendSlice.actions;
export default friendSlice.reducer;
