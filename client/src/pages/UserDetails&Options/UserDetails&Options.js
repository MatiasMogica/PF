import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  handleAdminPrivileges,
  getUserDetails,
  handleBlockUser,
} from "../../redux/actions/usersActions";
import NavBar from "../../components/NavBar/index";

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
      <h1>{userDetails.username}</h1>
      <p>Name: {userDetails.name}</p>
      <p>Created: {userDetails.createdAt}</p>
      <p>Email: {userDetails.email}</p>
      {userDetails.admin ? <p>This user is an Admin</p> : <p>Not an Admin</p>}
      <img
        alt="user"
        src={
          userDetails.image ||
          "https://steamuserimages-a.akamaihd.net/ugc/875249057839988996/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/"
        }
      />

      {userDetails.deleted ? <p>This user is blocked from the site</p> : null}

      {id === user ? null : userDetails.admin ? (
        <button onClick={() => changeAdmin(userDetails.id)}>
          Remove Admin
        </button>
      ) : (
        <button onClick={() => changeAdmin(userDetails.id)}>
          Upgrade to Admin
        </button>
      )}
      {id === user ? null : userDetails.deleted ? (
        <button onClick={() => blockUser(userDetails.id)}>Unblock User</button>
      ) : (
        <button onClick={() => blockUser(userDetails.id)}>Block User</button>
      )}
    </div>
  );
}

export default UserDetailsOptions;
