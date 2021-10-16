import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import LoadingAnimation from "../../Components/Animation/Loading";
import styles from "./Donations.module.scss";

const Donations = () => {
  const token = sessionStorage.getItem("token");
  const [donations, setDonations] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const getDonator = () => {};

  useEffect(() => {
    setLoading(true);

    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    (async () => {
      try {
        const response = await Axios.get(
          "https://app-node-api-test.herokuapp.com/donation",
          {
            headers: header,
          }
        );

        if (response) {
          setDonations(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu
          typePage="general"
          title="Doações"
          placeholder="Buscar doação..."
          page="doacao"
        />

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th
                  className={
                    donations.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Doador
                </th>
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
                if (index < donations.length - 1)
                  return (
                    <tr key={index}>
                      <td
                        className={styles.BottomRight}
                        onClick={() => getDonator(value)}
                      >
                        <Link to="/detalhes_doador">Nome</Link>
                      </td>

                      <td className={styles.BottomRight}>{value.data}</td>

                      <td className={styles.BottomRight}>{value.volume}</td>

                      <td className={styles.BottomRight}>Unidade</td>
                    </tr>
                  );
                else
                  return (
                    <tr key={index}>
                      <td
                        className={styles.Right}
                        onClick={() => getDonator(value)}
                      >
                        <Link to="/detalhes_doador">Nome</Link>
                      </td>

                      <td className={styles.Right}>{value.data}</td>

                      <td className={styles.Right}>{value.volume}</td>

                      <td>Unidade</td>
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

export default Donations;
