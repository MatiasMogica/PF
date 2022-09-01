import axios from "axios";
import { getAllVideogames, getVideogameById } from "../slices/videogamesSlice";

export const getVideogames = () => (dispatch) => {
  axios(`https://api.rawg.io/api/games?key=694ce47cad99476382b136573ed15609`)
    .then((res) => dispatch(getAllVideogames(res.data.results)))
    .catch((e) => console.log(e));
};

export const getById = (id) => (dispatch) => {
  axios(
    `https://api.rawg.io/api/games/${id}?key=694ce47cad99476382b136573ed15609`
  )
    .then((res) => dispatch(getVideogameById(res.data.results)))
    .catch((e) => console.log(e));
};
