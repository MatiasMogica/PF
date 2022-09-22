import { getUsers } from "../../redux/actions/usersActions";
import UserSearchBar from "../UserSearchBar/UserSearchBar";
import { FilterUsers } from "../../redux/slices/usersSlice";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "../Chart/Chart";
import axios from "axios";
import NavBarAdmin from "../NavBar/NavBarAdmin";
import './user.css'

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

  return (
    <>
    <Container>
    <NavBarAdmin/>
      <div id="admin_panel_users">
        <div id="admin_panel_users_options">
          <div>
          <button
            onClick={(e) => handleOrder(e)}
            id="user_order"
            value="admin/user"
            className="btn11-cont"
          >
            User/Admin
          </button>
          </div>
          <div>
          <button
            onClick={(e) => handleOrder(e)}
            id="user_order"
            value="blocked"
            className="btn12-cont"
          >
            Blocked/Unblocked
          </button>
          </div>
          <div>
          <button onClick={(e) => handleOrder(e)} id="user_order" value="all" className="btn13-cont">
            All
          </button>
          </div>
          <UserSearchBar />
        </div>
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <div id="list_of_users">
        <DivContUser>
          {users.map((x) => (
            <div key={x.id} className="admin-user"> 
              <Link to={`/users/${x.id}`}>
                <button className="nombre-usuarios">
                {/* <p className={x.admin ? "user_admin" : "user_comun"}> */}
                  {x.username}
                </button>
              </Link>
              <div className="es-admin">
              {x.admin ? "User admin" : null}
              </div>
            </div>
          ))}
        </DivContUser>
        </div>
      </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  border-radius: 2rem;
  margin: 0.7rem;
`;

const DivContUser = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #202020;
  width: 80%;
  height: fit-content;
  min-height: 80%;
  margin: 20px;
`;
