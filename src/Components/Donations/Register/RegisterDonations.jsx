import React from "react";
import DonationForm from "../DonationForm/DonationForm";
import Nav from "../../Nav/Nav";
import TopMenu from "../../TopMenu/TopMenu";
import styles from "./RegisterDonations.module.scss";

const RegisterDonations = () => {
  return (
    <div className={styles.container}>
      <Nav />

      <div className={styles.contentContainer}>
        <TopMenu typePage="register" title="Doações - Cadastrar" />
        
        <div className={styles.formContainer}>
          <DonationForm typePage="register" />
        </div>
      </div>
    </div>
  );
};

export default RegisterDonations;
