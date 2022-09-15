import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaymentItem from "./paymentItem";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import check from '../../images/transfer.png'
import "./index.css";

export default function SuccessPayment() {
  const { cartItems } = useSelector((state) => state.cart);
  const [isOpenModal, openedModal, closeModal] = useModal(true)
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
      <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2 className="modal-success-title">Successful payment!</h2>
        <img src={check} alt="success" className="modal_img"/>
        <p className="modal_text">Thanks for your purchase!. We added video games to your account, from now on you can download them.</p>
        <button className='modal-success-close' onClick={closeModal}>CLOSE</button>
      </Modals>
    </div>
  );
}
