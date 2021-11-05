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
    setDonator(JSON.parse(sessionStorage.getItem("donator")));

    if (cep.length === 8) {
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

          console.log(response.data);
          if (response) {
            setAddress(response.data);
          }
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
        response.data.map((value) => {
          if (value.id === donator.profissao_id)
            setProfissao({ label: value.nome, value: value.id });
          return null;
        });
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as profissões, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();
  }, [
    cep,
    token,
    donator.profissao_id,
    donator.cep,
    address.city,
    address.state,
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

    if (!data.data_de_expedicao)
      data.data_de_expedicao = donator.data_de_expedicao;

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
      const anoExpedicao = data.data_de_expedicao.slice(0, 4);

      if (date.getFullYear() - anoNascimento < 18) {
        setMessage("Menor de idade!");
        setError(true);
      } else if (anoExpedicao < anoNascimento) {
        setMessage(
          "Ano de expedição do RG inválido, é necessário ter no mínimo 6 anos de idade para fazê-lo!"
        );
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
        data.orgao_expeditor_rg = data.orgao_expeditor_rg.toUpperCase();

        if (medule.value && donator.doador_de_medula)
          data.doador_de_medula = donator.doador_de_medula;
        else data.doador_de_medula = medule.value;

        if (data.nome) {
          data.nome = data.nome.toUpperCase();
          data.nome = data.nome.replace(/\s\s+/g, " ");
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
          if (address.address) {
            let rua = JSON.stringify(address.address);
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
          if (address.district) {
            let bairro = JSON.stringify(address.district);
            bairro = bairro.slice(1, bairro.length - 1);
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
          if (address.city) {
            let cidade = JSON.stringify(address.city);
            cidade = cidade.slice(1, cidade.length - 1);
            data.cidade = capitalize(cidade);
          } else {
            data.cidade = "Não informado";
          }
        }

        if (data.estado) {
          data.estado = data.estado.replace(/  +/g, " ");
          data.estado = data.estado.toUpperCase();

          if (data.estado.charAt(0) === " ")
            data.estado = data.estado.charAt(0).replace(" ", "");

          if (data.cidade.charAt(data.estado.length) === " ")
            data.estado = data.estado
              .charAt(data.estado.length)
              .replace(" ", "");
        } else {
          if (address.state) {
            let estado = JSON.stringify(address.state);
            estado = estado.slice(1, estado.length - 1);
            data.estado = estado.toUpperCase();
          } else {
            data.estado = "Não informado";
          }
        }
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
              autoComplete="off"
              {...register("orgao_expeditor_rg")}
              id="orgao_expeditor_rg"
              placeholder="Digite o orgão expedidor..."
              required
              defaultValue={donator.orgao_expeditor_rg}
            />
            <br />
            <br />

            <label htmlFor="data_de_expedicao">Data de expedição</label>
            <br />
            <input
              type="date"
              autoComplete="off"
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
              type="text"
              autoComplete="off"
              id="logra"
              placeholder="Logradouro do doador..."
              {...register("rua")}
              defaultValue={
                !donator.rua
                  ? address.address
                  : donator.rua === "Não informado"
                  ? ""
                  : donator.rua
              }
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
              type="text"
              id="bairro"
              autoComplete="off"
              placeholder="Bairro do doador..."
              {...register("bairro")}
              defaultValue={
                donator.bairro === ""
                  ? address.district
                  : donator.bairro === "Não informado"
                  ? ""
                  : donator.bairro
              }
            />
            <br />
            <br />

            <label htmlFor="cidade">Cidade</label>
            <br />
            <input
              type="text"
              id="cidade"
              autoComplete="off"
              placeholder="Cidade do doador..."
              {...register("cidade")}
              defaultValue={
                donator.cidade === ""
                  ? address.city
                  : donator.cidade === "Não informado"
                  ? ""
                  : donator.cidade
              }
            />
            <br />
            <br />

            <label htmlFor="estado">Estado</label>
            <br />
            <input
              type="text"
              id="estado"
              autoComplete="off"
              placeholder="Estado do doador..."
              {...register("estado")}
              defaultValue={
                donator.estado === ""
                  ? address.state
                  : donator.estado === "Não informado"
                  ? ""
                  : donator.estado
              }
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
