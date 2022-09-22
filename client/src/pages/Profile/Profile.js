import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOtherUserProfileDetails,
  getProfileDetails,
  cleanUpActionProfileSlice,
  getActivity,
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
import CountUp from "react-countup";
import { useHistory } from "react-router-dom";

function UserDetailsOptions() {
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const yourUser = useSelector((state) => state.logIn.logIn);
  const [estado, setEstado] = useState(true);
  const [activityPage, setactivityPage] = useState(1);
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(cleanUpActionFriendSlice());
      dispatch(cleanUpActionProfileSlice());
    };
  }, [dispatch, setEstado, idUser]);
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
    if (yourUser.id && idUser) {
      dispatch(setInitialState({ idSender: yourUser.id, idReciver: idUser }));
      dispatch(
        getActivity({
          idSender: yourUser.id,
          idReciver: idUser,
          page: activityPage,
        })
      );
    }
  }, [yourUser.id, idUser, dispatch, activityPage]);

  const userDetails = useSelector((state) => state.profile.profilePageData);
  const friend = useSelector((state) => state.friend);
  const activity = useSelector((state) => state.profile.activity);

  function calculateTimeOfService() {
    const now = new Date();
    const joined = new Date(userDetails.createdAt);
    return Math.floor((now.getTime() - joined.getTime()) / (1000 * 3600 * 24));
  }
  function cleanTheData() {
    return userDetails.createdAt.split("T")[0].split("-");
  }

  async function handleLoadMore() {
    const answer = await dispatch(
      getActivity({
        idSender: yourUser.id,
        idReciver: idUser,
        page: activityPage + 1,
      })
    );
    if (answer !== "Already all data is visualized") {
      setactivityPage(activityPage + 1);
    } else {
      document.getElementById("load_more_profile").innerHTML =
        "There is nothing else to load";
    }
  }

  return (
    <div id="page_profile_all_container">
      <NavBar></NavBar>
      <div
        id="profile_show_general_container"
        style={{
          backgroundImage: `url(${userDetails.backgroundImage || null})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
                  className="animated_block_of_data"
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
                    {userDetails.age ? (
                      <h2>
                        Age:
                        <CountUp end={userDetails.age} duration={3} />
                      </h2>
                    ) : null}
                  </div>
                </Animated>
              ) : null}
              {/* LO COMENTÉ PORQUE NO ESTA HECHA LA RELACION DE USER  CON LAS REVIEWS */}
              {/* {userDetails.reviews ? (
                <Animated
                  animationIn="animate__backInUp"
                  animationOut="fadeOut"
                  isVisible={estado}
                  className="animated_block_of_data"
                >
                  <div className="profile_show_card_data profile_show_card_data_click">
                    <h2>Reviews</h2>
                    <h2>
                      <CountUp end={userDetails.reviews.length} duration={3} />
                    </h2>
                    <h2>See</h2>
                  </div>
                </Animated>
              ) : null} */}
              {userDetails.purchasedGames ? (
                <Animated
                  animationIn="animate__backInUp"
                  animationOut="fadeOut"
                  isVisible={estado}
                  className="animated_block_of_data"
                >
                  <div
                    className="profile_show_card_data profile_show_card_data_click"
                    onClick={() => history.push(`/games/${userDetails.id}`)}
                  >
                    <h2>Games</h2>
                    <h2>
                      <CountUp
                        end={userDetails.purchasedGames.length}
                        duration={3}
                      />
                    </h2>
                    <h2>See</h2>
                  </div>
                </Animated>
              ) : null}
              {userDetails.createdAt ? (
                <Animated
                  animationIn="animate__backInUp"
                  animationOut="fadeOut"
                  isVisible={estado}
                  className="animated_block_of_data"
                >
                  <div className="profile_show_card_data">
                    <h2 className="profile_joined_card">Time of Service</h2>
                    <h2 className="profile_joined_card">
                      <CountUp
                        end={calculateTimeOfService(userDetails.createdAt)}
                        duration={
                          calculateTimeOfService(userDetails.createdAt) > 3
                            ? 3
                            : 1
                        }
                      />{" "}
                      Days
                    </h2>
                    <h2 className="profile_joined_card">
                      <CountUp end={cleanTheData()[0]} duration={3} />-
                      <CountUp end={cleanTheData()[1]} duration={3} />-
                      <CountUp end={cleanTheData()[2]} duration={3} />
                    </h2>
                  </div>
                </Animated>
              ) : null}
            </div>
          </div>
        </div>
        <div id="lower_profile_section">
          {friend.friendList.length > 0 && userDetails.friends ? (
            <div>
              <h2 className="profile_friends_title">Friends</h2>

              <Animated
                animationIn="animate__slideInLeft"
                animationOut="fadeOut"
                isVisible={estado}
                className="friends_icons_container"
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
          <Animated
            animationIn="animate__slideInRight"
            animationOut="fadeOut"
            isVisible={estado}
            className="overflow_profile_activity"
          >
            <div id="profile_activity_container">
              {activity.map((x) => (
                <div key={x.id} className="profile_activity_recent">
                  <p>
                    {x.createdAt.split("T")[0] +
                      " " +
                      x.createdAt.split("T")[1].split(":")[0] +
                      ":" +
                      x.createdAt.split("T")[1].split(":")[1] +
                      "hs."}
                  </p>
                  <p>
                    {userDetails.username} now Owns {x.games.length} new games!
                  </p>
                  <div className="profile_activity_newgames">
                    {x.games.map((x) => (
                      <div>{x.title}</div>
                    ))}
                  </div>
                </div>
              ))}
              <div onClick={() => handleLoadMore()} id="load_more_profile">
                Load More...
              </div>
            </div>
          </Animated>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsOptions;