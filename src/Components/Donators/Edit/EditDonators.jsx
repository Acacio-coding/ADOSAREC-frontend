import React from "react";
import DonatorForm from "../DonatorForm/DonatorForm";
import Nav from "../../Nav/Nav";
import TopMenu from "../../TopMenu/TopMenu";
import styles from "./EditDonators.module.scss";

const EditDonators = () => {
  return (
    <div className={styles.container}>
      <Nav />

      <div className={styles.contentContainer}>
        <TopMenu typePage="edit" title="Doador - Editar" />

        <div className={styles.formContainer}>
          <DonatorForm typePage="edit" />
        </div>
      </div>
    </div>
  );
};

export default EditDonators;
