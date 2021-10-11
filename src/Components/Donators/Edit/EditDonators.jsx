import React from "react";
import Nav from "../../Nav/Nav";
import TopMenu from "../../TopMenu/TopMenu";
import DonatorFormEdit from "../DonatorForm/DonatorFormEdit";
import styles from "./EditDonators.module.scss";

const EditDonators = () => {
  const donatorObj = JSON.parse(sessionStorage.getItem("donator"));

  return (
    <div className={styles.container}>
      <Nav />

      <div className={styles.contentContainer}>
        <TopMenu typePage="edit" title={`Editar doador: ${donatorObj.nome}`} />

        <div className={styles.formContainer}>
          <DonatorFormEdit />
        </div>
      </div>
    </div>
  );
};

export default EditDonators;
