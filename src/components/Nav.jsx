import React from "react";
import { isMobile } from "react-device-detect";
import { FlexCustomContainer } from "../styles/Container.style";
import { Navitem, Navlist } from "../styles/Nav.style";
import { FaUser as Donator } from "react-icons/fa";
import {
  RiPieChartFill as Statistics,
  RiHospitalFill as Association,
} from "react-icons/ri";
import { ImDroplet as Donation } from "react-icons/im";
import logo from "../img/logo.png";

const Nav = () => {
  if (!isMobile) {
    return (
      <>
        <FlexCustomContainer
          width={"20vw"}
          height={"100vh"}
          background={"hsl(0, 100%, 20%)"}
          align={"center"}
          direction={"column"}
        >
          <FlexCustomContainer
            background={"hsl(0, 0%, 100%)"}
            radius={"50%"}
            justify={"center"}
            align={"center"}
            padding={"0.5em"}
            margin={"3em 0"}
          >
            <img src={logo} alt="Logo da ADOSAREC." width={"200px"} />
          </FlexCustomContainer>
          <Navlist>
            <Navitem
              borderTop={"solid 0.5px hsl(0, 0%, 100%)"}
              borderBottom={"solid 0.75px hsl(0, 0%, 100%)"}
            >
              <Statistics />
              <span>Estatísticas</span>
            </Navitem>
            <Navitem borderBottom={"solid 0.75px hsl(0, 0%, 100%)"}>
              <Donator />
              <span>Doadores</span>
            </Navitem>
            <Navitem borderBottom={"solid 0.75px hsl(0, 0%, 100%)"}>
              <Donation />
              <span>Doações</span>
            </Navitem>
            <Navitem borderBottom={"solid 0.75px hsl(0, 0%, 100%)"}>
              <Association />
              <span>Associações</span>
            </Navitem>
          </Navlist>
        </FlexCustomContainer>
      </>
    );
  }
  return <></>;
};

export default Nav;
