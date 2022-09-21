import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom';
import DetailOrder from './DetailOrder';
import { FcOk,FcHighPriority} from "react-icons/fc";
import React,{useState} from "react"
export default function CardOrder({id,username,payment_status, total_price,games,payment_method}){
    const [modal,setModal]=useState(false)
const handleModalOpen=()=>{
    setModal(true)
}
const handleModalClose = ()=>{
    setModal(false)
}
return (
    <>
    <OrderContainer>
    <User>
    <p>Order N°{id}</p>
    <Id>customer {username}</Id>
    </User>
    <Price>
    <Id>total ${total_price}</Id>
       {payment_status==='rejected' && <p><FcHighPriority/> {payment_status}</p>}
       {payment_status==='approved' && <p><FcOk/> {payment_status}</p>}
    </Price>
    <BtnContainer> 
        <ButtonOrder onClick={handleModalOpen}>
            View Order
        </ButtonOrder>
        
    {/*<Link to={`/adminPanel/purchaseOrders/${id}`}>
        <ButtonOrder>
            View Order
        </ButtonOrder>
</Link>*/}
    </BtnContainer>
   { modal && <DetailOrder id={id} handleModalClose={handleModalClose}/>}
    
    </OrderContainer>
 
    
    </>
)

}
const OrderContainer = styled.div`
display: flex;
justify-content: space-between;
padding:1rem;
&:hover{background-color: rgba(255, 255, 255, 0.2)};
`
const Price = styled.div`
display: flex;
flex-direction: column;

`
const User=styled.div`
display: flex;
flex-direction: column;
`
const BtnContainer = styled.div`
align-items: center;
justify-content:center;
display:flex;
`
const ButtonOrder = styled.button`
background: #03D3C0;
color:white;
cursor:pointer;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid #03D3C0;
border-radius: 3px;
&:hover{
background: transparent;
color: #03D3C0;
}

`
const Id= styled.p`
color:rgb(168, 170, 170)
`