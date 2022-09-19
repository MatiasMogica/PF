import "./Rating.css"
import axios from "axios"
import { DisLike, Like } from "../../icons/Icons"
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import like from "../../images/like.gif";
import dislike from "../../images/dislike.jpg";
import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux"
import { postReview } from "../../redux/actions/reviewsActions";
import {useParams, useHistory, Redirect, useLocation} from 'react-router-dom'
import { addReview } from "../../redux/slices/videogamesSlice";
import { getById } from "../../redux/actions/videogamesActions";
/* import { useNavigate } from "react-router-dom"; */

export default function Rating() {
    const { id } = useParams();
    const [isOpenLike, openedLike, closeLike] = useModal(false);
    const [isOpenDislike, openedDislike, closeDislike] = useModal(false);
    const dispatch = useDispatch()
    const history = useHistory()
    let location = useLocation()
    /* const navigate = useNavigate() */
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    console.log(id)

    useEffect(() => {
        dispatch(getById(id))
    }, [reducerValue, dispatch])

    const [input, setInput] = useState({
        review: {
            value: "",
            error: ""
        },
    })

    console.log(input)

    function handleReview(e) {
        if (e.target.value.length < 500 && e.target.value.length > 10) {
          setInput({
            ...input,
            review: { value: e.target.value, error: "" },
          });
        } else {
          setInput({
            ...input,
            review: {
              value: "",
              error: "The review should have between 10 and 100 characters",
            },
          });
        }
      }



    async function handleSubmit(e) {
        e.preventDefault()
        if(!input.review.error) {
            try {
                await axios.post(`http://localhost:3001/reviews/${id}`, {
            comments: input.review.value,
          })
            forceUpdate();
                /* history.push(`/videogames/${id}`) */
            } catch (error) {
                console.log(error)
            }
            <Redirect to="/" />
        }
    }

    return (
        <div>
            <div className="likesContainer">
                <button className="likesButtons" onClick={openedLike}><Like /></button>
                <button className="likesButtons" onClick={openedDislike}><DisLike /></button>
            </div>
            <Modals isOpenModal={isOpenLike} closeModal={closeLike}>
                <div>
                <h2 className="modal-cart-title">Leave a review</h2>
                    <img src={like} alt="deleteCart" className="modal_img" />
                    <form onSubmit={ handleSubmit }>
                        <textarea onChange={(e) => handleReview(e)} />
                        {input.review.error ? <p className="reviewErrors"> {input.review.error} </p> : null }
                        <div className="container-modal-buttons">
                            <button type="submit" className="modal-cart-close" onClick={closeLike} >
                                UPLOAD
                            </button>
                        </div>
                    </form>
                    <button className="modal-cart-delete" onClick={closeLike}>
                        CANCEL
                    </button>
                </div>
            </Modals>
            <Modals isOpenModal={isOpenDislike} closeModal={closeDislike}>
                <h2 className="modal-cart-title">Leave a review</h2>
                    <img src={dislike} alt="deleteCart" className="modal_img" />
                    <form onSubmit={handleSubmit}>
                        <textarea onChange={(e) => handleReview(e)} />
                        {input.review.error ? <p className="reviewErrors"> {input.review.error} </p> : null }
                        <div className="container-modal-buttons">
                            <button type="submit" className="modal-cart-close" >
                                UPLOAD
                            </button> 
                        </div>
                    </form>
                    <button className="modal-cart-delete" onClick={closeDislike}>
                        CANCEL
                    </button>
            </Modals>
        </div>
    )
}

