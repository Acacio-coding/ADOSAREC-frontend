import React, { useEffect, useState, memo } from "react";
import { useHistory } from "react-router";
import Axios from "axios";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import LoadingAnimation from "../../../Components/Animation/Loading";
import RemoveAnimation from "../../../Components/Animation/Remove";
import styles from "./Details.module.scss";

const DetailsD = () => {
  const token = sessionStorage.getItem("token");
  const donator = JSON.parse(sessionStorage.getItem("donator"));
  const [donatorAddress, setDonatorAddress] = useState({});
  const [remove, setRemove] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRemove = () => {
    if (remove) setRemove(false);
    else setRemove(true);
  };

  const handleRemoveDonator = async () => {
    (async () => {
      try {
        await Axios.delete(
          `https://app-node-api-test.herokuapp.com/donator/${donator.rg}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setRemove(false);
        history.push("/doadores");
      } catch (error) {
        console.log(error);
      }
    })();
  };

  useEffect(() => {
    setLoading(true);
    if (donator.cep)
      (async () => {
        try {
          const response = await Axios.get(
            `https://app-node-api-test.herokuapp.com/cep/${donator.cep}`,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );

          if (response) {
            setDonatorAddress(response.data);
            sessionStorage.setItem(
              "donatorAddress",
              JSON.stringify(response.data)
            );
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(true);
        }
      })();
  }, [token, donator.cep]);

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
        <TopMenu
          page="doador"
          typePage="details"
          title={`Detalhes do doador ${donator.nome}`}
          handleRemove={handleRemove}
        />

        <RemoveAnimation
          remove={remove}
          handleRemoveDonator={handleRemoveDonator}
          handleRemove={handleRemove}
          donatorNome={donator.nome}
        />

        <div className={styles.tableContainer}>
          <table>
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
                <td className={styles.td}>{donator.profissao}</td>
              </tr>

              <tr>
                <th className={styles.th}>Grupo sanguíneo / RH:</th>
                <td className={styles.td}>
                  {donator.grupo_sanguineo}
                  {donator.rh_sanguineo === "0" ? "-" : "+"}
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
                <td className={styles.td}>{donatorAddress.address}</td>
              </tr>

              <tr>
                <th className={styles.th}>Número residencial:</th>
                <td className={styles.td}>{donator.numero_residencia}</td>
              </tr>

              <tr>
                <th className={styles.th}>Bairro:</th>
                <td className={styles.td}>{donatorAddress.district}</td>
              </tr>

              <tr>
                <th className={styles.th}>Cidade:</th>
                <td className={styles.td}>{donatorAddress.city}</td>
              </tr>

              <tr>
                <th className={styles.th}>Estado:</th>
                <td className={styles.td}>{donatorAddress.state}</td>
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
                <td className={styles.td}>{donator.telefone1}</td>
              </tr>

              <tr>
                <th className={styles.th}>Telefone2:</th>
                <td className={styles.td}>{donator.telefone2}</td>
              </tr>

              <tr>
                <th className={styles.lastTh}>Telefone3:</th>
                <td className={styles.lastTd}>{donator.telefone3}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsD);
