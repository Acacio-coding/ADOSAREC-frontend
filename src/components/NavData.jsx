import React from "react";
import { FaUser as DonatorsIcon } from "react-icons/fa";
import {
  RiPieChartFill as StatisticsIcon,
  RiHospitalFill as UnitiesIcon,
} from "react-icons/ri";
import { ImDroplet as DonationsIcon } from "react-icons/im";

export const NavData = [
  {
    title: "Estatísticas",
    icon: <StatisticsIcon style={{ marginRight: "1em", fontSize: "1.5em" }} />,
    link: "/estatisticas",
  },
  {
    title: "Doadores",
    icon: <DonatorsIcon style={{ marginRight: "1em", fontSize: "1.5em" }} />,
    link: "/doadores",
  },
  {
    title: "Doações",
    icon: <DonationsIcon style={{ marginRight: "1em", fontSize: "1.5em" }} />,
    link: "/doacoes",
  },
  {
    title: "Unidades",
    icon: <UnitiesIcon style={{ marginRight: "1em", fontSize: "1.5em" }} />,
    link: "/unidades",
  },
];
