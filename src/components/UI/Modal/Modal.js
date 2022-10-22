import styles from "./Modal.module.scss";
import Card from "../Card/Card";
import React, { Fragment, useContext } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import CartContext from "../../../CartContext";

const Modal = (props) => {
  const ctx = useContext(CartContext);
  const cssClassesBackdrop = {
    enter: styles["fade-style-enter"],
    enterActive: styles["fade-slide-enter-active"],
    exit: styles["fade-slide-exit"],
    exitActive: styles["fade-slide-exit-active"],
  };
  return (
    <Fragment>
      <CSSTransition
        in={ctx.isCartOpen}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.backdrop}></div>
      </CSSTransition>
      <CSSTransition
        in={ctx.isCartOpen}
        timeout={300}
        classNames={{ ...cssClassesBackdrop }}
        mountOnEnter
        unmountOnExit
      >
        <Card className={styles.overlayCard}>{props.children}</Card>
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
