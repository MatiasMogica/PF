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

function GamesOwnedById() {
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const yourUser = useSelector((state) => state.logIn.logIn);
  const gamesArray = useSelector((state) => state.profile.otherUserGames);
  const userDetails = useSelector((state) => state.profile.profileData);

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
    <div>
      <NavBar></NavBar>
      <div>
        <h1>
          {gamesArray.length > 0
            ? gamesArray.length + " games owned by " + userDetails.username
            : userDetails.username + " dont have games or they are private"}
        </h1>
        <div>gamesArray es el array de ids de juegos que este perfil tiene</div>
      </div>
    </div>
  );
}

export default GamesOwnedById;
