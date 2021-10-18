import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

import { BsFillInfoCircleFill as InfoIcon } from "react-icons/bs";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import LoadingAnimation from "../../../Components/Animation/Loading";
import styles from "./Edit.module.scss";

const EditDonation =() => {
    const { register, handleSubmit } = useForm();
    const token = sessionStorage.getItem("token");
    const [donation, setDonation] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        setDonation(JSON.parse(sessionStorage.getItem("donation")));

        setLoading(true);
        if(donation) setLoading(false);
      });

      {/*  let stringDate = JSON.stringify(donation.data);

        if (stringDate) {
            let year = stringDate.slice(1, 5) + "-";
            let month = stringDate.slice(6, 8) + "-";
            let day = stringDate.slice(9, 11);
            donation.date = year + month + day;
        }
      */} 

      
    const handleData = async (data) => {
        if(!data.nome_doador) data.nome_doador = donation.nome_doador;

        if(!data.data) data.data = donation.data;

        if(!data.volume) data.volume = donation.volume;

        if(!data.unidade) data.unidade = donation.unidade;
        
        const header = {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Content-Type": "application/json",
          };
      
          try {
            await Axios.put(
              `https://app-node-api-test.herokuapp.com`,
              data,
              {
                headers: header,
              }
            );
            history.push("/detalhes_doacao");
          } catch (error) {
            console.log(error);
          }

    };


    return(
        <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu typePage="edit" title="Editar doação" />

        <div className={styles.formContainer}>
          <form
            onSubmit={handleSubmit(handleData)}
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
              <option defaultValue hidden>
                Selecione um doador...
              </option>
              
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
              <option defaultValue hidden>
                Selecione a unidade coletora...
              </option>
              
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

export default EditDonation;