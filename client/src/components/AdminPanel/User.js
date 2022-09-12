import { getUsers } from "../../redux/actions/usersActions";
import UserSearchBar from "../UserSearchBar/UserSearchBar";
import { FilterUsers } from "../../redux/slices/usersSlice";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const users = useSelector((state) => state.users.filterUsers);
  const [order, setOrder] = useState("firstRender");
  useEffect(() => {
    dispatch(FilterUsers({ order }));
  }, [order]);
  function handleOrder(e) {
    setOrder(
      e.target.value === order ? e.target.value + "_invert" : e.target.value
    );
  }

  useEffect(() => {
    dispatch(FilterUsers({ order }));
  }, [order]);

  function handleOrder(e) {
    setOrder(
      e.target.value === order ? e.target.value + "_invert" : e.target.value
    );
  }

  console.log(users);

  return (
    <>
      <div id="admin_panel_users">
        <div id="admin_panel_users_options">
          <button
            onClick={(e) => handleOrder(e)}
            id="user_order"
            value="admin/user"
          >
            User/Admin
          </button>
          <button
            onClick={(e) => handleOrder(e)}
            id="user_order"
            value="blocked"
          >
            Blocked/Unblocked
          </button>
          <UserSearchBar />
          <button onClick={(e) => handleOrder(e)} id="user_order" value="all">
            All
          </button>
        </div>
        <div id="list_of_users">
          {users.map((x) => (
            <div key={x.id}>
              <Link to={`/users/${x.id}`}>
                <p className={x.admin ? "user_admin" : "user_comun"}>
                  {x.username}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
