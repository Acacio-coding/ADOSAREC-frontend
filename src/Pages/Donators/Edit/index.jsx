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
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Edit.module.scss";

const EditD = () => {
  const { register, handleSubmit } = useForm();
  const [donator, setDonator] = useState({});
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [medule, setMedule] = useState();
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
    setDonator(JSON.parse(sessionStorage.getItem("donator")));
    setAddress(JSON.parse(sessionStorage.getItem("donatorAddress")));
    setMedule(donator.doador_de_medula);

    if (cep.length === 9) {
      let cep2 = cep.replace("-", "");

      setLoading(true);
      (async () => {
        try {
          const response = await Axios.get(
            `https://app-node-api-test.herokuapp.com/cep/${cep2}`,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );

          if (response) {
            setAddress(response.data);
          }
        } catch (error) {
          setMessage(
            "Não foi possível encontrar o endereço com o cep informado, contate os desenvolvedores ou tente novamente mais tarde!"
          );
          setError(true);
        }
      })();
    }

    (async () => {
      try {
        const response = await Axios.get(
          `https://app-node-api-test.herokuapp.com/profissao`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as profissões, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();
  }, [cep, token, donator.doador_de_medula, donator.cep]);

  let rg = donator.rg;

  const handleData = async (data) => {
    if (!data.nome) data.nome = donator.nome;

    if (!data.genero) data.nome = donator.genero;

    if (!data.data_de_nascimento)
      data.data_de_nascimento = donator.data_de_nascimento;

    if (!data.rg) data.rg = donator.rg;

    if (!data.orgao_expeditor_rg)
      data.orgao_expeditor_rg = donator.orgao_expeditor_rg;

    if (!data.data_de_expedicao)
      data.data_de_expedicao = donator.data_de_expedicao;

    if (!data.filiacao_pai) data.filiacao_pai = donator.data.filiacao_pai;

    if (!data.filiacao_mae) data.filiacao_mae = donator.data.filiacao_mae;

    if (!data.naturalidade) data.naturalidade = donator.naturalidade;

    if (!data.estado_civil) data.estado_civil = donator.estado_civil;

    if (!data.profissao) data.profissao = donator.profissao;

    if (!data.grupo_sanguineo) data.grupo_sanguineo = donator.grupo_sanguineo;

    if (!data.rh_sanguineo) data.rh_sanguineo = donator.rh_sanguineo;

    if (!data.doador_de_medula) {
      data.doador_de_medula = false;
    } else data.doador_de_medula = true;

    if (!data.cep) data.cep = donator.cep;

    if (!data.rua) data.rua = donator.rua;

    if (!data.bairro) data.bairro = donator.bairro;

    if (!data.cidade) data.cidade = donator.cidade;

    if (!data.estado) data.estado = donator.estado;

    if (!data.numero_residencia)
      data.numero_residencia = donator.numero_residencia;

    if (!data.email) data.email = donator.email;

    if (!data.telefone1) data.telefone1 = donator.telefone1;

    if (!data.telefone2) data.telefone2 = donator.telefone2;

    if (!data.telefone3) data.telefone3 = donator.telefone3;

    if (data) {
      const anoNascimento = data.data_de_nascimento.slice(0, 4);
      const anoExpedicao = data.data_de_expedicao.slice(0, 4);

      if (date.getFullYear() - anoNascimento < 18) {
        setMessage("Menor de idade!");
        setError(true);
      } else if (anoExpedicao < anoNascimento) {
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

        data.cep = parseInt(data.cep);
      }
    }

    data.status = true;

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    try {
      await Axios.put(
        `https://app-node-api-test.herokuapp.com/v1/donator/${rg}`,
        data,
        {
          headers: header,
        }
      );
      sessionStorage.removeItem("donator");
      sessionStorage.setItem("donator", JSON.stringify(data));
      history.push("/detalhes_doador");
    } catch (error) {
      setMessage(
        "Não foi possível alterar os dados do doador, contate os desenvolvedores ou tente novamente mais tarde!"
      );
      setError(true);
    }
  };

  let stringDate = JSON.stringify(donator.data_de_nascimento);

  if (stringDate) {
    let year = stringDate.slice(1, 5) + "-";
    let month = stringDate.slice(6, 8) + "-";
    let day = stringDate.slice(9, 11);
    donator.data_de_nascimento = year + month + day;

    stringDate = JSON.stringify(donator.data_de_expedicao);
    year = stringDate.slice(1, 5) + "-";
    month = stringDate.slice(6, 8) + "-";
    day = stringDate.slice(9, 11);
    donator.data_de_expedicao = year + month + day;
  }

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
        <TopMenu typePage="edit" title="Editar doador" />

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
              defaultValue={donator.nome}
              {...register("nome")}
            />
            <br />
            <br />

            <label htmlFor="genero">Gênero</label>
            <br />
            <select {...register("genero")} id="genero" value={donator.genero}>
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
              max={maxDate}
              defaultValue={donator.data_de_nascimento}
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
              maxLength="9"
              minLength="9"
              defaultValue={donator.rg}
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
              defaultValue={donator.orgao_expeditor_rg}
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
              defaultValue={donator.data_de_expedicao}
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
              defaultValue={donator.filiacao_pai}
            />
            <br />
            <br />

            <input
              type="text"
              id="parent"
              placeholder="Nome da mãe..."
              {...register("filiacao_mae", { required: true })}
              defaultValue={donator.filiacao_mae}
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
              defaultValue={donator.naturalidade}
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
              value={donator.estado_civil}
            >
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
              {...register("profissao")}
              value={donator.profissao_id}
            >
              {jobs.map((value, index) => {
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
            <select
              {...register("grupo_sanguineo")}
              id="grupo_sanguineo"
              value={donator.grupo_sanguineo}
            >
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
              value={donator.rh_sanguineo}
            >
              <option value={true}>+</option>
              <option value={false}>-</option>
            </select>
            <br />
            <br />

            <input
              type="checkbox"
              value={true}
              id="doador_de_medula"
              defaultChecked={medule}
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
              defaultValue={donator.cep}
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
              defaultValue={!address.address ? donator.rua : address.address}
            />
            <br />
            <br />

            <label htmlFor="numero_residencia">Número</label>
            <br />
            <input
              type="text"
              id="numero_residencia"
              required={true}
              min="0"
              placeholder="0000"
              defaultValue={donator.numero_residencia}
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
              defaultValue={
                !address.district ? donator.bairro : address.district
              }
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
              defaultValue={!address.city ? donator.cidade : address.city}
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
              defaultValue={!address.state ? donator.estado : address.state}
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
              placeholder="xxxxx@xxxx.xxx"
              defaultValue={donator.email}
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
              minLength="10"
              maxLength="12"
              placeholder="(00) 0000-0000"
              defaultValue={donator.telefone1}
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
              defaultValue={donator.telefone2}
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
              defaultValue={donator.telefone3}
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
      </div>
    </div>
  );
};

export default memo(EditD);
