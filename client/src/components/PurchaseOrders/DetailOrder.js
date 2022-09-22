import { useSelector,useDispatch} from "react-redux";
import {useParams} from "react-router-dom"
import React, {useEffect} from "react"
import styled from "styled-components"
import { OrderId } from "../../redux/actions/orderActions";
import {GrClose} from "react-icons/gr"
import {FaRegUser} from "react-icons/fa"
import {BsHandbag,BsCreditCard2Back} from "react-icons/bs"
import { FcOk,FcHighPriority} from "react-icons/fc";
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
            <p style={{color:'grey'}}>Order N°{order?.id}</p>
            <p style={{color:'grey'}}>Created on {Object.entries(order).length && new Date(order.updatedAt).toLocaleString()}</p>
            </MiniContainer>
            <DivUsuario>
             <Title><p><FaRegUser/> Customer</p></Title>
            <MiniContainer>
            <p>id_customer {order?.user_id}</p>
            <p>{order?.username}</p>
            </MiniContainer>
            </DivUsuario>
            <DivUsuario>
            <Title><p><BsHandbag/> Products</p></Title>
            
       
            <MiniContainer><p>Quantity</p><p>{Object.entries(order).length?order.games.length:null} Games</p> </MiniContainer>
                {Object.entries(order).length && order.games.map((e,i)=>{
                return <MiniContainer><p>{e.title}</p><p>$ {e.subtotal_price}</p></MiniContainer>
            })}<hr/>
            <MiniContainer><p> $ Total</p> <p>$ {order?.total_price}</p></MiniContainer>
        
            </DivUsuario>
            
      
        <DivUsuario>
            <Title><p><BsCreditCard2Back/> Payment</p></Title>
        <MiniContainer> 
             <p>Method</p>
             <p>{order?.payment_method}</p>
        </MiniContainer>
        <MiniContainer>
        <p>Status</p>
        {order?.payment_status==='rejected' && <p><FcHighPriority/> {order?.payment_status}</p>}
       {order?.payment_status==='approved' && <p><FcOk/> {order?.payment_status}</p>}
        </MiniContainer>
      
       </DivUsuario> 
          
            
            
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
top:10%;
font-size:0.9rem;
transform : translate ( -50 %,-50 % ) ;
display: flex ;
background-color : #DBDBDB ;
box-shadow : 0px 0px 18px 0px rgba ( 0 , 0 , 0 , 0.75 ) ;
flex-direction : column ;
align-items: center;
color:#202020;
justify-content: center;
`;
const DivMain = styled.div`
padding-top:2rem;
display:flex;
flex-direction: column;
width:80%;

min-height:70vh;
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
margin: 1rem 0 1rem 0;
background-color:#FFFFFF;
height:fit-content;
`
const Title= styled.div`
width: 100%;
color:white;
background-color:#7F3ED3;
height:2rem;
display: flex;
align-items:center;
padding-left:0.5rem;

`