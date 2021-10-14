import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import Button from "../../Components/Button";
import logo from "../../Assets/Images/logo.png";
import user from "../../Assets/Images/user.png";
import password from "../../Assets/Images/password.png";
import styles from "./Login.module.scss";
import Copyright from "../../Components/Copyright";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const handleSentData = async ({ user, password }) => {
    try {
      const response = await axios.get(
        `https://app-node-api-test.herokuapp.com/admin/${user}&${password}`
      );
      sessionStorage.setItem("token", JSON.stringify(response.data));
      history.push("/doadores");
    } catch (error) {
      console.log(error.response.status);
    }
  };

  return (
    <div className={styles.fullContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.topLogin}>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit(handleSentData)}>
          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              <img src={user} alt="Ícone de usuário" />
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="Usuário"
              {...register("user", { required: true })}
            />
          </div>

          <br />

          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              <img src={password} alt="Ícone de usuário" />
            </div>
            <input
              className={styles.input}
              type="password"
              placeholder="Senha"
              {...register("password", { required: true })}
            />
          </div>

          <br />

          <Button>Entrar</Button>
        </form>
      </div>
      <div className={styles.logoContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.imageCircle}>
            <img src={logo} alt="Logo ADOSAREC" />
          </div>
        </div>
        <div className={styles.copyRightContainer}>
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default Login;
