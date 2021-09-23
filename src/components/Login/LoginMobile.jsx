import React from "react";
import LoginForm from "./LoginForm";
import Copyright from "../Copyright";
import logo from "../../img/logo.png";
import "../../styles/Login/LoginMobile.css";

const LoginMobile = () => {
  return (
    <>
      <div className="mobile-container">
        <div className="loginM-container">
          <div className="loginM-title">
            <img src={logo} alt="Logo ADOSAREC." />
          </div>
          <div className="loginM-content">
            <LoginForm />
          </div>
        </div>

        <div className="copyrightM-container">
          <Copyright />
        </div>
      </div>
    </>
  );
};

export default LoginMobile;
