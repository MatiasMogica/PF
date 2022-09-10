import { createSlice } from "@reduxjs/toolkit";

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
const amountFromLocalStorage = JSON.parse(localStorage.getItem('amount') || '0')

const initialState = {
    cartItems: cartFromLocalStorage,
    amount: amountFromLocalStorage ,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            state.amount = 0;
        },
        addItem: (state, {payload}) => {
            const item = state.cartItems.find((i) => i._id === payload._id)
                if(item) {
                    console.log("Ya existe")
                } else {
                    state.cartItems.push(payload)
                    state.amount++
                }
        },
        removeItem: (state, {payload}) => {
            const itemId = payload
            state.cartItems = state.cartItems.filter(p => p._id !== itemId);
            state.amount--
        },
        calculateTotal: (state) => {
            let total = 0
            state.cartItems.forEach((item) => {
                total += item.price
            })
            state.total = total;
        } 
    }
})

export const {clearCart, removeItem, calculateTotal, addItem} = cartSlice.actions
export default cartSlice.reducer