import React from "react";
import Nav from "../Nav/Nav";
import TopMenu from "../TopMenu/TopMenu";
import styles from "./Donations.module.scss";
const Donations = () => {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu
          title="Doações"
          page="doacoes"
          typePage="general"
          placeholder="Buscar doação..."
        />
        <div className={styles.tableContainer}>
          <table>
            <tr>
              <th>BLA</th>
              <th>Nome</th>
              <th>Sobrenome</th>
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

export default Donations;
