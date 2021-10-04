import React from "react";
import styled, { css } from "styled-components";

const StyledText = styled.p`
  color: #fff;
  font-size: 1em;

  ${({ copyright }) =>
    copyright &&
    css`
      color: #fff;
      font-size: 1.1em;
    `}

  ${({ statistics }) =>
    statistics &&
    css`
      color: #000;
      font-size: 1.1em;
      font-weight: 600;

      &:hover,
      &:focus {
        color: #3b0000;
      }
    `}
`;

const Text = ({ copyright, statistics, children }) => {
  if (copyright) {
    const date = new Date();
    return <StyledText copyright>© {date.getFullYear()} - ADOSAREC</StyledText>;
  }

  if (statistics) {
    return <StyledText statistics>{children}</StyledText>;
  }
};

export default Text;
