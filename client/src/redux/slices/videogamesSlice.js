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
    filterVideogames: (state, action) => {
      var filtrado = [...state.videogames];

      if (action.payload.name) {
        filtrado = filtrado.filter((x) => {
          return x.name
            .toLowerCase()
            .includes(action.payload.name.toLowerCase());
        });
      }

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

      action.payload.genres.forEach((element) => {
        filtrado = filtrado.filter((x) => {
          let p = false;
          for (let i = 0; i < x.genres.length; i++) {
            if (x.genres[i].name === element) {
              p = true;
            }
          }
          return p;
        });
      });

      action.payload.plataforms.forEach((element) => {
        filtrado = filtrado.filter((x) => {
          let p = false;
          for (let i = 0; i < x.platforms.length; i++) {
            if (x.platforms[i].platform.name === element) {
              p = true;
            }
          }
          return p;
        });
      });

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
          filtrado.sort((a, b) => a.metacritic - b.metacritic);
          break;
        case "-Rating+":
          filtrado.sort((a, b) => b.metacritic - a.metacritic);
          break;
        case "+RDate-":
          filtrado.sort((a, b) => new Date(b.released) - new Date(a.released));
          break;
        case "-RDate+":
          filtrado.sort((a, b) => new Date(a.released) - new Date(b.released));
          break;
        default:
          break;
      }

      return { ...state, videogamesFiltrados: filtrado };
    },
  },
});

export const { getAllVideogames, getVideogameById, filterVideogames } =
  videogamesSlice.actions;
export default videogamesSlice.reducer;
