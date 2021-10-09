import React, { useContext } from "react";
import { authContext } from "../../Context/Auth";
import { NavLink } from "react-router-dom";
import { NavData } from "./NavData";
import Copyright from "../Copyright/Copyright";
import logo from "../../img/logo.png";
import styles from "./Nav.module.scss";

const Nav = () => {
  const { handleLogout } = useContext(authContext);

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.imgContainer}>
          <div>
            <img src={logo} alt="Logo ADOSAREC" />
          </div>
        </div>
        <ul className={styles.navList}>
          {NavData.map((item, index) => {
            return (
              <li key={index} className={styles.navItem}>
                <NavLink to={item.path} activeClassName={styles.activeLink}>
                  {item.icon}
                  <span id={styles.ic}>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.buttonContainer}>
        <button onClick={handleLogout}>Sair</button>
      </div>

      <div className={styles.copyrightContainer}>
        <Copyright />
      </div>
    </div>
  );
};

export default Nav;
