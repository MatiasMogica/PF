import React from "react";
import { Link } from "react-router-dom";
import './index.css'

export default function Card({ name, image, platforms,  genre, released, _id, rating, price}){

    return (
        <div className="Card">
        <div>
        <div>
        <div className="img_cointainer">
        <Link to={`/videogames/${_id}`}>
        <img src={image} alt={name} width='200px' height='250px'/>
        </Link>
        </div>
            <h3>{name}</h3>
        </div>
        <div>
            <h4>Platforms: {platforms && platforms.join(', ')}</h4>
        </div>
        <div>
            <h4>Genre: {genre}</h4>           
        </div>
        <div>
            <h4>Rating: {rating}</h4>
        </div> 
        <div>
            <h4>Price: {price}</h4>
        </div>
        <div>
            <p>Released: {released}</p> 
        </div>
        </div>
    </div>)

}