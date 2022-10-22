import { useContext } from "react";
import CartContext from "../../CartContext";
import Cart from "./Cart";
import styles from "./CartItem.module.scss";

const CartItem = (props) => {
  const ctx = useContext(CartContext);
  const currencyFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  });

  const addItemHandler = (item) => {
    ctx.addToCart(item);
  };

  const removeItemHandler = (id) => {
    ctx.removeFromCart(id);
  };
  return (
    <li className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <h3 className={styles["cartItemDetails__title"]}>{props.name}</h3>
        <span className={styles["cartItemDetails__quantity"]}>
          {props.quantity}
        </span>
        <span className={styles["cartItemDetails__price"]}>
          {currencyFormat.format(props.price)}
        </span>
      </div>
      <div className={styles.cartItemControls}>
        <button
          onClick={addItemHandler.bind(null, {
            id: props.id,
            name: props.name,
            description: props.description,
            price: props.price,
            quantity: props.quantity,
          })}
          className={styles.btnAdd}
        >
          +
        </button>
        <button
          onClick={removeItemHandler.bind(null, props.id)}
          className={styles.btnRemove}
        >
          -
        </button>
      </div>
    </li>
  );
};

export default CartItem;
