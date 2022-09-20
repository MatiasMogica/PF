import {
  profileDetails,
  otherUserProfileDetails,
  friendRequests,
  cleanUpProfileSlice,
  getGamesUser,
} from "../slices/profileSlice";

export const cleanUpActionProfileSlice = () => (dispatch) => {
  return dispatch(cleanUpProfileSlice());
};

export const getProfileDetails = (id) => (dispatch) => {
  fetch(`http://localhost:3001/users/users/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => dispatch(profileDetails(res)))
    .catch((e) => console.log(e));
};

export const getOtherUserProfileDetails = (id) => (dispatch) => {
  fetch(`http://localhost:3001/users/users/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => dispatch(otherUserProfileDetails(res)))
    .catch((e) => console.log(e));
};

export const getFriendRequests = (id) => (dispatch) => {
  fetch(`http://localhost:3001/users/users/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => dispatch(friendRequests(res)))
    .catch((e) => console.log(e));
};

export const getGamesOfUser = (data) => (dispatch) => {
  return fetch(`http://localhost:3001/users/userGames`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((res) => dispatch(getGamesUser(res)))
    .catch((e) => console.log(e));
};
