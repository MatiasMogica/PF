import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/index";

function UserDetailsOptions() {
  const userDetails = useSelector((state) => state.logIn.logIn);
  return (
    <div>
      <NavBar></NavBar>
      <h1>{userDetails.user}</h1>
      <p>Email: {userDetails.email}</p>
      <p>Name: {userDetails.name}</p>
      <img alt="user" src={userDetails.image}></img>
      {userDetails.purchasedGames
        ? userDetails.purchasedGames.map((x) => <div></div>)
        : null}
      <p>ID: {userDetails.id}</p>
      {userDetails.admin ? <p>You are an Admin</p> : null}
    </div>
  );
}

export default UserDetailsOptions;
