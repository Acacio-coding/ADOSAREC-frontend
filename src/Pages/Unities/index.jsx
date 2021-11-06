import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import LoadingAnimation from "../../Components/Animation/Loading";
import ErrorAnimation from "../../Components/Animation/Error";
import styles from "./Unities.module.scss";

const Unities = () => {
  const token = sessionStorage.getItem("token");
  const [unities, setUnities] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ value: "Active", label: "Ativos" });

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    setLoading(true);
    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    (async () => {
      try {
        const response = await Axios.get(
          "https://app-node-api-test.herokuapp.com/v1/collector",
          {
            headers: header,
          }
        );

        if (response) {
          setUnities(response.data);
          setLoading(false);
        }
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as unidades coletoras, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
        setLoading(false);
      }
    })();
  }, [token]);

  const getUnity = (unity) => {
    if (sessionStorage.getItem("unity")) sessionStorage.removeItem("unity");
    sessionStorage.setItem("unity", JSON.stringify(unity));
  };

  const handleSearch = (term) => {
    let string = JSON.stringify(term.term);
    string = string.slice(1, string.length - 1);

    string = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    setSearch(string);
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
          typePage="general"
          title="Unidades Coletoras"
          placeholder="Buscar Unidade..."
          page="unidade"
          func={handleSearch}
          filter={filter}
          setFilter={handleFilter}
          loading={loading}
        />

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Unidade</th>
                <th>Cidade</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {unities
                .filter((value) => {
                  if (filter.value === "Inactive")
                    if (!value.status) return value;
                    else return null;
                  else if (filter.value === "Active")
                    if (value.status) return value;
                    else return null;
                  else return value;
                })
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
                        <td onClick={() => getUnity(value)}>
                          <Link to="/detalhes_unidade">{value.nome}</Link>
                        </td>

                        <td>{value.cidade}</td>

                        <td>
                          {value.telefone ? value.telefone : "Não informado"}
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        <td onClick={() => getUnity(value)}>
                          <Link to="/detalhes_unidade">{value.nome}</Link>
                        </td>

                        <td>{value.cidade}</td>

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
