import { createGlobalStyle } from "styled-components";

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

export default Reset;
