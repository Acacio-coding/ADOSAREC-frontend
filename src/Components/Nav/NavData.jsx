import React from "react";
import { AiOutlineBarChart as Chart } from "react-icons/ai";
import { HiUser as Donator } from "react-icons/hi";
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
