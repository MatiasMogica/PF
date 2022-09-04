import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions/videogamesActions";

function NewProduct() {
  //A continuacion genero 2 arrays, de generos y plataformas, asi cuando creamos un nuevo videojuego podemos ver que genero y que plataforma
  //ya estan creados y nos ahorramos tener que volver a escribirlas.
  const videogames = useSelector((state) => state.videogames.videogames);
  let dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  //Esta variable es el chequeo del formulario y guardado de datos.
  const [newGame, setNewGame] = useState({
    name: {
      value: "",
      error: "Deberia tener entre 2 y 50 caracteres",
    },
    description: {
      value: "",
      error: "Deberia tener entre 20 y 500 caracteres",
    },
    released: {
      value: "",
      error: "Por favor selecciona la fecha de lanzamiento",
    },
    image: {
      value: "",
      error: "Suba una imagen",
    },
    plataforms: {
      value: [],
      creada: false,
      error: "Escribe Algo",
    },
    genres: {
      value: [],
      creada: false,
      error: "Escribe Algo",
    },
    rating: {
      value: null,
      error: "Entre 1 y 5",
    },
    price: {
      value: null,
      error: "No puede ser negativo",
    },
    creado: false,
  });

  //Todas estas funciones son para hacer comprobaciones sobre el estado del formulario.

  function handleName(e) {
    if (e.target.value.length < 50 && e.target.value.length > 2) {
      setNewGame({ ...newGame, name: { value: e.target.value, error: "" } });
    } else {
      setNewGame({
        ...newGame,
        name: {
          value: "",
          error: "Deberia tener entre 2 y 50 caracteres",
        },
      });
    }
  }

  function handleDesc(e) {
    if (e.target.value.length < 500 && e.target.value.length > 20) {
      setNewGame({
        ...newGame,
        description: { value: e.target.value, error: "" },
      });
    } else {
      setNewGame({
        ...newGame,
        description: {
          value: "",
          error: "La Descripcion deberia tener entre 20 y 500 caracteres",
        },
      });
    }
  }

  function handleDate(e) {
    if ("chequeo que sea una url de una imagen de a corde") {
      setNewGame({
        ...newGame,
        released: { value: e.target.value, error: "" },
      });
    } else {
      setNewGame({
        ...newGame,
        released: {
          value: "",
          error: "Deberia ser una url de una imagen!",
        },
      });
    }
  }

  async function handleImage(e) {
    const formData = new FormData();

    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "gu6gzzkc");

    await fetch("https://api.cloudinary.com/v1_1/dhyz4afz7/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setNewGame({
          ...newGame,
          image: { value: data.secure_url, error: "" },
        });
      })

      .catch((err) =>
        setNewGame({
          ...newGame,
          image: { value: "", error: "Error Subiendo imagen, intente denuevo" },
        })
      );
  }

  function handleRating(e) {
    if (e.target.value >= 0 && e.target.value <= 5) {
      setNewGame({
        ...newGame,
        rating: { value: e.target.value, error: "" },
      });
    } else {
      setNewGame({
        ...newGame,
        rating: {
          value: "",
          error: "Entre 1 y 5",
        },
      });
    }
  }

  function handlePrice(e) {
    if (e.target.value >= 0) {
      setNewGame({
        ...newGame,
        price: { value: e.target.value, error: "" },
      });
    } else {
      setNewGame({
        ...newGame,
        price: {
          value: "",
          error: "El precio no puede ser negativo",
        },
      });
    }
  }

  //Esta funcion es para habilitar o deshabilitar que se pueda subir el formulario.
  function buttonSubmit() {
    console.log(newGame);
    return !newGame.name.error &&
      !newGame.description.error &&
      !newGame.released.error &&
      !newGame.image.error &&
      !newGame.plataforms.error &&
      !newGame.genres.error &&
      !newGame.rating.error &&
      !newGame.price.error ? (
      <button type="submit">Crear</button>
    ) : (
      <button type="submit" disabled>
        Crear
      </button>
    );
  }

  //Esto es lo que sucedera cuando se envie el formulario
  function handleSubmit(e) {
    e.preventDefault();

    const { name, released, image, plataforms, genres, rating, price } =
      newGame;

    const arg = {
      name: name.value,
      released: released.value,
      background_image: image.value,
      platforms: plataforms.value,
      genre: genres.value,
      rating: parseInt(rating.value),
      price: parseInt(price.value),
    };

    console.log(arg);

    return fetch(`http://localhost:3001/games`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        setNewGame({
          name: {
            value: "",
            error: "Deberia tener entre 2 y 50 caracteres",
          },
          description: {
            value: "",
            error: "Deberia tener entre 20 y 500 caracteres",
          },
          released: {
            value: "",
            error: "Por favor selecciona la fecha de lanzamiento",
          },
          image: {
            value: "",
            error: "Suba una imagen",
          },
          plataforms: {
            value: [],
            creada: false,
            error: "Escribe Algo",
          },
          genres: {
            value: [],
            creada: false,
            error: "Escribe Algo",
          },
          rating: {
            value: null,
            error: "Entre 1 y 5",
          },
          price: {
            value: null,
            error: "No puede ser negativo",
          },
          creado: true,
        });
      })
      .catch((error) => console.log(error));
  }

  //Estas 4 funciones son para que el usuario cree o selecione la plataforma/genero
  function handlePlataforms(e) {
    if (e.target.value.length > 1) {
      if (newGame.plataforms.value.includes(e.target.value)) {
        let indice = newGame.plataforms.value.indexOf(e.target.value);
        let newplataforms = [...newGame.plataforms.value];
        newplataforms.splice(indice, 1);

        setNewGame({
          ...newGame,
          plataforms: {
            ...newGame.plataforms,
            value: newplataforms,
            error: "",
          },
        });
      } else {
        setNewGame({
          ...newGame,
          plataforms: {
            ...newGame.plataforms,
            value: [...newGame.plataforms.value, e.target.value],
            error: "",
          },
        });
      }
    } else {
      setNewGame({
        ...newGame,
        plataforms: {
          ...newGame.plataforms,
          error: "Escribe Algo",
        },
      });
    }
  }

  function plataformasOpciones(c) {
    if (!c) {
      return (
        <div>
          {plataforma.map((x) => (
            <div key={x}>
              <input
                value={x}
                type="checkbox"
                onChange={(e) => handlePlataforms(e)}
              ></input>
              <label htmlFor={`checkbox_${x}`}>{x}</label>
            </div>
          ))}

          <button
            onClick={() =>
              setNewGame({
                ...newGame,
                plataforms: { value: "", error: "Escribe Algo", creada: true },
              })
            }
          >
            Crear una nueva
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <label htmlFor="plataforma_crear">Nombre de la Plataforma</label>
          <input id="plataforma_crear" type="text"></input>
          <button onChange={(e) => handlePlataforms(e)}>Agreguar este</button>
          {newGame.plataforms.error ? (
            <div>{newGame.plataforms.error}</div>
          ) : null}
          <button
            onClick={() =>
              setNewGame({
                ...newGame,
                plataforms: { value: "", error: "", creada: false },
              })
            }
          >
            Elegir de las ya creadas
          </button>
        </div>
      );
    }
  }

  function handleGenres(e) {
    if (e.target.value.length > 1) {
      setNewGame({
        ...newGame,
        genres: { ...newGame.genres, value: e.target.value, error: "" },
      });
    } else {
      setNewGame({
        ...newGame,
        genres: { ...newGame.genres, value: "", error: "Escribe Algo" },
      });
    }
  }

  function genresOpciones(c) {
    if (!c) {
      return (
        <div>
          <select
            id="select_plataforma"
            onChange={(e) => handleGenres(e)}
            defaultValue="Elige Una"
          >
            <option disabled>Elige Una</option>
            {generos.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              setNewGame({
                ...newGame,
                genres: { value: "", error: "Escribe Algo", creada: true },
              })
            }
          >
            Crear una nueva
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <label htmlFor="genres_crear">Nombre del Genero</label>
          <input
            id="genres_crear"
            type="text"
            onChange={(e) => handleGenres(e)}
          ></input>
          {newGame.genres.error ? <div>{newGame.genres.error}</div> : null}
          <button
            onClick={() =>
              setNewGame({
                ...newGame,
                genres: { value: "", error: "", creada: false },
              })
            }
          >
            Elegir de las ya creadas
          </button>
        </div>
      );
    }
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label htmlFor="name">Nombre del Juego:</label>
        <input id="name" type="text" onChange={(e) => handleName(e)}></input>
        {newGame.name.error ? <div>{newGame.name.error}</div> : null}
      </div>
      <div>
        <label htmlFor="descripcion">Descripcion:</label>
        <textarea id="descripcion" onChange={(e) => handleDesc(e)}></textarea>
        {newGame.description.error ? (
          <div>{newGame.description.error}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="released">Fecha de Lanzamiento:</label>
        <input
          id="released"
          type="date"
          onChange={(e) => handleDate(e)}
        ></input>
        {newGame.released.error ? <div>{newGame.released.error}</div> : null}
      </div>

      <label htmlFor="image">Imagen de Fondo</label>
      <input type="file" id="image" onChange={(e) => handleImage(e)}></input>
      {newGame.image.error ? <div>{newGame.image.error}</div> : null}

      <div>
        <h5>Plataformas</h5>
        {plataformasOpciones(newGame.plataforms.creada)}
      </div>
      <div>
        <h5>Generos</h5>
        {genresOpciones(newGame.genres.creada)}
      </div>

      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          onChange={(e) => handleRating(e)}
        ></input>
        {newGame.rating.error ? <div>{newGame.rating.error}</div> : null}
      </div>
      <div>
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          onChange={(e) => handlePrice(e)}
        ></input>
        {newGame.price.error ? <div>{newGame.price.error}</div> : null}
      </div>

      {buttonSubmit()}

      {newGame.creado ? <div> Creado Con Exito!</div> : null}
    </form>
  );
}

export default NewProduct;
