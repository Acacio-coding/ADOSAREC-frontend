import styled from "styled-components";

export const Navlist = styled.ul(
  ({ margin }) => `
  margin: ${margin};
`
);

export const Navitem = styled.li(
  ({ borderTop, borderBottom }) => `
  border-top: ${borderTop};
  border-bottom: ${borderBottom};
  padding: 0.75em;
  color: hsl(0, 0%, 100%);

  & span {
    margin-left: 10px;
    font-size: 1.5em;
    font-weight: 300;
  }
`
);
