import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import TopMenu from "../TopMenu/TopMenu";
import styles from "./Donators.module.scss";

const Donators = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getDonators = async () => {
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
      console.log(data);
    };

    getDonators();
  }, []);

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
            <tr>
              <th>BLA</th>
              <th>Nome</th>
              <th>Grupo Sanguíneo</th>
              <th>RH</th>
            </tr>
            <tr></tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donators;
