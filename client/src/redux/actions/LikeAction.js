import axios from "axios";
import { getPercentageOfLikes } from "../slices/likesSlice";

export const postLikes = (id, percentageOfLikes) => (dispatch) => {
  axios
    .post(`http://localhost:3001/reviews/likes/${id}`, percentageOfLikes)
    .then((res) => dispatch(getPercentageOfLikes(res.data)))
    .catch((e) => console.log(e));
};
