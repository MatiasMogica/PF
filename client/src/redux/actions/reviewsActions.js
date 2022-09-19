import axios from "axios";

import { getAllReviews, deleteAReview, createReview } from "../slices/reviewsSlice";
import { addReview } from "../slices/videogamesSlice";

export const getReviews = () => (dispatch) => {
    axios(`http://localhost:3001/reviews`)
    .then(res => dispatch(res.data))
    .catch(e => console.log(e))
}

export const postReview = (id) => (dispatch) => {
    axios(`http://localhost:3001/reviews/${id}`)
    .then(res => dispatch(res.data))
    .catch(e => console.log(e))
}

export const deleteReview = (id) => (dispatch) => {
    axios(`http://localhost:3001/reviews/${id}`)
    .then(res => dispatch(deleteAReview(res.data)))
    .catch(e => console.log(e))
}