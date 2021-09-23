import React from "react";
import Copyright from "./Copyright";
import logo from "../img/logo.png";
import user from "../img/user.png";
import password from "../img/password.png";
import "../styles/Login.css";

const Login = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-title">
          <h1>Login</h1>
        </div>
        <div className="login-content">
          <form action="">
            <div className="user-holder">
              <div className="user-icon">
                <img src={user} alt="Ícone de usuário" />
              </div>
              <input type="text" placeholder="Usuário" />
            </div>

            <div className="password-holder">
              <div className="password-icon">
                <img src={password} alt="Ícone de senha" />
              </div>
              <input type="text" placeholder="Senha" id="password" />
            </div>
            <input type="submit" value="Entrar" />
          </form>
          <a href="#">Esqueceu sua senha?</a>
        </div>
      </div>

      <div className="logo-container">
        <div className="logo-placer">
          <div className="logo-circle">
            <img src={logo} alt="Logo ADOSAREC" id="logo" />
          </div>
        </div>
        <div className="copyright-container">
          <Copyright />
        </div>
      </div>
    </>
  );
};

export default Login;
