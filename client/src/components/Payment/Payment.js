import Error404 from "../Errors/index";
import SuccessPayment from "./SuccessPayment/index";
import FailurePayment from './FailurePayment/index'
import axios from "axios"
import React,{ useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

export default function Payment(){

    const querystring = window.location.search
    const [order, setOrder] = useState({})
    const dispatch = useDispatch()
      
        const searchParams=new URLSearchParams(querystring)
        const order_id=searchParams.get('order_id')
       
        useEffect(
          ()=>{
            axios(`http://localhost:3001/order/order/${order_id}`)
            .then(({data})=>{
            setOrder(data)
         })
            .catch((err)=>console.log(err))
          }
        ,[])

      if(! order_id) return(<><Error404/></>)
     
        
       
return (
  <>
  {Object.entries(order).length ?
     
      (order.payment_status==='approved'? <SuccessPayment/> /* && dispatch(clearCart()) */ :<FailurePayment/>):null}
  </>
)

}