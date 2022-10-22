import styles from "./Input.module.scss";
import React, { useImperativeHandle, useRef } from "react";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      value: () => inputRef.current.value,
    };
  });

  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={inputRef} {...props.input} />
    </div>
  );
});

export default Input;
