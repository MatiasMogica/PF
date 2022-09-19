import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogames } from "../../redux/slices/videogamesSlice";
import { MultiSelect } from "react-multi-select-component";
import './index.css'

function Filtro({paginated}) {
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
    x.genres.forEach((d) => {
      if (!generos.includes(d)) {
        generos.push(d);
      }
    });
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
const [selectedPlatform,setSelectedPlatform]=useState(filtro.plataforms)
const [selectedGenres,setSelectedGenres]  = useState(filtro.genres)

console.log(selectedGenres)
  //Uso un use effect, para unicamente despatchar cuando el Filtro sea actualizado y no antes.
  useEffect(() => {
    dispatch(filterVideogames(filtro));
  }, [dispatch, filtro]);

  //A continuacion declaro todas las funciones con las que el usuario interactua

  //Esta es para buscar por palabra/s clave
  function handleName(e) {

    setFiltro({ ...filtro, name: e.target.value });
    paginated(1)
  }

  //Esta es para ver si la fecha de lanzamiento del videojuego todavia no fue anunciada o si el usuario quiere limpiar el filtro y volver a ver
  //todas las fechas.
  /* function handleReleased(e) {
    let p = e.target.value === "tba" ? "tba" : "";
    setFiltro({ ...filtro, released: [p, p] });

    //Borrar los valores de los inputs de fecha, ya que tocaron el boton de tba o clear
    document.getElementById("fecha_min").value = "";
    document.getElementById("fecha_max").value = "";
  } */
  //Esta seria la maxima fecha que el usuario indica para la fecha de lanzamiento
  function handleReleasedMax(e) {
    let p = filtro.released;
    p[1] = e.target.value;
    setFiltro({ ...filtro, released: p });
    paginated(1)
  }
  //Mismo que la anterior pero minima.
  function handleReleasedMin(e) {
    let p = filtro.released;
    p[0] = e.target.value;
    setFiltro({ ...filtro, released: p });
    paginated(1)
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
    paginated(1)
  }
  //Las siguientes 3 funciones son para que el usuario cambie la variable que determina el orden de nuestro array filtrado
  //el primer click sera de mayor a menor, el segundo de menor a mayor, y asi rotando.
  function handleOrderAlphabet(e) {
    paginated(1)
    if (filtro.order !== "+Alphabet-") {
      setFiltro({ ...filtro, order: "+Alphabet-" });
    } else {
      setFiltro({ ...filtro, order: "-Alphabet+" });

    }
  }
  function handleOrderRating(e) {
    paginated(1)
    if (filtro.order !== "+Rating-") {
      setFiltro({ ...filtro, order: "+Rating-" });
    } else {
      setFiltro({ ...filtro, order: "-Rating+" });
    }
  }
  function handleOrderReleasedDate(e) {
    paginated(1)
    if (filtro.order !== "+RDate-") {
      setFiltro({ ...filtro, order: "+RDate-" });
    } else {
      setFiltro({ ...filtro, order: "-RDate+" });
    }
  }
  function handleOrderPrecio(e) {
    paginated(1)
    if (filtro.order !== "+Precio-") {
      setFiltro({ ...filtro, order: "+Precio-" });
    } else {
      setFiltro({ ...filtro, order: "-Precio+" });
    }
  }

   
   


useEffect(()=>{
  paginated(1)
  let newPlataforms=selectedPlatform.map((platform) =>{
    return platform.value
  })
  setFiltro({ ...filtro, plataforms: newPlataforms });
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[selectedPlatform])

useEffect(() => {
  paginated(1)
  let newGenre=selectedGenres.map((platform) =>{
    return platform.value
  })
  setFiltro({ ...filtro, genres: newGenre});
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[selectedGenres])





  // Creo que el html es self-explanatory...
  return (

    
    <div id="filtrobox" className="container">
      <div className="opciones">
      {/* <div className="container_search">
        <h4>Search by keyword</h4>

        <div className="searchBar">
        <input
          type="text"
          id="buscarfiltro"
          placeholder="search a game"
          className="buscar"
          onChange={(e) => handleName(e)}
        ></input></div>
      </div> */}

      <div >
        <h4>Release date</h4>
        <div className="release-container">
        <label htmlFor="fecha_min">From</label><br/>
        <input
          className="inputs"
          type="date"
          id="fecha_min"
          name="trip-start"
          onChange={(e) => handleReleasedMin(e)}
        ></input><br/></div>
        <div className="release-container">
        <label htmlFor="fecha_max">To</label><br/>
        <input
        className="inputs"
          type="date"
          id="fecha_max"
          name="trip-start"
          onChange={(e) => handleReleasedMax(e)}
        ></input><br/>
        {/*<button onClick={(e) => handleReleased(e)} value="tba">
         Hasn't been announced yet?
  </button>*/}</div>
        {/* <button className="button-15"onClick={(e) => handleReleased(e)} value="">
          All
        </button> */}
      </div>

      <div>
        <h4>Genre</h4>
        <MultiSelect
        
        
        options={generos.length && generos.map((x)=>{
          return {label:x,value:x}

        })}
        hasSelectAll={false}
        overrideStrings={{
        search:"Search"}}
        value={selectedGenres}
        onChange={setSelectedGenres}
        labelledBy="Select"
        />
      </div>

      <div>
        <h4>Platform</h4>
          <MultiSelect
          className="multiselect"
        options={plataforma.length && plataforma.map((x)=>{
          return {label:x,value:x}

        })}
        hasSelectAll={false}
        overrideStrings={{
        search:"Search"}}
        value={selectedPlatform}
        onChange={setSelectedPlatform}
        
        labelledBy="Select"
        />
      </div>

      <div>
      <h4>Price</h4>
        <div className="price-container">
          <div className="each-price">
          <label htmlFor="precioMin">Min</label><br/>
          <input
          className="price_input"
            id="precioMin"
            type="number"
            onChange={(e) => handlePrecio(e)}
          ></input></div>
          {/*<button onClick={(e) => handlePrecio(e)} value="sinminimo">
            No minimum?
        </button><br/>*/}
        <div>
          <h4>-</h4>
        </div>
        <div className="each-price">
          <label htmlFor="precioMax">Max</label><br/>
          <input
          className="price_input"
            id="precioMax"
            type="number"
            onChange={(e) => handlePrecio(e)}
          ></input></div>
          {/*<button onClick={(e) => handlePrecio(e)} value="sinmaximo">
            No maximum?
      </button>*/}
        </div>
        
      
      </div>

      <div>
        <h4>Sort by</h4>
        <div className='sortBy'>

        <button className='button-15' onClick={(e) => handleOrderAlphabet(e)}><span className="text">Alphabet</span></button>

        <button className='button-15'  onClick={(e) => handleOrderRating(e)}><span className="text">Rating</span></button>

        <button className='button-15'  onClick={(e) => handleOrderReleasedDate(e)}>
        <span className="text">Released date</span>
        </button>
        <button className='button-15' onClick={(e) => handleOrderPrecio(e)}><span className="text">Price</span></button></div>
      </div>
      </div>

      
    </div>


  // <div className="container">

    



      
  //    {generos.length && generos.map((el, index) =>{
  //     return(
  //       <div key={index}>
  //       <div className="filterDiv">
  //       <button id="el" name={el} value={selectedGenres} className="filterBtn" onChange={setSelectedGenres}>{el}</button>
        
  //       </div>
  //       </div>
  //     )
  //   })} 
       

  //  </div> 
  );
}

export default Filtro;