import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/index";
import { getGamesOfUser } from "../../redux/actions/ProfileActions";
import {
  getProfileDetails,
  cleanUpActionProfileSlice,
} from "../../redux/actions/ProfileActions";
import { cleanUpActionFriendSlice } from "../../redux/actions/friendActions";
import "./GamesOwnedById.css";
import { Animated } from "react-animated-css";
import { useHistory } from "react-router-dom";

function GamesOwnedById() {
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const yourUser = useSelector((state) => state.logIn.logIn);
  const filterGamesArray = useSelector(
    (state) => state.profile.filteredOtherUserGames
  );
  const gamesArray = useSelector((state) => state.profile.otherUserGames);
  const userDetails = useSelector((state) => state.profile.profileData);
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(cleanUpActionFriendSlice());
      dispatch(cleanUpActionProfileSlice());
    };
  }, [dispatch]);

  useEffect(() => {
    if (yourUser.id && idUser)
      dispatch(getGamesOfUser({ idsender: yourUser.id, idreciver: idUser }));
    if (idUser) {
      dispatch(getProfileDetails(idUser));
    }
  }, [idUser, yourUser.id, dispatch]);

  return (
    <div className="GamesOwnedById_general_container">
      <NavBar></NavBar>
      <div>
        <h1 className="GamesOwnedById_H1">
          {gamesArray.length > 0
            ? gamesArray.length + " games owned by " + userDetails.username
            : userDetails.username + " dont have games or they are private"}
        </h1>
        {filterGamesArray.length > 0 ? (
          <Animated
            animationIn="animate__zoomIn"
            animationOut="fadeOut"
            isVisible={filterGamesArray.length > 0 ? true : false}
          >
            <div className="GamesOwnedById_Card_container">
              {filterGamesArray.map((x) => (
                <div
                  key={x?._id}
                  className="GamesOwnedById_Card"
                  onClick={() => history.push(`/videogames/${x._id}`)}
                >
                  <img
                    src={x?.background_image}
                    alt="game"
                    className="GamesOwnedById_images"
                  ></img>
                  <div>{x?.name}</div>
                </div>
              ))}
            </div>
          </Animated>
        ) : (
          <div>No games found by that name</div>
        )}
      </div>
    </div>
  );
}

export default GamesOwnedById;