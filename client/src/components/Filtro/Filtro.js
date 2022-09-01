import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogames } from "../../redux/slices/videogamesSlice";

function Filtro() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames.videogames);
  var generos = [];
  var plataforma = [];
  videogames.forEach((x) => {
    x.genres.forEach((d) => {
      if (!generos.includes(d.name)) {
        generos.push(d.name);
      }
    });
  });

  videogames.forEach((x) => {
    x.platforms.forEach((d) => {
      if (!plataforma.includes(d.platform.name)) {
        plataforma.push(d.platform.name);
      }
    });
  });

  const [filtro, setFiltro] = useState({
    name: "",
    order: "none",
    released: ["", ""],
    plataforms: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(filterVideogames(filtro));
  }, [dispatch, filtro]);

  function handleName(e) {
    setFiltro({ ...filtro, name: e.target.value });
  }
  function handleReleased(e) {
    let p = e.target.value === "tba" ? "tba" : "";
    setFiltro({ ...filtro, released: [p, p] });
    document.getElementById("fecha_min").value = "";
    document.getElementById("fecha_max").value = "";
  }
  function handleReleasedMax(e) {
    let p = filtro.released;
    p[1] = e.target.value;
    setFiltro({ ...filtro, released: p });
  }
  function handleReleasedMin(e) {
    let p = filtro.released;
    p[0] = e.target.value;
    setFiltro({ ...filtro, released: p });
  }
  function handlePlataforms(e) {
    let newplataforms = [...filtro.plataforms];
    if (newplataforms.includes(e.target.value)) {
      let indice = newplataforms.indexOf(e.target.value);
      newplataforms.splice(indice, 1);
    } else {
      newplataforms.push(e.target.value);
    }
    setFiltro({ ...filtro, plataforms: newplataforms });
  }
  function handleGenres(e) {
    let newgenre = [...filtro.genres];
    if (newgenre.includes(e.target.value)) {
      let indice = newgenre.indexOf(e.target.value);
      newgenre.splice(indice, 1);
    } else {
      newgenre.push(e.target.value);
    }
    setFiltro({ ...filtro, genres: newgenre });
  }
  function handleOrderAlphabet(e) {
    if (filtro.order !== "+Alphabet-") {
      setFiltro({ ...filtro, order: "+Alphabet-" });
    } else {
      setFiltro({ ...filtro, order: "-Alphabet+" });
    }
  }
  function handleOrderRating(e) {
    if (filtro.order !== "+Rating-") {
      setFiltro({ ...filtro, order: "+Rating-" });
    } else {
      setFiltro({ ...filtro, order: "-Rating+" });
    }
  }
  function handleOrderReleasedDate(e) {
    if (filtro.order !== "+RDate-") {
      setFiltro({ ...filtro, order: "+RDate-" });
    } else {
      setFiltro({ ...filtro, order: "-RDate+" });
    }
  }

  return (
    <div id="filtrobox">
      <div className="inputfiltro">
        <p>Buscar por Palabra Clave</p>
        <input
          type="text"
          placeholder="Buscar"
          className="buscar"
          onChange={(e) => handleName(e)}
        ></input>
      </div>

      <div>
        <h4>Fecha de Lanzamiento</h4>
        <label htmlFor="fecha_min">Desde</label>
        <input
          type="date"
          id="fecha_min"
          name="trip-start"
          onChange={(e) => handleReleasedMin(e)}
        ></input>
        <label htmlFor="fecha_max">Hasta</label>
        <input
          type="date"
          id="fecha_max"
          name="trip-start"
          onChange={(e) => handleReleasedMax(e)}
        ></input>
        <button onClick={(e) => handleReleased(e)} value="tba">
          Todavia no esta anunciado?
        </button>
        <button onClick={(e) => handleReleased(e)} value="">
          Todos
        </button>
      </div>

      <div>
        <div>
          <h4>Genero</h4>
          {generos.map((x) => {
            return (
              <div key={x}>
                <input
                  type="checkbox"
                  id={x}
                  name={x}
                  value={x}
                  onClick={(e) => handleGenres(e)}
                ></input>
                <label htmlFor={x}>{x}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div>
          <h4>Plataforma</h4>
          {plataforma.map((x) => {
            return (
              <div key={x}>
                <input
                  type="checkbox"
                  id={x}
                  name={x}
                  value={x}
                  onClick={(e) => handlePlataforms(e)}
                ></input>
                <label htmlFor={x}>{x}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4>Ordenar Por:</h4>
        <div>
          <button onClick={(e) => handleOrderAlphabet(e)}>Alphabetico</button>
        </div>

        <div>
          <button onClick={(e) => handleOrderRating(e)}>Rating</button>
        </div>

        <div>
          <button onClick={(e) => handleOrderReleasedDate(e)}>
            Fecha de Lanzamiento
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filtro;
