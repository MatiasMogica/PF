import {
  profileDetails,
  otherUserProfileDetails,
  friendRequests,
  cleanUpProfileSlice,
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
  console.log(id);
  fetch(`http://localhost:3001/users/users/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => dispatch(friendRequests(res)))
    .catch((e) => console.log(e));
};
