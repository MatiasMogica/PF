import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Star } from "../../icons/Icons";
import { getById } from "../../redux/actions/videogamesActions";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import like from "../../images/like.gif";

import "./index.css"

export default function Details({details}) {

    console.log(details)
    const dispatch = useDispatch()
    const { id } = useParams();
    const [isOpenLike, openedLike, closeLike] = useModal(false);
    const [isOpenDislike, openedDislike, closeDislike] = useModal(false);
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        dispatch(getById(id))
    }, [reducerValue])

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
        }
    }
    
    async function handleUpdate(reviewId) {
        console.log("Este es id", id)
        try {
            await axios.update(`http://localhost:3001/reviews/${reviewId}`, {
                comments: input.review.value,
            })
        forceUpdate();
        } catch (error) {
            console.log(error)
        }
    }


    async function handleClick(reviewId) {
        console.log("Este es id", id)
        try {
            await axios.delete(`http://localhost:3001/reviews/${reviewId}`)
        forceUpdate();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div key={details?.idAPI}>
            <div className="imageContainer">
                <img alt={details?.name} className="image" src={details?.background_image} />
            </div>
            <div className="infoContainer">
                <div>
                    <h1 className="title">{details?.name}</h1> 
                </div>
                <div>
                    <p className="html"dangerouslySetInnerHTML={{ __html:details?.description}}/>
                </div>
                <div>
                    <p className="price"> ${details?.price} </p>
                </div>
                <div className="ratingContainer">
                    <p className="info"> {details?.rating}  </p>
                    <div className="starContainer"> <Star/> </div>
                </div>
                <div>
                    <p className="info">{details?.genres.length && details.genres.join(', ') }</p>  
                </div>
                <div>
                    <p className="info">{details?.platforms.length && details.platforms.join(', ') }</p>  
                </div>
                <div>
                    {details.comments?.map((c) => {
                        return (
                            <div key={c._id}>
                                <button onClick={() => handleClick(c._id)}>X</button>
                                <button onClick={openedLike}>Edit</button>
                                {c.comments}
                            </div>
                    )
                    }
                        )} 
                </div>
                <Modals isOpenModal={isOpenLike} closeModal={closeLike}>
                <div>
                <h2 className="modal-cart-title">Leave a review</h2>
                    <img src={like} alt="deleteCart" className="modal_img" />
                    <form onSubmit={ handleSubmit }>
                        <textarea onChange={(e) => handleReview(e)} name={input.review.value} />
                        {input.review.error ? <p className="reviewErrors"> {input.review.error} </p> : null }
                        <div className="container-modal-buttons">
                            <button type="submit" className="modal-cart-close" onClick={handleUpdate} >
                                UPLOAD
                            </button>
                        </div>
                    </form>
                    <button className="modal-cart-delete" onClick={closeLike}>
                        CANCEL
                    </button>
                </div>
            </Modals>
            </div>
        </div>
    )
}