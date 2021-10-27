import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Axios from "axios";

import { BsFillInfoCircleFill as InfoIcon } from "react-icons/bs";
import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import LoadingAnimation from "../../../Components/Animation/Loading";
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Register.module.scss";

const RegisterDo = () => {
  const { register, handleSubmit } = useForm();
  const [donators, setDonators] = useState([{}]);
  const [unities, setUnities] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const token = sessionStorage.getItem("token");
  const history = useHistory();

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  useEffect(() => {
    setLoading(true);

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    (async () => {
      try {
        const response = await Axios.get(
          "https://app-node-api-test.herokuapp.com/v1/donator",
          {
            headers: header,
          }
        );

        if (response) {
          setDonators(response.data);
        }
      } catch (error) {
        setMessage(
          "Não foi possível encontrar os doadores, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();

    (async () => {
      try {
        const response = await Axios.get(
          "https://app-node-api-test.herokuapp.com/v1/collector",
          {
            headers: header,
          }
        );

        if (response) {
          setUnities(response.data);
        }
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as unidades coletoras, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();
    setLoading(false);
  }, [token]);

  const handleData = async (data) => {
    if (data) {
      let rg = parseInt(data.doador_rg.slice(0, 9));
      let name = data.doador_rg.slice(10, data.doador_rg.length);
      data.doador_rg = rg;
      data.nome_doador = name;
      data.volume = parseInt(data.volume);
    }

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    try {
      await Axios.post(
        "https://app-node-api-test.herokuapp.com/v1/donation",
        data,
        {
          headers: header,
        }
      );
      history.push("/doacoes");
    } catch (error) {
      setMessage(
        "Não foi possível cadastrar a doação, contate os desenvolvedores ou tente novamente mais tarde!"
      );
      setError(true);
    }
  };

  const date = new Date();
  const maxDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

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
        <TopMenu typePage="register" title="Cadastrar doação" />

        <div className={styles.formContainer}>
          <form
            onSubmit={donators.length < 1 ? null : handleSubmit(handleData)}
          >
            <div className={styles.subTitleContainer}>
              <div className={styles.iconContainer}>
                <InfoIcon style={{ fontSize: "32px" }} />
              </div>
              <span>Informações</span>
            </div>

            <br />
            <label htmlFor="donatorName">Doador</label>
            <br />
            <select id="donatorName" {...register("doador_rg")}>
              <option defaultValue="" hidden>
                Selecione um doador...
              </option>
              {donators.map((value, index) => {
                return (
                  <option value={`${value.rg}, ${value.nome}`} key={index}>
                    {value.nome}
                  </option>
                );
              })}
            </select>
            <br />

            <br />
            <label htmlFor="donationData">Data da doação</label>
            <br />
            <input
              type="date"
              id="donationData"
              autoComplete="off"
              required={true}
              max={maxDate}
              {...register("data")}
            />
            <br />

            <br />
            <label htmlFor="donationVolume">Volume de sangue</label>
            <br />
            <input
              type="number"
              step="0.01"
              autoComplete="off"
              id="donationVolume"
              required={true}
              {...register("volume")}
            />
            <br />

            <br />
            <label htmlFor="unityColector">Unidade coletora</label>
            <br />
            <select {...register("orgao_coletor_id")} id="unityColector">
              <option defaultValue hidden>
                Selecione a unidade coletora...
              </option>
              {unities.map((value, index) => {
                return (
                  <option key={index} value={value.id}>
                    {value.nome}
                  </option>
                );
              })}
            </select>
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

export default RegisterDo;
