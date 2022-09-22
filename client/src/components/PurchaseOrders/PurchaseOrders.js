import NavBarAdmin from "../NavBar/NavBarAdmin";
import styled from "styled-components";
import { getOrders } from "../../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import CardOrder from "./CardOrder";
import Chart from "../Chart/Chart";
import axios from "axios";

export default function PurchaseOrders() {
  const order = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // ORDER STATS
  const [orderStats, setOrderStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("http://localhost:3001/order/stats");
        res.data.map((item) => {
          setOrderStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Monthly orders income": item.total },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <>
      
      <Container>
        
        <NavBarAdmin />

        <Content>
        <Chart
        data={orderStats}
        title="Order Analytics"
        grid
        dataKey="Monthly orders income"
      />
        <DivMainOrder>
          {order &&
            order.map((order) => {
              return <CardOrder key={order.id} {...order} />;
            })}
        </DivMainOrder>
        </Content>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;

  
`;
const DivMainOrder = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #202020;
  height: fit-content;
  width: 80vw;
  margin: 0 auto;

`;
const Content= styled.div`
display: flex;
flex-direction: column;
margin-left:15%;


`