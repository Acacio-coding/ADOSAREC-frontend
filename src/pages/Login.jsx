import React from "react";
import { isMobile } from "react-device-detect";
import Form from "../components/Form";
import Div from "../components/Div";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import logo from "../img/logo.png";
import user from "../img/user.png";
import password from "../img/password.png";
import Text from "../components/Text";

const Login = () => {
  if (!isMobile) {
    return (
      <Div container>
        <Div
          width="40vw"
          height="100vh"
          flex
          direction="column"
          justify="center"
          align="center"
          secondary
        >
          <Div
            width="320px"
            height="100px"
            flex
            justify="center"
            align="center"
            radius="5px 5px 0 0"
            primary
          >
            <Title weight="300">Login</Title>
          </Div>
          <Div
            width="320px"
            height="330px"
            flex
            direction="column"
            justify="center"
            align="center"
            radius="0 0 5px 5px"
            shadow="0 4px 4px #0000003f"
            secondary
          >
            <Form width="100%">
              <Div flex justify="center">
                <Div
                  padding="0.4em 0.5em"
                  flex
                  justify="center"
                  align="center"
                  radius="5px 0 0 5px"
                  primary
                >
                  <img
                    src={user}
                    alt="Ícone de usuário."
                    width="32px"
                    height="32px"
                  />
                </Div>
                <Input
                  type="text"
                  placeholder="Usuário"
                  width="200px"
                  padding="0.65em"
                  radius="0 5px 5px 0"
                  secondary
                />
              </Div>
              <br />

              <Div flex justify="center">
                <Div
                  padding="0.4em 0.5em"
                  flex
                  justify="center"
                  align="center"
                  radius="5px 0 0 5px"
                  primary
                >
                  <img
                    src={password}
                    alt="Ícone de senha."
                    width="32px"
                    height="32px"
                  />
                </Div>
                <Input
                  type="text"
                  placeholder="Senha"
                  width="200px"
                  padding="0.65em"
                  radius="0 5px 5px 0"
                  secondary
                />
              </Div>
              <br />
              <Div flex justify="center">
                <Button width="6em" padding="0.6em 0" radius="5px" background>
                  Entrar
                </Button>
              </Div>
            </Form>
          </Div>
        </Div>

        <Div
          width="60vw"
          height="100vh"
          flex
          direction="column"
          justify="center"
          align="center"
          primary
        >
          <Div width="100%" height="90vh" flex justify="center" align="center">
            <Div flex justify="center" align="center" circle secondary>
              <img src={logo} alt="Logo da ADOSAREC." width={"300px"} />
            </Div>
          </Div>

          <Div width="100%" height="10vh" flex justify="center" align="center">
            <Text copyright />
          </Div>
        </Div>
      </Div>
    );
  }

  /* ================================= Mobile */
  return (
    <>
      <Div
        width="100vw"
        height="90vh"
        flex
        align="center"
        direction="column"
        secondary
      >
        <Div margin="30px 0 50px 0" flex justify="center" align="center">
          <img src={logo} alt="Logo da ADOSAREC." width={"200px"} />
        </Div>
        <Div
          width="320px"
          flex
          direction="column"
          justify="center"
          align="center"
          secondary
        >
          <Form width="100%">
            <Div flex justify="center">
              <Div
                padding="0.4em 0.5em"
                flex
                justify="center"
                align="center"
                radius="5px 0 0 5px"
                primary
              >
                <img
                  src={user}
                  alt="Ícone de usuário."
                  width="32px"
                  height="32px"
                />
              </Div>
              <Input
                type="text"
                placeholder="Usuário"
                width="200px"
                padding="0.65em"
                radius="0 5px 5px 0"
                secondary
              />
            </Div>
            <br />

            <Div flex justify="center">
              <Div
                padding="0.4em 0.5em"
                flex
                justify="center"
                align="center"
                radius="5px 0 0 5px"
                primary
              >
                <img
                  src={password}
                  alt="Ícone de senha."
                  width="32px"
                  height="32px"
                />
              </Div>
              <Input
                type="text"
                placeholder="Senha"
                width="200px"
                padding="0.65em"
                radius="0 5px 5px 0"
                secondary
              />
            </Div>
            <br />
            <Div flex justify="center">
              <Button width="6em" padding="0.6em 0" radius="5px" background>
                Entrar
              </Button>
            </Div>
          </Form>
        </Div>
      </Div>
      <Div
        width="100vw"
        height="10vh"
        flex
        justify="center"
        align="center"
        primary
      >
        <Text copyright />
      </Div>
    </>
  );
};

export default Login;
