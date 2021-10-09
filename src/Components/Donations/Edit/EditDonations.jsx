import React from "react";
import DonationForm from "../DonationForm/DonationForm";
import Nav from "../../Nav/Nav";
import TopMenu from "../../TopMenu/TopMenu";
import styles from "./EditDonations.module.scss";

const EditDonations = () => {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu typePage="edit" title="Doações - Editar" />
        <div>
          <DonationForm typePage="edit" />
        </div>
      </div>
    </div>
  );
};

export default EditDonations;
