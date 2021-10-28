import React, { useEffect, useState, memo } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Select, { createFilter } from "react-select";

import {
  BsFillInfoCircleFill as InfoIcon,
  BsFillTelephoneFill as ContactIcon,
} from "react-icons/bs";
import { HiLocationMarker as AddressIcon } from "react-icons/hi";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Register.module.scss";

const RegisterD = () => {
  const { register, handleSubmit } = useForm();
  const [cep, setCep] = useState(0);
  const [address, setAddress] = useState({});
  const [jobs, setJobs] = useState([{}]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const token = sessionStorage.getItem("token");
  const history = useHistory();

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  useEffect(() => {
    if (cep.length === 8) {
      (async () => {
        try {
          const response = await Axios.get(
            `https://app-node-api-test.herokuapp.com/v1/cep/${cep}`,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );
          setAddress(response.data);
        } catch (error) {
          setMessage(
            "Não foi possível encontrar o endereço, contate os desenvolvedores ou tente novamente mais tarde!"
          );
          setError(true);
        }
      })();
    }

    (async () => {
      try {
        const response = await Axios.get(
          `https://app-node-api-test.herokuapp.com/v1/profissao`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setJobs(response.data);
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as profissões, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();
  }, [cep, token]);

  const handleData = async (data) => {
    const anoNascimento = data.data_de_nascimento.slice(0, 4);
    const anoExpedicao = data.data_de_expedicao.slice(0, 4);

    if (date.getFullYear() - anoNascimento < 18) {
      setMessage("Menor de idade!");
      setError(true);
    } else if (anoExpedicao - anoNascimento < 6) {
      setMessage(
        "Ano de expedição do RG inválido, é necessário ter no mínimo 6 anos de idade para fazê-lo!"
      );
      setError(true);
    } else {
      data.genero = gender.value;

      data.estado_civil = civil.value;

      data.profissao_id = job.value;

      data.grupo_sanguineo = gs.value;

      data.rh_sanguineo = rh.value;

      data.doador_de_medula = medule.value;

      data.orgao_expeditor_rg = data.orgao_expeditor_rg.toUpperCase();

      data.rg = parseInt(data.rg);

      data.numero_residencia = parseInt(data.numero_residencia);

      data.naturalidade =
        data.naturalidade.charAt(0).toUpperCase() +
        data.naturalidade.slice(1).toLowerCase();

      data.cep = parseInt(data.cep);

      if (data.rua)
        data.rua = data.rua.charAt(0).toUpperCase() + data.rua.slice(1);
      else data.rua = address.address;

      if (data.bairro)
        data.bairro =
          data.bairro.charAt(0).toUpperCase() +
          data.bairro.slice(1).toLowerCase();
      else data.bairro = address.district;

      if (data.cidade)
        data.cidade =
          data.cidade.charAt(0).toUpperCase() +
          data.cidade.slice(1).toLowerCase();
      else data.cidade = address.city;

      if (data.estado) data.estado = data.estado.toUpperCase();
      else data.estado = address.state;

      data.status = true;

      const header = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      };

      try {
        await Axios.post(
          "https://app-node-api-test.herokuapp.com/v1/donator",
          data,
          {
            headers: header,
          }
        );
        history.push("/doadores");
      } catch (error) {
        const Error = error.response;
        if (Error.status === 409) {
          setMessage(
            "O doador com o RG informado já foi cadastrado no sistema, verifique o dado e tente novamente!"
          );
          setError(true);
        }
      }
    }
  };

  const date = new Date();
  const maxDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const [gender, setGender] = useState({});
  const [civil, setCivil] = useState({});
  const [job, setJob] = useState({});
  const [gs, setGs] = useState({});
  const [rh, setRh] = useState({});
  const [medule, setMedule] = useState({});

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
      <Nav />
      <div className={styles.contentContainer}>
        <ErrorAnimation
          error={error}
          handleError={handleError}
          text={message}
        />
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
              autoComplete="off"
              required
              placeholder="Digite o nome do doador..."
              {...register("nome")}
            />
            <br />
            <br />

            <label htmlFor="genero">Gênero</label>
            <br />
            <Select
              options={[
                { value: "Masculino", label: "Masculino" },
                { value: "Feminino", label: "Feminino" },
                { value: "Outro", label: "Outro" },
              ]}
              styles={style}
              onChange={setGender}
              required
              placeholder="Selecione um gênero..."
            />
            <br />

            <label htmlFor="data_de_nascimento">Data de nascimento</label>
            <br />
            <input
              type="date"
              id="data_de_nascimento"
              autoComplete="off"
              required
              max={maxDate}
              {...register("data_de_nascimento")}
            />
            <br />
            <br />
            <label htmlFor="rg">Identidade</label>
            <br />
            <input
              type="text"
              pattern="\d*"
              id="rg"
              required
              placeholder="000000000"
              minLength="9"
              maxLength="9"
              autoComplete="off"
              {...register("rg")}
            />
            <br />
            <br />
            <label htmlFor="orgao_expeditor_rg">Órgão expedidor</label>
            <br />
            <input
              type="text"
              {...register("orgao_expeditor_rg")}
              id="orgao_expeditor_rg"
              placeholder="Digite o orgão expedidor..."
              autoComplete="off"
              required
            />
            <br />
            <br />
            <label htmlFor="data_de_expedicao">Data de expedição</label>
            <br />
            <input
              type="date"
              id="data_de_expedicao"
              required
              autoComplete="off"
              max={maxDate}
              {...register("data_de_expedicao")}
            />
            <br />
            <br />

            <label htmlFor="parent">Filiação</label>
            <br />
            <input
              type="text"
              id="parent"
              placeholder="Nome do pai..."
              autoComplete="off"
              {...register("filiacao_pai")}
            />
            <br />
            <br />

            <input
              type="text"
              id="parent"
              placeholder="Nome da mãe..."
              autoComplete="off"
              {...register("filiacao_mae")}
            />
            <br />
            <br />

            <label htmlFor="naturalidade">Naturalidade</label>
            <br />
            <input
              type="text"
              id="naturalidade"
              placeholder="Digite a naturalidade do doador"
              autoComplete="off"
              required
              {...register("naturalidade")}
            />
            <br />
            <br />

            <label htmlFor="estado_civil">Estado cívil</label>
            <br />
            <Select
              options={[
                { value: "Solteiro(a)", label: "Solteiro(a)" },
                { value: "Casado(a)", label: "Casado(a)" },
                { value: "Separado(a)", label: "Separado(a)" },
                { value: "Divorciado(a)", label: "Divorciado(a)" },
                { value: "Viúvo(a)", label: "Viúvo(a)" },
              ]}
              styles={style}
              onChange={setCivil}
              required
              placeholder="Selecione um estado cívil..."
            />
            <br />

            <label htmlFor="profissao">Profissão</label>
            <br />
            <Select
              filterOption={createFilter({ ignoreAccents: false })}
              options={jobs.map((value, index) => {
                return {
                  value: value.id,
                  label: value.nome,
                };
              })}
              onChange={setJob}
              styles={style}
              required
              placeholder="Selecione uma profissão..."
              isSearchable
            />
            <br />

            <label htmlFor="grupo_sanguineo">Grupo sanguíneo</label>
            <br />
            <Select
              options={[
                { value: "A", label: "A" },
                { value: "B", label: "B" },
                { value: "O", label: "O" },
                { value: "AB", label: "AB" },
              ]}
              onChange={setGs}
              styles={style}
              required
              placeholder="Selecione um grupo sanguíneo..."
            />
            <br />

            <label htmlFor="rh_sanguineo">RH</label>
            <br />
            <Select
              options={[
                { value: true, label: "+" },
                { value: false, label: "-" },
              ]}
              styles={style}
              onChange={setRh}
              required
              placeholder="Selecione o RH..."
            />
            <br />

            <label htmlFor="doador_de_medula">Doador de medula óssea?</label>
            <br />
            <Select
              options={[
                { value: true, label: "Sim" },
                { value: false, label: "Não" },
              ]}
              styles={style}
              required
              placeholder="Selecione uma opção..."
              onChange={setMedule}
            />
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
              type="text"
              id="cep"
              pattern="\d*"
              required
              minLength="8"
              maxLength="8"
              placeholder="00000000"
              autoComplete="off"
              {...register("cep")}
              onChange={(event) => setCep(event.target.value)}
            />
            <br />
            <br />
            <label htmlFor="logra">Logradouro</label>
            <br />
            <input
              type="text"
              id="logra"
              placeholder="Logradouro do doador..."
              autoComplete="off"
              {...register("rua")}
              defaultValue={address.address}
            />
            <br />
            <br />
            <label htmlFor="numero_residencia">Número</label>
            <br />
            <input
              type="text"
              id="numero_residencia"
              pattern="\d*"
              placeholder="0000"
              minLength="1"
              required
              autoComplete="off"
              {...register("numero_residencia")}
            />
            <br />
            <br />

            <label htmlFor="bairro">Bairro</label>
            <br />
            <input
              type="text"
              id="bairro"
              placeholder="Bairro do doador..."
              {...register("bairro")}
              autoComplete="off"
              defaultValue={address.district}
            />
            <br />
            <br />
            <label htmlFor="cidade">Cidade</label>
            <br />
            <input
              type="text"
              id="cidade"
              placeholder="Cidade do doador..."
              {...register("cidade")}
              autoComplete="off"
              defaultValue={address.city}
            />
            <br />
            <br />
            <label htmlFor="estado">Estado</label>
            <br />
            <input
              type="text"
              id="estado"
              placeholder="Estado do doador..."
              autoComplete="off"
              {...register("estado", { minLength: 2, maxLength: 2 })}
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
              autoComplete="off"
              {...register("email")}
              placeholder="xxxxx@xxxx.xxx"
            />
            <br />
            <br />
            <label htmlFor="telefone1">Telefone1</label>
            <br />
            <input
              type="text"
              id="telefone1"
              autoComplete="off"
              pattern="\d*"
              required
              minLength="10"
              maxLength="11"
              placeholder="00000000000"
              {...register("telefone1")}
            />
            <br />
            <br />
            <label htmlFor="telefone2">Telefone2 (opcional)</label>
            <br />
            <input
              type="text"
              id="telefone2"
              pattern="\d*"
              autoComplete="off"
              minLength="10"
              maxLength="11"
              placeholder="00000000000"
              {...register("telefone2")}
            />
            <br />
            <br />
            <label htmlFor="telefone3">Telefone3 (opcional)</label>
            <br />
            <input
              type="text"
              id="telefone3"
              pattern="\d*"
              minLength="10"
              autoComplete="off"
              maxLength="11"
              placeholder="00000000000"
              {...register("telefone3")}
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

export default memo(RegisterD);
