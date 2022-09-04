import axios from "axios";
import { getAllVideogames, getVideogameById } from "../slices/videogamesSlice";

export const getVideogames = () => (dispatch) => {
    axios(`http://localhost:3001/games`)
    .then(res => dispatch(getAllVideogames(res.data)))
    .catch(e => console.log(e))
}

export const getById = (id) => (dispatch) => {
    axios(`http://localhost:3001/games/${id}`)
    .then(res => dispatch(getVideogameById(res.data)))
    .catch(e => console.log(e))
}