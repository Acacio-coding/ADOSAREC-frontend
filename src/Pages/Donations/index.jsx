import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "axios";

import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import { RiPencilFill as EditIcon } from "react-icons/ri";
import { IoMdTrash as RemoveIcon } from "react-icons/io";
import { MdRestorePage as ActiveIcon } from "react-icons/md";
import LoadingAnimation from "../../Components/Animation/Loading";
import RemoveAnimation from "../../Components/Animation/Remove";
import ErrorAnimation from "../../Components/Animation/Error";
import styles from "./Donations.module.scss";

const Donations = () => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [donations, setDonations] = useState([{}]);
  const [donators, setDonators] = useState([{}]);
  const [unities, setUnities] = useState([{}]);
  const [remove, setRemove] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
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
          `${process.env.REACT_APP_SECRET_NAME}/v1/donation`,
          {
            headers: header,
          }
        );

        if (response) {
          setDonations(response.data);
        }
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          history.push("/");
        } else {
          setMessage(
            "Não foi possível encontrar as doações, contate os desenvolvedores ou tente novamente mais tarde!"
          );
          setError(true);
        }
      }
    })();

    (async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_SECRET_NAME}/v1/donator`,
          {
            headers: header,
          }
        );

        if (response) {
          setDonators(response.data);
        }
      } catch (error) {
        setMessage(
          "Não foi possível encontrar os doadores, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    })();

    (async () => {
      const header = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_SECRET_NAME}/v1/collector`,
          {
            headers: header,
          }
        );

        if (response) setUnities(response.data);
        setLoading(false);
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as unidades coletoras, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
        setLoading(false);
      }
    })();
  }, [token, history]);

  const setDonation = (donationData, arg) => {
    if (arg === "edit") {
      if (sessionStorage.getItem("donation"))
        sessionStorage.removeItem("donation");

      sessionStorage.setItem("donation", JSON.stringify(donationData));
    }

    if (arg === "remove") {
      if (sessionStorage.getItem("donation"))
        sessionStorage.removeItem("donation");

      sessionStorage.setItem("donation", JSON.stringify(donationData));

      handleRemove();
    }

    if (arg === "activate") {
      let data = {};
      data.data = donationData.data;
      data.volume = donationData.volume;
      data.doador_rg = donationData.doador_rg;
      data.orgao_coletor_id = donationData.orgao_coletor_id;
      data.status = true;

      const id = donationData.id;

      (async () => {
        const header = {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        };

        try {
          await Axios.put(
            `${process.env.REACT_APP_SECRET_NAME}v1/donation/${id}`,
            data,
            {
              headers: header,
            }
          );
          window.location.reload();
        } catch (error) {
          setMessage(
            "Não foi possível restaurar a doação, contate os desenvolvedores ou tente novamente mais tarde!"
          );
          setError(true);
        }
      })();
    }
  };

  const handleRemove = () => {
    if (!remove) setRemove(true);
    else setRemove(false);
  };

  const handleRemoveDonation = async () => {
    if (sessionStorage.getItem("donation")) {
      const donation = JSON.parse(sessionStorage.getItem("donation"));
      try {
        await Axios.delete(
          `${process.env.REACT_APP_SECRET_NAME}/v1/donation/${donation.id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setRemove(false);
        window.location.reload();
      } catch (error) {
        setMessage(
          "Não foi possível remover a doação, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
    }
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

    if (
      (string.length === 10 && string.includes("/")) ||
      string.includes("-")
    ) {
      string = string.replaceAll("/", "-");
      string =
        string.slice(6, 10) +
        "-" +
        string.slice(3, 5) +
        "-" +
        string.slice(0, 2);
    } else {
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
          typePage="generalD"
          title="Doações"
          placeholder="Buscar doação..."
          page="doacao"
          func={handleSearch}
          filter={filter}
          setFilter={handleFilter}
          loading={loading}
        />

        <RemoveAnimation
          page="donation"
          remove={remove}
          handleRemovePage={handleRemoveDonation}
          handleRemove={handleRemove}
        />

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Ação</th>
                <th>Doador</th>
                <th>Data</th>
                <th>Volume</th>
                <th>Unidade de coleta</th>
              </tr>
            </thead>
            <tbody>
              {donations
                .filter((value) => {
                  if (filter.value === "Inactive")
                    if (!value.status) return value;
                    else return null;
                  else if (value.status) return value;
                  else return null;
                })
                .filter((value) => {
                  if (search) {
                    let foundUnity = false;
                    let id;
                    let foundDonator = false;
                    let rg;
                    const val = JSON.stringify(value);

                    unities.map((value) => {
                      if (value.nome === search) {
                        foundUnity = true;
                        id = value.id;
                      }
                      return null;
                    });

                    donators.map((value) => {
                      if (value.nome === search) {
                        foundDonator = true;
                        rg = value.rg;
                      }
                      return null;
                    });

                    if (val.includes(search)) return value;
                    else if (foundUnity && value.id === id) {
                      return value;
                    } else if (foundDonator && val.includes(rg)) return value;
                    else return null;
                  }
                  return value;
                })
                .map((value, index) => {
                  let stringDate;

                  if (value.data) {
                    const string = JSON.stringify(value.data);
                    const year = string.slice(1, 5);
                    const month = string.slice(6, 8) + "-";
                    const day = string.slice(9, 11) + "-";
                    stringDate = day + month + year;
                  }

                  let unityId = value.orgao_coletor_id;
                  let unityName;

                  if (unities) {
                    unityName = unities.map((value) => {
                      if (value.id === unityId) {
                        return value.nome;
                      }
                      return null;
                    });
                  }

                  let donatorRg = value.doador_rg;
                  let donatorName;

                  if (donators) {
                    donatorName = donators.map((value) => {
                      if (value.rg === donatorRg) {
                        return value.nome;
                      }
                      return null;
                    });
                  }

                  if (index < donations.length - 1)
                    return (
                      <tr key={index}>
                        <td>
                          <div id={styles.iconsDiv}>
                            <Link
                              to={`/editar_doacao`}
                              onClick={() => setDonation(value, "edit")}
                              className={
                                filter.value === "Active"
                                  ? styles.show
                                  : styles.hide
                              }
                            >
                              <EditIcon id={styles.editIcon} />
                            </Link>

                            <RemoveIcon
                              id={styles.removeIcon}
                              onClick={() => setDonation(value, "remove")}
                              className={
                                filter.value === "Active"
                                  ? styles.show
                                  : styles.hide
                              }
                            />

                            <ActiveIcon
                              id={styles.activeIcon}
                              onClick={() => setDonation(value, "activate")}
                              className={
                                filter.value === "Inactive"
                                  ? styles.show
                                  : styles.hide
                              }
                            />
                          </div>
                        </td>

                        <td>{donatorName}</td>

                        <td>{stringDate}</td>

                        <td>{value.volume} ml</td>

                        <td>{unityName}</td>
                      </tr>
                    );
                  else
                    return (
                      <tr key={index}>
                        <td>
                          <div id={styles.iconsDiv}>
                            <Link
                              to={`/editar_doacao`}
                              onClick={() => setDonation(value, "edit")}
                              className={
                                filter.value === "Active"
                                  ? styles.show
                                  : styles.hide
                              }
                            >
                              <EditIcon id={styles.editIcon} />
                            </Link>

                            <RemoveIcon
                              id={styles.removeIcon}
                              onClick={() => setDonation(value, "remove")}
                              className={
                                filter.value === "Active"
                                  ? styles.show
                                  : styles.hide
                              }
                            />

                            <ActiveIcon
                              id={styles.activeIcon}
                              onClick={() => setDonation(value, "activate")}
                              className={
                                filter.value === "Inactive"
                                  ? styles.show
                                  : styles.hide
                              }
                            />
                          </div>
                        </td>

                        <td>{donatorName}</td>

                        <td>{stringDate}</td>

                        <td>{value.volume} ml</td>

                        <td>{unityName}</td>
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

export default memo(Donations);
