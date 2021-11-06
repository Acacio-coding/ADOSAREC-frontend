import React, { useEffect, useState, memo } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import Select, { createFilter } from "react-select";
import { useForm } from "react-hook-form";

import { BsFillInfoCircleFill as InfoIcon } from "react-icons/bs";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Edit.module.scss";

const EditDonation = () => {
  const { register, handleSubmit } = useForm();
  const token = sessionStorage.getItem("token");
  const [donators, setDonators] = useState([{}]);
  const [unities, setUnities] = useState([{}]);
  const [donator, setDonator] = useState({});
  const [unity, setUnity] = useState({});
  const [donation, setDonation] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  useEffect(() => {
    setDonation(JSON.parse(sessionStorage.getItem("donation")));

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
          response.data.filter((value) => {
            if (value.rg === donation.doador_rg)
              setDonator({
                label: value.nome,
                value: value.rg,
              });
            return null;
          });
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
          response.data.filter((value) => {
            if (value.id === donation.orgao_coletor_id)
              setUnity({
                label: value.nome,
                value: value.id,
              });
            return null;
          });
          setUnities(response.data);
        }
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as unidades coletoras, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();
  }, [token, donation.orgao_coletor_id, donation.doador_rg]);

  let stringDate = JSON.stringify(donation.data);

  if (stringDate) {
    let year = stringDate.slice(1, 5) + "-";
    let month = stringDate.slice(6, 8) + "-";
    let day = stringDate.slice(9, 11);
    donation.date = year + month + day;
  }

  const handleData = async (data) => {
    if (!data.data) data.data = donation.data;

    if (!data.volume) data.volume = donation.volume;

    if (data) {
      data.doador_rg = donator.value;
      data.orgao_coletor_id = unity.value;
      data.volume = parseInt(data.volume);
    }

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    try {
      await Axios.put(
        `https://app-node-api-test.herokuapp.com/v1/donation/${donation.id}`,
        data,
        {
          headers: header,
        }
      );
      history.push("/doacoes");
    } catch (error) {
      setMessage(
        "Não foi possível alterar os dados da doação, contate os desenvolvedores ou tente novamente mais tarde!"
      );
      setError(true);
    }
  };

  const date = new Date();
  const maxDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

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
      <Nav />
      <div className={styles.contentContainer}>
        <ErrorAnimation
          error={error}
          handleError={handleError}
          text={message}
        />
        <TopMenu typePage="edit" title="Editar doação" />

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(handleData)}>
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
              value={donator}
              isSearchable
            />

            <br />
            <label htmlFor="donationData">Data da doação</label>
            <br />
            <input
              type="date"
              autoComplete="off"
              id="donationData"
              defaultValue={donation.date}
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
              autoComplete="off"
              step="0.01"
              id="donationVolume"
              defaultValue={donation.volume}
              required
              min="0"
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
              value={unity}
              isSearchable
            />
            <br />
            <br />

            <div className={styles.buttonContainer}>
              <input type="submit" value="Editar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(EditDonation);
