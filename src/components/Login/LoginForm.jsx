import React from "react";
import { motion } from "framer-motion";
import user from "../../img/user.png";
import password from "../../img/password.png";
import "../../styles/Login/LoginForm.css";

const LoginForm = () => {
  return (
    <>
      <form action="POST">
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

        <motion.input type="submit" value="Entrar" whileTap={{ scale: 1.5 }} />
      </form>
      <a href="#">Esqueceu sua senha?</a>
    </>
  );
};

export default LoginForm;
