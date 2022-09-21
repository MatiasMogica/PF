import { useSelector,useDispatch} from "react-redux";
import {useParams} from "react-router-dom"
import React, {useEffect} from "react"
import styled from "styled-components"
import { OrderId } from "../../redux/actions/orderActions";
import {GrClose} from "react-icons/gr"
import {FaRegUser} from "react-icons/fa"
import {BsHandbag,BsCreditCard2Back} from "react-icons/bs"
import {GrMoney} from "react-icons/gr"
import { FcOk,FcHighPriority} from "react-icons/fc";
import {GrStatusGood} from "react-icons/gr"
export default function DetailOrder({id,handleModalClose}){
    
    const order=useSelector(state=>state.orders.order);
    const dispatch=useDispatch();
    useEffect(()=>{
    dispatch(OrderId(id))},[dispatch,id]);
    return (
        <>
        <Overlay>
        <Container>
            <CloseBtn onClick={handleModalClose}><GrClose/></CloseBtn>
            <DivMain>
            <MiniContainer>
            <p>Order N°{order?.id}</p>
            <p>Created on {Object.entries(order).length && new Date(order.createdAt).toLocaleString()}</p>
            </MiniContainer>
            <DivUsuario>
             <p><FaRegUser/> Customer</p>
            <MiniContainer>
            <p>id_customer {order?.user_id}</p>
            <p>{order?.username}</p>
            </MiniContainer>
            </DivUsuario>
            <DivUsuario>
            <p><BsHandbag/> Quantity  {Object.entries(order).length?order.games.length:null}</p>
            <DivUsuario>{Object.entries(order).length && order.games.map((e,i)=>{
                return <MiniContainer key={i}><p>{e.title}</p><p>$ {e.subtotal_price}</p></MiniContainer>
            })}</DivUsuario>
            </DivUsuario>
            <MiniContainer><p><GrMoney/> Total</p> <p>$ {order?.total_price}</p></MiniContainer>
        <MiniContainer> 
             <p><BsCreditCard2Back/> Payment Method</p>
             <p>{order?.payment_method}</p>
        </MiniContainer>
        <MiniContainer>
      
        <p><GrStatusGood/> Status</p>
        {order?.payment_status==='rejected' && <p><FcHighPriority/> {order?.payment_status}</p>}
       {order?.payment_status==='approved' && <p><FcOk/> {order?.payment_status}</p>}
       </MiniContainer> 
          
            
            
            </DivMain>
        </Container>
        </Overlay>
        </>
    )



}



const Overlay= styled.div`
background-color:rgba( 0,0,0,0.4 ) ;
position : fixed ;
width : 100 % ;
height : 100 % ;
top:0;
left:0;
bottom:0;
right:0;

`
const Container = styled.div`

width:60% ;
position: fixed ;
right:20%;
top:5%;
font-size:0.9rem;
transform : translate ( -50 %,-50 % ) ;
display: flex ;
background-color : #ffffff ;
box-shadow : 0px 0px 18px 0px rgba ( 0 , 0 , 0 , 0.75 ) ;
flex-direction : column ;
align-items: center;
color:#202020;
`;
const DivMain = styled.div`
display:flex;
flex-direction: column;

background-color:#ffffff;
width:80%;
height:fit-content;
min-height:80%;
`
const MiniContainer= styled.div`
display:flex;
justify-content:space-between;
`
const CloseBtn = styled.button`
display: flex ;
align-items:center;
color:grey;
width: 2rem;
height:2rem;
border:none;
cursor:pointer;
background-color:transparent;
font-size:2rem;
align-self:flex-end; 

`
const DivUsuario= styled.div`
display: flex;
flex-direction:column; 

`