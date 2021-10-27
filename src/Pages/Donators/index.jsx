import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import LoadingAnimation from "../../Components/Animation/Loading";
import ErrorAnimation from "../../Components/Animation/Error";
import styles from "./Donators.module.scss";

const Donators = () => {
  const token = sessionStorage.getItem("token");
  const [donators, setDonators] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const handleError = () => {
    if (error) setError(false);
    else setError(true);
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
          "https://app-node-api-test.herokuapp.com/v1/donator",
          {
            headers: header,
          }
        );

        if (response) {
          setDonators(response.data);
          setLoading(false);
        }
      } catch (error) {
        setMessage(
          "Não foi possível encontrar os doadores, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
        setLoading(false);
      }
    })();
  }, [token]);

  const setDonator = (donator) => {
    if (sessionStorage.getItem("donator")) sessionStorage.removeItem("donator");
    sessionStorage.setItem("donator", JSON.stringify(donator));
  };

  const handleSearch = (term) => {
    let string = JSON.stringify(term.term);
    string = string.slice(1, string.length - 1);

    if (string.length >= 1 && string.length <= 3 && isNaN(string))
      string = string.toUpperCase();

    if (isNaN(string) && string.length > 3)
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
          title="Doadores"
          placeholder="Buscar doador..."
          page="doador"
          func={handleSearch}
        />

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th
                  className={
                    donators.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Nome
                </th>
                <th
                  className={
                    donators.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Grupo Sanguíneo
                </th>
                <th
                  className={
                    donators.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  RH
                </th>
                <th className={donators.length < 1 ? null : styles.Bottom}>
                  Cidade
                </th>
              </tr>
            </thead>
            <tbody>
              {donators
                .filter((value) => {
                  if (search) {
                    const val = JSON.stringify(value);

                    if (search.length === 1) {
                      let gs = value.grupo_sanguineo;
                      if (gs.charAt(1)) return null;
                      else return value;
                    }

                    if (search.length === 2) {
                      if (
                        search.charAt(1) !== "+" ||
                        search.charAt(1) !== "-"
                      ) {
                        if (value.grupo_sanguineo === search) return value;
                      }

                      if (
                        search.charAt(1) === "+" ||
                        search.charAt(1) === "-"
                      ) {
                        let rh = search.charAt(1) === "+" ? true : false;

                        if (
                          value.grupo_sanguineo === search.charAt(0) &&
                          value.rh_sanguineo === rh
                        ) {
                          return value;
                        }
                      }
                    }

                    if (search.length === 3) {
                      if (
                        search.charAt(2) === "+" ||
                        search.charAt(2) === "-"
                      ) {
                        let gs = search.slice(0, 2);
                        let rh = search.slice(2) === "+" ? true : false;
                        if (
                          value.grupo_sanguineo === gs &&
                          value.rh_sanguineo === rh
                        )
                          return value;
                        else return null;
                      }
                    } else {
                      if (val.includes(search)) return value;
                      else return null;
                    }
                  }
                  return value;
                })
                .map((value, index) => {
                  if (index < donators.length - 1)
                    return (
                      <tr key={index}>
                        <td
                          className={styles.BottomRight}
                          onClick={() => setDonator(value)}
                        >
                          <Link to="/detalhes_doador">{value.nome}</Link>
                        </td>

                        <td className={styles.BottomRight}>
                          {value.grupo_sanguineo}
                        </td>

                        <td className={styles.BottomRight}>
                          {value.rh_sanguineo === true ? "+" : "-"}
                        </td>

                        <td className={styles.Bottom}>{value.cidade}</td>
                      </tr>
                    );
                  else
                    return (
                      <tr key={index}>
                        <td
                          className={styles.Right}
                          onClick={() => setDonator(value)}
                        >
                          <Link to="/detalhes_doador">{value.nome}</Link>
                        </td>

                        <td className={styles.Right}>
                          {value.grupo_sanguineo}
                        </td>

                        <td className={styles.Right}>
                          {value.rh_sanguineo === true ? "+" : "-"}
                        </td>

                        <td>{value.cidade}</td>
                      </tr>
                    );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(Donators);
