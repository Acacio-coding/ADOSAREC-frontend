import React, { useEffect } from "react";
import {
  BsFillInfoCircleFill as InfoIcon,
  BsFillTelephoneFill as ContactIcon,
} from "react-icons/bs";
import { HiLocationMarker as AdressIcon } from "react-icons/hi";
import { useForm } from "react-hook-form";
import styles from "./DonatorForm.module.scss";

const DonatorForm = ({ typePage }) => {
  const { register, handleSubmit } = useForm();
  const token = localStorage.getItem("token");

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

    let bodyData = JSON.stringify(data);

    const response = await fetch(
      "https://app-node-api-test.herokuapp.com/donator",
      {
        method: "post",
        headers: new Headers({
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-type": "application/json",
        }),
        body: bodyData,
      }
    );
    console.log(response.status);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(handleData)}>
          <div className={styles.subTitleContainer}>
            <div className={styles.iconContainer}>
              <InfoIcon style={{ fontSize: "32px" }} />
            </div>
            <span>Informações</span>
          </div>

          <br />
          <label htmlFor="name">Nome</label>
          <br />
          <input
            type="text"
            id="name"
            {...register("nome", { required: true })}
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
                id="masc"
                value="masculino"
                {...register("genero", { required: true })}
              />
              <label htmlFor="masc">Masculino</label>
            </div>

            <div id={styles.marginDiv}>
              <input
                type="radio"
                id="femi"
                value="feminino"
                {...register("genero", { required: true })}
              />
              <label htmlFor="femi">Feminino</label>
            </div>

            <div id={styles.marginDiv}>
              <input
                type="radio"
                id="other"
                value="outro"
                {...register("genero", { required: true })}
              />
              <label htmlFor="other">Outro</label>
            </div>
          </div>

          <label htmlFor="data_de_nascimento">Data de nascimento</label>
          <br />
          <input
            type="date"
            id="data_de_nascimento"
            {...register("data_de_nascimento", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="rg">Identidade</label>
          <br />
          <input type="text" id="rg" {...register("rg", { required: true })} />
          <br />
          <br />

          <label htmlFor="orgao_expeditor_rg">Órgão expedidor</label>
          <br />
          <input
            type="text"
            id="orgao_expeditor_rg"
            {...register("orgao_expeditor_rg", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="data_de_expedicao">Data de expedição</label>
          <br />
          <input
            type="date"
            id="data_de_expedicao"
            {...register("data_de_expedicao", { required: true })}
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
            {...register("naturalidade", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="estado_civil">Estado cívil</label>
          <br />
          <input
            type="text"
            id="estado_civil"
            {...register("estado_civil", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="profissao">Profissão</label>
          <br />
          <input
            type="text"
            id="profissao"
            {...register("profissao", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="grupo_sanguineo">Grupo sanguíneo</label>
          <br />
          <input
            type="text"
            id="grupo_sanguineo"
            {...register("grupo_sanguineo", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="rh_sanguineo">RH</label>
          <br />
          <input
            type="text"
            id="rh_sanguineo"
            {...register("rh_sanguineo", { required: true })}
          />
          <br />
          <br />

          <input
            type="checkbox"
            value="true"
            id="doador_de_medula"
            {...register("doador_de_medula", { required: true })}
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

          {/* <br />
          <label htmlFor="logra">Logradouro</label>
          <br />
          <input
            type="text"
            id="logra"
            {...register("logra", { required: true })}
          />
          <br />
          <br /> */}

          <label htmlFor="numero_residencia">Número</label>
          <br />
          <input
            type="text"
            id="numero_residencia"
            {...register("numero_residencia", { required: true })}
          />
          <br />
          <br />

          {/* <label htmlFor="apt">Apartamento</label>
          <br />
          <input
            type="text"
            id="apt"
            {...register("apt", { required: true })}
          />
          <br />
          <br /> */}

          {/* <label htmlFor="bairro">Bairro</label>
          <br />
          <input
            type="text"
            id="bairro"
            {...register("bairro", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="cdd">Cidade</label>
          <br />
          <input
            type="text"
            id="cdd"
            {...register("cdd", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="est">Estado</label>
          <br />
          <input
            type="text"
            id="est"
            {...register("est", { required: true })}
          />
          <br />
          <br />
 */}
          <label htmlFor="cep">CEP</label>
          <br />
          <input
            type="text"
            id="cep"
            {...register("cep", { required: true })}
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
            {...register("email", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="telefone1">Telefone1</label>
          <br />
          <input
            type="text"
            id="telefone1"
            {...register("telefone1", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="telefone2">Telefone2</label>
          <br />
          <input
            type="text"
            id="telefone2"
            {...register("telefone2", { required: true })}
          />
          <br />
          <br />

          <label htmlFor="telefone3">Telefone3</label>
          <br />
          <input
            type="text"
            id="telefone3"
            {...register("telefone3", { required: true })}
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
  );
};

export default DonatorForm;
