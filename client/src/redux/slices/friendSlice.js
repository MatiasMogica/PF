import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
  name: "friend",
  initialState: {
    relacion: "nada",
    friendList: [],
    incomingRequests: [],
    usersMatches: [],
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
    cleanUpFriendSlice: () => {
      return {
        relacion: "nada",
        friendList: [],
        incomingRequests: [],
        usersMatches: [],
      };
    },
    friendRequestsData: (state, action) => {
      return { ...state, incomingRequests: action.payload };
    },
    searchedUsersInDB: (state, action) => {
      return {
        ...state,
        usersMatches: action.payload.map((x) => [x.id, x.image, x.username]),
      };
    },
  },
});

export const {
  changeFriendStatus,
  setInitialFriendState,
  getListofFriends,
  cleanUpFriendSlice,
  friendRequestsData,
  searchedUsersInDB,
} = friendSlice.actions;
export default friendSlice.reducer;
