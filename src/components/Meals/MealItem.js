import styles from "./MealItem.module.scss";
import MealForm from "./MealForm";
import { useContext } from "react";
import CartContext from "../../CartContext";

const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const addToCartHandler = (quantity) => {
    const item = {
      id: props.id,
      name: props.name,
      price: props.price,
      quantity: +quantity,
    };

    ctx.addToCart(item);
    // console.log(ctx.cartItems);
  };
  return (
    <li id={props.id} className={styles.mealItem}>
      <div className={styles.mealItemDetails}>
        <h3 className={styles.mealItemDetails__title}>{props.name}</h3>
        <p className={styles.mealItemDetails__desc}>{props.description}</p>
        <span className={styles.mealItemDetails__price}>
          {new Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "USD",
          }).format(props.price)}
        </span>
      </div>
      <MealForm onAddtoCart={addToCartHandler} id={props.id} />
    </li>
  );
};

export default MealItem;
