import React, { useEffect, useState, memo } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

import {
  BsFillInfoCircleFill as InfoIcon,
  BsFillTelephoneFill as ContactIcon,
} from "react-icons/bs";
import { HiLocationMarker as AddressIcon } from "react-icons/hi";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import LoadingAnimation from "../../../Components/Animation/Loading/index";
import styles from "./Edit.module.scss";

const DetailsU = () => {
  const { register, handleSubmit } = useForm();
  const [unity, setUnity] = useState({});
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    setUnity(JSON.parse(sessionStorage.getItem("unity")));
    setLoading(false);
  }, [token]);

  const handleData = async (data) => {
    if (!data.nome) data.nome = unity.nome;

    if (!data.cidade) data.cidade = unity.cidade;

    if (!data.email) data.email = unity.email;

    if (!data.telefone) data.telefone = unity.telefone;

    if (data) {
      data.nome =
        data.cidade.charAt(0).toUpperCase() +
        data.cidade.slice(1).toLowerCase();

      data.cidade =
        data.cidade.charAt(0).toUpperCase() +
        data.cidade.slice(1).toLowerCase();
    }

    data.status = true;

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    try {
      await Axios.put(
        `https://app-node-api-test.herokuapp.com/collector/${unity.id}`,
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
      <LoadingAnimation loading={loading} />
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu typePage="edit" title="Editar unidade coletora" />

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(handleData)}>
            <div className={styles.subTitleContainer}>
              <div className={styles.iconContainer}>
                <InfoIcon style={{ fontSize: "32px" }} />
              </div>
              <span>Informações básicas</span>
            </div>

            <br />
            <label htmlFor="name">Nome</label>
            <br />
            <input
              type="text"
              id="name"
              required={true}
              placeholder="Digite o nome da unidade coletora..."
              defaultValue={unity.nome}
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
              defaultValue={unity.cidade}
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
              type="text"
              id="telefone"
              required={true}
              minLength="10"
              maxLength="11"
              placeholder="0000000000"
              defaultValue={unity.telefone}
              {...register("telefone")}
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

export default memo(DetailsU);
