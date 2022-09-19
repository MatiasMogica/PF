import axios from "axios";
import { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Star } from "../../icons/Icons";
import "./index.css"

export default function Details({details}) {

    console.log(details)
    const dispatch = useDispatch()
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
    }, [reducerValue])

    async function handleClick(id) {
         try {
            await axios.delete(`http://localhost:3001/reviews/${id}`)
        forceUpdate();
            /* history.push(`/videogames/${id}`) */
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
                                <button onClick={() => {}}>X</button>
                                {c.comments}
                            </div>
                        
                    )
                    }
                         )} 
                </div>
                
            </div>
        </div>
    )
}