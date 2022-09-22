import axios from 'axios'
import {getAllOrders, getOrderId} from '../slices/orderSlice'


export const getOrders = ()=> (dispatch) => {
    axios('http://localhost:3001/order/order')
    .then(({data})=> dispatch(getAllOrders(data)))
    .catch((err)=>console.log(err))
}
export const OrderId=(id)=> (dispatch) => {
    axios(`http://localhost:3001/order/order/${id}`)
    .then(({data})=> dispatch(getOrderId(data)))
    .catch((err)=> console.log(err))


}