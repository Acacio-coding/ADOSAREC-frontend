import React, { useState } from "react";
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
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Register.module.scss";

const RegisterU = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const token = sessionStorage.getItem("token");
  const history = useHistory();

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  const handleData = async (data) => {
    data.nome =
      data.nome.charAt(0).toUpperCase() + data.nome.slice(1).toLowerCase();

    data.cidade =
      data.cidade.charAt(0).toUpperCase() + data.cidade.slice(1).toLowerCase();

    data.status = true;

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    try {
      await Axios.post(
        "https://app-node-api-test.herokuapp.com/v1/collector",
        data,
        {
          headers: header,
        }
      );
      history.push("/unidades");
    } catch (error) {
      setMessage(
        "Não foi possível cadastrar a unidade coletora, contate os desenvolvedores ou tente novamente mais tarde!"
      );
      setError(true);
    }
  };

  return (
    <div className={styles.fullContainer}>
      <Nav />
      <div className={styles.contentContainer}>
        <ErrorAnimation
          error={error}
          handleError={handleError}
          text={message}
        />
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
              minLength="13"
              maxLength="14"
              placeholder="(00) 0000-0000"
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
