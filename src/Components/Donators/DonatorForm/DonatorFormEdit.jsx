import React, { useCallback, useEffect, useState } from "react";
import {
  BsFillInfoCircleFill as InfoIcon,
  BsFillTelephoneFill as ContactIcon,
} from "react-icons/bs";
import { HiLocationMarker as AdressIcon } from "react-icons/hi";
import { useForm } from "react-hook-form";
import styles from "./DonatorForm.module.scss";
import { useHistory } from "react-router";

const DonatorFormEdit = () => {
  const { register, handleSubmit } = useForm();
  const [cep, setCep] = useState("");
  const [endereço, setEndereço] = useState({});
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const donatorObj = JSON.parse(sessionStorage.getItem("donator"));
  const donatorCep = localStorage.getItem("donatorCep");

  const getAdress = useCallback(async () => {
    const response = await fetch(
      `https://app-node-api-test.herokuapp.com/cep/${donatorCep}`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-type": "application/json",
        }),
      }
    );

    const data = await response.json();
    if (response.ok) setEndereço(data);
  }, [token, donatorCep]);

  useEffect(() => {
    if (donatorCep.length === 8) {
      getAdress();
    }
  }, [getAdress, donatorCep]);

  const handleData = async (data, donatorRg) => {
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

    let bodyData = JSON.stringify(data);

    console.log(bodyData);

    const response = await fetch(
      `https://app-node-api-test.herokuapp.com/donator/${donatorRg}`,
      {
        method: "post",
        headers: new Headers({
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-type": "application/json",
        }),
        body: bodyData,
      }
    );

    if (response.ok) {
      history.push("/doadores");
    } else {
      alert("Erro ao editar doador, verifique os dados e tente novamente!");
    }
  };

  const donatorRg = donatorObj.rg;

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(handleData, donatorRg)}>
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
          defaultValue={donatorObj.nome}
          {...register("nome")}
        />
        <br />
        <br />

        {/* <label htmlFor="surname">Sobrenome</label>
              <br />
              <input
                type="text"
                id="surname"
                {...register("surname", { required: true })}
              />
              <br />
              <br /> */}

        <div className={styles.genderContainer}>
          <div>
            <input
              type="radio"
              id="masculino"
              value="Masculino"
              required={true}
              defaultChecked={
                donatorObj.genero.charAt(0) === "M" ? true : false
              }
              {...register("genero")}
            />
            <label htmlFor="masculino">Masculino</label>
          </div>

          <div id={styles.marginDiv}>
            <input
              type="radio"
              id="femi"
              value="Feminino"
              required={true}
              defaultChecked={
                donatorObj.genero.charAt(0) === "F" ? true : false
              }
              {...register("genero")}
            />
            <label htmlFor="femi">Feminino</label>
          </div>

          <div id={styles.marginDiv}>
            <input
              type="radio"
              id="other"
              value="Outro"
              required={true}
              defaultChecked={
                donatorObj.genero.charAt(0) === "O" ? true : false
              }
              {...register("genero")}
            />
            <label htmlFor="other">Outro</label>
          </div>
        </div>

        <label htmlFor="data_de_nascimento">Data de nascimento</label>
        <br />
        <input
          type="date"
          id="data_de_nascimento"
          required={true}
          value={donatorObj.data_de_nascimento}
          {...register("data_de_nascimento")}
        />
        <br />
        <br />

        <label htmlFor="rg">Identidade</label>
        <br />
        <input
          type="text"
          id="rg"
          required={true}
          defaultValue={donatorObj.rg}
          {...register("rg")}
        />
        <br />
        <br />

        <label htmlFor="orgao_expeditor_rg">Órgão expedidor</label>
        <br />
        <input
          type="text"
          id="orgao_expeditor_rg"
          required={true}
          defaultValue={donatorObj.orgao_expeditor_rg}
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
          defaultValue={donatorObj.data_de_expedicao}
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
          defaultValue={donatorObj.naturalidade}
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
          defaultValue={donatorObj.estado_civil}
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
          defaultValue={donatorObj.profissao}
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
          defaultValue={donatorObj.grupo_sanguineo}
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
          defaultValue={donatorObj.rh_sanguineo === "0" ? "-" : "+"}
          {...register("rh_sanguineo")}
        />
        <br />
        <br />

        <input
          type="checkbox"
          defaultValue="true"
          id="doador_de_medula"
          defaultChecked={donatorObj.doador_de_medula ? true : false}
          {...register("doador_de_medula")}
        />
        <label htmlFor="doador_de_medula">Doador de medula óssea?</label>
        <br />
        <br />
        <br />

        <div className={styles.subTitleContainer}>
          <div className={styles.iconContainer}>
            <AdressIcon style={{ fontSize: "32px" }} />
          </div>
          <span>Endereço</span>
        </div>

        <label htmlFor="cep">CEP</label>
        <br />
        <input
          type="text"
          id="cep"
          required={true}
          defaultValue={donatorObj.cep}
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
          defaultValue={endereço.address}
        />
        <br />
        <br />

        <label htmlFor="numero_residencia">Número</label>
        <br />
        <input
          type="text"
          id="numero_residencia"
          required={true}
          defaultValue={donatorObj.numero_residencia}
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
          defaultValue={endereço.district}
        />
        <br />
        <br />

        <label htmlFor="cidade">Cidade</label>
        <br />
        <input
          type="text"
          id="cidade"
          disabled={true}
          defaultValue={endereço.city}
        />
        <br />
        <br />

        <label htmlFor="estado">Estado</label>
        <br />
        <input
          type="text"
          id="estado"
          disabled={true}
          defaultValue={endereço.state}
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
          defaultValue={donatorObj.email}
          {...register("email")}
        />
        <br />
        <br />

        <label htmlFor="telefone1">Telefone1</label>
        <br />
        <input
          type="text"
          id="telefone1"
          required={true}
          defaultValue={donatorObj.telefone1}
          {...register("telefone1")}
        />
        <br />
        <br />

        <label htmlFor="telefone2">Telefone2</label>
        <br />
        <input
          type="text"
          id="telefone2"
          defaultValue={donatorObj.telefone2}
          {...register("telefone2")}
        />
        <br />
        <br />

        <label htmlFor="telefone3">Telefone3</label>
        <br />
        <input
          type="text"
          id="telefone3"
          defaultValue={donatorObj.telefone3}
          {...register("telefone3")}
        />
        <br />
        <br />
        <br />

        <div className={styles.buttonContainer}>
          <input type="submit" value="Editar" />
        </div>
      </form>
    </div>
  );
};

export default DonatorFormEdit;
