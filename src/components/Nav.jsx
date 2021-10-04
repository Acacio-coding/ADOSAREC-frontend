import React from "react";
import { isMobile } from "react-device-detect";
import { NavLink } from "react-router-dom";
import { NavData } from "./NavData";
import styled from "styled-components";
import Div from "./Div";
import logo from "../img/logo.png";

const NavList = styled.ul`
  width: 100%;
`;

const NavItem = styled.li`
  &.link:hover {
    background: hsl(0, 100%, 11.96078431372549%);
  }

  &.link:focus {
    background: hsl(0, 100%, 11.96078431372549%);
  }

  &#active {
    background: hsl(0, 100%, 11.96078431372549%);
    border-left: solid 3px #fff;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
`;

const Nav = () => {
  if (!isMobile) {
    return (
      <Div height="93vh" flex direction="column" align="center">
        <StyledNavLink to="/estatisticas">
          <Div
            circle
            flex
            justify="center"
            background="#fff"
            margin="2vh 0 2.5vh"
          >
            <img
              src={logo}
              alt="Logo da ADOSAREC."
              width="auto"
              height="192px"
            />
          </Div>
        </StyledNavLink>
        <NavList>
          {NavData.map((val, key) => {
            return (
              <NavItem
                key={key}
                id={window.location.pathname === val.link ? "active" : ""}
                className="link"
              >
                <StyledNavLink to={val.link}>
                  <Div flex align="center" padding="1.25em 0 1.25em 1.25em">
                    {val.icon}
                    {val.title}
                  </Div>
                </StyledNavLink>
              </NavItem>
            );
          })}
        </NavList>
      </Div>
    );
  }

  return <></>;
};

export default Nav;
