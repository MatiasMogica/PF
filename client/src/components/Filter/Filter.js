import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogames } from "../../redux/slices/videogamesSlice";

function Filtro() {
  //Declaro el dispatch para aplicar filtros.
  const dispatch = useDispatch();
  //Necesito videogames de la store porque necesito saber que tipo de plataformas y generos existen
  //Se podria escribir manualmente y ahorrarse traer estos datos de la store, pero no seria escalable. En cambio de esta forma
  //si el dueño de la pagina agrega un producto en una nueva plataforma que no existia al momento de codear, la opcion se agrega automaticamente
  const videogames = useSelector((state) => state.videogames.videogames);
  //Aqui solamente paso a generar los arrays de generos y plataformas, que se usaran en el renderizado para mostrar las distintas opciones
  //Siendo que siempre todas deben estar visibles y no tienen porque mutar las declaro de forma basica.
  var generos = [];
  var plataforma = [];
  videogames.forEach((x) => {
    if (!generos.includes(x.genre)) {
      generos.push(x.genre);
    }
  });

  videogames.forEach((x) => {
    x.platforms.forEach((d) => {
      if (!plataforma.includes(d)) {
        plataforma.push(d);
      }
    });
  });

  //Este es mi objeto filtro, que tiene las distintas opciones que se le pueden aplicar al array principal de videojuegos.
  //Cada item en el objeto representa un filtro que se le aplicara al array anteriormente mencionado.
  //Exceptuando el de order, que solamente es el tipo de ordenamiento que se le dara.
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

  //Uso un use effect, para unicamente despatchar cuando el Filtro sea actualizado y no antes.
  useEffect(() => {
    dispatch(filterVideogames(filtro));
  }, [dispatch, filtro]);

  //A continuacion declaro todas las funciones con las que el usuario interactua

  //Esta es para buscar por palabra/s clave
  function handleName(e) {
    setFiltro({ ...filtro, name: e.target.value });
  }

  //Esta es para ver si la fecha de lanzamiento del videojuego todavia no fue anunciada o si el usuario quiere limpiar el filtro y volver a ver
  //todas las fechas.
  function handleReleased(e) {
    let p = e.target.value === "tba" ? "tba" : "";
    setFiltro({ ...filtro, released: [p, p] });

    //Borrar los valores de los inputs de fecha, ya que tocaron el boton de tba o clear
    document.getElementById("fecha_min").value = "";
    document.getElementById("fecha_max").value = "";
  }
  //Esta seria la maxima fecha que el usuario indica para la fecha de lanzamiento
  function handleReleasedMax(e) {
    let p = filtro.released;
    p[1] = e.target.value;
    setFiltro({ ...filtro, released: p });
  }
  //Mismo que la anterior pero minima.
  function handleReleasedMin(e) {
    let p = filtro.released;
    p[0] = e.target.value;
    setFiltro({ ...filtro, released: p });
  }

  //Esta funcion se encarga de verificar cuales plataformas el usuario quiere filtrar y si le volvio a hacer click a alguna
  //en particular, removerla.
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
  //Lo mismo que la anterior pero con generos
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

  //
  function handlePrecio(e) {
    let p =
      e.target.id === "precioMin"
        ? { ...filtro.precio, min: e.target.value }
        : e.target.id === "precioMax"
        ? { ...filtro.precio, max: e.target.value }
        : e.target.value === "sinmaximo"
        ? { ...filtro.precio, max: null }
        : { ...filtro.precio, min: null };

    if (e.target.value === "sinmaximo")
      document.getElementById("precioMax").value = 0;
    if (e.target.value === "sinminimo")
      document.getElementById("precioMin").value = 0;

    setFiltro({ ...filtro, precio: p });
  }
  //Las siguientes 3 funciones son para que el usuario cambie la variable que determina el orden de nuestro array filtrado
  //el primer click sera de mayor a menor, el segundo de menor a mayor, y asi rotando.
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
  function handleOrderPrecio(e) {
    if (filtro.order !== "+Precio-") {
      setFiltro({ ...filtro, order: "+Precio-" });
    } else {
      setFiltro({ ...filtro, order: "-Precio+" });
    }
  }

  // Creo que el html es self-explanatory...
  return (
    <div id="filtrobox">
      <div>
        <h4>Buscar por Palabra Clave</h4>

        <label htmlFor="buscarfiltro">
          Ingrese aqui palabras clave para buscar coinsidencias!{" "}
        </label>
        <input
          type="text"
          id="buscarfiltro"
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

      <div>
        <div>
          <h4>Precio</h4>
          <label htmlFor="precioMin">Precio Minimo</label>
          <input
            id="precioMin"
            type="number"
            onChange={(e) => handlePrecio(e)}
          ></input>
          <button onClick={(e) => handlePrecio(e)} value="sinminimo">
            Sin Minimo?
          </button>
          <label htmlFor="precioMax">Precio Maximo</label>
          <input
            id="precioMax"
            type="number"
            onChange={(e) => handlePrecio(e)}
          ></input>
          <button onClick={(e) => handlePrecio(e)} value="sinmaximo">
            Sin Maximo?
          </button>
        </div>
      </div>

      <div>
        <h4>Ordenar Por:</h4>

        <button onClick={(e) => handleOrderAlphabet(e)}>Alfabético</button>

        <button onClick={(e) => handleOrderRating(e)}>Rating</button>

        <button onClick={(e) => handleOrderReleasedDate(e)}>
          Fecha de Lanzamiento
        </button>
        <button onClick={(e) => handleOrderPrecio(e)}>Precio</button>
      </div>
    </div>
  );
}

export default Filtro;