import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { donatorContext } from "../../Context/DonatorContext";
import Nav from "../Nav/Nav";
import TopMenu from "../TopMenu/TopMenu";
import styles from "./Donators.module.scss";

const Donators = () => {
  const [donators, setDonators] = useState([{}]);
  const { setDonatorRg } = useContext(donatorContext);
  const token = sessionStorage.getItem("token");

  const getDonators = useCallback(async () => {
    const response = await fetch(
      "https://app-node-api-test.herokuapp.com/donator",
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-type": "application/json",
        }),
      }
    );
    const data = await response.json();

    setDonators(data);
  }, [token]);

  useEffect(() => {
    getDonators();
  }, [getDonators]);

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu
          title="Doadores"
          page="doadores"
          typePage="general"
          placeholder="Buscar doador..."
        />

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th id={styles.th2}>Nome</th>
                <th id={styles.th3}>Grupo Sanguíneo</th>
                <th id={styles.th4}>RH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {donators.map((value, index) => {
                  return (
                    <td key={index} className={styles.td2}>
                      <Link
                        to="/detalhes_doador"
                        onClick={() => setDonatorRg(value.rg)}
                      >
                        {value.nome}
                      </Link>
                    </td>
                  );
                })}

                {donators.map((value, index) => {
                  return (
                    <td key={index} className={styles.td3}>
                      {value.grupo_sanguineo}
                    </td>
                  );
                })}
                {donators.map((value, index) => {
                  return (
                    <td key={index} className={styles.td4}>
                      {value.rh_sanguineo === "0" ? "-" : "+"}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donators;
