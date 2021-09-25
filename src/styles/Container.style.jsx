import styled from "styled-components";

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
`;

export const FlexContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: transparent;
`;

export const FlexCustomContainer = styled.div(
  ({
    width,
    height,
    margin,
    padding,
    direction,
    justify,
    align,
    shadow,
    radius,
    background,
  }) => `
    width: ${width};
    height: ${height};
    margin: ${margin ? margin : "none"}; 
    padding: ${padding ? padding : 0};
    display: flex;
    flex-direction: ${direction ? direction : "row"};
    justify-content: ${justify};
    align-items: ${align};
    box-shadow: ${shadow ? shadow : "none"};
    border-radius: ${radius ? radius : "none"};
    background: ${background};
  `
);
