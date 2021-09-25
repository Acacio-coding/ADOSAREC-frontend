import React from "react";
import { CopyrightP } from "../styles/Text.style";

const Copyright = () => {
  const date = new Date();
  return <CopyrightP>© {date.getFullYear()} - ADOSAREC</CopyrightP>;
};

export default Copyright;
