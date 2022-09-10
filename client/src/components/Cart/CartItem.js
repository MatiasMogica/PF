/* import { Down, Up } from "./Icons" */

import { useDispatch } from "react-redux"
import { removeItem } from "../../redux/slices/cartSlice"
import "./CartItem.css"

const CartItem = ({_id, name, background_image, rating, price/* , amount */}) => {

    const dispatch = useDispatch()

    return (
        <div key={_id}>
            <img alt={name} className="image" src={background_image} />
            <div>
                <h4> {name} </h4>
                <h4> {rating} </h4>
                <h4> ${price} </h4>
                <button onClick={() => dispatch(removeItem(_id))}>Remove</button>
            </div>
            {/* <div>
                <button>
                    <Up />
                </button>
                <p> {amount} </p>
                <button>
                    <Down />
                </button>
            </div> */}
        </div>
    )
}

export default CartItem