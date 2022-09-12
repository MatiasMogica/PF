import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { calculateTotal } from '../../redux/slices/cartSlice'
import { openModal } from '../../redux/slices/modalSlice'
import NavBar from '../NavBar'
import CartItem from './CartItem'
import Modal from './Modal/Modal'
import './CartContainer.css'
import emptyCart from '../../images/emptyCart.png'
import { Trash } from '../../icons/Icons'

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
                <div className='empty'>
                    <h1>Your cart is currently empty</h1>
                    <img alt="cart" className='emptyCart' src={emptyCart} />
                </div>
            </div>
        )
    }

    return  (
        <div>
            <NavBar />
            <h1 className='cartTitle'>Your cart</h1>
            <div className='containerItem'>
                {
                    cartItems.map((item) => {
                        return <CartItem key={item.idAPI} {...item} />
                    }) 
                    
                }
            </div>
            <footer>
                <div>
                    <hr />
                        <h2 className='totalTitle'>
                            Total: <span className='total'>${total} </span>
                        </h2>
                </div>
                {isOpen && <Modal />}
                <div className='clearButton'>
                    <button className='clearButton' onClick={() => dispatch(openModal())}><Trash /></button>
                </div>
            </footer>
        </div>
    )
}

export default CartContainer