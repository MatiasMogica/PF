import { Star } from "../../icons/Icons";
import "./index.css"

export default function Details({details}) {
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
                
            </div>
        </div>
    )
}