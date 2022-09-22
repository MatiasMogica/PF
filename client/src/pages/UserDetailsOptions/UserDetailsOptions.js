import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  handleAdminPrivileges,
  getUserDetails,
  handleBlockUser,
} from "../../redux/actions/usersActions";
import NavBar from "../../components/NavBar/index";
import "./UserDetailsOptions.css"

function UserDetailsOptions() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.logIn.logIn.id);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const userDetails = useSelector((state) => state.users.userDetails);

  async function changeAdmin(id) {
    await handleAdminPrivileges(id);
    dispatch(getUserDetails(id));
  }

  async function blockUser(id) {
    await handleBlockUser(id);
    dispatch(getUserDetails(id));
  }

  return (
    <div>
      <NavBar></NavBar>
    <div className="user-details-cont">
      <h1 className="user-details-title">{userDetails.username}</h1>
      <div className="user-details-info">
      <p>Name: {userDetails.name}</p>
      <p>Created: {userDetails.createdAt}</p>
      <p>Email: {userDetails.email}</p>
      </div>
      {userDetails.admin ? <p>This user is an Admin</p> : <p>Not an Admin</p>}
      <img
        className="user-det-img"
        alt="user"
        src={
          userDetails.image ||
          "https://steamuserimages-a.akamaihd.net/ugc/875249057839988996/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/"
        }
      />

      {userDetails.deleted ? <p>This user is blocked from the site </p> : null}
      <div className="cont-btn-userdetail">
        <div className="espacio-btn">
      {id === user ? null : userDetails.admin ? (
        <button onClick={() => changeAdmin(userDetails.id)} className="btn-userdet">
          Remove Admin
        </button>
      ) : (
        <button onClick={() => changeAdmin(userDetails.id)} className="btn-userdet">
          Upgrade to Admin
        </button>
      )}
      </div>
      <div>
      {id === user ? null : userDetails.deleted ? (
        <button onClick={() => blockUser(userDetails.id)} className="btn-userdet">Unblock User </button>
      ) : (
        <button onClick={() => blockUser(userDetails.id)} className="btn-userdet">Block User</button>
      )}
      </div>
      </div>
    </div>
    </div>
  );
}

export default UserDetailsOptions;
