import React from "react";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import { Link } from "react-router-dom";
import rechazado from "../../images/rechazado.png";
import "./index.css";

export default function FailurePayment() {
  // eslint-disable-next-line
  const [isOpenModal, openedModal, closeModal] = useModal(true);
  return (
    <div>
      <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2 className="modal-failure-title">Payment declined</h2>
        <img src={rechazado} alt="success" className="modal_img" />
        <p className="modal_text">
          There was an error in the process of your purchase. Please check your
          details and try again.
        </p>
        <Link to={"/cart"}>
          <button className="modal-failure-close" onClick={closeModal}>
            BACK TO CART
          </button>
        </Link>
      </Modals>
    </div>
  );
}
