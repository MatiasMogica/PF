import { getAllUsers, userDetails } from "../slices/usersSlice";

export const getUsers = () => (dispatch) => {
  fetch(`http://localhost:3001/users/users`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => dispatch(getAllUsers(res)))
    .catch((e) => console.log(e));
};

export const handleAdminPrivileges = (id) => {
  return fetch(`http://localhost:3001/users/changeAdminStatus/${id}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
};

export const handleBlockUser = (id) => {
  return fetch(`http://localhost:3001/users/deleteUser/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
};

export const getUserDetails = (id) => (dispatch) => {
  fetch(`http://localhost:3001/users/users/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => dispatch(userDetails(res)))
    .catch((e) => console.log(e));
};