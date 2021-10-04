import React from "react";
import Div from "./Div";
import H1 from "./Title";
import Text from "./Text";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BsChevronDoubleRight as Right } from "react-icons/bs";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.3em;
  transition: 100ms ease-in-out;
  margin: ${({ margin }) => margin || "none"};

  &:hover {
    color: #3b0000;
  }
`;

const TopMenuStatistics = ({ titleChildren }) => {
  return (
    <>
      <Div
        width="90%"
        height="20%"
        padding="0 0 1em 0"
        flex
        justify="space-between"
        align="flex-end"
        borderB="solid 1px hsla(0, 0%, 0%, 0.4)"
      >
        <H1 weight="bold">{titleChildren}</H1>
      </Div>

      <Div
        width="90%"
        height="7%"
        flex
        align="center"
        borderB="solid 1px hsla(0, 0%, 0%, 0.4)"
      >
        <StyledNavLink to="/geral">
          <Div flex align="center">
            <Text
              statistics
              children="Geral"
              style={
                window.location.pathname === "/geral"
                  ? { color: "#3b0000" }
                  : { color: "#000" }
              }
            />
            <Right
              style={{
                color: "#670000",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
          </Div>
        </StyledNavLink>

        <StyledNavLink to="/por_ano">
          <Div flex align="center">
            <Text
              statistics
              children="Por ano"
              style={
                window.location.pathname === "/por_ano"
                  ? { color: "#3b0000" }
                  : { color: "#000" }
              }
            />
            <Right
              style={{
                color: "#670000",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
          </Div>
        </StyledNavLink>

        <StyledNavLink to="/por_mes">
          <Div flex align="center">
            <Text
              statistics
              children="Por mês"
              style={
                window.location.pathname === "/por_mes"
                  ? { color: "#3b0000" }
                  : { color: "#000" }
              }
            />
            <Right
              style={{
                color: "#670000",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
          </Div>
        </StyledNavLink>

        <StyledNavLink to="/por_semana">
          <Div flex align="center">
            <Text
              statistics
              children="Por semana"
              style={
                window.location.pathname === "/por_semana"
                  ? { color: "#3b0000" }
                  : { color: "#000" }
              }
            />
            <Right
              style={{
                color: "#670000",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
          </Div>
        </StyledNavLink>

        <StyledNavLink to="/hoje">
          <Div flex align="center">
            <Text
              statistics
              children="Hoje"
              style={
                window.location.pathname === "/hoje"
                  ? { color: "#3b0000" }
                  : { color: "#000" }
              }
            />
          </Div>
        </StyledNavLink>
      </Div>
    </>
  );
};

export default TopMenuStatistics;
