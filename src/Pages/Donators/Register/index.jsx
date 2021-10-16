import React, { useEffect, useState, memo } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Axios from "axios";

import {
  BsFillInfoCircleFill as InfoIcon,
  BsFillTelephoneFill as ContactIcon,
} from "react-icons/bs";
import { HiLocationMarker as AddressIcon } from "react-icons/hi";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import styles from "./Register.module.scss";

const RegisterD = () => {
  const { register, handleSubmit } = useForm();
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({});
  const token = sessionStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    if (cep.length === 8)
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
          setAddress(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [cep, token]);

  const handleData = async (data) => {
    data.doador_de_medula === "true"
      ? (data.doador_de_medula = true)
      : (data.doador_de_medula = false);

    data.rh_sanguineo === "+"
      ? (data.rh_sanguineo = true)
      : (data.rh_sanguineo = false);

    data.cep = parseInt(data.cep);
    data.rg = parseInt(data.rg);
    data.numero_residencia = parseInt(data.numero_residencia);
    data.status = true;

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    try {
      await Axios.post(
        "https://app-node-api-test.herokuapp.com/donator",
        data,
        {
          headers: header,
        }
      );
      history.push("/doadores");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.fullContainer}>
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu typePage="register" title="Cadastrar doador" />

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
              {...register("nome")}
            />
            <br />
            <br />

            <label htmlFor="genero">Gênero</label>
            <br />
            <select {...register("genero")} id="genero">
              <option disabled selected hidden>
                Selecione um gênero...
              </option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
            <br />
            <br />

            <label htmlFor="data_de_nascimento">Data de nascimento</label>
            <br />
            <input
              type="date"
              id="data_de_nascimento"
              required={true}
              {...register("data_de_nascimento")}
            />
            <br />
            <br />

            <label htmlFor="rg">Identidade</label>
            <br />
            <input type="text" id="rg" required={true} {...register("rg")} />
            <br />
            <br />

            <label htmlFor="orgao_expeditor_rg">Órgão expedidor</label>
            <br />
            <input
              type="text"
              id="orgao_expeditor_rg"
              required={true}
              {...register("orgao_expeditor_rg")}
            />
            <br />
            <br />

            <label htmlFor="data_de_expedicao">Data de expedição</label>
            <br />
            <input
              type="date"
              id="data_de_expedicao"
              required={true}
              {...register("data_de_expedicao")}
            />
            <br />
            <br />

            {/* <label htmlFor="parent">Filiação</label>
            <br />
            <input
              type="text"
              id="parent"
              {...register("parent", { required: true })}
            />
            <br />
            <br /> */}

            <label htmlFor="naturalidade">Naturalidade</label>
            <br />
            <input
              type="text"
              id="naturalidade"
              required={true}
              {...register("naturalidade")}
            />
            <br />
            <br />

            <label htmlFor="estado_civil">Estado cívil</label>
            <br />
            <input
              type="text"
              id="estado_civil"
              required={true}
              {...register("estado_civil")}
            />
            <br />
            <br />

            <label htmlFor="profissao">Profissão</label>
            <br />
            <input
              type="text"
              id="profissao"
              required={true}
              {...register("profissao")}
            />
            <br />
            <br />

            <label htmlFor="grupo_sanguineo">Grupo sanguíneo</label>
            <br />
            <input
              type="text"
              id="grupo_sanguineo"
              required={true}
              {...register("grupo_sanguineo")}
            />
            <br />
            <br />

            <label htmlFor="rh_sanguineo">RH</label>
            <br />
            <input
              type="text"
              id="rh_sanguineo"
              required={true}
              {...register("rh_sanguineo")}
            />
            <br />
            <br />

            <input
              type="checkbox"
              value="true"
              id="doador_de_medula"
              {...register("doador_de_medula")}
            />
            <label htmlFor="doador_de_medula">Doador de medula óssea?</label>
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
              {...register("numero_residencia")}
            />
            <br />
            <br />

            {/* <label htmlFor="apt">Apartamento</label>
            <br />
            <input type="text" id="apt" {...register("apt", { required: false })} />
            <br />
            <br /> */}

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
            <input type="email" id="email" {...register("email")} />
            <br />
            <br />

            <label htmlFor="telefone1">Telefone1</label>
            <br />
            <input
              type="text"
              id="telefone1"
              required={true}
              {...register("telefone1")}
            />
            <br />
            <br />

            <label htmlFor="telefone2">Telefone2</label>
            <br />
            <input type="text" id="telefone2" {...register("telefone2")} />
            <br />
            <br />

            <label htmlFor="telefone3">Telefone3</label>
            <br />
            <input type="text" id="telefone3" {...register("telefone3")} />
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

export default memo(RegisterD);
