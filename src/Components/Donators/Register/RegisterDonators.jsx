import React from "react";
import DonatorFormRegister from "../DonatorForm/DonatorFormRegister";
import Nav from "../../Nav/Nav";
import TopMenu from "../../TopMenu/TopMenu";
import styles from "./RegisterDonators.module.scss";

const RegisterDonators = () => {
  return (
    <div className={styles.container}>
      <Nav />

      <div className={styles.contentContainer}>
        <TopMenu typePage="register" title="Doadores - Cadastrar" />

        <div className={styles.formContainer}>
          <DonatorFormRegister typePage="register" />
        </div>
      </div>
    </div>
  );
};

export default RegisterDonators;
