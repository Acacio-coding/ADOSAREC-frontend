import React, { useEffect, useState, memo } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Select from "react-select";

import {
  BsFillInfoCircleFill as InfoIcon,
  BsFillTelephoneFill as ContactIcon,
} from "react-icons/bs";
import { HiLocationMarker as AddressIcon } from "react-icons/hi";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Edit.module.scss";

const EditD = () => {
  const { register, handleSubmit } = useForm();
  const [donator, setDonator] = useState({});
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [jobs, setJobs] = useState([{}]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [stt, setStt] = useState({});
  const token = localStorage.getItem("token");
  const history = useHistory();

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("donator")) history.push("/doadores");
    setDonator(JSON.parse(sessionStorage.getItem("donator")));

    setLogradouro(donator.rua);
    setBairro(donator.bairro);
    setCidade(donator.cidade);
    setStt({ value: donator.estado, label: donator.estado });

    if (cep.length === 8) {
      (async () => {
        try {
          const response = await Axios.get(
            `${process.env.REACT_APP_SECRET_NAME}/v1/cep/${cep}`,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );

          const data = response.data;
          setLogradouro(data.address);
          setBairro(data.district);
          setCidade(data.city);
          if (data.state === "AC") setStt({ value: "Acre", label: "Acre" });
          if (data.state === "AL")
            setStt({ value: "Alagoas", label: "Alagoas" });
          if (data.state === "AP") setStt({ value: "Amapá", label: "Amapá" });
          if (data.state === "AM")
            setStt({ value: "Amazonas", label: "Amazonas" });
          if (data.state === "BA") setStt({ value: "Bahia", label: "Bahia" });
          if (data.state === "ES")
            setStt({ value: "Espírito Santo", label: "Espírito Santo" });
          if (data.state === "GO") setStt({ value: "Goiás", label: "Goiás" });
          if (data.state === "MA")
            setStt({ value: "Maranhão", label: "Maranhão" });
          if (data.state === "MT")
            setStt({ value: "Mato Grosso", label: "Mato Grosso" });
          if (data.state === "MS")
            setStt({
              value: "Mato Grosso do Sul ",
              label: "Mato Grosso do Sul ",
            });
          if (data.state === "MG")
            setStt({ value: "Minas Gerais", label: "Minas Gerais" });
          if (data.state === "PA") setStt({ value: "Pará", label: "Pará" });
          if (data.state === "PB")
            setStt({ value: "Paraíba", label: "Paraíba" });
          if (data.state === "PR") setStt({ value: "Paraná", label: "Paraná" });
          if (data.state === "PE")
            setStt({ value: "Pernambuco", label: "Pernambuco" });
          if (data.state === "PI") setStt({ value: "Piauí", label: "Piauí" });
          if (data.state === "RJ")
            setStt({ value: "Rio de Janeiro", label: "Rio de Janeiro" });
          if (data.state === "RN")
            setStt({
              value: "Rio Grande do Norte",
              label: "Rio Grande do Norte",
            });
          if (data.state === "RS")
            setStt({
              value: "Rio Grande do Sul ",
              label: "Rio Grande do Sul",
            });
          if (data.state === "RO")
            setStt({ value: "Rondônia", label: "Rondônia" });
          if (data.state === "RR")
            setStt({ value: "Roraima", label: "Roraima" });
          if (data.state === "SC")
            setStt({ value: "Santa Catarina ", label: "Santa Catarina " });
          if (data.state === "SP")
            setStt({ value: "São Paulo", label: "São Paulo" });
          if (data.state === "SE")
            setStt({ value: "Sergipe", label: "Sergipe" });
          if (data.state === "TO")
            setStt({ value: "Tocantins", label: "Tocantins" });
          if (data.state === "DF")
            setStt({
              value: "Distrito Federal ",
              label: "Distrito Federal ",
            });
          if (!data.state) setStt({});
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
          `${process.env.REACT_APP_SECRET_NAME}/v1/profissao`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setJobs(response.data);
        response.data.map((value) => {
          if (value.id === donator.profissao_id)
            setProfissao({ label: value.nome, value: value.id });
          return null;
        });
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          history.push("/");
        } else {
          setMessage(
            "Não foi possível encontrar as profissões, contate os desenvolvedores ou tente novamente mais tarde!"
          );
          setError(true);
        }
      }
    })();
  }, [
    cep,
    token,
    donator.profissao_id,
    donator.rua,
    donator.bairro,
    donator.cidade,
    donator.estado,
    history,
  ]);

  let rg = donator.rg;

  const capitalize = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleData = async (data) => {
    if (!data.nome) data.nome = donator.nome;

    if (!data.genero) data.genero = donator.genero;

    if (!data.data_de_nascimento)
      data.data_de_nascimento = donator.data_de_nascimento;

    if (!data.rg) data.rg = donator.rg;

    if (!data.orgao_expeditor_rg)
      data.orgao_expeditor_rg = donator.orgao_expeditor_rg;

    if (!data.filiacao_pai) data.filiacao_pai = donator.filiacao_pai;

    if (!data.filiacao_mae) data.filiacao_mae = donator.filiacao_mae;

    if (!data.naturalidade) data.naturalidade = donator.naturalidade;

    if (!data.estado_civil) data.estado_civil = donator.estado_civil;

    if (!data.profissao_id) data.profissao_id = donator.profissao_id;

    if (!data.grupo_sanguineo) data.grupo_sanguineo = donator.grupo_sanguineo;

    if (!data.rh_sanguineo) data.rh_sanguineo = donator.rh_sanguineo;

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

      if (data.data_de_nascimento.length < 10) {
        setMessage("Data de nascimento inválida!");
        setError(true);
      } else if (!rh) {
        setMessage("Campo rh está vazio!");
        setError(true);
      } else if (!gs) {
        setMessage("Campo grupo sanguíneo está vazio!");
        setError(true);
      } else if (!profissao) {
        setMessage("Campo profissão está vazio!");
        setError(true);
      } else if (!civil) {
        setMessage("Campo estado cívil está vazio!");
        setError(true);
      } else if (!gender) {
        setMessage("Campo gênero está vazio!");
        setError(true);
      } else if (!medule) {
        setMessage("Campo doador de medula está vazio!");
        setError(true);
      } else if (!stt) {
        setMessage("Campo estado está vazio!");
        setError(true);
      } else if (date.getFullYear() - anoNascimento < 18) {
        setMessage("Menor de idade!");
        setError(true);
      } else if (data.telefone1 === data.telefone2) {
        setMessage(
          "O primeiro telefone é igual ao segundo, verifique os dados e tente novamente!"
        );
        setError(true);
      } else if (data.telefone1 === data.telefone3) {
        setMessage(
          "O primeiro telefone é igual ao terceiro, verifique os dados e tente novamente!"
        );
        setError(true);
      } else if (
        data.telefone2 !== "" &&
        data.telefone3 !== "" &&
        data.telefone2 === data.telefone3
      ) {
        setMessage(
          "O segundo telefone é igual ao terceiro, verifique os dados e tente novamente!"
        );
        setError(true);
      } else {
        setError(false);
        data.orgao_expeditor_rg = data.orgao_expeditor_rg.toUpperCase();

        if (medule.value && donator.doador_de_medula)
          data.doador_de_medula = donator.doador_de_medula;
        else data.doador_de_medula = medule.value;

        if (data.nome) {
          data.nome = data.nome.replace(/\s\s+/g, " ");
          data.nome = capitalize(data.nome);
        }

        if (data.filiacao_pai) {
          data.filiacao_pai = data.filiacao_pai.replace(/  +/g, " ");
          data.filiacao_pai = capitalize(data.filiacao_pai);
        } else {
          data.filiacao_pai = "Não informado";
        }

        data.filiacao_mae = data.filiacao_mae.replace(/  +/g, " ");
        data.filiacao_mae = capitalize(data.filiacao_mae);

        data.orgao_expeditor_rg = data.orgao_expeditor_rg.toUpperCase();
        data.orgao_expeditor_rg = data.orgao_expeditor_rg.replace(/  +/g, " ");

        data.genero = gender.value;

        data.estado_civil = civil.value;

        data.profissao_id = profissao.value;

        data.grupo_sanguineo = gs.value;

        data.rh_sanguineo = rh.value;

        data.rg = parseInt(data.rg);

        if (data.numero_residencia) {
          data.numero_residencia = parseInt(data.numero_residencia);
        } else {
          data.numero_residencia = 0;
        }

        if (data.naturalidade) {
          data.naturalidade = data.naturalidade.replace(/  +/g, " ");
          data.naturalidade = capitalize(data.naturalidade);
        }

        if (data.cep) {
          data.cep = parseInt(data.cep);
        } else {
          data.cep = 0;
        }
        if (data.rua) {
          data.rua = data.rua.replace(/  +/g, " ");
          data.rua = capitalize(data.rua);

          if (data.rua.charAt(0) === " ")
            data.rua = data.rua.charAt(0).replace(" ", "");

          if (data.rua.charAt(data.rua.length) === " ")
            data.rua = data.rua.charAt(data.rua.length).replace(" ", "");
        } else {
          if (logradouro) {
            let rua = JSON.stringify(logradouro);
            rua = rua.slice(1, rua.length - 1);
            data.rua = capitalize(rua);
          } else {
            data.rua = "Não informado";
          }
        }

        if (data.bairro) {
          data.bairro = data.bairro.replace(/  +/g, " ");
          data.bairro = capitalize(data.bairro);

          if (data.bairro.charAt(0) === " ")
            data.bairro = data.bairro.charAt(0).replace(" ", "");

          if (data.bairro.charAt(data.bairro.length) === " ")
            data.bairro = data.bairro
              .charAt(data.bairro.length)
              .replace(" ", "");
        } else {
          if (bairro) {
            data.bairro = capitalize(bairro);
          } else {
            data.bairro = "Não informado";
          }
        }

        if (data.cidade) {
          data.cidade = data.cidade.replace(/  +/g, " ");
          data.cidade = capitalize(data.cidade);

          if (data.cidade.charAt(0) === " ")
            data.cidade = data.cidade.charAt(0).replace(" ", "");

          if (data.cidade.charAt(data.cidade.length) === " ")
            data.cidade = data.cidade
              .charAt(data.cidade.length)
              .replace(" ", "");
        } else {
          if (cidade) {
            data.cidade = capitalize(cidade);
          } else {
            data.cidade = "Não informado";
          }
        }

        data.estado = stt.value;
      }
    }

    data.status = true;

    if (!error) {
      const header = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      };

      try {
        await Axios.put(
          `${process.env.REACT_APP_SECRET_NAME}/v1/donator/${rg}`,
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
    }
  };

  let stringDate = JSON.stringify(donator.data_de_nascimento);

  if (stringDate) {
    let year = stringDate.slice(1, 5) + "-";
    let month = stringDate.slice(6, 8) + "-";
    let day = stringDate.slice(9, 11);
    donator.data_de_nascimento = year + month + day;
  }

  const date = new Date();

  const maxDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const minDate = `1900-01-01`;

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

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#650000" : "#fff",
      "&:hover": {
        backgroundColor: state.isSelected ? "#650000" : "#0000001d",
      },
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),

    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "#670000",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#670000",
      "&:hover": {
        color: "#CCC",
      },
    }),
  };

  const [gender, setGender] = useState({});
  const [civil, setCivil] = useState({});
  const [profissao, setProfissao] = useState({});
  const [gs, setGs] = useState({});
  const [rh, setRh] = useState({});
  const [medule, setMedule] = useState({});

  useEffect(() => {
    setGender({ label: donator.genero, value: donator.genero });
    setCivil({ label: donator.estado_civil, value: donator.estado_civil });
    setGs({
      label: donator.grupo_sanguineo,
      value: donator.grupo_sanguineo,
    });
    setRh({
      label: donator.rh_sanguineo ? "+" : "-",
      value: donator.rh_sanguineo,
    });
    setMedule({
      label: donator.doador_de_medula ? "Sim" : "Não",
      value: donator.doador_de_medula,
    });
  }, [
    donator.profissao_id,
    donator.genero,
    donator.estado_civil,
    donator.grupo_sanguineo,
    donator.rh_sanguineo,
    donator.doador_de_medula,
  ]);

  return (
    <div className={styles.fullContainer}>
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
              required
              autoComplete="off"
              placeholder="Digite o nome do doador..."
              defaultValue={donator.nome}
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
              required
              value={gender}
              onChange={setGender}
            />
            <br />

            <label htmlFor="data_de_nascimento">Data de nascimento</label>
            <br />
            <input
              type="date"
              autoComplete="off"
              id="data_de_nascimento"
              required
              max={maxDate}
              min={minDate}
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
              required
              autoComplete="off"
              placeholder="000000000"
              maxLength="8"
              minLength="7"
              defaultValue={donator.rg}
              {...register("rg")}
            />
            <br />
            <br />

            <label htmlFor="orgao_expeditor_rg">Órgão expedidor</label>
            <br />
            <input
              type="text"
              autoComplete="off"
              {...register("orgao_expeditor_rg")}
              id="orgao_expeditor_rg"
              placeholder="Digite o orgão expedidor..."
              required
              defaultValue={donator.orgao_expeditor_rg}
            />
            <br />
            <br />

            <label htmlFor="parent">Filiação</label>
            <br />
            <input
              type="text"
              autoComplete="off"
              id="parent"
              placeholder="Nome do pai..."
              {...register("filiacao_pai")}
              defaultValue={donator.filiacao_pai}
            />
            <br />
            <br />

            <input
              type="text"
              autoComplete="off"
              id="parent"
              required
              placeholder="Nome da mãe..."
              {...register("filiacao_mae")}
              defaultValue={donator.filiacao_mae}
            />
            <br />
            <br />

            <label htmlFor="naturalidade">Naturalidade</label>
            <br />
            <input
              type="text"
              autoComplete="off"
              id="naturalidade"
              placeholder="Digite a naturalidade do doador"
              required
              defaultValue={donator.naturalidade}
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
              required
              value={civil}
              onChange={setCivil}
            />
            <br />

            <label htmlFor="profissao">Profissão</label>
            <br />
            <Select
              options={jobs.map((value, index) => {
                return {
                  value: value.id,
                  label: value.nome,
                };
              })}
              noOptionsMessage={() => "Não há profissões cadastradas"}
              styles={style}
              required
              value={profissao}
              onChange={setProfissao}
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
              styles={style}
              required
              value={gs}
              onChange={setGs}
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
              required
              value={rh}
              onChange={setRh}
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
              value={medule}
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
            <br />

            <label htmlFor="cep">CEP</label>
            <br />
            <input
              type="text"
              pattern="\d*"
              autoComplete="off"
              id="cep"
              minLength="8"
              maxLength="8"
              placeholder="00000000"
              defaultValue={donator.cep === 0 ? "" : donator.cep}
              {...register("cep")}
              onChange={(event) => setCep(event.target.value)}
            />
            <br />
            <br />

            <label htmlFor="logra">Logradouro</label>
            <br />
            <input
              onChange={(event) => setLogradouro(event.taget.value)}
              type="text"
              autoComplete="off"
              id="logra"
              placeholder="Logradouro do doador..."
              {...register("rua")}
              defaultValue={logradouro}
            />
            <br />
            <br />

            <label htmlFor="numero_residencia">Número</label>
            <br />
            <input
              type="text"
              autoComplete="off"
              id="numero_residencia"
              min="0"
              placeholder="0000"
              defaultValue={
                donator.numero_residencia === 0 ? "" : donator.numero_residencia
              }
              {...register("numero_residencia")}
            />
            <br />
            <br />

            <label htmlFor="bairro">Bairro</label>
            <br />
            <input
              onChange={(event) => setBairro(event.taget.value)}
              type="text"
              id="bairro"
              autoComplete="off"
              placeholder="Bairro do doador..."
              {...register("bairro")}
              defaultValue={bairro}
            />
            <br />
            <br />

            <label htmlFor="cidade">Cidade</label>
            <br />
            <input
              onChange={(event) => setCidade(event.taget.value)}
              type="text"
              id="cidade"
              autoComplete="off"
              placeholder="Cidade do doador..."
              {...register("cidade")}
              defaultValue={cidade}
            />
            <br />
            <br />

            <label htmlFor="estado">Estado</label>
            <br />
            <Select
              options={[
                { value: "Acre", label: "Acre" },
                { value: "Alagoas", label: "Alagoas" },
                { value: "Amapá", label: "Amapá" },
                { value: "Bahia", label: "Bahia" },
                { value: "Ceará", label: "Ceará" },
                { value: "Espírito Santo", label: "Espírito Santo" },
                { value: "Goiás", label: "Goiás" },
                { value: "Maranhão", label: "Maranhão" },
                { value: "Mato Grosso", label: "Mato Grosso" },
                { value: "Mato Grosso do Sul ", label: "Mato Grosso do Sul " },
                { value: "Minas Gerais", label: "Minas Gerais" },
                { value: "Pará", label: "Pará" },
                { value: "Paraíba", label: "Paraíba" },
                { value: "Paraná", label: "Paraná" },
                { value: "Pernambuco", label: "Pernambuco" },
                { value: "Piauí", label: "Piauí" },
                { value: "Rio de Janeiro", label: "Rio de Janeiro" },
                { value: "Rio Grande do Sul ", label: "Rio Grande do Sul " },
                { value: "Rondônia", label: "Rondônia" },
                { value: "Roraima", label: "Roraima" },
                { value: "Santa Catarina ", label: "Santa Catarina " },
                { value: "São Paulo", label: "São Paulo" },
                { value: "Sergipe", label: "Sergipe" },
                { value: "Tocantins", label: "Tocantins" },
                { value: "Distrito Federal ", label: "Distrito Federal " },
              ]}
              onChange={setStt}
              styles={style}
              value={!stt.value ? "" : stt}
              required
              placeholder="Selecione um estado..."
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
              placeholder="XXXXX@XXXXX.XXX"
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
              autoComplete="off"
              pattern="\d*"
              required
              minLength="10"
              maxLength="11"
              placeholder="00000000000"
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
              pattern="\d*"
              autoComplete="off"
              minLength="10"
              maxLength="11"
              placeholder="00000000000"
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
              autoComplete="off"
              pattern="\d*"
              minLength="10"
              maxLength="11"
              placeholder="00000000000"
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
