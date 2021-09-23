import React from "react";
import logo from "../img/logo.png";
import "../styles/Login.css";

const Login = () => {
  return (
    <>
      <div className="loginContainer">
        <div className="loginSquare">
          <div className="loginSquareTop">
            <h1>Login</h1>
          </div>
          <div className="form">
            <form action="">
              <div>
                <input type="text" placeholder="Usuário" id="user" />
              </div>

              <input type="text" placeholder="Senha" id="password" />
              <br />
              <input type="submit" value="Entrar" id="login" />
            </form>
          </div>

          <a id="forgotPassword">Esqueceu a senha?</a>
        </div>
      </div>

      <div className="logoContainer">
        <div className="logoCircle">
          <img src={logo} alt="Logo ADOSAREC" id="logo" />
        </div>
        <p>© ADOSAREC</p>
      </div>
    </>
  );
};

export default Login;
