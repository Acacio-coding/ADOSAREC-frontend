import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Axios from "axios";

import { BsFillInfoCircleFill as InfoIcon } from "react-icons/bs";
import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import LoadingAnimation from "../../../Components/Animation/Loading";
import styles from "./Register.module.scss";

const RegisterDo = () => {
  const { register, handleSubmit } = useForm();
  const [donators, setDonators] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    (async () => {
      try {
        const response = await Axios.get(
          "https://app-node-api-test.herokuapp.com/donator",
          {
            headers: header,
          }
        );

        if (response) {
          setDonators(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [token]);

  const handleData = async () => {};

  return (
    <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
      <Nav />
      <div className={styles.contentContainer}>
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
            <select {...register("nome")} id="donatorName">
              <option disabled selected hidden>
                Selecione um doador...
              </option>
              {donators.map((value, index) => {
                return <option key={index}>{value.nome}</option>;
              })}
            </select>
            <br />

            <br />
            <label htmlFor="donationData">Data da doação</label>
            <br />
            <input
              type="date"
              id="donationData"
              required={true}
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
              required={true}
              {...register("volume")}
            />
            <br />

            <br />
            <label htmlFor="unityColector">Unidade coletora</label>
            <br />
            <select {...register("unidade")} id="unityColector">
              <option disabled selected hidden>
                Selecione a unidade coletora...
              </option>
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
