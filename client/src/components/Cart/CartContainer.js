import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { calculateTotal } from '../../redux/slices/cartSlice'
import { openModal } from '../../redux/slices/modalSlice'
import NavBar from '../NavBar'
import CartItem from './CartItem'
import Modal from './Modal/Modal'

const CartContainer = () => {
    const {cartItems, total, amount} = useSelector((state) => state.cart)
    const {isOpen} = useSelector((state) => state.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(calculateTotal())
    }, [dispatch, cartItems]) 

    if(amount < 1) {
        return (
            <div>
                <NavBar />
                <h1>Your cart is currently empty</h1>
            </div>
        )
    }

    return  (
        <div>
            <NavBar />
            <h2>Your cart</h2>
            {isOpen && <Modal />}
            <div>
                {
                    cartItems.map((item) => {
                        return <CartItem key={item.idAPI} {...item} />
                    }) 
                    
                }
            </div>
            <footer>
                <div>
                    <hr />
                        <h4>
                            Total: <span>${total} </span>
                        </h4>
                </div>
                <button onClick={() => dispatch(openModal())}>Clear cart</button>
            </footer>
        </div>
    )
}

export default CartContainer