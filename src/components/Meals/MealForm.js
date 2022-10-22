import styles from "./MealForm.module.scss";
import Input from "../UI/Input/Input";
import { useRef } from "react";

const MealForm = (props) => {
  const ref = useRef();
  const addToCartHandler = (e) => {
    e.preventDefault();
    const quantity = +ref.current.value();

    // Guard clause
    if (quantity <= 0 || quantity > 10) return;
    props.onAddtoCart(quantity);
  };
  return (
    <form onSubmit={addToCartHandler} className={styles.mealForm}>
      {/* <label htmlFor="quantity">Amount</label>
      <input name="quntity" type="number" min={1} max={10} /> */}
      <Input
        label="amount"
        ref={ref}
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          step: "1",
          max: "10",
        }}
      ></Input>
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealForm;
