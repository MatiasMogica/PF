import {
  changeFriendStatus,
  setInitialFriendState,
  getListofFriends,
  cleanUpFriendSlice,
  friendRequestsData,
  searchedUsersInDB,
} from "../slices/friendSlice";

export const cleanUpActionFriendSlice = () => (dispatch) => {
  return dispatch(cleanUpFriendSlice());
};

export const IncomingRequestsGetData = (data) => (dispatch) => {
  return fetch(`http://localhost:3001/friends/friendrequestlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((d) => dispatch(friendRequestsData(d)))
    .catch((e) => e);
};

export const cancelFriendRequest = (data) => (dispatch) => {
  return fetch(`http://localhost:3001/friends/cancelFriendRequest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((d) => dispatch(setInitialFriendState(d)))
    .catch((e) => e);
};

export const getFriendsImageAndID = (data) => (dispatch) => {
  return fetch(`http://localhost:3001/friends/friendList`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((d) => dispatch(getListofFriends(d)))
    .catch((e) => e);
};

export const setInitialState = (data) => (dispatch) => {
  return fetch(`http://localhost:3001/friends/relationship`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((d) => dispatch(setInitialFriendState(d)))
    .catch((e) => e);
};

export const sendFriendRequest = (data) => (dispatch) => {
  return fetch(`http://localhost:3001/friends/friendRequest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((d) => dispatch(changeFriendStatus(d)))
    .catch((e) => e);
};

export const acceptFriendRequest = (data) => (dispatch) => {
  return fetch(`http://localhost:3001/friends/aceptFriend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((d) => dispatch(changeFriendStatus(d)))
    .catch((e) => e);
};

export const rejectFriendRequest = (data) => (dispatch) => {
  return fetch(`http://localhost:3001/friends/rejectFriend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((d) => dispatch(changeFriendStatus(d)))
    .catch((e) => e);
};

export const deleteFriend = (data) => (dispatch) => {
  return fetch(`http://localhost:3001/friends/removeFriend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((d) => dispatch(changeFriendStatus(d)))
    .catch((e) => e);
};

export const searchUserInDatabase = (data) => (dispatch) => {
  return fetch(
    `http://localhost:3001/friends/searchForMatches/${data.usernameInput}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((d) => dispatch(searchedUsersInDB(d)))
    .catch((e) => console.log(e));
};
