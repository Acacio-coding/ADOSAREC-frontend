import styled from "styled-components";

export const Form = styled.form(
  ({ width, padding }) => `
    width: ${width};
    padding: ${padding ? padding : 0};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
);

export const Input = styled.input(
  ({ width }) => `
    width: ${width};
    padding: 0.75em;
    padding-left: 1em;
    background: hsla(0, 0%, 80%, 0.6);
    font-size: 1.005em;
    border-radius: 0 5px 5px 0; 
  `
);

export const Submit = styled.input`
  width: 90px;
  padding: 0.5em;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  font-size: 1.005em;
  font-weight: bold;
  border: solid 2px hsl(0, 100%, 20%);
  border-radius: 5px;
  color: hsl(0, 0%, 100%);
  background: hsl(0, 100%, 20%);
  transition: 200ms ease-in-out;

  &:hover {
    background: hsl(0, 0%, 100%);
    color: hsl(0, 100%, 20%);
  }

  &:focus {
    background: hsl(0, 0%, 100%);
    color: hsl(0, 100%, 20%);
  }
`;
