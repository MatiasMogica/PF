import React from "react";
import { Link } from "react-router-dom";
import { Star } from "../../icons/Icons";
import './index.css'

export default function Card({ name, image, platforms,  genres, released, _id, rating, price,idAPI}){

    return (
        <div /* className="Card" */>
        <div>
        <div className="img_name" >
        <div className="img_container">
        <Link to={`/videogames/${_id}`}>
        <img src={image} alt={name} width='200px' height='180px'/>
        </Link>
        </div>
            <h4>{name}</h4>
        </div>
        <div className="description">
            <h5>Platforms: {platforms && platforms.join(', ')}</h5>
        
            <h5>Genre: {genres && genres.join(', ')}</h5>           
            <div className="containerRating">
                <h5>Rating: {rating} </h5>
                <div className="containerStar"><Star /></div>
            </div>

            <h5>Price: <span className="spanPrice">${price}</span></h5>

            <h5>Released: {released}</h5> 
            </div>

        </div>
    </div>)

}