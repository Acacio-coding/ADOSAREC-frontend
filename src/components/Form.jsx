import React from "react";
import styled from "styled-components";

const Formulary = styled.form`
  width: ${({ width }) => width || "auto"};
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
`;

const Form = ({ width, margin, padding, children }) => {
  return (
    <Formulary width={width} padding={padding} margin={margin}>
      {children}
    </Formulary>
  );
};

export default Form;
