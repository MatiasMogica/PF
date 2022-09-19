
import NavBarAdmin from "../NavBar/NavBarAdmin"
import styled from "styled-components"

import { useEffect,useState } from "react";
import axios from "axios"
import DetailOrder from "./DetailOrder";
export default function PurchaseOrders(){
    const [order,setOrder]=useState([])
    useEffect(() => {  
        axios('http://localhost:3001/order/order')
        .then(({data}) =>{
            setOrder(data)}
        )
        .catch((err) =>console.log(err))
    },[])

    
    return (
        <>
        <Container>
            <NavBarAdmin/>
                {order && order.map((order) =>{
                return <DetailOrder key={order.id} {...order} />
                })}


        </Container>
        </>
    )
}
const Container = styled.div`
  display: flex;
  border-radius: 2rem;
  margin: 0.7rem;
`;