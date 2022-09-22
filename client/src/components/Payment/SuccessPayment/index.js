import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaymentItem from "./paymentItem";
import Modals from "../../Modals/index";
import { useModal } from "../../Modals/useModal";
import check from "../../../images/transfer.png";
import "./index.css";
import { clearCart } from "../../../redux/slices/cartSlice";

export default function SuccessPayment() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  // eslint-disable-next-line
  const [isOpenModal, openedModal, closeModal] = useModal(true);

 /*  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch]) */

  return (
    <div>
      <h4 className="title">Games added in your last purchase</h4>
      <div className="Succes_container">
        {cartItems.map((item) => {
          return (
            <div className="containerP">
              <PaymentItem key={item.idAPI} {...item} />
            </div>
          );
        })}
      </div>
      <div className="btnHCont">
      <Link to={"/"}>
      <button className="btnHome" onClick={() => dispatch(clearCart())}>
        Return home
      </button>
      </Link>
      </div>
      <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2 className="modal-success-title">Successful payment!</h2>
        <img src={check} alt="success" className="modal_img" />
        <p className="modal_text">
          Thanks for your purchase!. We added video games to your account, from
          now on you can download them.
        </p>
        <button className="modal-success-close" onClick={closeModal}>
          CLOSE
        </button>
      </Modals>
    </div>
  );
}