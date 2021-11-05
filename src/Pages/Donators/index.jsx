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

  const capitalize = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSearch = (term) => {
    let string = JSON.stringify(term.term);
    string = string.slice(1, string.length - 1);

    if (string.length >= 1 && string.length <= 3 && isNaN(string))
      string = string.toUpperCase();

    if (isNaN(string) && string.length > 3) {
      string = capitalize(string);
    }

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
                <th>Nome</th>
                <th>RG</th>
                <th>Grupo Sanguíneo/RH</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {donators
                .filter((value) => {
                  if (search) {
                    const val = JSON.stringify(value);

                    if (search.length === 1) {
                      let gs = value.grupo_sanguineo;
                      if (gs === search) return value;
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

                    if (
                      (search.length === 3 && search.includes("+")) ||
                      search.includes("-")
                    ) {
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
                        <td onClick={() => setDonator(value)}>
                          <Link to="/detalhes_doador">{value.nome}</Link>
                        </td>

                        <td>{value.rg}</td>

                        <td>
                          {value.grupo_sanguineo}{" "}
                          {value.rh_sanguineo === true ? "+" : "-"}
                        </td>

                        <td>{value.cidade}</td>
                      </tr>
                    );
                  else
                    return (
                      <tr key={index}>
                        <td onClick={() => setDonator(value)}>
                          <Link to="/detalhes_doador">{value.nome}</Link>
                        </td>

                        <td>{value.rg}</td>

                        <td>
                          {value.grupo_sanguineo}{" "}
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
