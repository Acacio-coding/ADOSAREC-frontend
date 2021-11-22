import React from "react";
import { RiPieChartFill as Chart } from "react-icons/ri";
import { FaUser as Donator } from "react-icons/fa";
import { ImDroplet as Donation } from "react-icons/im";
import { FaHospitalSymbol as Unidades } from "react-icons/fa";

export const NavData = [
  {
    title: "Estatísticas",
    path: "/estatisticas",
    icon: <Chart />,
  },
  {
    title: "Doadores",
    path: "/doadores",
    icon: <Donator />,
  },
  {
    title: "Doações",
    path: "/doacoes",
    icon: <Donation />,
  },
  {
    title: "Unidades",
    path: "/unidades",
    icon: <Unidades />,
  },
];
