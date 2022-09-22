import { createSlice } from "@reduxjs/toolkit";

const orderSlice= createSlice({
name:'orders',
initialState:{

    orders:[],
    order:{}
    
},
reducers:{
    getAllOrders:(state,action)=>{
        state.orders = action.payload;
    },
    getOrderId:(state,action)=>{
        state.order= action.payload
    }
}




})

export const {getAllOrders,getOrderId}= orderSlice.actions
export default orderSlice.reducer