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
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Edit.module.scss";

const DetailsU = () => {
  const { register, handleSubmit } = useForm();
  const [unity, setUnity] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const history = useHistory();

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("unity")) history.push("/unidades");

    setLoading(true);
    setUnity(JSON.parse(sessionStorage.getItem("unity")));
    setLoading(false);
  }, [token, history]);

  const capitalize = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleData = async (data) => {
    if (!data.nome) data.nome = unity.nome;

    if (!data.cidade) data.cidade = unity.cidade;

    if (!data.telefone) data.telefone = unity.telefone;

    if (data) {
      data.nome = data.nome.replace(/  +/g, " ");
      data.nome = capitalize(data.nome);

      data.cidade = data.cidade.replace(/  +/g, " ");
      data.cidade = capitalize(data.cidade);
    }

    data.status = true;

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    try {
      await Axios.put(
        `${process.env.REACT_APP_SECRET_NAME}/v1/collector/${unity.id}`,
        data,
        {
          headers: header,
        }
      );

      sessionStorage.removeItem("unity");
      sessionStorage.setItem("unity", JSON.stringify(data));
      history.push("/detalhes_unidade");
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("token");
        history.push("/");
      } else {
        setMessage(
          "Não foi possível alterar os dados da unidade coletora, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    }
  };

  return (
    <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
      <Nav />
      <div className={styles.contentContainer}>
        <ErrorAnimation
          error={error}
          handleError={handleError}
          text={message}
        />
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
              autoComplete="off"
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
            <br />

            <label htmlFor="cidade">Cidade</label>
            <br />
            <input
              type="text"
              autoComplete="off"
              id="cidade"
              {...register("cidade")}
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
              <span>Contato</span>
            </div>
            <br />

            <label htmlFor="telefone">Telefone (opcional)</label>
            <br />
            <input
              type="text"
              pattern="\d*"
              id="telefone"
              {...register("telefone")}
              minLength="10"
              maxLength="11"
              autoComplete="off"
              placeholder="00000000000"
              defaultValue={unity.telefone}
            />
            <br />
            <br />
            <br />

            <div className={styles.buttonContainer}>
              <input type="submit" value="Atualizar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsU);
