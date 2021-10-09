import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Copyright from "../Copyright/Copyright";
import logo from "../../img/logo.png";
import userImg from "../../img/user.png";
import passwordImg from "../../img/password.png";
import styles from "./Login.module.scss";
import { authContext } from "../../Context/Auth";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { setToken } = useContext(authContext);

  const handleData = async ({ usuario, senha }) => {
    const response = await fetch(
      `https://app-node-api-test.herokuapp.com/admin/${usuario}&${senha}`
    );

    const data = await response.json();

    if (response.status === 200) {
      setToken(JSON.stringify(data));
    } else {
      alert(
        `ERRO! Usuário desconhecido, verifique os dados informados e tente novamente!`
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.topDiv}>
          <h1>Login</h1>
        </div>
        <div className={styles.bottomDiv}>
          <form onSubmit={handleSubmit(handleData)}>
            <div className={styles.inputContainer}>
              <div className={styles.iconContainer}>
                <img src={userImg} alt="Ícone de usuário" />
              </div>
              <input
                type="text"
                placeholder="Usuário"
                {...register("usuario", { required: true })}
              />
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.iconContainer}>
                <img src={passwordImg} alt="Ícone de usuário" />
              </div>
              <input
                type="password"
                placeholder="Senha"
                {...register("senha", { required: true })}
              />
            </div>

            <input type="submit" value="Entrar" />
          </form>
        </div>
      </div>
      <div className={styles.logoContainer}>
        <div className={styles.logoPlacer}>
          <div className={styles.logoBackground}>
            <img src={logo} alt="Logo ADOSAREC" />
          </div>
        </div>

        <div className={styles.copyrightContainer}>
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default Login;
