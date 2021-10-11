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
            <thead>
              <tr>
                <th id={styles.th1}>BLA</th>
                <th id={styles.th2}>Doador</th>
                {/* doador_id */}
                <th id={styles.th2}>Data</th>
                {/* data */}
                <th id={styles.th3}>Volume</th>
                {/* volume */}
                <th id={styles.th4}>Orgão Coletor</th>
                {/* orgao_coletor_id */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id={styles.td1}>null</td>
                {/* 
                
                {donations.map((value, index) => {
                  return (
                    <td key={index} className={styles.td3}>
                      {value.volume}
                    </td>
                  );
                })}
                {donations.map((value, index) => {
                  return (
                    <td key={index} className={styles.td4}>
                      {value.rh_sanguineo === 0 ? "+" : "-"}
                    </td>
                  );
                })} */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donations;
