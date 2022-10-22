import styles from "./HeaderCart.module.scss";
import CartIcon from "../UI/CartIcon/CartIcon";
import { useContext } from "react";
import CartContext from "../../CartContext";
const HeaderCart = (props) => {
  const ctx = useContext(CartContext);
  const cartBtnHandler = () => {
    ctx.openCart();
  };
  return (
    <button onClick={cartBtnHandler} className={styles.headerCart}>
      <CartIcon />
      <span className={styles.headerCart__title}>Your cart</span>
      <span className={styles.headerCart__control}>{ctx.cartItems.length}</span>
    </button>
  );
};

export default HeaderCart;
