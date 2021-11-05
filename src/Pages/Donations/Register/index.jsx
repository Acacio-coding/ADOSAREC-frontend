import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Select, { createFilter } from "react-select";
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
      data.doador_rg = donator.value;
      data.orgao_coletor_id = unity.value;
      data.volume = parseInt(data.volume);
    }

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    console.log(data);

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

  const [donator, setDonator] = useState({});
  const [unity, setUnity] = useState({});

  const style = {
    control: (provided) => ({
      ...provided,
      border: "solid 1px #670000",
      borderRadius: "none",
      padding: "0",
      boxShadow: "none",
      "&:hover": {
        border: "solid 1px #670000",
      },
    }),
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
            <Select
              filterOption={createFilter({ ignoreAccents: false })}
              options={donators.map((value) => {
                return {
                  value: value.rg,
                  label: value.nome,
                };
              })}
              onChange={setDonator}
              styles={style}
              required
              placeholder="Selecione um(a) doador(a)..."
              isSearchable
            />
            <br />

            <label htmlFor="donationData">Data da doação</label>
            <br />
            <input
              type="date"
              id="donationData"
              autoComplete="off"
              required
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
              required
              min="1"
              max="450"
              placeholder="000"
              {...register("volume")}
            />
            <br />

            <br />
            <label htmlFor="unityColector">Unidade coletora</label>
            <br />
            <Select
              filterOption={createFilter({ ignoreAccents: false })}
              options={unities.map((value) => {
                return {
                  value: value.id,
                  label: value.nome,
                };
              })}
              onChange={setUnity}
              styles={style}
              required
              placeholder="Selecione uma unidade coletora..."
              isSearchable
            />
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
