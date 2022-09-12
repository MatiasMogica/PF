import { useDispatch } from "react-redux";
import { localStorageUser } from "../../redux/slices/logInSlice";

function LogOut() {
  const dispatch = useDispatch();

  function handlelogOut() {
    window.localStorage.setItem("user", JSON.stringify({ status: false }));
    dispatch(localStorageUser({ status: false }));
  }
  return <button onClick={() => handlelogOut()}>Log Out</button>;
}

export default LogOut;