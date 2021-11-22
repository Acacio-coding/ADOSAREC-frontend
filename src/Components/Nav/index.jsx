import React from "react";

import { NavLink } from "react-router-dom";
import { NavData } from "./NavData";
import { RiLogoutBoxLine as Logout } from "react-icons/ri";
import Copyright from "../Copyright";
import logo from "../../Assets/Images/logo.png";
import styles from "./Nav.module.scss";

const Nav = () => {
  const removeToken = () => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
  };

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
          <li className={styles.navItem}>
            <NavLink
              exact
              to="/"
              activeClassName={styles.activeLink}
              onClick={removeToken}
            >
              <Logout />
              <span id={styles.ic}>Sair</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.copyrightContainer}>
        <Copyright />
      </div>
    </div>
  );
};

export default Nav;
