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
  const token = sessionStorage.getItem("token");
  const donator = JSON.parse(sessionStorage.getItem("donator"));
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
        `https://app-node-api-test.herokuapp.com/v1/donator/${donator.rg}`,
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
    setLoading(true);

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

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
        const data = response.data;
        data.filter((value) => {
          if (value.id === donator.profissao_id) setJob(value.nome);
          return null;
        });
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as profissões, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();

    (async () => {
      try {
        const response = await Axios.get(
          "https://app-node-api-test.herokuapp.com/v1/donation",
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
          `https://app-node-api-test.herokuapp.com/v1/collector`,
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
  }, [token, donator.cep, donator.nome, donator.profissao_id, donator.rg]);

  let stringDate = JSON.stringify(donator.data_de_nascimento);

  if (stringDate) {
    let year = stringDate.slice(1, 5);
    let month = stringDate.slice(6, 8) + "-";
    let day = stringDate.slice(9, 11) + "-";
    donator.data_de_nascimento = day + month + year;

    stringDate = JSON.stringify(donator.data_de_expedicao);
    year = stringDate.slice(1, 5);
    month = stringDate.slice(6, 8) + "-";
    day = stringDate.slice(9, 11) + "-";
    donator.data_de_expedicao = day + month + year;
  }

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
          title={`Detalhes do doador ${donator.nome}`}
          handleRemove={handleRemove}
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
              <caption>Informações do doador</caption>
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
                  <td className={styles.td}>{donator.rg}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Orgão expedidor:</th>
                  <td className={styles.td}>{donator.orgao_expeditor_rg}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Data de expedição:</th>
                  <td className={styles.td}>{donator.data_de_expedicao}</td>
                </tr>

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
                  <td className={styles.td}>
                    {donator.rua ? donator.rua : "Não informado"}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Número residencial:</th>
                  <td className={styles.td}>{donator.numero_residencia}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Bairro:</th>
                  <td className={styles.td}>
                    {donator.bairro ? donator.bairro : "Não informado"}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Cidade:</th>
                  <td className={styles.td}>
                    {donator.cidade ? donator.cidade : "Não informado"}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>Estado:</th>
                  <td className={styles.td}>
                    {donator.estado ? donator.estado : "Não informado"}
                  </td>
                </tr>

                <tr>
                  <th className={styles.th}>CEP:</th>
                  <td className={styles.td}>{donator.cep}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Email:</th>
                  <td className={styles.td}>{donator.email}</td>
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
              <caption className={styles.legenda}>Doações do doador</caption>
              <thead>
                <tr>
                  <th
                    className={
                      donations.length < 1 ? styles.Right : styles.BottomRight
                    }
                  >
                    Data
                  </th>
                  <th
                    className={
                      donations.length < 1 ? styles.Right : styles.BottomRight
                    }
                  >
                    Volume
                  </th>
                  <th className={donations.length < 1 ? null : styles.Bottom}>
                    Unidade de coleta
                  </th>
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
                        <td className={styles.BottomRight}>{stringDate}</td>

                        <td className={styles.BottomRight}>
                          {value.volume} ml
                        </td>

                        <td className={styles.Bottom}>{unityName}</td>
                      </tr>
                    );
                  else
                    return (
                      <tr key={index}>
                        <td className={styles.Right}>{stringDate}</td>

                        <td className={styles.Right}>{value.volume} ml</td>

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
