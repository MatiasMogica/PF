
import NavBarAdmin from "../NavBar/NavBarAdmin"
import styled from "styled-components"
import  {getOrders} from "../../redux/actions/orderActions";
import { useDispatch,useSelector} from "react-redux";
import { useEffect} from "react";
import CardOrder from "./CardOrder";

export default function PurchaseOrders(){
    const order = useSelector((state) => state.orders.orders);
    const dispatch=useDispatch()
    useEffect(() => {  
       dispatch(getOrders())
    },[dispatch])

    
    return (
        <>
        <Container>
            <NavBarAdmin/>
            <DivMainOrder>
                {order && order.map((order) =>{
                return <CardOrder key={order.id} {...order} />
                })}
            </DivMainOrder>

        </Container>
        </>
    )
}
const Container = styled.div`
  display: flex;
  border-radius: 2rem;
  
  
`;
const DivMainOrder = styled.div`
display:flex;
flex-direction: column;
background-color:#202020;
width:80%;
height:fit-content;
min-height:80%;
margin:20px;


`