import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Axios from "axios";

import {
  BsFillInfoCircleFill as InfoIcon,
  BsFillTelephoneFill as ContactIcon,
} from "react-icons/bs";
import { HiLocationMarker as AddressIcon } from "react-icons/hi";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import styles from "./Register.module.scss";

const RegisterU = () => {
  const { register, handleSubmit } = useForm();
  const token = sessionStorage.getItem("token");
  const history = useHistory();

  const handleData = async (data) => {
    data.nome =
      data.cidade.charAt(0).toUpperCase() + data.cidade.slice(1).toLowerCase();

    data.cidade =
      data.cidade.charAt(0).toUpperCase() + data.cidade.slice(1).toLowerCase();

    data.status = true;

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    try {
      await Axios.post(
        "https://app-node-api-test.herokuapp.com/collector",
        data,
        {
          headers: header,
        }
      );
      history.push("/unidades");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.fullContainer}>
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu typePage="register" title="Cadastrar Unidades Coletoras" />

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(handleData)}>
            <div className={styles.subTitleContainer}>
              <div className={styles.iconContainer}>
                <InfoIcon style={{ fontSize: "31px" }} />
              </div>
              <span>Informações básicas</span>
            </div>

            <br />
            <label htmlFor="name">Unidade</label>
            <br />
            <input
              type="text"
              id="name"
              required={true}
              placeholder="Digite o nome da unidade coletora..."
              {...register("nome")}
            />
            <br />
            <br />
            <br />

            <div className={styles.subTitleContainer}>
              <div className={styles.iconContainer}>
                <AddressIcon style={{ fontSize: "32px" }} />
              </div>
              <span>Endereço</span>
            </div>

            <label htmlFor="cidade">Cidade</label>
            <br />
            <input
              type="text"
              id="cidade"
              placeholder="Digite a cidade da unidade coletora..."
              required={true}
              {...register("cidade")}
            />
            <br />
            <br />
            <br />

            <div className={styles.subTitleContainer}>
              <div className={styles.iconContainer}>
                <ContactIcon style={{ fontSize: "32px" }} />
              </div>
              <span>Contato (opcional)</span>
            </div>
            <br />

            <label htmlFor="telefone">Telefone</label>
            <br />
            <input
              type="number"
              id="telefone"
              {...register("telefone")}
              minLength="10"
              maxLength="11"
              placeholder="0000000000"
            />
            <br />
            <br />
            <br />

            <div className={styles.buttonContainer}>
              <input type="submit" value="Cadastrar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterU;
