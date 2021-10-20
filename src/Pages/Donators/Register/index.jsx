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
  const [jobs, setJobs] = useState([{}]);
  const [others, setOthers] = useState(false);
  const [job, setJob] = useState("");
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
      } catch (error) {
        console.log(error);
      }
    })();
  }, [cep, token]);

  const handleData = async (data) => {
    const anoNascimento = data.data_de_nascimento.slice(0, 4);
    const anoExpedicao = data.data_de_expedicao.slice(0, 4);

    if (date.getFullYear() - anoNascimento < 18) alert("Menor de idade!");
    else if (anoExpedicao < anoNascimento)
      alert(
        "Ano de expedição do RG inválido, o mesmo é menor que a data de nascimento!"
      );
    else {
      if (data.profissao === "Outros")
        data.profissao =
          job.charAt(0).toUpperCase() + job.slice(1).toLowerCase();

      data.orgao_expeditor_rg = data.orgao_expeditor_rg.toUpperCase();

      data.naturalidade =
        data.naturalidade.charAt(0).toUpperCase() +
        data.naturalidade.slice(1).toLowerCase();

      data.cep = data.cep.slice(0, 5) + "-" + data.cep.slice(5);

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
    }
  };

  const handleOthers = (option) => {
    if (option === "Outros") setOthers(true);
    else setOthers(false);
  };

  const date = new Date();
  const maxDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

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
              {...register("profissao")}
              onChange={(event) => handleOthers(event.target.value)}
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
            <input
              type="text"
              required={true}
              disabled={others ? false : true}
              value={!others ? "" : job}
              pattern="[a-zA-Z]+"
              placeholder={others ? "Digite a profissão do doador..." : ""}
              onChange={(event) => setJob(event.target.value)}
            />
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
              disabled={true}
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
              type="number"
              id="telefone1"
              required={true}
              minLength="10"
              maxLength="11"
              placeholder="0000000000"
              {...register("telefone1")}
            />
            <br />
            <br />
            <label htmlFor="telefone2">Telefone2</label>
            <br />
            <input
              type="number"
              id="telefone2"
              minLength="10"
              maxLength="11"
              placeholder="0000000000"
              {...register("telefone2")}
            />
            <br />
            <br />
            <label htmlFor="telefone3">Telefone3</label>
            <br />
            <input
              type="number"
              id="telefone3"
              minLength="10"
              maxLength="11"
              placeholder="0000000000"
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
