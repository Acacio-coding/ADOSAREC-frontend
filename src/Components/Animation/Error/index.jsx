import React from "react";
import { ImCancelCircle as CloseIcon } from "react-icons/im";
import styles from "./Error.module.scss";

const ErrorAnimation = ({ text, error, handleError }) => {
  return (
    <div className={error ? styles.showError : styles.hideError}>
      {text}
      <CloseIcon id={styles.icon} onClick={handleError} />
    </div>
  );
};

export default ErrorAnimation;
