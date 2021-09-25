import React from "react";
import Copyright from "../components/Copyright";
import { isMobile } from "react-device-detect";
import { FlexContainer, FlexCustomContainer } from "../styles/Container.style";
import { Form, Input, Submit } from "../styles/Form.style";
import { Title } from "../styles/Text.style";
import logo from "../img/logo.png";
import user from "../img/user.png";
import password from "../img/password.png";

const Login = () => {
  if (!isMobile) {
    return (
      <>
        <FlexContainer>
          <FlexCustomContainer
            width={"40vw"}
            height={"100vh"}
            direction={"column"}
            justify={"center"}
            align={"center"}
          >
            <FlexCustomContainer
              width={"320px"}
              height={"100px"}
              justify={"center"}
              align={"center"}
              radius={"5px 5px 0 0"}
              background={"hsl(0, 100%, 20%)"}
            >
              <Title color={"hsl(0, 0%, 100%)"}>Login</Title>
            </FlexCustomContainer>

            <FlexCustomContainer
              width={"320px"}
              height={"330px"}
              direction={"column"}
              justify={"center"}
              align={"center"}
              shadow={"0px 4px 4px hsla(0, 0%, 0%, 0.25)"}
              radius={"0 0 5px 5px"}
            >
              <Form action="POST" width={"100%"}>
                <FlexCustomContainer>
                  <FlexCustomContainer
                    padding={"0.25em 0.5em"}
                    justify={"center"}
                    align={"center"}
                    radius={"5px 0 0 5px"}
                    background={"hsl(0, 100%, 20%)"}
                  >
                    <img
                      src={user}
                      alt="Ícone de usuário."
                      width="32px"
                      height="32px"
                    />
                  </FlexCustomContainer>
                  <Input type="text" placeholder="Usuário" width={"200px"} />
                </FlexCustomContainer>
                <br />
                <FlexCustomContainer>
                  <FlexCustomContainer
                    padding={"0.25em 0.5em"}
                    justify={"center"}
                    align={"center"}
                    radius={"5px 0 0 5px"}
                    background={"hsl(0, 100%, 20%)"}
                  >
                    <img
                      src={password}
                      alt="Ícone de senha."
                      width="32px"
                      height="32px"
                    />
                  </FlexCustomContainer>
                  <Input type="text" placeholder="Senha" width={"200px"} />
                </FlexCustomContainer>
                <br />
                <Submit type="submit" value="Entrar" />
              </Form>
            </FlexCustomContainer>
          </FlexCustomContainer>

          <FlexCustomContainer
            width={"60vw"}
            height={"100vh"}
            justify={"center"}
            align={"center"}
            direction={"column"}
            background={"hsl(0, 100%, 20%)"}
          >
            <FlexCustomContainer
              width={"100%"}
              height={"95vh"}
              direction={"column"}
              justify={"center"}
              align={"center"}
            >
              <FlexCustomContainer
                justify={"center"}
                align={"center"}
                radius={"50%"}
                padding={"1em"}
                background={"hsl(0, 0%, 100%)"}
              >
                <img src={logo} alt="Logo da ADOSAREC." width={"300px"} />
              </FlexCustomContainer>
            </FlexCustomContainer>

            <FlexCustomContainer
              height={"5vh"}
              justify={"center"}
              align={"center"}
            >
              <Copyright />
            </FlexCustomContainer>
          </FlexCustomContainer>
        </FlexContainer>
      </>
    );
  }
  return (
    <>
      <FlexCustomContainer
        width={"100vw"}
        height={"92vh"}
        direction={"column"}
        justify={"center"}
        align={"center"}
      >
        <img src={logo} alt="Logo da ADOSAREC." width="182px" height="180px" />
        <FlexCustomContainer
          width={"320px"}
          height={"330px"}
          direction={"column"}
          justify={"center"}
          align={"center"}
          radius={"0 0 5px 5px"}
        >
          <Form action="POST" width={"100%"}>
            <FlexCustomContainer>
              <FlexCustomContainer
                padding={"0.25em 0.5em"}
                justify={"center"}
                align={"center"}
                radius={"5px 0 0 5px"}
                background={"hsl(0, 100%, 20%)"}
              >
                <img
                  src={user}
                  alt="Ícone de usuário."
                  width="32px"
                  height="32px"
                />
              </FlexCustomContainer>
              <Input type="text" placeholder="Usuário" width={"200px"} />
            </FlexCustomContainer>
            <br />
            <FlexCustomContainer>
              <FlexCustomContainer
                padding={"0.25em 0.5em"}
                justify={"center"}
                align={"center"}
                radius={"5px 0 0 5px"}
                background={"hsl(0, 100%, 20%)"}
              >
                <img
                  src={password}
                  alt="Ícone de senha."
                  width="32px"
                  height="32px"
                />
              </FlexCustomContainer>
              <Input type="text" placeholder="Senha" width={"200px"} />
            </FlexCustomContainer>
            <br />
            <Submit type="submit" value="Entrar" />
          </Form>
        </FlexCustomContainer>
      </FlexCustomContainer>
      <FlexCustomContainer
        height={"8vh"}
        justify={"center"}
        align={"center"}
        background={"hsl(0, 100%, 20%)"}
      >
        <Copyright />
      </FlexCustomContainer>
    </>
  );
};

export default Login;
