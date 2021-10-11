import React from "react";
import { AiOutlineExclamationCircle as RemoveIcon } from "react-icons/ai";
import styles from "./RemoveDonator.module.scss";

const DonatorRemove = () => {
  const donator = sessionStorage.getItem("donator");

  return (
    <div className={styles.container}>
      <div className={styles.removeContainer}>
        <RemoveIcon />
        <h1>Tem certeza?</h1>
        <p>{`Você realmente deseja remover o doador $`}</p>
      </div>
    </div>
  );
};

export default DonatorRemove;
