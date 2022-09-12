import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaymentItem from "./paymentItem";
import "./index.css";

export default function SuccessPayment() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div>
      <h3 className="title">Successful payment</h3>
      <div className="Succes_container">
        {cartItems.map((item) => {
          return (
            <div className="containerP">
              <PaymentItem key={item.idAPI} {...item} />
            </div>
          );
        })}
      </div>
      <button>
        <Link to={"/"}>Return home</Link>
      </button>
    </div>
  );
}
