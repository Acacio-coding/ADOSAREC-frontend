import React, { useEffect, useState, memo } from "react";
import Axios from "axios";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import styles from "./Details.module.scss";

const DetailsD = () => {
  const token = sessionStorage.getItem("token");
  const donator = JSON.parse(sessionStorage.getItem("donator"));
  const [donatorAdress, setDonatorAdress] = useState({});

  useEffect(() => {
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
          setDonatorAdress(response.data);
          sessionStorage.setItem(
            "donatorAdress",
            JSON.stringify(response.data)
          );
        } catch (error) {
          console.log(error);
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
      <Nav />

      <div className={styles.contentContainer}>
        <TopMenu
          page="doador"
          typePage="details"
          title={`Detalhes do doador `}
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
                <th className={styles.th}>RG</th>
                <td className={styles.td}>{donator.rg}</td>
              </tr>

              <tr>
                <th className={styles.th}>Orgão expedidor</th>
                <td className={styles.td}>{donator.orgao_expeditor_rg}</td>
              </tr>

              <tr>
                <th className={styles.th}>Data de expedição</th>
                <td className={styles.td}>{donator.data_de_expedicao}</td>
              </tr>

              <tr>
                <th className={styles.th}>Naturalidade</th>
                <td className={styles.td}>{donator.naturalidade}</td>
              </tr>

              <tr>
                <th className={styles.th}>Estado cívil</th>
                <td className={styles.td}>{donator.estado_civil}</td>
              </tr>

              <tr>
                <th className={styles.th}>Profissão</th>
                <td className={styles.td}>{donator.profissao}</td>
              </tr>

              <tr>
                <th className={styles.th}>Grupo sanguíneo / RH</th>
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
                <th className={styles.th}>Logradouro</th>
                <td className={styles.td}>{donatorAdress.address}</td>
              </tr>

              <tr>
                <th className={styles.th}>Bairro</th>
                <td className={styles.td}>{donatorAdress.district}</td>
              </tr>

              <tr>
                <th className={styles.th}>Número residencial</th>
                <td className={styles.td}>{donator.numero_residencia}</td>
              </tr>

              <tr>
                <th className={styles.th}>Cidade</th>
                <td className={styles.td}>{donatorAdress.city}</td>
              </tr>

              <tr>
                <th className={styles.th}>Estado</th>
                <td className={styles.td}>{donatorAdress.state}</td>
              </tr>

              <tr>
                <th className={styles.th}>CEP</th>
                <td className={styles.td}>{donator.cep}</td>
              </tr>

              <tr>
                <th className={styles.th}>Email</th>
                <td className={styles.td}>{donator.email}</td>
              </tr>

              <tr>
                <th className={styles.th}>Telefone1</th>
                <td className={styles.td}>{donator.telefone1}</td>
              </tr>

              <tr>
                <th className={styles.th}>Telefone2</th>
                <td className={styles.td}>{donator.telefone2}</td>
              </tr>

              <tr>
                <th className={styles.lastTh}>Telefone3</th>
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
