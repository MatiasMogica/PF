import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions/videogamesActions";
import "./NewProduct.css";

function NewProduct() {
  //A continuacion genero 2 arrays, de generos y plataformas, asi cuando creamos un nuevo videojuego podemos ver que genero y que plataforma
  //ya estan creados y nos ahorramos tener que volver a escribirlas.
  const videogames = useSelector((state) => state.videogames.videogames);

  let dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  //Esta variable es el chequeo del formulario y guardado de datos.
  const [newGame, setNewGame] = useState({
    name: {
      value: "",

      error: "",
    },
    description: {
      value: "",
      error: "",
    },
    released: {
      value: "",
      error: "",
    },
    image: {
      value: "",
      error: "",
    },
    plataforms: {
      value: [],
      creada: false,
      manualValue: "",
      error: "Write the name of the new platform",
    },
    genres: {
      value: [],
      creada: false,
      manualValue: "",
      error: "Write the name of the new genre",
    },
    rating: {
      value: null,
      error: "",
    },
    price: {
      value: null,
      error: "",
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

          error: "It should have between 2 and 50 characters",
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
          error: "The description should have between 20 and 500 characters",
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
          error: "It should be an url of an image!",
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

          image: {
            value: "",
            error:
              "An error occurred while uploading the image, please try again",
          },
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

          error: "It should be between 1 and 5",
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
      if (e.target.value === "") {
        return setNewGame({
          ...newGame,
          price: {
            value: "",

            error: "The price can't be null or negative",
          },
        });
      }
    } else {
      setNewGame({
        ...newGame,
        price: {
          value: "",
          error: "The price can't be null or negative",
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
      <button className="btn" type="submit">
        Create
      </button>
    ) : (
      <button className="btn" type="submit" disabled>
        Create
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
      genres: genres.value,
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

            error: "",
          },
          description: {
            value: "",
            error: "",
          },
          released: {
            value: "",
            error: "",
          },
          image: {
            value: "",
            error: "",
          },
          plataforms: {
            value: [],
            creada: false,
            manualValue: "",
            error: "",
          },
          genres: {
            value: [],
            creada: false,
            manualValue: "",
            error: "",
          },
          rating: {
            value: null,
            error: "",
          },
          price: {
            value: null,
            error: "",
          },
          creado: true,
        });
        document.getElementById("name").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("released").value = "";
        document.getElementById("image").value = "";
        document.getElementById("released").value = "";
        document.getElementById("rating").value = "";
        document.getElementById("price").value = "";
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
          error: "Write the name of the new platform",
        },
      });
    }
  }

  /* function handlePlatformDelete(e) {
    setNewGame({...newGame, plataforms: {
      ...newGame.plataforms,
      value: [newGame?.plataforms.value.filter(t => t !== e.target.value)]
    }})
} */

  function plataformasOpciones(c) {
    if (!c) {
      return (
        <div className="selector_div">
          <select
            id="select_plataforma"
            multiple={true}
            defaultValue={plataforma}
            onClick={(e) => handlePlataforms(e)}
          >
            <option disabled>Choose</option>

            {plataforma.map((x, i) => (
              <option key={i} value={x}>
                {x}
              </option>
            ))}
          </select>
          {newGame?.plataforms.value.map((e, i) => {
            return (
              <li key={i}>
                {e}
                {/* <button type='button' value={e} onClick={handlePlatformDelete}>x</button> */}
              </li>
            );
          })}
          <button
            className="btn_simple"
            onClick={() =>
              setNewGame({
                ...newGame,
                plataforms: {
                  ...newGame.plataforms,
                  error: "Write the name of the new platform",
                  creada: true,
                },
              })
            }
          >
            new platform
          </button>
        </div>
      );
    } else {
      function manuallyAddPlataform() {
        if (newGame.plataforms.manualValue.length > 2) {
          setNewGame({
            ...newGame,
            plataforms: {
              ...newGame.plataforms,
              value: [
                ...newGame.plataforms.value,
                newGame.plataforms.manualValue,
              ],
              error: "",
            },
          });
        } else {
        }
      }
      function manuallyModifyPlataform(e) {
        setNewGame({
          ...newGame,
          plataforms: {
            ...newGame.plataforms,
            manualValue: e.target.value,
          },
        });
      }
      return (
        <div>
          <label htmlFor="plataforma_crear">Name of the platform</label>
          <input
            id="plataforma_crear"
            type="text"
            onChange={(e) => manuallyModifyPlataform(e)}
          ></input>
          <button type="button" onClick={(e) => manuallyAddPlataform(e)}>
            Add this plataform.
          </button>
          {newGame.plataforms.error ? (
            <div>{newGame.plataforms.error}</div>
          ) : null}
          <button
            onClick={() =>
              setNewGame({
                ...newGame,
                plataforms: { ...newGame.plataforms, error: "", creada: false },
              })
            }
          >
            Choose from those already created
          </button>
        </div>
      );
    }
  }

  function handleGenres(e) {
    if (e.target.value.length > 1) {
      if (newGame.genres.value.includes(e.target.value)) {
        let indice = newGame.genres.value.indexOf(e.target.value);
        let newgenres = [...newGame.genres.value];
        newgenres.splice(indice, 1);

        setNewGame({
          ...newGame,
          genres: {
            ...newGame.genres,
            value: newgenres,
            error: "",
          },
        });
      } else {
        setNewGame({
          ...newGame,
          genres: {
            ...newGame.genres,
            value: [...newGame.genres.value, e.target.value],
            error: "",
          },
        });
      }
    } else {
      setNewGame({
        ...newGame,
        genres: {
          ...newGame.genres,
          value: "",
          error: "Write the name of the new genre",
        },
      });
    }
  }

  function genresOpciones(c) {
    if (!c) {
      return (
        <div className="selector_div">
          <select
            id="select_genre"
            defaultValue={generos}
            multiple={true}
            onClick={(e) => handleGenres(e)}
          >
            <option disabled>All</option>
            {generos.map((x, i) => (
              <option key={i} value={x}>
                {x}
              </option>
            ))}
          </select>
          {newGame?.genres.value.map((e, i) => {
            return (
              <li key={i}>
                {e}
                {/* <button type='button' value={e} onClick={handleGenreDelete}>x</button> */}
              </li>
            );
          })}
          <button
            className="btn_simple"
            onClick={() =>
              setNewGame({
                ...newGame,
                genres: {
                  ...newGame.genres,
                  error: "Write the name of the new platform",
                  creada: true,
                },
              })
            }
          >
            new genre
          </button>
        </div>
      );
    } else {
      function manuallyAddGenre() {
        if (newGame.genres.manualValue.length > 2) {
          setNewGame({
            ...newGame,
            genres: {
              ...newGame.genres,
              value: [...newGame.genres.value, newGame.genres.manualValue],
              error: "",
            },
          });
        } else {
        }
      }
      function manuallyModifyGenre(e) {
        setNewGame({
          ...newGame,
          genres: {
            ...newGame.genres,
            manualValue: e.target.value,
          },
        });
      }
      return (
        <div>
          <label htmlFor="plataforma_crear">Name of the platform</label>
          <input
            id="plataforma_crear"
            type="text"
            onChange={(e) => manuallyModifyGenre(e)}
          ></input>
          <button type="button" onClick={() => manuallyAddGenre()}>
            Add this genre
          </button>
          {newGame.genres.error ? <div>{newGame.genres.error}</div> : null}
          <button
            onClick={() =>
              setNewGame({
                ...newGame,
                genres: { ...newGame.genres, error: "", creada: false },
              })
            }
          >
            Choose from those already created
          </button>
        </div>
      );
    }
  }
  return (
    <div className="container_form">
      <div className="overlay">
        <div className="form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="container_input">
              <label htmlFor="name">Name</label>

              <input
                className="input"
                id="name"
                type="text"
                onChange={(e) => handleName(e)}
              ></input>
              {newGame.name.error ? (
                <div className="error">{newGame.name.error}</div>
              ) : null}
            </div>

            <div className="container_input">
              <label htmlFor="descripcion">Description</label>

              <textarea
                className="input"
                id="descripcion"
                onChange={(e) => handleDesc(e)}
              ></textarea>
              {newGame.description.error ? (
                <div className="error">{newGame.description.error}</div>
              ) : null}
            </div>

            <div className="container_input">
              <label htmlFor="released">Release date</label>

              <input
                className="input"
                id="released"
                type="date"
                onChange={(e) => handleDate(e)}
              ></input>
              {newGame.released.error ? (
                <div className="error">{newGame.released.error}</div>
              ) : null}
            </div>

            <div className="container_input">
              <label htmlFor="image">
                Background image <hr></hr>
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => handleImage(e)}
              ></input>
              {newGame.image.error ? (
                <div className="error">{newGame.image.error}</div>
              ) : null}
            </div>
            <div className="container_input">
              <label htmlFor="platforms">
                Platforms <hr></hr>
              </label>

              {plataformasOpciones(newGame.plataforms.creada)}
            </div>
            <div className="container_input">
              <label htmlFor="genres">
                Genres <hr></hr>
              </label>

              {genresOpciones(newGame.genres.creada)}
            </div>

            <div className="container_input">
              <label htmlFor="rating">Rating</label>
              <input
                className="input"
                type="number"
                id="rating"
                onChange={(e) => handleRating(e)}
              ></input>
              {newGame.rating.error ? (
                <div className="error">{newGame.rating.error}</div>
              ) : null}
            </div>

            <div className="container_input">
              <label htmlFor="price">Price</label>

              <input
                className="input"
                type="number"
                id="price"
                onChange={(e) => handlePrice(e)}
              ></input>
              {newGame.price.error ? (
                <div className="error">{newGame.price.error}</div>
              ) : null}
            </div>
            <div className="container_btn">{buttonSubmit()}</div>

            {newGame.creado ? <div> Created successfully!</div> : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
