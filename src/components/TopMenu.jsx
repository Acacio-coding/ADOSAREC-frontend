import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import H1 from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import Div from "../components/Div";
import { FaSearch as Search, FaTrash as Remove } from "react-icons/fa";
import { AiFillPlusCircle as Add } from "react-icons/ai";
import { MdModeEditOutline as Edit } from "react-icons/md";
import { isMobile } from "react-device-detect";

const StyledNavLink = styled(NavLink)`
  color: #670000;
  text-decoration: none;
  font-size: 1.2em;
  transition: 100ms ease-in-out;
  margin: ${({ margin }) => margin || "none"};

  &:hover {
    color: #3b0000;
  }
`;

const TopMenu = ({ titleChildren, placeholderText }) => {
  if (!isMobile) {
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
          <form action="">
            <Div padding="0 0 0.5em 0" flex>
              <Input
                type="text"
                placeholder={placeholderText}
                padding="0.5em 0 0.5em 1em"
                radius="5px 0 0 5px"
                shadow="0 4px 4px hsla(0, 0%, 0%, 0.25)"
              />
              <Div
                width="45px"
                height="39.5px"
                flex
                justify="center"
                align="center"
                radius="0 5px 5px 0"
                shadow="0 4px 4px hsla(0, 0%, 0%, 0.25)"
                primary
              >
                <Button btnSearch type="submit">
                  <Search style={{ fontSize: "1.4em" }} />
                </Button>
              </Div>
            </Div>
          </form>
        </Div>

        <Div
          width="90%"
          height="7%"
          borderB="solid 1px hsla(0, 0%, 0%, 0.4)"
          flex
          justify="flex-end"
        >
          <Div width="20%" height="100%" flex justify="flex-end" align="center">
            <StyledNavLink to="/cadastrar_doador">
              <Div height="100%" flex align="center">
                <Add style={{ fontSize: "2em" }} />
              </Div>
            </StyledNavLink>

            <StyledNavLink to="/editar_doador" margin="0 0 0 50px">
              <Div height="100%" flex align="center">
                <Edit style={{ fontSize: "2em" }} />
              </Div>
            </StyledNavLink>

            <StyledNavLink to="/remover_doador" margin="0 0 0 50px">
              <Div height="100%" flex align="center">
                <Remove style={{ fontSize: "1.7em" }} />
              </Div>
            </StyledNavLink>
          </Div>
        </Div>
      </>
    );
  }
  return <></>;
};

export default TopMenu;
