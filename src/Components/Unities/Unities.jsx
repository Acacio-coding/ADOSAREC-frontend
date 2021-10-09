import React from "react";
import Nav from "../Nav/Nav";
import TopMenu from "../TopMenu/TopMenu";
import styles from "./Unities.module.scss";

const Unities = () => {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu
          title="Unidades de coleta"
          page="unidades"
          typePage="general"
          placeholder="Buscar unidade..."
        />
      </div>
    </div>
  );
};

export default Unities;
