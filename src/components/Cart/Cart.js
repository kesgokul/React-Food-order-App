import styles from "./Cart.module.scss";
import Modal from "../UI/Modal/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useAJAX from "../../Hooks/use-AJAX";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { isLoading, error, sendRequest: placeOrder } = useAJAX();

  // For formatting currency values
  const currencyFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  });

  // Fn to close the cart
  const closeCart = () => {
    ctx.closeCart();
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };
  const cancelCheckoutHandler = () => {
    setIsCheckout(false);
  };

  //// to place the order and send info to backend
  const placeOrderHandler = (userData) => {
    placeOrder(
      {
        url: "https://react-swapi01-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: {
          user: userData,
          itemsOrdered: ctx.cartItems,
        },
        headers: {
          "content-type": "application/json",
        },
      },
      (data) => console.log(data)
    );
    setOrderPlaced(true);
    ctx.clearCart();
  };

  const cartContent = (
    <React.Fragment>
      <ul className={styles.cartItemList}>
        {ctx.cartItems?.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            id={item.id}
            quantity={item.quantity}
          ></CartItem>
        ))}
      </ul>
      <div className={styles.totals}>
        <span>Total Amount</span>
        <span>{currencyFormat.format(ctx.totalAmount)}</span>
      </div>

      {!isCheckout && (
        <div className={styles.controls}>
          <button onClick={closeCart} className={styles["btn--close"]}>
            Close
          </button>
          {ctx.cartItems.length > 0 && (
            <button onClick={checkoutHandler} className={styles.btn}>
              order
            </button>
          )}
        </div>
      )}
      {isCheckout && (
        <Checkout
          onConfirm={placeOrderHandler}
          onCancel={cancelCheckoutHandler}
        ></Checkout>
      )}
    </React.Fragment>
  );

  return (
    <Modal className={props.className}>
      {!isLoading && !orderPlaced && cartContent}
      {isLoading && <p className={styles.statusMessage}>Placing your order</p>}
      {error && <p className={styles.statusMessage}>Order falied..! {error}</p>}
      {orderPlaced && !error && (
        <div className={styles.statusMessage}>
          <p>Order Placed successfully</p>
          <button onClick={closeCart} className={styles["btn--close"]}>
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
