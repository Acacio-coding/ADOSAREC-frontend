import React from "react";
import { useHistory } from "react-router";
import { FaSearch as SearchIcon } from "react-icons/fa";
import {
  RiPencilFill as EditIcon,
  RiArrowGoBackFill as GoBack,
} from "react-icons/ri";
import { MdAddCircle as AddIcon } from "react-icons/md";
import { BsFillTrashFill as RemoveIcon } from "react-icons/bs";
import styles from "./TopMenu.module.scss";
import { NavLink } from "react-router-dom";

const TopMenu = ({ title, page, typePage, placeholder }) => {
  const history = useHistory();

  if (typePage === "general") {
    return (
      <div className={styles.menuContainer}>
        <div className={styles.buttonsContainer}></div>

        <div className={styles.topContainer}>
          <div className={styles.topPlacer}>
            <h1>{title}</h1>

            <div className={styles.inputContainer}>
              <input type="text" placeholder={placeholder} />
              <div className={styles.searchContainer}>
                <button type="submit">
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.optionsContainer}>
          <div className={styles.optionsPlacer}>
            <NavLink to={`${page}_registrar`} className={styles.paddedIcons}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <AddIcon />
              </div>
            </NavLink>

            <NavLink to={`${page}_editar`} className={styles.paddedIcons}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <EditIcon />
              </div>
            </NavLink>

            <NavLink to={`${page}_remover`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RemoveIcon />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  if (typePage === "register" || typePage === "edit") {
    return (
      <div className={styles.menuContainer}>
        <div className={styles.buttonsContainer}></div>

        <div className={styles.topContainer}>
          <div className={styles.topPlacer}>
            <h1 id={styles.textRegister}>{title}</h1>
          </div>
        </div>

        <div className={styles.optionsContainer}>
          <div className={styles.optionsPlacerRegister}>
            <button onClick={() => history.goBack()}>
              <GoBack />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default TopMenu;
