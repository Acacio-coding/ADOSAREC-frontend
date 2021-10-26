import React, { useState, memo } from "react";
import { useHistory } from "react-router";
import Axios from "axios";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import RemoveAnimation from "../../../Components/Animation/Remove";
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Details.module.scss";

const DetailsU = () => {
  const token = sessionStorage.getItem("token");
  const unity = JSON.parse(sessionStorage.getItem("unity"));
  const [remove, setRemove] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleRemove = () => {
    if (remove) setRemove(false);
    else setRemove(true);
  };

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  const handleRemoveUnity = async () => {
    (async () => {
      try {
        await Axios.delete(
          `https://app-node-api-test.herokuapp.com/v1/collector/${unity.id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setRemove(false);
        history.push("/unidades");
      } catch (error) {
        setMessage(
          "Não foi possível remover a unidade coletora, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();
  };

  return (
    <div className={styles.fullContainer}>
      <Nav />

      <div className={styles.contentContainer}>
        <ErrorAnimation
          error={error}
          handleError={handleError}
          text={message}
        />
        <TopMenu
          page="unidade"
          typePage="details"
          title={`Detalhes da unidade ${unity.nome} `}
          handleRemove={handleRemove}
        />

        <RemoveAnimation
          page="unity"
          remove={remove}
          handleRemovePage={handleRemoveUnity}
          handleRemove={handleRemove}
          unityNome={unity.nome}
        />

        <div className={styles.tableContainer}>
          <table>
            <tbody>
              <tr>
                <th className={styles.th}>Nome:</th>
                <td className={styles.td}>{unity.nome}</td>
              </tr>

              <tr>
                <th className={styles.th}>Cidade:</th>
                <td className={styles.td}>{unity.cidade}</td>
              </tr>

              <tr>
                <th className={styles.lastTh}>Telefone:</th>
                <td className={styles.lastTd}>
                  {unity.telefone ? unity.telefone : "Não informado"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsU);
