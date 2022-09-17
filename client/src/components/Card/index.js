import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddIcon, CartIcon, Heart, RedHeart, Star } from "../../icons/Icons";
import { addItem } from "../../redux/slices/cartSlice";
import { addWished } from "../../redux/slices/wishListSlice";
import './index.css'

export default function Card({ name, image, platforms,  genres, released, _id, rating, price,idAPI}){
    
    const dispatch = useDispatch()
    const {wishedItems} = useSelector((state) => state.wishList)
    const { cartItems } = useSelector((state) => state.cart);
    let videogames = useSelector((state) => state.videogames.videogamesFiltrados);
    let game = videogames.find((i) => i._id === _id)

    const inCart = cartItems.find((i) => i._id === _id);
    const inWished = wishedItems.find((i) => i._id === _id);

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
            <div className="buttonsContainer">
                {wishedItems.includes(inWished) ? (
                    <div className="wishedContainer">
                        {" "}
                        <RedHeart />{" "}
                        </div>
                    ) : (
                        <button
                            className="addWished"
                            onClick={() => dispatch(addWished(game))}
                        >
                        <Heart />
                        </button>
                    )}
                {cartItems.includes(inCart) ? (
                    <div className="inCart">
                        {" "}
                        <CartIcon />{" "}
                        </div>
                    ) : (
                        <button
                        className="addButton"
                        onClick={() => dispatch(addItem(game))}
                        >
                        <AddIcon />
                        </button>
                    )}
            </div>
        </div>
    </div>)
}