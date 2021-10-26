import React, { useEffect, useState, memo } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

import { BsFillInfoCircleFill as InfoIcon } from "react-icons/bs";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import LoadingAnimation from "../../../Components/Animation/Loading";
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Edit.module.scss";

const EditDonation = () => {
  const { register, handleSubmit } = useForm();
  const token = sessionStorage.getItem("token");
  const [donators, setDonators] = useState([{}]);
  const [unities, setUnities] = useState([{}]);
  const [unityName, setUnityName] = useState();
  const [donation, setDonation] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  useEffect(() => {
    setLoading(true);
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
          const data = response.data.filter((value) => {
            if (value.nome.includes(donation.nome_doador)) return null;
            return value;
          });
          setDonators(data);
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
          const data = response.data.filter((value) => {
            if (value.id.includes(donation.orgao_coletor_id)) {
              setUnityName(value.nome);
              return null;
            }

            return value;
          });
          setUnities(data);
        }
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as unidades coletoras, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();
    setLoading(false);
  }, [token, donation.nome_doador, donation.orgao_coletor_id]);

  let stringDate = JSON.stringify(donation.data);

  if (stringDate) {
    let year = stringDate.slice(1, 5) + "-";
    let month = stringDate.slice(6, 8) + "-";
    let day = stringDate.slice(9, 11);
    donation.date = year + month + day;
  }

  const handleData = async (data) => {
    if (data.doador_rg) {
      let rg = parseInt(data.doador_rg.slice(0, 1));
      let name = data.doador_rg.slice(3, data.doador_rg.length);
      data.doador_rg = rg;
      data.nome_doador = name;
    } else {
      data.doador_rg = donation.doador_rg;
      data.nome_doador = donation.nome_doador;
    }

    if (!data.data) data.data = donation.data;

    if (!data.volume) data.volume = donation.volume;

    if (!data.orgao_coletor_id)
      data.orgao_coletor_id = donation.orgao_coletor_id;

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    try {
      await Axios.put(
        `https://app-node-api-test.herokuapp.com/donation/${donation.id}`,
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
            <select {...register("doador_rg")} id="donatorName">
              <option defaultValue hidden>
                {donation.nome_doador}
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
              defaultValue={donation.date}
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
              id="donationVolume"
              defaultValue={donation.volume}
              required={true}
              {...register("volume")}
            />
            <br />

            <br />
            <label htmlFor="unityColector">Unidade coletora</label>
            <br />
            <select {...register("orgao_coletor_id")} id="unityColector">
              <option defaultValue hidden>
                {unityName}
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
              <input type="submit" value="Editar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(EditDonation);
