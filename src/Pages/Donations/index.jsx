import React, { useEffect, useState, memo } from "react";
import Axios from "axios";

import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import LoadingAnimation from "../../Components/Animation/Loading";
import RemoveAnimation from "../../Components/Animation/Remove";
import ErrorAnimation from "../../Components/Animation/Error";
import styles from "./Donations.module.scss";

const Donations = () => {
  const token = sessionStorage.getItem("token");
  const [donations, setDonations] = useState([{}]);
  const [donation, setDonation] = useState({});
  const [unities, setUnities] = useState([{}]);
  const [remove, setRemove] = useState(false);
  const [checked, setChecked] = useState(false);
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
          "https://app-node-api-test.herokuapp.com/v1/donation",
          {
            headers: header,
          }
        );

        if (response) {
          setDonations(response.data);
          setLoading(false);
        }
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as doações, contate os desenvolvedores ou tente novamente mais tarde!"
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
          `https://app-node-api-test.herokuapp.com/v1/collector`,
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
      }
    })();
  }, [token]);

  const handleDonation = (donationData) => {
    setDonation(donationData);

    if (sessionStorage.getItem("donation"))
      sessionStorage.removeItem("donation");

    if (donation)
      sessionStorage.setItem("donation", JSON.stringify(donationData));

    setChecked(true);
  };

  const handleRemove = () => {
    if (!remove) setRemove(true);
    else setRemove(false);
  };

  const handleRemoveDonation = async () => {
    if (donation)
      try {
        await Axios.delete(
          `https://app-node-api-test.herokuapp.com/v1/donation/${donation.id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setRemove(false);
        setChecked(false);
        window.location.reload();
      } catch (error) {
        setMessage(
          "Não foi possível remover a doação, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
      }
  };

  const handleSearch = (term) => {
    let string = JSON.stringify(term.term);
    string = string.slice(1, string.length - 1);

    if (string.length === 10 && string.includes("/")) {
      string = string.replaceAll("/", "-");
      string =
        string.slice(6, 10) +
        "-" +
        string.slice(3, 5) +
        "-" +
        string.slice(0, 2);
    } else if (isNaN(string)) {
      string = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
          handleRemove={handleRemove}
          func={handleSearch}
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
                <th
                  className={
                    donations.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Ação
                </th>
                <th
                  className={
                    donations.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Doador
                </th>
                <th
                  className={
                    donations.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Data
                </th>
                <th
                  className={
                    donations.length < 1 ? styles.Right : styles.BottomRight
                  }
                >
                  Volume
                </th>
                <th className={donations.length < 1 ? null : styles.Bottom}>
                  Unidade de coleta
                </th>
              </tr>
            </thead>
            <tbody>
              {donations
                .filter((value) => {
                  if (search) {
                    let foundUnity = false;
                    let id;
                    const val = JSON.stringify(value);

                    unities.map((value, index) => {
                      if (value.nome === search) {
                        foundUnity = true;
                        id = value.id;
                      }
                      return null;
                    });

                    if (val.includes(search)) return value;
                    else if (foundUnity && val.includes(id)) return value;
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

                  if (index < donations.length - 1)
                    return (
                      <tr key={index}>
                        <td className={styles.BottomRight}>
                          <input
                            type="checkbox"
                            defaultChecked={checked}
                            onClick={() => handleDonation(value)}
                          />
                        </td>

                        <td className={styles.BottomRight}>
                          {value.nome_doador}
                        </td>

                        <td className={styles.BottomRight}>{stringDate}</td>

                        <td className={styles.BottomRight}>
                          {value.volume} ml
                        </td>

                        <td className={styles.Bottom}>{unityName}</td>
                      </tr>
                    );
                  else
                    return (
                      <tr key={index}>
                        <td className={styles.Right}>
                          <input
                            type="checkbox"
                            defaultChecked={checked}
                            onClick={() => handleDonation(value)}
                          />
                        </td>

                        <td className={styles.Right}>{value.nome_doador}</td>

                        <td className={styles.Right}>{stringDate}</td>

                        <td className={styles.Right}>{value.volume} ml</td>

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
