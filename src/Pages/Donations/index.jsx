import React, { useEffect, useState, memo } from "react";
import Axios from "axios";

import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import LoadingAnimation from "../../Components/Animation/Loading";
import RemoveAnimation from "../../Components/Animation/Remove";
import styles from "./Donations.module.scss";

const Donations = () => {
  const token = sessionStorage.getItem("token");
  const [donations, setDonations] = useState([{}]);
  const [donation, setDonation] = useState({});
  const [unities, setUnities] = useState([{}]);
  const [remove, setRemove] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const header = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };

    (async () => {
      try {
        const response = await Axios.get(
          "https://app-node-api-test.herokuapp.com/donation",
          {
            headers: header,
          }
        );

        if (response) {
          setDonations(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      const header = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await Axios.get(
          `https://app-node-api-test.herokuapp.com/collector`,
          {
            headers: header,
          }
        );

        if (response) setUnities(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
          `https://app-node-api-test.herokuapp.com/donation/${donation.id}`,
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
        console.log(error);
      }
  };

  return (
    <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
      <Nav />

      <div className={styles.contentContainer}>
        <TopMenu
          typePage="generalD"
          title="Doações"
          placeholder="Buscar doação..."
          page="doacao"
          handleRemove={handleRemove}
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
              {donations.map((value, index) => {
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
                    if (value.id === unityId) return value.nome;
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

                      <td className={styles.BottomRight}>{value.volume} ml</td>

                      <td className={styles.Bottom}>{unityName}</td>
                    </tr>
                  );
                else
                  return (
                    <tr key={index}>
                      <td className={styles.Right}>
                        <label>
                          <input
                            type="checkbox"
                            defaultChecked={checked}
                            onClick={() => handleDonation(value)}
                          />
                          <span></span>
                        </label>
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
