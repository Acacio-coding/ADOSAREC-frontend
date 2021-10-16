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
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    setUnity(JSON.parse(sessionStorage.getItem("unity")));
    setAddress(JSON.parse(sessionStorage.getItem("unityAddress")));

    if (cep.length === 8) {
      setLoading(true);
      (async () => {
        try {
          const response = await Axios.get(
            `https://app-node-api-test.herokuapp.com/cep/${cep}`,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );

          if (response) {
            setAddress(response.data);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      })();
    }
  }, [cep, token]);

  const handleData = async (data) => {
    if (!data.nome) data.nome = unity.nome;

    if (!data.cep) data.cep = unity.cep;
    else data.cep = parseInt(data.cep);

    if (!data.numero_residencia)
      data.numero_residencia = unity.numero_residencia;

    if (!data.email) data.email = unity.email;

    if (!data.telefone) data.telefone = unity.telefone;

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

            <label htmlFor="cep">CEP</label>
            <br />
            <input
              type="number"
              id="cep"
              required={true}
              defaultValue={unity.cep}
              {...register("cep", { minLength: 8, maxLength: 8 })}
              onChange={(event) => setCep(event.target.value)}
            />
            <br />
            <br />

            <label htmlFor="logra">Logradouro</label>
            <br />
            <input
              type="text"
              id="logra"
              disabled={true}
              defaultValue={address.address}
            />
            <br />
            <br />

            <label htmlFor="numero_residencia">Número</label>
            <br />
            <input
              type="text"
              id="numero_residencia"
              required={true}
              defaultValue={unity.numero_residencia}
              {...register("numero_residencia")}
            />
            <br />
            <br />

            <label htmlFor="bairro">Bairro</label>
            <br />
            <input
              type="text"
              id="bairro"
              disabled={true}
              defaultValue={address.district}
            />
            <br />
            <br />

            <label htmlFor="cidade">Cidade</label>
            <br />
            <input
              type="text"
              id="cidade"
              disabled={true}
              defaultValue={address.city}
            />
            <br />
            <br />

            <label htmlFor="estado">Estado</label>
            <br />
            <input
              type="text"
              id="estado"
              disabled={true}
              defaultValue={address.state}
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

            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              defaultValue={unity.email}
              {...register("email")}
            />
            <br />
            <br />

            <label htmlFor="telefone">Telefone</label>
            <br />
            <input
              type="text"
              id="telefone"
              required={true}
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
