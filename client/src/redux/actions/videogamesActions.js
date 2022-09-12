import axios from "axios";
import { getAllVideogames, getVideogameById } from "../slices/videogamesSlice";

export const getVideogames = () => (dispatch) => {
    axios.get(`/games`)
    .then(res => dispatch(getAllVideogames(res.data)))
    .catch(e => console.log(e))
}

export const getById = (id) => (dispatch) => {
    axios.get(`/games/${id}`)
    .then(res => dispatch(getVideogameById(res.data)))
    .catch(e => console.log(e))
}