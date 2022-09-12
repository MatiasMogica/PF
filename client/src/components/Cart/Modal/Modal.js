import { closeModal } from "../../../redux/slices/modalSlice"
import { clearCart } from "../../../redux/slices/cartSlice"
import { useDispatch } from "react-redux"
import {Confirm, Cancel} from "../../../icons/Icons.js"
import "./Modal.css"

const Modal = () => {

    const dispatch = useDispatch()

    return (
        <div className="modalContainer">
            <h2>Remove all the games from your cart?</h2>
            <button className="confirmButton" type="button" onClick={() => {dispatch(clearCart()); dispatch(closeModal())}}><Confirm /></button>
            <button className="cancelButton" type="button" onClick={() => {dispatch(closeModal())}}><Cancel /></button>
        </div>
    )
}

export default Modal