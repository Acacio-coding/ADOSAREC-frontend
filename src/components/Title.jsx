import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-weight: ${({ weight }) => weight || "regular"};
`;

const H1 = ({ children, weight }) => {
  return <Title weight={weight}>{children}</Title>;
};

export default H1;
