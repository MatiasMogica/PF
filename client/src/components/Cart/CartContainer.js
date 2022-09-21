import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, removeItem } from "../../redux/slices/cartSlice";
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
import { Bag, Trash, Remove, Star } from "../../icons/Icons";
import { Link } from 'react-router-dom'
import Particle from "../../components/Particle/Particle";

import styles from './Shopping.module.css'

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((state) => state.cart);
  const { id, username } = useSelector((state) => state.logIn.logIn);
  const { isOpen } = useSelector((state) => state.modal);
  // eslint-disable-next-line no-unused-vars
  const [isOpenModal, openedModal, closeModal] = useModal(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("CARTITEMS", cartItems);
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
    //   <div>
    //     <NavBar />
    //     <h1 className="cartTitle">Your cart</h1>
    //     <div className="containerItem">
    //       {cartItems.map((item) => {
    //         return <CartItem key={item._id} {...item} />;
    //       })}
    //     </div>
    //     <footer>
    //       <hr />
    //       {isOpen && <Modal />}
    //       <div className="buttonsContainer">
    //         <h2 className="totalTitle">
    //           Total: <span className="total">${total} </span>
    //         </h2>
    //         <button className="clearButton" onClick={openedModal}>
    //           <Trash />
    //         </button>
    //         <form action="http://localhost:3001/payment/payment" method="POST">
    //         <input type='hidden' name="user_id" value={id}/>
    //         <input type='hidden' name='games_id' value={cartItems.map(i=>i._id)}/>
    //         <input type='hidden' name="username" value={username}/>
    //         <input type='hidden' name="cartItems" value={cartItems.map(i=>{
    //                           return `${i.name}%${i.price}`})}/>
    //           <input
    //             type="hidden"
    //             name="title"
    //             value={cartItems.map((i) => i.name)}
    //           />
    //           <input type="hidden" name="price" value={total} />
    //           <input
    //             type="hidden"
    //             name="picture_url"
    //             value={cartItems.map((i) => i.background_image)}
    //           />
    //           <input type="hidden" name="quantity" value={cartItems.length} />
    //           <button
    //             className="buyButton"
    //             type="submit"
    //             value="Make the purchase"
    //           >
    //             <Bag />
    //           </button>
    //         </form>
    //       </div>
    //     </footer>
    //     <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
    //       <h2 className="modal-cart-title">Are you sure?</h2>
    //       <img src={carritovacio} alt="deleteCart" className="modal_img" />
    //       <p className="modal_text">
    //         You are about to delete all the items saved in the cart, if you wish,
    //         press 'DELETE', otherwise press 'CANCEL'.
    //       </p>
    //       <div className="container-modal-buttons">
    //         <button className="modal-cart-close" onClick={closeModal}>
    //           CANCEL
    //         </button>
    //         <button
    //           className="modal-cart-delete"
    //           onClick={() => dispatch(clearCart())}
    //         >
    //           DELETE
    //         </button>
    //       </div>
    //     </Modals>
    //     {/* <button onSubmit={(e) => handleSubmit(e)}>Terminar compra</button> */}
    //     {/* <button onSubmit={(e) => handleSubmit(e)}>Terminar compra</button> */}
    //   </div>
    // );









    <div className="background-cart">

      <NavBar />

      


      <div className={styles.cartContainer}>

        <div className={styles.container}>

          <h2>Shopping cart</h2>
          {cartItems.length === 0 ? (
            <div className={styles.cartEmpty}>
              <p>Your shopping cart is currently empty</p>
              <div className={styles.startShopping}>
                <Link to='/'>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-arrow-left"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                  </svg>
                  <span>Start shopping</span>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.titles}>
                

              </div>
              <div className={styles.cartItems}>
                {cartItems?.map(cartItem => (
                  <div className={styles.cartItem} key={cartItem.id}>
                    
                      

                      <div class="background-img">
                      <img src={cartItem.background_image} className="imagengames"/>
                        <div class="box">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <div class="content">
                          <h3>{cartItem.name}</h3>
                            <p><a>Rating: {cartItem.rating}</a></p>
                            <div className={styles.cartProductPrice}>${cartItem.price}</div>

                          <button type="button" onClick={() => dispatch(removeItem(cartItem._id))}>Remove</button>

                          

                        </div>
                      </div>
                    </div>
                    </div>
                  

                ))}
              </div>

              <div className={styles.cartSummary}>
              <button className="clearButton" onClick={openedModal}>
            <button className={styles.clearCart}>Clear cart</button>

            </button>
                <div className={styles.cartCheckout}>
                  <div className={styles.subtotal}>
                    <span>Subtotal: {total}$</span>
                    <span className={styles.amount}>$</span>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  {/* <PayButton cartItems={cart.cartItems} userInfo={userById} cartInfo={cart}/> */}
                  <div className={styles.continueShopping}>
                    <Link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                      </svg>
                      <span>Continue Shopping</span>
                      
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          )}</div>
        {/* <Footer />      */}
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
              <input type='hidden' name="user_id" value={id} />
              <input type='hidden' name='games_id' value={cartItems.map(i => i._id)} />
              <input type='hidden' name="username" value={username} />
              <input type='hidden' name="cartItems" value={cartItems.map(i => {
                return `${i.name}%${i.price}`
              })} />
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
      </div>




    </div>
  )
};

export default CartContainer;
