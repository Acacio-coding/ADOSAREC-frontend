import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
  border-top: ${({ borderT }) => borderT || "none"};
  border-bottom: ${({ borderB }) => borderB || "none"};
  border-radius: ${({ radius }) => radius || "none"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  background: ${({ background }) => background || "invisible"};

  ${({ container }) =>
    container &&
    css`
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: ${({ direction }) => direction || "row"};
      justify-content: ${({ justify }) => justify || "flex-start"};
      align-items: ${({ align }) => align || "flex-start"};
    `}
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: ${({ direction }) => direction || "row"};
      justify-content: ${({ justify }) => justify || "flex-start"};
      align-items: ${({ align }) => align || "flex-start"};
    `}
    ${({ primary }) =>
    primary &&
    css`
      background: #670000;
      color: #fff;
    `}
    ${({ secondary }) =>
    secondary &&
    css`
      background: #fff;
      color: #000;
    `}
    ${({ circle }) =>
    circle &&
    css`
      border-radius: 50%;
      padding: 0.5em;
    `};
`;

const Div = ({
  width,
  height,
  margin,
  padding,
  borderT,
  borderB,
  radius,
  shadow,
  container,
  flex,
  direction,
  justify,
  align,
  circle,
  primary,
  secondary,
  background,
  children,
}) => {
  return (
    <Container
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      borderT={borderT}
      borderB={borderB}
      radius={radius}
      shadow={shadow}
      container={container}
      flex={flex}
      direction={direction}
      justify={justify}
      align={align}
      circle={circle}
      primary={primary}
      secondary={secondary}
      background={background}
    >
      {children}
    </Container>
  );
};

export default Div;
