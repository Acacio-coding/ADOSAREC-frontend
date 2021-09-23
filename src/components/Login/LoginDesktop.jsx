import React from "react";
import LoginForm from "./LoginForm";
import Copyright from "../Copyright";
import logo from "../../img/logo.png";
import "../../styles/Login/LoginDesktop.css";

const LoginDesktop = () => {
  return (
    <>
      <div className="loginD-container">
        <div className="loginD-title">
          <h1>Login</h1>
        </div>

        <div className="loginD-content">
          <LoginForm />
        </div>
      </div>

      <div className="logoD-container">
        <div className="logoD-placer">
          <div className="logoD-circle">
            <img src={logo} alt="Logo ADOSAREC" id="logo" />
          </div>
        </div>
        <div className="copyrightD-placer">
          <Copyright />
        </div>
      </div>
    </>
  );
};

export default LoginDesktop;
