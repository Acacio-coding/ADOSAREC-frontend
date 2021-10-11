import React from "react";
import { useForm } from "react-hook-form";
import { BsFillInfoCircleFill as InfoIcon } from "react-icons/bs";
import styles from "./DonationForm.module.scss";

const DonationForm = ({ typePage }) => {
  const { register, handleSubmit } = useForm();

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit()}>
        <div className={styles.subTitleContainer}>
          <div className={styles.iconContainer}>
            <InfoIcon style={{ fontSize: "32px" }} />
          </div>
          <span>Informações</span>
        </div>

        <br />
        <label htmlFor="name">Doador</label>
        <br />
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        <br />
        <br />

        <label htmlFor="data">Data</label>
        <br />
        <input
          type="date"
          id="data"
          {...register("date", { required: true })}
        />
        <br />
        <br />

        <label htmlFor="volume">Volume</label>
        <br />
        <input
          type="text"
          id="volume"
          {...register("volume", { required: true })}
        />
        <br />
        <br />

        <label htmlFor="orgao">Orgão coletor</label>
        <br />
        <input
          type="text"
          id="orgao"
          {...register("orgao", { required: true })}
        />
        <br />
        <br />
        <br />

        <div className={styles.buttonContainer}>
          <input type="submit" value="Enviar" />
        </div>
      </form>
    </div>
  );
};
export default DonationForm;
