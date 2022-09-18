import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal } from "../../redux/slices/cartSlice";
// eslint-disable-next-line no-unused-vars
import { openModal } from "../../redux/slices/modalSlice";
import NavBar from "../NavBar";
import CartItem from "./CartItem";
import Modal from "./Modal/Modal";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import { clearCart } from "../../redux/slices/cartSlice";
import "./CartContainer.css";
import emptyCart from "../../images/emptyCart.png";
import carritovacio from "../../images/carritovacio.png";
import { Bag, Trash } from "../../icons/Icons";

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  // eslint-disable-next-line no-unused-vars
  const [isOpenModal, openedModal, closeModal] = useModal(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("CARTITEMS", cartItems.length);
    dispatch(calculateTotal());
  }, [dispatch, cartItems]);

  if (amount < 1) {
    return (
      <div>
        <NavBar />
        <div className="empty">
          <h1>Your cart is currently empty</h1>
          <img alt="cart" className="emptyCart" src={emptyCart} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <h1 className="cartTitle">Your cart</h1>
      <div className="containerItem">
        {cartItems.map((item) => {
          return <CartItem key={item.idAPI} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        {isOpen && <Modal />}
        <div className="buttonsContainer">
          <h2 className="totalTitle">
            Total: <span className="total">${total} </span>
          </h2>
          <button className="clearButton" onClick={openedModal}>
            <Trash />
          </button>
          <form action="http://localhost:3001/payment/payment" method="POST">
            <input
              type="hidden"
              name="title"
              value={cartItems.map((i) => i.name)}
            />
            <input type="hidden" name="price" value={total} />
            <input
              type="hidden"
              name="picture_url"
              value={cartItems.map((i) => i.background_image)}
            />
            <input type="hidden" name="quantity" value={cartItems.length} />
            <button
              className="buyButton"
              type="submit"
              value="Make the purchase"
            >
              <Bag />
            </button>
          </form>
        </div>
      </footer>
      <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2 className="modal-cart-title">Are you sure?</h2>
        <img src={carritovacio} alt="deleteCart" className="modal_img" />
        <p className="modal_text">
          You are about to delete all the items saved in the cart, if you wish,
          press 'DELETE', otherwise press 'CANCEL'.
        </p>
        <div className="container-modal-buttons">
          <button className="modal-cart-close" onClick={closeModal}>
            CANCEL
          </button>
          <button
            className="modal-cart-delete"
            onClick={() => dispatch(clearCart())}
          >
            DELETE
          </button>
        </div>
      </Modals>
      {/* <button onSubmit={(e) => handleSubmit(e)}>Terminar compra</button> */}
      {/* <button onSubmit={(e) => handleSubmit(e)}>Terminar compra</button> */}
    </div>
  );
};

export default CartContainer;
