import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filterUsers: [],
    userDetails: {},
  },
  reducers: {
    getAllUsers: (state, action) => {
      return {
        ...state,
        users: action.payload.users,
        filterUsers: action.payload.users,
      };
    },
    FilterUsers: (state, action) => {
      var filtrado = [...state.users];
      if (action.payload.search) {
        filtrado = filtrado.filter((x) => {
          return (
            x.username
              .toLowerCase()
              .includes(action.payload.search.toLowerCase()) ||
            x.email.toLowerCase().includes(action.payload.search.toLowerCase())
          );
        });
      }

      if (action.payload.order) {
        filtrado = filtrado.filter((x) => {
          let order =
            action.payload.order === "admin/user"
              ? x.admin
              : action.payload.order === "admin/user_invert"
              ? !x.admin
              : action.payload.order === "blocked"
              ? x.deleted
              : action.payload.order === "blocked_invert"
              ? !x.deleted
              : true;
          return order;
        });
      }

      return { ...state, filterUsers: filtrado };
    },
    userDetails: (state, action) => {
      return { ...state, userDetails: action.payload.user };
    },
  },
});

export const { getAllUsers, FilterUsers, userDetails } = usersSlice.actions;
export default usersSlice.reducer;