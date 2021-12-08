import React, { useState, memo, useEffect } from "react";
import { useHistory } from "react-router";
import Axios from "axios";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import RemoveAnimation from "../../../Components/Animation/Remove";
import LoadingAnimation from "../../../Components/Animation/Loading/index";
import ErrorAnimation from "../../../Components/Animation/Error";
import styles from "./Details.module.scss";

const DetailsU = () => {
  const token = localStorage.getItem("token");
  const filter = JSON.parse(sessionStorage.getItem("filterUnity"));
  const unity = JSON.parse(sessionStorage.getItem("unity"));
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem("unity")) history.push("/unidades");
  }, [history]);

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
          `${process.env.REACT_APP_SECRET_NAME}/v1/collector/${unity.id}`,
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

  const restore = async () => {
    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    const data = {};
    data.nome = unity.nome;
    data.cidade = unity.cidade;
    data.telefone = unity.telefone;
    data.status = true;

    try {
      setLoading(true);
      await Axios.put(
        `${process.env.REACT_APP_SECRET_NAME}/v1/collector/${unity.id}`,
        data,
        {
          headers: header,
        }
      );
      history.push("/unidades");
      setLoading(true);
    } catch (error) {
      setMessage(
        "Não foi possível alterar os dados da unidade coletora, contate os desenvolvedores ou tente novamente mais tarde!"
      );
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
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
          filter={filter}
          func={restore}
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
                  {unity.telefone
                    ? unity.telefone.length === 11
                      ? `(${unity.telefone.slice(0, 2)}) ${unity.telefone.slice(
                          2,
                          7
                        )}-${unity.telefone.slice(7, 11)}`
                      : `(${unity.telefone.slice(0, 2)}) ${unity.telefone.slice(
                          2,
                          6
                        )}-${unity.telefone.slice(6, 10)}`
                    : "Não informado"}
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
