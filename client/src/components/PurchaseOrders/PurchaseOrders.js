
import NavBarAdmin from "../NavBar/NavBarAdmin"
import styled from "styled-components"
import  {getOrders} from "../../redux/actions/orderActions";
import { useDispatch,useSelector} from "react-redux";
import { useEffect} from "react";
import DetailOrder from "./DetailOrder";
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