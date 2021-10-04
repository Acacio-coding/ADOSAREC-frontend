import React from "react";
import { isMobile } from "react-device-detect";
import Div from "../components/Div";
import Nav from "../components/Nav";
import Text from "../components/Text";
import TopMenu from "../components/TopMenu";

const Donations = () => {
  if (!isMobile) {
    return (
      <>
        <Div container>
          <Div width="20vw" height="100vh" primary>
            <Nav />
            <Div
              width="100%"
              height="7vh"
              flex
              justify="center"
              align="center"
              borderT="solid 1px #fff"
            >
              <Text copyright />
            </Div>
          </Div>

          <Div
            width="80vw"
            height="100vh"
            flex
            direction="column"
            align="center"
            secondary
          >
            <TopMenu
              titleChildren="Doações"
              placeholderText="Pesquisar doação"
            />
          </Div>
        </Div>
      </>
    );
  }
  return <></>;
};

export default Donations;
