import { createSlice } from "@reduxjs/toolkit";

export const videogamesSlice = createSlice({
  name: "videogames",
  initialState: {
    videogames: [],
    details: {},
    videogamesFiltrados: [],
  },
  reducers: {
    getAllVideogames: (state, action) => {
      state.videogames = action.payload;
      state.videogamesFiltrados = action.payload;
    },
    getVideogameById: (state, action) => {
      state.details = action.payload;
    },
    clearVideogame: (state) => {
        state.details = {}
    },
    filterVideogames: (state, action) => {
      //Se toman todos los datos de nuestros juegos tal cual como estan originalmente
      var filtrado = [...state.videogames];

      //Ahora nuestro filtro va a chequear que opciones el usuario seleciono y solamente aquellos selecionados se van a aplicar.

      //Para buscar por nombre (se pueden agregar que busque por alguna otra descripcion clave)
      if (action.payload.name) {
        filtrado = filtrado.filter((x) => {
          return x.name
            .toLowerCase()
            .includes(action.payload.name.toLowerCase());
        });
      }

      //Esta parte es para organizar por fecha de lanzamiento, tanto si tenes una minima, como si tenes una mazima o como si tenes ambas.
      if (
        action.payload.released[0] === "tba" &&
        action.payload.released[1] === "tba"
      ) {
        filtrado = filtrado.filter((x) => {
          return x.released.includes("tba");
        });
      } else if (action.payload.released[0] || action.payload.released[1]) {
        if (
          action.payload.released[0] !== "tba" &&
          action.payload.released[0] !== "" &&
          action.payload.released[1] !== "tba" &&
          action.payload.released[1] !== ""
        ) {
          filtrado = filtrado.filter((x) => {
            return (
              x.released >= action.payload.released[0] &&
              x.released <= action.payload.released[1]
            );
          });
        } else if (
          action.payload.released[0] !== "tba" &&
          action.payload.released[0] !== ""
        ) {
          filtrado = filtrado.filter((x) => {
            return x.released >= action.payload.released[0];
          });
        } else {
          filtrado = filtrado.filter((x) => {
            return x.released <= action.payload.released[1];
          });
        }
      }

      //Para filtrar por genero (accion,aventura,etc)
       action.payload.genres.forEach((element) => {
        filtrado = filtrado.filter((x) => {
          let p = false;
          for (let i = 0; i < x.genres.length; i++) {
            if (x.genres[i] === element) {
              p = true;
            }
          }
          return p;
        });
      });

      //para filtrar por plataforma (pc,linux,etc)
      action.payload.plataforms.forEach((element) => {
        filtrado = filtrado.filter((x) => {
          let p = false;
          for (let i = 0; i < x.platforms.length; i++) {
            if (x.platforms[i] === element) {
              p = true;
            }
          }
          return p;
        });
      });

      //para filtrar por precio min/max

      if (action.payload.precio.min) {
        filtrado = filtrado.filter((x) => {
          return action.payload.precio.min <= x.price;
        });
      }
      if (action.payload.precio.max) {
        filtrado = filtrado.filter((x) => {
          return action.payload.precio.max >= x.price;
        });
      }

      //Si llegamos hasta aqui ya se aplicaron los filtros, por lo tanto no se van a remover mas items del array final, solamente ordenarlos
      //Asi que vemos que tipo de orden el usuario seleciono y lo ordenamos como pide.
      switch (action.payload.order) {
        case "+Alphabet-":
          filtrado.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return nameA > nameB
              ? 1
              : nameB > nameA
              ? -1
              : nameB === nameA
              ? 0
              : null;
          });
          break;
        case "-Alphabet+":
          filtrado.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return nameA > nameB
              ? -1
              : nameB > nameA
              ? 1
              : nameB === nameA
              ? 0
              : null;
          });
          break;
        case "+Rating-":
          filtrado.sort((a, b) => a.rating - b.rating);
          break;
        case "-Rating+":
          filtrado.sort((a, b) => b.rating - a.rating);
          break;
        case "+RDate-":
          filtrado.sort((a, b) => new Date(b.released) - new Date(a.released));
          break;
        case "-RDate+":
          filtrado.sort((a, b) => new Date(a.released) - new Date(b.released));
          break;
        case "+Precio-":
          filtrado.sort((a, b) => a.price - b.price);
          break;
        case "-Precio+":
          filtrado.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }

      //Remplazamos esto en el nuevo estado, no es necesario usar return, tambien podria ser el callback de state que se le pasa a la funcion.
      //pero ambos funcionan
      return { ...state, videogamesFiltrados: filtrado };
    },
  },
});

export const { getAllVideogames, getVideogameById, filterVideogames, clearVideogame } =
  videogamesSlice.actions;
  
export default videogamesSlice.reducer;
