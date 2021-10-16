import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import LoadingAnimation from "../../Components/Animation/Loading";
import styles from "./Donators.module.scss";

const Donators = () => {
  const token = sessionStorage.getItem("token");
  const [donators, setDonators] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    (async () => {
      try {
        const response = await Axios.get(
          "https://app-node-api-test.herokuapp.com/donator",
          {
            headers: header,
          }
        );

        if (response) {
          setDonators(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [token]);

  const getDonator = (donator) => {
    if (sessionStorage.getItem("donator")) sessionStorage.removeItem("donator");

    if (sessionStorage.getItem("donatorAdress"))
      sessionStorage.removeItem("donatorAdress");

    sessionStorage.setItem("donator", JSON.stringify(donator));
  };

  return (
    <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu
          typePage="general"
          title="Doadores"
          placeholder="Buscar doador..."
          page="doador"
        />

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th
                  className={
                    donators.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Nome
                </th>
                <th
                  className={
                    donators.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Grupo Sanguíneo
                </th>
                <th
                  className={
                    donators.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  RH
                </th>
                <th className={donators.length < 1 ? null : styles.Bottom}>
                  Cidade
                </th>
              </tr>
            </thead>
            <tbody>
              {donators.map((value, index) => {
                if (index < donators.length - 1)
                  return (
                    <tr key={index}>
                      <td
                        className={styles.BottomRight}
                        onClick={() => getDonator(value)}
                      >
                        <Link to="/detalhes_doador">{value.nome}</Link>
                      </td>

                      <td className={styles.BottomRight}>
                        {value.grupo_sanguineo}
                      </td>

                      <td className={styles.BottomRight}>
                        {value.rh_sanguineo === "0" ? "-" : "+"}
                      </td>

                      <td className={styles.Bottom}>Missing</td>
                    </tr>
                  );
                else
                  return (
                    <tr key={index}>
                      <td
                        className={styles.Right}
                        onClick={() => getDonator(value)}
                      >
                        <Link to="/detalhes_doador">{value.nome}</Link>
                      </td>

                      <td className={styles.Right}>{value.grupo_sanguineo}</td>

                      <td className={styles.Right}>
                        {value.rh_sanguineo === "0" ? "-" : "+"}
                      </td>

                      <td>Missing</td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(Donators);
