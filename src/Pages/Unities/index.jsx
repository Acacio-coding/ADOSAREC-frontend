import React from "react";
import Axios from "axios";

import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import styles from "./Unities.module.scss";

const Unities = () => {
  return (
    <div className={styles.fullContainer}>
      <Nav />
      <div className={styles.contentContainer}>
      <TopMenu
      typePage="general"
      title="Unidades Coletoras"
      placeholder="Buscar Unidade..."
      page="unidade"
      />

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th className={styles.BottomRight}>Nome</th>
              <th>Cidade</th>
            </tr>
          </thead>


        </table>
      </div>

      </div>
    </div>
  );
};

export default Unities;
