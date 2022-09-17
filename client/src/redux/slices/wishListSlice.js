import { createSlice } from "@reduxjs/toolkit";

const wishListFromLocalStorage = JSON.parse(localStorage.getItem('wishList') || '[]')
const wishedAmountFromLocalStorage = JSON.parse(localStorage.getItem('wishedAmount') || '0') 

const initialState = {
    wishedItems: wishListFromLocalStorage,
    wishedAmount: wishedAmountFromLocalStorage,
}

const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        clearWishList: (state) => {
            state.wishedItems = [];
            state.wishedAmount = 0;
        },
        addWished: (state, {payload}) => {
            const item = state.wishedItems.find((i) => i._id === payload._id)
                if(item) {
                    console.log("Ya existe")
                } else {
                    state.wishedItems.push(payload)
                    state.wishedAmount++
                }
        },
        removeWished: (state, {payload}) => {
            const itemId = payload
            state.wishedItems = state.wishedItems.filter(p => p._id !== itemId);
            state.wishedAmount--
        },
    }
})

export const {clearWishList, addWished, removeWished, userWishList} = wishListSlice.actions
export default wishListSlice.reducer