import { getUsers } from "../../redux/actions/usersActions";
import UserSearchBar from "../UserSearchBar/UserSearchBar";
import { FilterUsers } from "../../redux/slices/usersSlice";
<<<<<<< HEAD
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
=======

import { useEffect, useState } from "react";
>>>>>>> d30441e36d3562f39f22ca9dd3d7f05aae179ebf
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "../Chart/Chart";
import axios from "axios";

export default function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const users = useSelector((state) => state.users.filterUsers);
  const [order, setOrder] = useState("firstRender");

  useEffect(() => {
    dispatch(FilterUsers({ order }));
  }, [order, dispatch]);
  function handleOrder(e) {
    setOrder(
      e.target.value === order ? e.target.value + "_invert" : e.target.value
    );
  }

<<<<<<< HEAD
  // USER STATS
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users/stats");
        res.data.map((item) => {
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);
  console.log(userStats);

=======
>>>>>>> d30441e36d3562f39f22ca9dd3d7f05aae179ebf
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
<<<<<<< HEAD
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
=======
>>>>>>> d30441e36d3562f39f22ca9dd3d7f05aae179ebf
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
