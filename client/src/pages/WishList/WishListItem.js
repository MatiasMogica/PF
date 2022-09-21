import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AddIcon, CartIcon, Remove, Star } from "../../icons/Icons"
import { addItem } from "../../redux/slices/cartSlice"
import { removeWished } from "../../redux/slices/wishListSlice"
import "./WishListItem.css"


export default function WishListItem ({_id, name, background_image, rating, price, genres}) {

    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart);
    let videogames = useSelector((state) => state.videogames.videogamesFiltrados);
    let game = videogames.find((i) => i._id === _id)

    const inCart = cartItems.find((i) => i._id === _id);

    return (
        <div className="wishedItemContainer" key={_id}>
            <img alt={name} className="wishedImage" src={background_image} />
            <div>
            <button className="removeButton" type="button" onClick={() => dispatch(removeWished(_id))}><Remove /></button>
                <h1>{name}</h1>
                <div className="wishedRating">
                    <h5>Rating: {rating} </h5>
                    <div className="star"><Star /></div>
                </div>
            </div>
            <div>
                <p>${price}</p>
            <div>
                <Link to={`/videogames/${_id}`}>
                    <button>See details</button>
                </Link>
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
            <p>{genres.length && genres.join(', ') }</p>
        </div>
    )
}