import "./Rating.css"
import axios from "axios"
import { DisLike, GreenLike, Like, RedDisLike, ReviewIcon } from "../../icons/Icons"
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import likeGif from "../../images/like.gif";
import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux"
import {useParams } from 'react-router-dom'
import { getById } from "../../redux/actions/videogamesActions";
import styled from "styled-components";

export default function Rating() {
    const { id } = useParams();
    const [isOpenReview, openedReview, closeReview] = useModal(false);
    const dispatch = useDispatch()
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)

    useEffect(() => {
        dispatch(getById(id))
    }, [reducerValue, dispatch, id])

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

    async function handleLike(e) {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3001/reviews/likes/${id}`)
            setLike(true)
        }
        catch(error) {
            console.log(error)
        }
    }

    async function handleDislike(e) {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3001/reviews/dislikes/${id}`)
            setDislike(true)
        }
        catch(error) {
            console.log(error)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if(!input.review.error) {
            try {
                await axios.post(`http://localhost:3001/reviews/${id}`, {
          comments: input.review.value,
          author:
            JSON.parse(localStorage.getItem("user")).status === false
              ? "Anonymous User"
              : JSON.parse(localStorage.getItem("user")).username,
        });
            forceUpdate();
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <div className="likesButtonsContainer"> 
            {
                like === true ? <div className="likesButtons"><GreenLike /></div> : dislike === true ? <div className="likesButtons"> <RedDisLike /> </div> :
                <>
                <button className="likesButtons" onClick={handleLike}><Like /></button>
                <button className="likesButtons" onClick={handleDislike}><DisLike /></button>
                </> 
            }
            <button className="reviewButton" onClick={openedReview}><ReviewIcon /></button>
            </div>
            <Modals isOpenModal={isOpenReview} closeModal={closeReview} >
                <div>
                <h2 className="modalTitle">Leave a <span className="spanReview">review</span></h2> 
                    <div className="reviewImgContainer"><img src={likeGif} alt="deleteCart" className="reviewImg" /></div>
                    <form onSubmit={ handleSubmit }>
                        <div className="reviewImgContainer"><textarea className="reviewTextArea" onChange={(e) => handleReview(e)} /></div>
                        {input.review.error || input.review.value === "" ? (
              <p className="reviewErrors"> {input.review.error} </p>
            ) : null}
                        <div /* className="container-modal-buttons" */>
                        <button
                type="submit"
                className="modal-cart-close"
                onClick={closeReview}
                disabled={
                  input.review.error || input.review.value === "" ? true : false
                }
              >
                UPLOAD
              </button>
                        </div>
                    </form>
                    <button className="modal-cart-delete" onClick={closeReview}>
                                CANCEL
                    </button>
                </div>
            </Modals>
        </div>
    )
}

