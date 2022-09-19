import "./Rating.css"
import { DisLike, Like } from "../../icons/Icons"
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import like from "../../images/like.gif";
import dislike from "../../images/dislike.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { postReview } from "../../redux/actions/reviewsActions";
import {useParams} from 'react-router-dom'
import { addReview } from "../../redux/slices/videogamesSlice";
import { getById } from "../../redux/actions/videogamesActions";

export default function Rating() {
    const { id } = useParams();
    const [isOpenLike, openedLike, closeLike] = useModal(false);
    const [isOpenDislike, openedDislike, closeDislike] = useModal(false);
    const dispatch = useDispatch()
    console.log(id)

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id])

    const [input, setInput] = useState({
        review: {
            value: "",
            error: ""
        },
    })

    function handleReview(e) {
        if (e.target.value.length < 500 && e.target.value.length > 20) {
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



    function handleSubmit(e) {
        e.preventDefault()
        if(!input.review.error) {
            try {
                setInput({
                    review: "",
                })
                dispatch(addReview(id))
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <div className="likesContainer">
                <button className="likesButtons" onClick={openedLike}><Like /></button>
                <button className="likesButtons" onClick={openedDislike}><DisLike /></button>
            </div>
            <Modals isOpenModal={isOpenLike} closeModal={closeLike}>
                <h2 className="modal-cart-title">Leave a review</h2>
                    <img src={like} alt="deleteCart" className="modal_img" />
                    <form onSubmit={handleSubmit}>
                        <textarea onChange={(e) => handleReview(e)} />
                        {input.review.error ? <p className="reviewErrors"> {input.review.error} </p> : null }
                        <div className="container-modal-buttons">
                            <button type="submit" className="modal-cart-close" >
                                UPLOAD
                            </button>
                            <button className="modal-cart-delete" onClick={closeLike}>
                                CANCEL
                            </button>
                        </div>
                    </form>
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
                            <button className="modal-cart-delete" onClick={closeDislike}>
                                CANCEL
                            </button>
                        </div>
                    </form>
            </Modals>
        </div>
    )
}

