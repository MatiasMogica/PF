import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOtherUserProfileDetails,
  getProfileDetails,
  cleanUpActionProfileSlice,
} from "../../redux/actions/ProfileActions";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
  setInitialState,
  cancelFriendRequest,
  getFriendsImageAndID,
  cleanUpActionFriendSlice,
} from "../../redux/actions/friendActions";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/index";
import { useEffect, useState } from "react";
import "./Profile.css";
import "animate.css/animate.css";
import { Animated } from "react-animated-css";

function UserDetailsOptions() {
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const yourUser = useSelector((state) => state.logIn.logIn);
  const [estado, setEstado] = useState(true);

  useEffect(() => {
    return () => {
      dispatch(cleanUpActionFriendSlice());
      dispatch(cleanUpActionProfileSlice());
    };
  }, [dispatch, setEstado]);
  useEffect(() => {
    if (yourUser.id) {
      dispatch(getProfileDetails(yourUser.id));
    }
    if (idUser) {
      dispatch(getOtherUserProfileDetails(idUser));
      dispatch(getFriendsImageAndID({ id: idUser }));
    }
  }, [dispatch, yourUser.id, idUser]);

  useEffect(() => {
    if (yourUser.id && idUser)
      dispatch(setInitialState({ idSender: yourUser.id, idReciver: idUser }));
  }, [yourUser.id, idUser, dispatch]);

  const userDetails = useSelector((state) => state.profile.profilePageData);
  const friend = useSelector((state) => state.friend);
  function calculateTimeOfService() {
    const now = new Date();
    const joined = new Date(userDetails.createdAt);
    return (
      Math.floor((now.getTime() - joined.getTime()) / (1000 * 3600 * 24)) +
      " Days"
    );
  }
  function cleanTheData() {
    return userDetails.createdAt.split("T")[0];
  }

  return (
    <div id="page_profile_all_container">
      <NavBar></NavBar>
      <div
        id="profile_show_general_container"
        style={{
          "background-image": `url(${userDetails.backgroundImage || null})`,
          "background-repeat": "no-repeat",
          "background-size": "cover",
        }}
      >
        <div id="profile_show_header_container">
          <div id="profile_show_image_container">
            <img
              alt="profile"
              id="profile_show_image"
              src={
                userDetails.image
                  ? userDetails.image
                  : "https://steamuserimages-a.akamaihd.net/ugc/875249057839988996/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/"
              }
            ></img>
            {idUser === yourUser.id ? null : friend.relacion === "irequest" ? (
              <div>
                <div className="user_profile_add_etc_options">
                  <button
                    className="icon-btnprofile add-btnprofile"
                    onClick={() =>
                      dispatch(
                        acceptFriendRequest({
                          idSender: yourUser.id,
                          idReciver: idUser,
                        })
                      )
                    }
                  >
                    <div className="add-iconprofile"></div>
                    <div className="btn-txtprofile">Accept Friend Request</div>
                  </button>

                  <button
                    className="icon-btnprofile_red add-btnprofile_red"
                    onClick={() =>
                      dispatch(
                        rejectFriendRequest({
                          idSender: yourUser.id,
                          idReciver: idUser,
                        })
                      )
                    }
                  >
                    <div className="add-iconprofile_red"></div>
                    <div className="btn-txtprofile_red">
                      Reject Friend Request
                    </div>
                  </button>
                </div>
              </div>
            ) : friend.relacion === "friend" ? (
              <div className="user_profile_add_etc_options_single">
                <button
                  className="icon-btnprofile_red add-btnprofile_red"
                  onClick={() =>
                    dispatch(
                      deleteFriend({
                        idSender: yourUser.id,
                        idReciver: idUser,
                      })
                    )
                  }
                >
                  <div className="add-iconprofile_red"></div>
                  <div className="btn-txtprofile_red">Remove</div>
                </button>
              </div>
            ) : friend.relacion === "prequest" ? (
              <div className="user_profile_add_etc_options_single">
                <button
                  className="icon-btnprofile_red add-btnprofile_red"
                  onClick={() =>
                    dispatch(
                      cancelFriendRequest({
                        idSender: yourUser.id,
                        idReciver: idUser,
                      })
                    )
                  }
                >
                  <div className="add-iconprofile_red"></div>
                  <div className="btn-txtprofile_red">
                    Cancel Friend Request
                  </div>
                </button>
              </div>
            ) : (
              <div className="user_profile_add_etc_options_single">
                <button
                  className="icon-btnprofile add-btnprofile"
                  onClick={() =>
                    dispatch(
                      sendFriendRequest({
                        idSender: yourUser.id,
                        idReciver: idUser,
                      })
                    )
                  }
                >
                  <div className="add-iconprofile"></div>
                  <div className="btn-txtprofile">Add Friend</div>
                </button>
              </div>
            )}
          </div>
          <div>
            {userDetails.username ? (
              <Animated
                animationIn="animate__flipInX"
                animationOut="fadeOut"
                isVisible={estado}
              >
                <h1 id="profile_show_username">{userDetails.username}</h1>
              </Animated>
            ) : null}
            <div id="profile_show_cards_datas">
              {userDetails.name ||
              userDetails.age ||
              userDetails.nationality ? (
                <Animated
                  animationIn="animate__backInUp"
                  animationOut="fadeOut"
                  isVisible={estado}
                >
                  <div className="profile_show_card_data">
                    {userDetails.name ? (
                      <h2 className="profile_real_name">{userDetails.name}</h2>
                    ) : null}
                    {userDetails.nationality ? (
                      <img
                        src={userDetails.nationality[1]}
                        alt="nationality"
                        id="profile_show_image_nationality"
                      ></img>
                    ) : null}
                    {userDetails.age ? <h2>Age: {userDetails.age}</h2> : null}
                  </div>
                </Animated>
              ) : null}
              {userDetails.reviews ? (
                <Animated
                  animationIn="animate__backInUp"
                  animationOut="fadeOut"
                  isVisible={estado}
                >
                  <div className="profile_show_card_data">
                    <h2>Reviews</h2>
                    <h2>{userDetails.reviews.length}</h2>
                    <h2>See</h2>
                  </div>
                </Animated>
              ) : null}
              {userDetails.purchasedGames ? (
                <Animated
                  animationIn="animate__backInUp"
                  animationOut="fadeOut"
                  isVisible={estado}
                >
                  <div className="profile_show_card_data">
                    <h2>Games</h2>
                    <h2>{userDetails.purchasedGames.length}</h2>
                    <h2>See</h2>
                  </div>
                </Animated>
              ) : null}
              {userDetails.createdAt ? (
                <Animated
                  animationIn="animate__backInUp"
                  animationOut="fadeOut"
                  isVisible={estado}
                >
                  <div className="profile_show_card_data">
                    <h2 className="profile_joined_card">Time of Service</h2>
                    <h2 className="profile_joined_card">
                      {calculateTimeOfService(userDetails.createdAt)}
                    </h2>
                    <h2 className="profile_joined_card">{cleanTheData()}</h2>
                  </div>
                </Animated>
              ) : null}
            </div>
          </div>
        </div>

        <h2 className="profile_friends_title">Friends</h2>
        <div id="lower_profile_section">
          {friend.friendList.length > 0 && userDetails.friends ? (
            <div className="friends_icons_container">
              <Animated
                animationIn="animate__slideInLeft"
                animationOut="fadeOut"
                isVisible={estado}
              >
                {friend.friendList.map((x) => (
                  <div key={x[0]} className="block">
                    <Link to={"/profile/" + x[0]}>
                      <img
                        alt="friend_profile"
                        className="friends_icon_profile"
                        src={
                          x[1]
                            ? x[1]
                            : "https://steamuserimages-a.akamaihd.net/ugc/875249057839988996/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/"
                        }
                      ></img>
                    </Link>
                  </div>
                ))}
              </Animated>
            </div>
          ) : (
            <div className="no_friends_jajjaa">
              {userDetails.friends ? (
                <h2 className="background_color_profile_h2">
                  "This user has no Friends Yet"
                </h2>
              ) : (
                <h2 className="background_color_profile_h2">
                  "Friends are Privated in this account"
                </h2>
              )}
            </div>
          )}
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default UserDetailsOptions;