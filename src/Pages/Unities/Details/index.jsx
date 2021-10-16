import React, { useEffect, useState, memo } from "react";
import { useHistory } from "react-router";
import Axios from "axios";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import LoadingAnimation from "../../../Components/Animation/Loading";
import RemoveAnimation from "../../../Components/Animation/Remove";
import styles from "./Details.module.scss";

const DetailsU = () => {
  const token = sessionStorage.getItem("token");
  const unity = JSON.parse(sessionStorage.getItem("unity"));
  const [unityAddress, setUnityAddress] = useState({});
  const [remove, setRemove] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRemove = () => {
    if (remove) setRemove(false);
    else setRemove(true);
  };

  const handleRemoveUnity = async () => {
    (async () => {
      try {
        await Axios.delete(
          `https://app-node-api-test.herokuapp.com/collector/${unity.id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setRemove(false);
        history.push("/unidades");
      } catch (error) {
        console.log(error);
      }
    })();
  };

  useEffect(() => {
    setLoading(true);
    if (unity.cep)
      (async () => {
        try {
          const response = await Axios.get(
            `https://app-node-api-test.herokuapp.com/cep/${unity.cep}`,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );

          if (response) {
            setUnityAddress(response.data);
            sessionStorage.setItem(
              "unityAddress",
              JSON.stringify(response.data)
            );
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(true);
        }
      })();
  }, [token, unity.cep]);

  return (
    <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
      <Nav />

      <div className={styles.contentContainer}>
        <TopMenu
          page="unidade"
          typePage="details"
          title={`Detalhes da unidade ${unity.nome} `}
          handleRemove={handleRemove}
        />

        <RemoveAnimation
          page="unity"
          remove={remove}
          handleRemoveDonator={handleRemoveUnity}
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
                <th className={styles.th}>Rua:</th>
                <td className={styles.td}>{unityAddress.address}</td>
              </tr>

              <tr>
                <th className={styles.th}>Número residencial</th>
                <td className={styles.td}>{unity.numero_residencia}</td>
              </tr>

              <tr>
                <th className={styles.th}>Bairro:</th>
                <td className={styles.td}>{unityAddress.district}</td>
              </tr>

              <tr>
                <th className={styles.th}>Cidade:</th>
                <td className={styles.td}>{unityAddress.city}</td>
              </tr>

              <tr>
                <th className={styles.th}>Estado:</th>
                <td className={styles.td}>{unityAddress.state}</td>
              </tr>

              <tr>
                <th className={styles.th}>CEP:</th>
                <td className={styles.td}>{unity.cep}</td>
              </tr>

              <tr>
                <th className={styles.th}>Email:</th>
                <td className={styles.td}>{unity.email}</td>
              </tr>

              <tr>
                <th className={styles.lastTh}>Telefone:</th>
                <td className={styles.lastTd}>{unity.telefone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailsU);
