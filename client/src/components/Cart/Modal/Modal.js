import { closeModal } from "../../../redux/slices/modalSlice"
import { clearCart } from "../../../redux/slices/cartSlice"
import { useDispatch } from "react-redux"

const Modal = () => {

    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <h4>Remove all the games from your cart?</h4>
                <div>
                    <button type="button" onClick={() => {dispatch(clearCart()); dispatch(closeModal())}}>Confirm</button>
                    <button type="button" onClick={() => {dispatch(closeModal())}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal