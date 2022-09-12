/* import { Down, Up } from "./Icons" */

import { useDispatch } from "react-redux"
import { Remove, Star } from "../../icons/Icons";
import { removeItem } from "../../redux/slices/cartSlice"
import "./CartItem.css"

const CartItem = ({_id, name, background_image, rating, price/* , amount */}) => {

    const dispatch = useDispatch()

    return (
        <div className="itemContainer" key={_id}>
            <img alt={name} className="cartImage" src={background_image} />
            <div className="removeContainer">
                    <button className="removeButton" type="button" onClick={() => dispatch(removeItem(_id))}><Remove /></button>
                </div>
                <h1 className="itemName"> {name} </h1>
                <div className="rating">
                <p> {rating} </p>
                    <div className="star"> <Star /> </div>
                </div>
                <p className="cartPrice"> ${price} </p>
        </div>
    )
}

export default CartItem