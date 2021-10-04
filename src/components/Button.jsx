import React from "react";
import styled, { css } from "styled-components";

const Btn = styled.button`
  width: ${({ width }) => width || "auto"};
  padding: ${({ padding }) => padding || "0"};
  border-radius: ${({ radius }) => radius || "none"};
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: 100ms ease-in;

  ${({ background }) =>
    background &&
    css`
      border: solid 2px #670000;
      color: #fff;
      background: #670000;
      &:hover,
      &:focus {
        border: solid 2px #670000;
        color: #670000;
        background: #fff;
      }
    `}

  ${({ btnSearch }) =>
    btnSearch &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
      color: #fff;
      outline: none;
      border: none;
      transition: 100ms ease-in-out;

      &:hover,
      &:focus {
        background: none;
        color: #fff;
        outline: none;
        border: none;
        transform: scale(1.1);
      }
    `}
`;

const Button = ({
  width,
  padding,
  radius,
  background,
  btnSearch,
  children,
}) => {
  return (
    <Btn
      width={width}
      padding={padding}
      radius={radius}
      background={background}
      btnSearch={btnSearch}
    >
      {children}
    </Btn>
  );
};

export default Button;
