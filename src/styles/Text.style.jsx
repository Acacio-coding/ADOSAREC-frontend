import styled from "styled-components";

export const Title = styled.h1(
  ({ color }) => `
    color: ${color ? color : "hsl(0, 0%, 0%)"};
  `
);

export const CopyrightP = styled.p`
  color: hsl(0, 0%, 100%);
  font-size: 1.005em;
`;
