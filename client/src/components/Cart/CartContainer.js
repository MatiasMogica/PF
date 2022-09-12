import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import { calculateTotal } from '../../redux/slices/cartSlice'
import { openModal } from '../../redux/slices/modalSlice'
import NavBar from '../NavBar'
import CartItem from './CartItem'
import Modal from './Modal/Modal'
import './CartContainer.css'
import emptyCart from '../../images/emptyCart.png'
import { Bag, Trash } from '../../icons/Icons'

const CartContainer = () => {
    const {cartItems, total, amount} = useSelector((state) => state.cart)
    const {isOpen} = useSelector((state) => state.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('CARTITEMS', cartItems.length)
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
                    <hr />
                {isOpen && <Modal />}
                <div className='buttonsContainer'>
                <h2 className='totalTitle'>
                    Total: <span className='total'>${total} </span>
                </h2>
                    <button className='clearButton' onClick={() => dispatch(openModal())}><Trash /></button>
                    <form action='http://localhost:3001/payment/payment' method='POST'>
                       <input type='hidden' name='title' value={cartItems.map(i => i.name)}/>
                       <input type='hidden' name='price' value={total}/>
                       <input type='hidden' name='picture_url' value={cartItems.map(i => i.background_image)}/>
                       <input type='hidden' name='quantity' value={cartItems.length}/>
                       <button className='buyButton' type='submit' value='Make the purchase'><Bag /></button>
                     </form>
                </div>
            </footer>
            {/* <button onSubmit={(e) => handleSubmit(e)}>Terminar compra</button> */}
        </div>
    )
}

export default CartContainer