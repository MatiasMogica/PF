import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { getById } from "../../redux/actions/videogamesActions";
import { clearVideogame } from "../../redux/slices/videogamesSlice";
import { getVideogames } from "../../redux/actions/videogamesActions";
import { MultiSelect } from "react-multi-select-component";
import "./Edit.css";

export default function Edit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.videogames);
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  useEffect(() => {
    dispatch(getById(id));

    return () => {
      dispatch(clearVideogame());
    };
  }, [dispatch, id]);

  useEffect(() => {
    setNewGame({
      name: {
        value: details.name,

        error: "",
      },
      description: {
        value: details.description,
        error: "",
      },
      released: {
        value: details.released,
        error: "",
      },
      image: {
        value: details.background_image,
        error: "",
      },
      plataforms: {
        value: details.platforms ? details.platforms : [],
        creada: false,
        manualValue: "",
        error: "",
      },
      genres: {
        value: details.genres ? details.genres : [],
        creada: false,
        manualValue: "",
        error: "",
      },
      rating: {
        value: details.rating,
        error: "",
      },
      price: {
        value: details.price,
        error: "",
      },
    });
    document.getElementById("name").value = details.name;
    document.getElementById("descripcion").value = details.description;
    document.getElementById("released").value = details.released;
    document.getElementById("rating").value = details.rating;
    document.getElementById("price").value = details.price;
    setSelectedPlatform(details.platforms? details.platforms.map(e =>{
      return {label:e,value:e}
    }) : [])
    setSelectedGenres(details.genres? details.genres.map(e =>{
      return {label:e,value:e}
    }):[])
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  const videogames = useSelector((state) => state.videogames.videogames);
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
      value: details.name,

      error: "",
    },
    description: {
      value: details.description,
      error: "",
    },
    released: {
      value: details.released,
      error: "",
    },
    image: {
      value: details.background_image,
      error: "",
    },
    plataforms: {
      value: details.platforms ? details.platforms : [],
      creada: false,
      manualValue: "",
      error: "Add a new platform",
    },
    genres: {
      value: details.genres ? details.genres : [],
      creada: false,
      manualValue: "",
      error: "Add a new genre",
    },
    rating: {
      value: details.rating,
      error: "",
    },
    price: {
      value: details.price,
      error: "",
    },
  });
  console.log(selectedGenres)

 
  // const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    let newplataforms = selectedPlatform.map((platform) => {
      return platform.value;
    });
    setNewGame({
      ...newGame,
      plataforms: {
        ...newGame.plataforms,
        value: newplataforms,
        error: "",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlatform]);
  //Todas estas funciones son para hacer comprobaciones sobre el estado del formulario.
  useEffect(() => {
    let newgenres = selectedGenres.map((genre) => {
      return genre.value;
    });
    setNewGame({
      ...newGame,
      genres: {
        ...newGame.genres,
        value: newgenres,
        error: "",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenres]);

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
    if (e.target.value.length < 1200 && e.target.value.length > 20) {
      setNewGame({
        ...newGame,
        description: { value: e.target.value, error: "" },
      });
    } else {
      setNewGame({
        ...newGame,
        description: {
          value: "",
          error: "The description should have between 20 and 1200 characters",
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
    return !newGame.name.error &&
      !newGame.description.error &&
      !newGame.released.error &&
      !newGame.image.error &&
      !newGame.plataforms.error &&
      !newGame.genres.error &&
      !newGame.rating.error &&
      !newGame.price.error ? (
      <button className="btn_newProduct" type="submit">
        Edit
      </button>
    ) : (
      <button className="btn_newProduct" type="submit" disabled>
        Edit
      </button>
    );
  }

  //Esto es lo que sucedera cuando se envie el formulario
  function handleSubmit(e) {
    e.preventDefault();

    const {
      name,
      released,
      image,
      plataforms,
      genres,
      rating,
      price,
      description,
    } = newGame;

    const arg = {
      name: name.value,
      description: description.value,
      released: released.value,
      background_image: image.value,
      platforms: plataforms.value,
      genres: genres.value,
      rating: parseInt(rating.value),
      price: parseInt(price.value),
    };

    return fetch(`http://localhost:3001/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        setNewGame({ ...newGame, creado: true });
        //la ruta del back no envia mensaje de error, sino que envia el componente editado... deberian corregir eso y aca poner para que
        //muestre ese mensaje (ya sea que se edito correctamente o que no)
      })
      .catch((error) => console.log(error));
  }

  //Estas 4 funciones son para que el usuario cree o selecione la plataforma/genero
  /*function handlePlataforms(e) {
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
  }*/

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
             <MultiSelect
            
            options={
              plataforma.length &&
              plataforma.map((x) => {
                return { label: x, value: x };
              })
            }
            hasSelectAll={false}
            overrideStrings={{
              search: "Search",
            }}
            value={selectedPlatform}
            onChange={setSelectedPlatform}
            labelledBy="Select"
          />
          {/*<select
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
                 <button type='button' value={e} onClick={handlePlatformDelete}>x</button> 
              </li>
            );
          })} */}
        
          <button
            className="button-15"
            onClick={() =>
              setNewGame({
                ...newGame,
                plataforms: {
                  ...newGame.plataforms,
                  error: "Add a new platform",
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
          <div className="plataform-div-genre">
          <input
            id="plataforma_crear"
            type="text"
            onChange={(e) => manuallyModifyPlataform(e)}
          ></input>
          <button type="button"className="button-15" onClick={(e) => manuallyAddPlataform(e)}>
            Add
          </button>
          </div>
          {newGame.plataforms.error ? (
            <div>{newGame.plataforms.error}</div>
          ) : null}
          <button
          className="button-15"
            onClick={() =>
              setNewGame({
                ...newGame,
                plataforms: { ...newGame.plataforms, error: "", creada: false },
              })
            }
          >
            Back
          </button>
        </div>
      );
    }
  }

  // function handleGenres(e) {
  //   if (e.target.value.length > 1) {
  //     if (newGame.genres.value.includes(e.target.value)) {
  //       let indice = newGame.genres.value.indexOf(e.target.value);
  //       let newgenres = [...newGame.genres.value];
  //       newgenres.splice(indice, 1);

  //       setNewGame({
  //         ...newGame,
  //         genres: {
  //           ...newGame.genres,
  //           value: newgenres,
  //           error: "",
  //         },
  //       });
  //     } else {
  //       setNewGame({
  //         ...newGame,
  //         genres: {
  //           ...newGame.genres,
  //           value: [...newGame.genres.value, e.target.value],
  //           error: "",
  //         },
  //       });
  //     }
  //   } else {
  //     setNewGame({
  //       ...newGame,
  //       genres: {
  //         ...newGame.genres,
  //         value: "",
  //         error: "Write the name of the new genre",
  //       },
  //     });
  //   }
  // }

  function genresOpciones(c) {
    if (!c) {
      return (
        <div className="selector_div">
          <MultiSelect
            
            options={
              generos.length &&
              generos.map((x) => {
                return { label: x, value: x };
              })
            }
            hasSelectAll={false}
            overrideStrings={{
              search: "Search",
            }}
            value={selectedGenres}
            onChange={setSelectedGenres}
            labelledBy="Select"
          />
          {/* <select
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
                {/* <button type='button' value={e} onClick={handleGenreDelete}>x</button> 
              </li>
            );
          })} */}
          <button
            className="button-15"
            onClick={() =>
              setNewGame({
                ...newGame,
                genres: {
                  ...newGame.genres,
                  error: "Add a new genre",
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
          <div className="plataform-div-genre">
          <input
            id="plataforma_crear"
            type="text"
            onChange={(e) => manuallyModifyGenre(e)}
          ></input>
          <button type="button"className="button-15" onClick={() => manuallyAddGenre()}>
            Add
          </button>
          </div>
          {newGame.genres.error ? <div>{newGame.genres.error}</div> : null}
          <button
          className="button-15"
            onClick={() =>
              setNewGame({
                ...newGame,
                genres: { ...newGame.genres, error: "", creada: false },
              })
            }
          >
            Back
          </button>
        </div>
      );
    }
  }
  return (
    <div>
      <NavBar />
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
                {newGame.image.value ? (
                  <img
                    src={newGame.image.value}
                    alt="game"
                    className="image_edit_game"
                  ></img>
                ) : null}
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
                  step="0.01"
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
                  step="0.01"
                  id="price"
                  onChange={(e) => handlePrice(e)}
                ></input>
                {newGame.price.error ? (
                  <div className="error">{newGame.price.error}</div>
                ) : null}
              </div>
              <div className="container_btn">{buttonSubmit()}</div>

              {newGame.creado ? <div> Edited successfully!</div> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
