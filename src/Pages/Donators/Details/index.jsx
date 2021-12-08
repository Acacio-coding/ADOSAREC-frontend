import React, { useEffect, useState, memo } from "react";
import { useHistory } from "react-router";
import Axios from "axios";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import LoadingAnimation from "../../../Components/Animation/Loading";
import RemoveAnimation from "../../../Components/Animation/Remove";
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Details.module.scss";

const DetailsD = () => {
  const token = localStorage.getItem("token");
  const donator = JSON.parse(sessionStorage.getItem("donator"));
  const filter = JSON.parse(sessionStorage.getItem("filterDonator"));
  const [job, setJob] = useState();
  const [donations, setDonations] = useState([{}]);
  const [unities, setUnities] = useState([{}]);
  const [remove, setRemove] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRemove = () => {
    if (remove) setRemove(false);
    else setRemove(true);
  };

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  const handleRemoveDonator = async () => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_SECRET_NAME}/v1/donator/${donator.rg}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setRemove(false);
      history.push("/doadores");
    } catch (error) {
      setMessage(
        "Não foi possível remover o doador, contate os desenvolvedores ou tente novamente mais tarde!"
      );
      setError(true);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("donator")) history.push("/doadores");
    setLoading(true);

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

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
        const data = response.data;
        data.filter((value) => {
          if (value.id === donator.profissao_id) {
            setJob(value.nome);
          }
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

    (async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_SECRET_NAME}/v1/donation`,
          {
            headers: header,
          }
        );

        if (response) {
          const data = response.data.filter((value) => {
            if (value.doador_rg === donator.rg) return value;
            return null;
          });
          if (data) setDonations(data);
        }
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as doações do doador, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
        console.log(error);
      }
    })();

    (async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_SECRET_NAME}/v1/collector`,
          {
            headers: header,
          }
        );

        if (response) setUnities(response.data);
        setLoading(false);
      } catch (error) {
        setMessage(
          "Não foi possível encontrar a unidade coletora das doações, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
        setLoading(false);
      }
    })();
  }, [
    token,
    donator.cep,
    donator.nome,
    donator.profissao_id,
    donator.rg,
    history,
  ]);

  let stringDate = JSON.stringify(donator.data_de_nascimento);
  let trueBirth = JSON.stringify(donator.data_de_nascimento);
  /* let truExp = JSON.stringify(donator.data_de_expedicao); */

  if (stringDate) {
    let year = stringDate.slice(1, 5);
    let month = stringDate.slice(6, 8) + "-";
    let day = stringDate.slice(9, 11) + "-";
    donator.data_de_nascimento = day + month + year;

    /* stringDate = JSON.stringify(donator.data_de_expedicao);
    year = stringDate.slice(1, 5);
    month = stringDate.slice(6, 8) + "-";
    day = stringDate.slice(9, 11) + "-";
    donator.data_de_expedicao = day + month + year; */
  }

  const restore = async () => {
    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    const data = {};
    data.nome = donator.nome;

    data.genero = donator.genero;

    data.data_de_nascimento = trueBirth;

    data.rg = donator.rg;

    data.orgao_expeditor_rg = donator.orgao_expeditor_rg;

    /* data.data_de_expedicao = truExp; */

    data.filiacao_pai = donator.filiacao_pai;

    data.filiacao_mae = donator.filiacao_mae;

    data.naturalidade = donator.naturalidade;

    data.estado_civil = donator.estado_civil;

    data.profissao_id = donator.profissao_id;

    data.grupo_sanguineo = donator.grupo_sanguineo;

    data.rh_sanguineo = donator.rh_sanguineo;

    data.cep = donator.cep;

    data.rua = donator.rua;

    data.bairro = donator.bairro;

    data.cidade = donator.cidade;

    data.estado = donator.estado;

    data.numero_residencia = donator.numero_residencia;

    data.email = donator.email;

    data.telefone1 = donator.telefone1;

    data.telefone2 = donator.telefone2;

    data.telefone3 = donator.telefone3;

    data.status = true;

    try {
      setLoading(true);
      await Axios.put(
        `${process.env.REACT_APP_SECRET_NAME}/v1/donator/${donator.rg}`,
        data,
        {
          headers: header,
        }
      );

      history.push("/doadores");
      setLoading(false);
    } catch (error) {
      setMessage(
        "Não foi possível restaurar o doador, contate os desenvolvedores ou tente novamente mais tarde!"
      );
      setLoading(false);
      setError(true);
    }
  };

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
        <TopMenu
          page="doador"
          typePage="details"
          title={
            donator.genero === "Feminino"
              ? `Detalhes da doadora: ${donator.nome}`
              : donator.genero === "Outro"
              ? `Detalhes do(a) doador(a): ${donator.nome}`
              : `Detalhes do doador: ${donator.nome}`
          }
          donatorStatus={donator.status}
          handleRemove={handleRemove}
          filter={filter}
          func={restore}
          donatorData={donator}
          donatorDonations={donations}
          unities={unities}
          job={job}
        />

        <RemoveAnimation
          remove={remove}
          handleRemovePage={handleRemoveDonator}
          handleRemove={handleRemove}
          donatorNome={donator.nome}
        />

        <div className={styles.tableContainer}>
          <div id={styles.donator}>
            <table>
              <caption>
                {donator.genero === "Feminino"
                  ? "Informações da doadora"
                  : donator.genero === "Outro"
                  ? "Informações do(a) doador(a)"
                  : "Informações do doador"}
              </caption>
              <tbody>
                <tr>
                  <th className={styles.th}>Nome:</th>
                  <td className={styles.td}>{donator.nome}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Gênero:</th>
                  <td className={styles.td}>{donator.genero}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Data de nascimento:</th>
                  <td className={styles.td}>{donator.data_de_nascimento}</td>
                </tr>

                <tr>
                  <th className={styles.th}>RG:</th>
                  <td className={styles.td}>
                    {donator.rg.toString().length === 7
                      ? `${donator.rg.toString().slice(0, 1)}.${donator.rg
                          .toString()
                          .slice(1, 4)}.${donator.rg.toString().slice(4, 7)}`
                      : `${donator.rg.toString().slice(0, 2)}.${donator.rg
                          .toString()
                          .slice(2, 5)}.${donator.rg.toString().slice(5, 8)}`}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Orgão expedidor:</th>
                  <td className={styles.td}>{donator.orgao_expeditor_rg}</td>
                </tr>

                {/*  <tr>
                  <th className={styles.th}>Data de expedição:</th>
                  <td className={styles.td}>{donator.data_de_expedicao}</td>
                </tr> */}

                <tr>
                  <th className={styles.th}>Naturalidade:</th>
                  <td className={styles.td}>{donator.naturalidade}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Estado cívil:</th>
                  <td className={styles.td}>{donator.estado_civil}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Profissão:</th>
                  <td className={styles.td}>{job}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Nome do pai:</th>
                  <td className={styles.td}>{donator.filiacao_pai}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Nome da mãe:</th>
                  <td className={styles.td}>{donator.filiacao_mae}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Grupo sanguíneo / RH:</th>
                  <td className={styles.td}>
                    {donator.grupo_sanguineo}
                    {donator.rh_sanguineo === true ? "+" : "-"}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Doador de medula?</th>
                  <td className={styles.td}>
                    {donator.doador_de_medula === true ? "Sim" : "Não"}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Logradouro:</th>
                  <td className={styles.td}>{donator.rua}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Número residencial:</th>
                  <td className={styles.td}>
                    {donator.numero_residencia === 0
                      ? "Não Informado"
                      : donator.numero_residencia}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Bairro:</th>
                  <td className={styles.td}>{donator.bairro}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Cidade:</th>
                  <td className={styles.td}>{donator.cidade}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Estado:</th>
                  <td className={styles.td}>{donator.estado}</td>
                </tr>

                <tr>
                  <th className={styles.th}>CEP:</th>
                  <td className={styles.td}>
                    {donator.cep === 0 ? "Não informado" : donator.cep}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Email:</th>
                  <td className={styles.td}>
                    {donator.email ? donator.email : "Não informado"}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Telefone1:</th>
                  <td className={styles.td}>
                    {donator.telefone1.length === 11
                      ? `(${donator.telefone1.slice(
                          0,
                          2
                        )}) ${donator.telefone1.slice(
                          2,
                          7
                        )}-${donator.telefone1.slice(7, 11)}`
                      : `(${donator.telefone1.slice(
                          0,
                          2
                        )}) ${donator.telefone1.slice(
                          2,
                          6
                        )}-${donator.telefone1.slice(6, 10)}`}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Telefone2:</th>
                  <td className={styles.td}>
                    {donator.telefone2
                      ? donator.telefone2.length === 11
                        ? `(${donator.telefone2.slice(
                            0,
                            2
                          )}) ${donator.telefone2.slice(
                            2,
                            7
                          )}-${donator.telefone2.slice(7, 11)}`
                        : `(${donator.telefone2.slice(
                            0,
                            2
                          )}) ${donator.telefone2.slice(
                            2,
                            6
                          )}-${donator.telefone2.slice(6, 10)}`
                      : "Não informado"}
                  </td>
                </tr>

                <tr>
                  <th className={styles.lastTh}>Telefone3:</th>
                  <td className={styles.lastTd}>
                    {donator.telefone3
                      ? donator.telefone3.length === 11
                        ? `(${donator.telefone3.slice(
                            0,
                            2
                          )}) ${donator.telefone3.slice(
                            2,
                            7
                          )}-${donator.telefone3.slice(7, 11)}`
                        : `(${donator.telefone3.slice(
                            0,
                            2
                          )}) ${donator.telefone3.slice(
                            2,
                            6
                          )}-${donator.telefone3.slice(6, 10)}`
                      : "Não informado"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div id={styles.donation}>
            {/* Donations */}
            <table>
              <caption className={styles.legenda}>
                {donator.genero === "Feminino"
                  ? "Doações da doadora"
                  : donator.genero === "Outro"
                  ? "Doações do(a) doador(a)"
                  : "Doações do doador"}
              </caption>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Volume</th>
                  <th>Unidade de coleta</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((value, index) => {
                  let stringDate;

                  if (value.data) {
                    const string = JSON.stringify(value.data);
                    const year = string.slice(1, 5);
                    const month = string.slice(6, 8) + "-";
                    const day = string.slice(9, 11) + "-";
                    stringDate = day + month + year;
                  }

                  let unityId = value.orgao_coletor_id;
                  let unityName;

                  if (unities) {
                    unityName = unities.map((value) => {
                      if (value.id === unityId) return value.nome;
                      return null;
                    });
                  }

                  if (index < donations.length - 1)
                    return (
                      <tr key={index}>
                        <td>{stringDate}</td>

                        <td>{value.volume} ml</td>

                        <td>{unityName}</td>
                      </tr>
                    );
                  else
                    return (
                      <tr key={index}>
                        <td>{stringDate}</td>

                        <td>{value.volume} ml</td>

                        <td>{unityName}</td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsD);
