import NavBar from "../NavBar/index";
import { Link } from "react-router-dom";
import "./AdminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideogames } from "../../redux/actions/videogamesActions";
import SearchBar from "../SearchBar/SearchBar";

function AdminPanel() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
  const videogames = useSelector(
    (state) => state.videogames.videogamesFiltrados
  );

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
    await fetch(`/games/${e.target.value}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(e.target.value).innerText = data.msg;
        document.getElementById(e.target.value).style.color = "red";
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <NavBar />
      <div id="admin_panel_container">
        <div id="admin_panel_users"></div>
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
            {
              Array.isArray(videogames)? (videogames.length !== 0 ? (
                  videogames.map((x) => (
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
                  ))) : null
              ) : null } 
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;