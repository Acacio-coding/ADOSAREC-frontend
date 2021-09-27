import React from "react";
import { AppContainer } from "./styles/Container.style";
import { createGlobalStyle } from "styled-components";
import Nav from "./components/Nav";

const Reset = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  border: none;
  list-style: none;
  box-sizing: border-box;
  font-family: "Nunito", sans-serif;
}

*:focus {
  outline: none;
}

input[type="submit"] {
  cursor: pointer;
}
`;

const App = () => {
  return (
    <AppContainer>
      <Reset />
      <Nav />
    </AppContainer>
  );
};

export default App;
