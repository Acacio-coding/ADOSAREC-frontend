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
      data.orgao_expeditor_rg = data.orgao_expeditor_rg.toUpperCase();

      data.naturalidade =
        data.naturalidade.charAt(0).toUpperCase() +
        data.naturalidade.slice(1).toLowerCase();

      data.cep = parseInt(data.cep);

      data.rua =
        data.rua.charAt(0).toUpperCase() + data.rua.slice(1).toLowerCase();

      data.bairro =
        data.bairro.charAt(0).toUpperCase() +
        data.bairro.slice(1).toLowerCase();

      data.cidade =
        data.cidade.charAt(0).toUpperCase() +
        data.cidade.slice(1).toLowerCase();

      data.estado =
        data.estado.charAt(0).toUpperCase() +
        data.estado.slice(1).toLowerCase();

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
        console.log(error);
      }
    }
  };

  const date = new Date();
  const maxDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

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
              required={true}
              placeholder="Digite o nome do doador..."
              {...register("nome")}
            />
            <br />
            <br />
            <label htmlFor="genero">Gênero</label>
            <br />
            <select {...register("genero")} id="genero">
              <option defaultValue disabled hidden>
                Selecione um gênero...
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            <br />
            <br />
            <label htmlFor="data_de_nascimento">Data de nascimento</label>
            <br />
            <input
              type="date"
              id="data_de_nascimento"
              required={true}
              max={maxDate}
              {...register("data_de_nascimento")}
            />
            <br />
            <br />
            <label htmlFor="rg">Identidade</label>
            <br />
            <input
              type="number"
              id="rg"
              required={true}
              placeholder="000000000"
              minLength="9"
              maxLength="9"
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
              required={true}
            />
            <br />
            <br />
            <label htmlFor="data_de_expedicao">Data de expedição</label>
            <br />
            <input
              type="date"
              id="data_de_expedicao"
              required={true}
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
              {...register("filiacao_pai", { required: true })}
            />
            <br />
            <br />

            <input
              type="text"
              id="parent"
              placeholder="Nome da mãe..."
              {...register("filiacao_mae", { required: true })}
            />
            <br />
            <br />

            <label htmlFor="naturalidade">Naturalidade</label>
            <br />
            <input
              type="text"
              id="naturalidade"
              placeholder="Digite a naturalidade do doador"
              required={true}
              {...register("naturalidade")}
            />
            <br />
            <br />
            <label htmlFor="estado_civil">Estado cívil</label>
            <br />
            <select
              {...register("estado_civil")}
              id="estado_civil"
              required={true}
            >
              <option defaultValue hidden>
                Selecione um estado cívil...
              </option>
              <option value="Solteiro">Solteiro(a)</option>
              <option value="Casado">Casado(a)</option>
              <option value="Separado">Separado(a)</option>
              <option value="Divorciado">Divorciado(a)</option>
              <option value="Viúvo">Viúvo(a)</option>
            </select>
            <br />
            <br />

            <label htmlFor="profissao">Profissão</label>
            <br />
            <select
              id="profissao"
              required={true}
              {...register("profissao_id")}
            >
              <option defaultValue hidden>
                Selecione uma profissão...
              </option>
              {jobs.map((value, index) => {
                if (value.nome === "Outros")
                  return <option key={index}>{value.nome}</option>;
                else
                  return (
                    <option key={index} value={value.id}>
                      {value.nome}
                    </option>
                  );
              })}
            </select>
            <br />
            <br />

            <label htmlFor="grupo_sanguineo">Grupo sanguíneo</label>
            <br />
            <select {...register("grupo_sanguineo")} id="grupo_sanguineo">
              <option defaultValue hidden>
                Selecione um grupo sanguíneo...
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="O">O</option>
              <option value="AB">AB</option>
            </select>
            <br />
            <br />
            <label htmlFor="rh_sanguineo">RH</label>
            <br />
            <select
              {...register("rh_sanguineo")}
              required={true}
              id="rh_sanguineo"
            >
              <option defaultValue hidden>
                Selecione o RH...
              </option>
              <option value={true}>+</option>
              <option value={false}>-</option>
            </select>
            <br />
            <br />
            <input
              type="checkbox"
              value={true}
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
              minLength="8"
              maxLength="8"
              placeholder="00000000"
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
              {...register("rua")}
              defaultValue={address.address}
            />
            <br />
            <br />
            <label htmlFor="numero_residencia">Número</label>
            <br />
            <input
              type="number"
              id="numero_residencia"
              min="0"
              placeholder="0000"
              required={true}
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
              {...register("estado")}
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
              required={true}
              minLength="10"
              maxLength="12"
              placeholder="(00) 0000-0000"
              {...register("telefone1")}
            />
            <br />
            <br />
            <label htmlFor="telefone2">Telefone2 (opcional)</label>
            <br />
            <input
              type="text"
              id="telefone2"
              minLength="10"
              maxLength="12"
              placeholder="(00) 0000-0000"
              {...register("telefone2")}
            />
            <br />
            <br />
            <label htmlFor="telefone3">Telefone3 (opcional)</label>
            <br />
            <input
              type="text"
              id="telefone3"
              minLength="10"
              maxLength="12"
              placeholder="(00) 0000-0000"
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
