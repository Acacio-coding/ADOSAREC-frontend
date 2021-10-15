import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import Button from "../../Components/Button";
import logo from "../../Assets/Images/logo.png";
import user from "../../Assets/Images/user.png";
import password from "../../Assets/Images/password.png";
import styles from "./Login.module.scss";
import Copyright from "../../Components/Copyright";
import LoadingAnimation from "../../Components/Animation/Loading";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSentData = async ({ user, password }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://app-node-api-test.herokuapp.com/admin/${user}&${password}`
      );

      if (response) {
        sessionStorage.setItem("token", JSON.stringify(response.data));
        setLoading(false);
        history.push("/doadores");
      }
    } catch (error) {
      console.log(error.response.status);
      setLoading(false);
    }
  };

  return (
    <div className={styles.fullContainer}>
      <LoadingAnimation loading={loading} />
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
