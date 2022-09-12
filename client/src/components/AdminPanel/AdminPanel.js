import NavBar from "../NavBar/index";
import { Link } from "react-router-dom";
import "./AdminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVideogames } from "../../redux/actions/videogamesActions";
import SearchBar from "../SearchBar/SearchBar";
import { getUsers } from "../../redux/actions/usersActions";
import UserSearchBar from "../UserSearchBar/UserSearchBar";
import { FilterUsers } from "../../redux/slices/usersSlice";

function AdminPanel() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getUsers());
  }, [dispatch]);

  const videogames = useSelector(
    (state) => state.videogames.videogamesFiltrados
  );
  /* ESTO */
  const users = useSelector((state) => state.users.filterUsers);

  function confirmDelete(e) {
    document.getElementById("btn_delete_" + e.target.value).innerText =
      "Are you Sure?";
    document
      .getElementById("btn_delete_" + e.target.value)
      .addEventListener("click", (event) => {
        handleDelete(e);
      });
  }

  async function handleDelete(e) {
    await fetch(`http://localhost:3001/games/${e.target.value}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(e.target.value).innerText = data.msg;
        document.getElementById(e.target.value).style.color = "red";
      })
      .catch((err) => console.log(err));
  }
/* ESTO */
  const [order, setOrder] = useState("firstRender");
/* ESTO */
  useEffect(() => {
    dispatch(FilterUsers({ order }));
  }, [order]);
/* ESTO */
  function handleOrder(e) {
    setOrder(
      e.target.value === order ? e.target.value + "_invert" : e.target.value
    );
  }

  return (
    <div>
      <NavBar />
      <div id="admin_panel_container">
        {/* ACA */}
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
{/* HASTA ACA */}
        </div>
        <div id="admin_panel_videogames">
          <Link to="/videogame/add" className={"linkStyle"}>
            Create game
          </Link>
          <SearchBar />
          <div id="admin_panel_videogames_list">
            {/* {videogames.map((x) => (
              <div key={x._id} className="admin_panel_videogame">
                <p
                  id={x._id}
                  className="porque_modificaron_todos_los_p_en_vez_de_trabajar_con_clases"
                >
                  {x.name}
                </p>
                <button
                  onClick={(e) => confirmDelete(e)}
                  id={"btn_delete_" + x._id}
                  value={x._id}
                >
                  Delete
                </button>
                <Link to={`/edit/${x._id}`}>Edit</Link>
              </div>
            ))} */}
            {Array.isArray(videogames)
              ? videogames.length !== 0
                ? videogames.map((x) => (
                    <div key={x._id} className="admin_panel_videogame">
                      <Link to={`/videogames/${x._id}`}>
                        <p
                          id={x._id}
                          className="porque_modificaron_todos_los_p_en_vez_de_trabajar_con_clases"
                        >
                          {x.name}
                        </p>
                      </Link>

                      <button
                        onClick={(e) => confirmDelete(e)}
                        id={"btn_delete_" + x._id}
                        value={x._id}
                      >
                        Delete
                      </button>
                      <Link to={`/edit/${x._id}`}>Edit</Link>
                    </div>
                  ))
                : null
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;