import styles from "./Checkout.module.scss";
import { useState, useRef } from "react";

//Validation logic
const isEmpty = (input) => input.trim() === "";
const isFiveDigits = (input) => input.trim().length === 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log("order");
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;

    const isNameValid = !isEmpty(enteredName);
    const isStreetValid = !isEmpty(enteredStreet);
    const isPostalValid = isFiveDigits(enteredPostal);
    const isCityValid = !isEmpty(enteredCity);

    setFormValidity({
      name: isNameValid,
      street: isStreetValid,
      postal: isPostalValid,
      city: isCityValid,
    });

    const isFormValid =
      isNameValid && isStreetValid && isPostalValid && isCityValid;
    console.log(isFormValid);

    // guard clause
    if (!isFormValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };
  const cancelCheckoutHandler = () => {
    props.onCancel();
  };

  const nameClasses = `${styles.control} ${
    !formValidity.name ? styles.invalid : ""
  }`;
  const streetClasses = `${styles.control} ${
    !formValidity.street ? styles.invalid : ""
  }`;
  const postalClasses = `${styles.control} ${
    !formValidity.postal ? styles.invalid : ""
  }`;
  const cityClasses = `${styles.control} ${
    !formValidity.city ? styles.invalid : ""
  }`;

  return (
    <form onSubmit={submitFormHandler} className={styles["checkout-form"]}>
      <div className={nameClasses}>
        <label htmlFor="name">You Name</label>
        <input ref={nameRef} id="name" type="text" />
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} id="street" type="text" />
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} id="postal" type="text" />
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} id="city" type="text" />
      </div>
      <div className={styles["btns"]}>
        <button className={styles["btn-order"]} type="submit">
          Place Order
        </button>
        <button
          className={styles["btn-cancel"]}
          onClick={cancelCheckoutHandler}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
