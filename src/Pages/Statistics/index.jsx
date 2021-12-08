import React, { useEffect, useState, memo } from "react";
import { useHistory } from "react-router";
import Axios from "axios";

import Nav from "../../Components/Nav";
import TopMenu from "../../Components/TopMenu";
import LoadingAnimation from "../../Components/Animation/Loading";
import ErrorAnimation from "../../Components/Animation/Error";
import { FaUserCheck as Donator } from "react-icons/fa";
import { ImDroplet as Donation } from "react-icons/im";
import CountUp from "react-countup";
import { Pie } from "react-chartjs-2";
import styles from "./Statistics.module.scss";

const Statistics = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [donators, setDonators] = useState([{}]);
  const [donations, setDonations] = useState([{}]);
  const [chartData, setChartData] = useState([]);

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
          `${process.env.REACT_APP_SECRET_NAME}/v1/donator`,
          {
            headers: header,
          }
        );

        if (response) {
          const data = response.data.filter((value) => {
            if (value.status) return value;
            else return null;
          });

          setDonators(data);

          let A1 = 0;
          let A0 = 0;
          let B1 = 0;
          let B0 = 0;
          let AB1 = 0;
          let AB0 = 0;
          let O1 = 0;
          let O0 = 0;

          data.map((value) => {
            if (value.grupo_sanguineo === "A")
              if (value.rh_sanguineo === true) A1++;
              else A0++;

            if (value.grupo_sanguineo === "B")
              if (value.rh_sanguineo === true) B1++;
              else B0++;

            if (value.grupo_sanguineo === "AB")
              if (value.rh_sanguineo === true) AB1++;
              else AB0++;

            if (value.grupo_sanguineo === "O")
              if (value.rh_sanguineo === true) O1++;
              else O0++;

            return null;
          });

          setChartData([A1, A0, B1, B0, AB1, AB0, O1, O0]);
        }
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          history.push("/");
        } else {
          setMessage(
            "Não foi possível encontrar os doadores, contate os desenvolvedores ou tente novamente mais tarde!"
          );
          setError(true);
        }
      }
    })();

    (async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_SECRET_NAME}/v1/donation`,
          {
            headers: header,
          }
        );

        if (response) {
          setDonations(
            response.data.filter((value) => {
              if (value.status) return value;
              else return null;
            })
          );
        }
        setLoading(false);
      } catch (error) {
        setMessage(
          "Não foi possível encontrar as doações, contate os desenvolvedores ou tente novamente mais tarde!"
        );
        setError(true);
        setLoading(false);
      }
    })();
  }, [token, history]);

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
          typePage="generalS"
          title="Estatísticas"
          page="estatistica"
          loading={loading}
        />

        <div className={styles.statisticsContainer}>
          <div className={styles.chart}>
            <h2>Porcentagem por tipo sanguíneo</h2>
            <h3 className={donators.length < 1 ? styles.show : styles.hide}>
              Não há informações para mostrar!
            </h3>
            <div>
              <Pie
                width={350}
                height={350}
                data={{
                  labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
                  datasets: [
                    {
                      data: chartData,
                      backgroundColor: [
                        "#3E92CC",
                        "#547AA5",
                        "#ACEB98",
                        "#A480CF",
                        "#E03616",
                        "#D14081",
                        "#84DCC6",
                        "#FDE74C",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,

                  plugins: {
                    legend: {
                      display: donators.length < 1 ? false : true,
                      position: "top",
                      labels: {
                        color: "#000",
                        font: {
                          size: 15,
                          family: `"Nunito", sans-serif`,
                          weight: "bold",
                        },
                      },
                    },

                    tooltip: {
                      bodyFont: {
                        size: 20,
                        weight: "bold",
                        family: `"Nunito", sans-serif`,
                      },

                      footerFont: {
                        size: 18,
                        family: `"Nunito", sans-serif`,
                      },

                      callbacks: {
                        label: (context) => {
                          return "  " + context.label;
                        },

                        footer: (ttItem) => {
                          let sum = 0;
                          let dataArr = ttItem[0].dataset.data;
                          dataArr.map((data) => {
                            sum += Number(data);
                            return null;
                          });

                          let percentage =
                            ((ttItem[0].parsed * 100) / sum).toFixed(2) + "%";
                          return percentage;
                        },
                      },
                    },
                  },

                  layout: {
                    padding: 4,
                  },
                }}
              />
            </div>
          </div>

          <div className={styles.statistics}>
            <div className={styles.donators}>
              <h2>Doadores cadastrados</h2>

              <div className={styles.holder}>
                <Donator className={styles.donator} />
                <CountUp
                  end={donators.length}
                  duration={1}
                  className={styles.countUp}
                />
              </div>
            </div>

            <div className={styles.donations}>
              <h2>Doações realizadas</h2>

              <div className={styles.holder}>
                <Donation className={styles.donation} />
                <CountUp
                  end={donations.length}
                  duration={1}
                  className={styles.countUp}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Statistics);
