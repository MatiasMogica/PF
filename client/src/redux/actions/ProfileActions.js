import {
  profileDetails,
  otherUserProfileDetails,
  friendRequests,
  cleanUpProfileSlice,
  getGamesUser,
  dispatchActivity,
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

export const getActivity = (data) => async (dispatch) => {
  const a = await fetch(`http://localhost:3001/friends/gamesDataById`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((resA) => resA)
    .catch((e) => console.log(e));

  /*const b = await fetch(`http://localhost:3001/friends/gamesDataById`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((resB) => resB)
    .catch((e) => console.log(e));*/

  const b = [];

  const [resA, resB] = await Promise.all([a, b]);
  if (resA.games) {
    const AB = resA.games.concat(resB);
    const answer = await dispatch(dispatchActivity(AB));
    return answer;
  } else {
    return "Already all data is visualized";
  }
};
