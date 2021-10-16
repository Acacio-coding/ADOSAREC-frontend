import React from "react";


import {
    BsFillInfoCircleFill as InfoIcon
  } from "react-icons/bs";

import Nav from "../../../Components/Nav";
import TopMenu from "../../../Components/TopMenu";
import styles from "./Register.module.scss";

const RegisterU = () => {
    
  return (
    <div className={styles.fullContainer}>
        <Nav />
        <div className={styles.contentContainer}>
            <TopMenu typePage="register" title="Cadastrar Unidades Coletoras" />

            <div className={styles.formContainer}>
                <form >
                    <div className={styles.subTitleContainer}>
                        <div className={styles.iconContainer}>
                            <InfoIcon style={{fontSize: "31px"}} />
                        </div>
                        <span>Informações básicas</span>
                    </div>

                    <br />
                    <label htmlFor="name">Nome</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        required={true}
                        
                    />
                    <br />
                    <br />

                    <label htmlFor="cidade">Cidade</label> 
                    <br />
                    <input 
                        type="text"
                        id="cidade"
                        
                    />
                    <br />
                    <br />
                    <br />

                    <div className={styles.buttonContainer}>
                        <input type="submit" value="Cadastrar" />
                    </div>              
                </form>
            </div>
        </div>
    </div>
  );
};
export default RegisterU;
