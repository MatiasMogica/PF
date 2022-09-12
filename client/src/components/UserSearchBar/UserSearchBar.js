import { useDispatch } from "react-redux";
import { FilterUsers } from "../../redux/slices/usersSlice";

function UserSearchBar() {
  const dispatch = useDispatch();
  function handleUserSearch(e) {
    dispatch(FilterUsers({ search: e.target.value }));
  }
  return (
    <input
      type="text"
      id="user_search_bar"
      onChange={(e) => handleUserSearch(e)}
      placeholder="Search"
    ></input>
  );
}

export default UserSearchBar;
