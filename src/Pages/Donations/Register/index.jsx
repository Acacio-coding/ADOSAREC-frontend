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
  const token = localStorage.getItem("token");
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
          `${process.env.REACT_APP_SECRET_NAME}/v1/donator`,
          {
            headers: header,
          }
        );

        if (response) {
          setDonators(response.data);
        }
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          history.push("/");
        } else {
          setMessage(
            "Não foi possível encontrar os doadores, contate os desenvolvedores ou tente novamente mais tarde!"
          );
          setError(true);
        }
      }
    })();

    (async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_SECRET_NAME}/v1/collector`,
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
  }, [token, history]);

  const handleData = async (data) => {
    if (data) {
      data.doador_rg = donator.value;
      data.orgao_coletor_id = unity.value;

      try {
        data.volume = parseInt(data.volume);
      } catch (error) {
        setMessage("Volume de doação inválido!");
        setError(true);
      }

      data.status = true;
    }
    if (data.data.length < 10) {
      setMessage("Data de doação inválida!");
      setError(true);
    } else if (!data.doador_rg) {
      setMessage("Campo doador está vazio!");
      setError(true);
    } else if (!data.orgao_coletor_id) {
      setMessage("Campo unidade coletora está vazio!");
      setError(true);
    } else {
      const header = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      };

      try {
        await Axios.post(
          `${process.env.REACT_APP_SECRET_NAME}/v1/donation`,
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
    }
  };

  const date = new Date();

  const maxDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const minDate = `1991-11-25`;

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

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#650000" : "#fff",
      "&:hover": {
        backgroundColor: state.isSelected ? "#650000" : "#0000001d",
      },
    }),

    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "#670000",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#670000",
      "&:hover": {
        color: "#CCC",
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
              noOptionsMessage={() => "Não há doadores cadastrados"}
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
              min={minDate}
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
              noOptionsMessage={() => "Não há unidades cadastradas"}
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
