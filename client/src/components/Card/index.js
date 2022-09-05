import React from "react";
import { Link } from "react-router-dom";
import './index.css'

export default function Card({ name, image, platforms,  genre, released, _id, rating, price}){

    return (
        <div className="Card">
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
        
            <h5>Genre: {genre}</h5>           

            <h5>Rating: {rating}</h5>

            <h5>Price: {price}</h5>

            <h5>Released: {released}</h5> 
            </div>
        </div>
    </div>)

}