import React from "react";
import styled, { css } from "styled-components";

const In = styled.input`
  width: ${({ width }) => width || "auto"};
  padding: ${({ padding }) => padding || "0"};
  border-radius: ${({ radius }) => radius || "none"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  font-size: 1.05em;

  ${({ primary }) =>
    primary &&
    css`
      background: #fff;
      color: #000;
      border: solid 1.5px #670000;
    `}

  ${({ secondary }) =>
    secondary &&
    css`
      background: #cccccc99;
      color: #00000066;
    `}
`;

const Input = ({
  type,
  placeholder,
  width,
  padding,
  radius,
  shadow,
  primary,
  secondary,
}) => {
  return (
    <In
      type={type}
      placeholder={placeholder}
      width={width}
      padding={padding}
      radius={radius}
      shadow={shadow}
      primary={primary}
      secondary={secondary}
    ></In>
  );
};

export default Input;
