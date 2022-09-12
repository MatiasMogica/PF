import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterVideogames } from "../../redux/slices/videogamesSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const [filtro, setFiltro] = useState({
    name: "",
    precio: {
      min: null,
      max: null,
    },
    released: ["", ""],
    plataforms: [],
    genres: [],
    order: "none",
  });

  useEffect(() => {
    dispatch(filterVideogames(filtro));
  }, [dispatch, filtro]);

  function handleName(e) {
    setFiltro({ ...filtro, name: e.target.value });
  }

  return (
    <input
    className="buscar"
      placeholder="Search"
      type="text"
      onChange={(e) => handleName(e)}
    ></input>
  );
}


export default SearchBar;