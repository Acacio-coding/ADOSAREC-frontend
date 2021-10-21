import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import styles from "./Unities.module.scss";
import LoadingAnimation from "../../Components/Animation/Loading";

const Unities = () => {
  const token = sessionStorage.getItem("token");
  const [unities, setUnities] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    (async () => {
      try {
        const response = await Axios.get(
          "https://app-node-api-test.herokuapp.com/collector",
          {
            headers: header,
          }
        );

        if (response) {
          setUnities(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

  const getUnity = (unity) => {
    if (sessionStorage.getItem("unity")) sessionStorage.removeItem("unity");
    sessionStorage.setItem("unity", JSON.stringify(unity));
  };

  const handleSearch = (term) => {
    let string = JSON.stringify(term.term);

    if (!string.length === 12)
      string =
        string.charAt(0) +
        string.charAt(1).toUpperCase() +
        string.slice(2).toLowerCase();

    setSearch(string);
  };

  return (
    <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
      <Nav />
      <div className={styles.contentContainer}>
        <TopMenu
          typePage="general"
          title="Unidades Coletoras"
          placeholder="Buscar Unidade..."
          page="unidade"
          func={handleSearch}
        />

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th
                  className={
                    unities.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Unidade
                </th>
                <th
                  className={
                    unities.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Cidade
                </th>
                <th className={unities.length < 1 ? null : styles.Bottom}>
                  Telefone
                </th>
              </tr>
            </thead>
            <tbody>
              {unities
                .filter((value) => {
                  if (search) {
                    const val = JSON.stringify(value);
                    if (val.includes(search)) return value;
                    return null;
                  }
                  return value;
                })
                .map((value, index) => {
                  if (index < unities.length - 1) {
                    return (
                      <tr key={index}>
                        <td
                          className={styles.BottomRight}
                          onClick={() => getUnity(value)}
                        >
                          <Link to="/detalhes_unidade">{value.nome}</Link>
                        </td>

                        <td className={styles.BottomRight}>{value.cidade}</td>

                        <td className={styles.Bottom}>
                          {value.telefone ? value.telefone : "Não informado"}
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        <td
                          className={styles.Right}
                          onClick={() => getUnity(value)}
                        >
                          <Link to="/detalhes_unidade">{value.nome}</Link>
                        </td>

                        <td className={styles.Right}>{value.cidade}</td>

                        <td>
                          {value.telefone ? value.telefone : "Não informado"}
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Unities;
