import React, { useCallback, useEffect, useState } from "react";
import Nav from "../../Nav/Nav";
import TopMenu from "../../TopMenu/TopMenu";
import styles from "./DonatorDetails.module.scss";

const DonatorDetails = () => {
  const [endereço, setEndereço] = useState({});
  const [donatorObj, setDonatorObj] = useState({});
  const token = sessionStorage.getItem("token");
  const rg = sessionStorage.getItem("donatorRg");

  const getDonator = useCallback(async () => {
    const response = await fetch(
      `https://app-node-api-test.herokuapp.com/donator/${rg}`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-type": "application/json",
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem("donator", JSON.stringify(data));
      const stringData = sessionStorage.getItem("donator");
      setDonatorObj(JSON.parse(stringData));
    }
  }, [rg, token]);

  localStorage.setItem("donatorCep", donatorObj.cep);
  const donatorCep = localStorage.getItem("donatorCep");

  const getAdress = useCallback(async () => {
    const response = await fetch(
      `https://app-node-api-test.herokuapp.com/cep/${donatorCep}`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-type": "application/json",
        }),
      }
    );

    const data = await response.json();

    if (response.ok) setEndereço(data);
  }, [token, donatorCep]);

  useEffect(() => {
    getDonator();
    getAdress();
  }, [getDonator, getAdress]);

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu
          title={`Detalhes do doador: ${donatorObj.nome}`}
          typePage="details"
        />

        <div className={styles.infoContainer}>
          <table>
            <tbody>
              <tr>
                <th className={styles.th}>Nome:</th>
                <td className={styles.td}>{donatorObj.nome}</td>
              </tr>

              <tr>
                <th className={styles.th}>Gênero:</th>
                <td className={styles.td}>{donatorObj.genero}</td>
              </tr>

              <tr>
                <th className={styles.th}>Data de nascimento:</th>
                <td className={styles.td}>{donatorObj.data_de_nascimento}</td>
              </tr>

              <tr>
                <th className={styles.th}>RG</th>
                <td className={styles.td}>{donatorObj.rg}</td>
              </tr>

              <tr>
                <th className={styles.th}>Orgão expedidor</th>
                <td className={styles.td}>{donatorObj.orgao_expeditor_rg}</td>
              </tr>

              <tr>
                <th className={styles.th}>Data de expedição</th>
                <td className={styles.td}>{donatorObj.data_de_expedicao}</td>
              </tr>

              <tr>
                <th className={styles.th}>Naturalidade</th>
                <td className={styles.td}>{donatorObj.naturalidade}</td>
              </tr>

              <tr>
                <th className={styles.th}>Estado cívil</th>
                <td className={styles.td}>{donatorObj.estado_civil}</td>
              </tr>

              <tr>
                <th className={styles.th}>Profissão</th>
                <td className={styles.td}>{donatorObj.profissao}</td>
              </tr>

              <tr>
                <th className={styles.th}>Grupo sanguíneo / RH</th>
                <td className={styles.td}>
                  {donatorObj.grupo_sanguineo}
                  {donatorObj.rh_sanguineo === "0" ? "-" : "+"}
                </td>
              </tr>

              <tr>
                <th className={styles.th}>Logradouro</th>
                <td className={styles.td}>{endereço.address}</td>
              </tr>

              <tr>
                <th className={styles.th}>Número residencial</th>
                <td className={styles.td}>{donatorObj.numero_residencia}</td>
              </tr>

              <tr>
                <th className={styles.th}>Cidade</th>
                <td className={styles.td}>{endereço.city}</td>
              </tr>

              <tr>
                <th className={styles.th}>Estado</th>
                <td className={styles.td}>{endereço.state}</td>
              </tr>

              <tr>
                <th className={styles.th}>CEP</th>
                <td className={styles.td}>{donatorObj.cep}</td>
              </tr>

              <tr>
                <th className={styles.th}>Email</th>
                <td className={styles.td}>{donatorObj.email}</td>
              </tr>

              <tr>
                <th className={styles.th}>Telefone1</th>
                <td className={styles.td}>{donatorObj.telefone1}</td>
              </tr>

              <tr>
                <th className={styles.th}>Telefone2</th>
                <td className={styles.td}>{donatorObj.telefone2}</td>
              </tr>

              <tr>
                <th className={styles.lastTh}>Telefone3</th>
                <td className={styles.lastTd}>{donatorObj.telefone3}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonatorDetails;
