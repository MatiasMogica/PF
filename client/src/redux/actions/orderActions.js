import axios from 'axios'
import {getAllOrders} from '../slices/orderSlice'

export const getOrders = ()=> (dispatch) => {
    axios('http://localhost:3001/order/order')
    .then(({data})=> dispatch(getAllOrders(data)))
    .catch((err)=>console.log(err))
}