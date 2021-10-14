import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { FaSearch as SearchIcon } from "react-icons/fa";
import { RiPencilFill as EditIcon } from "react-icons/ri";
import {
  MdAddCircle as AddIcon,
  MdKeyboardBackspace as GoBack,
} from "react-icons/md";
import { IoMdTrash as RemoveIcon } from "react-icons/io";
import styles from "./TopMenu.module.scss";

const TopMenu = ({ page, typePage, title, placeholder }) => {
  const history = useHistory();

  if (typePage === "general")
    return (
      <div className={styles.fullContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1>

          <div className={styles.inputContainer}>
            <input type="text" placeholder={placeholder} />
            <button type="submit">
              <SearchIcon />
            </button>
          </div>
        </div>

        <div className={styles.functionsContainer}>
          <Link to={`registrar_${page}`}>
            <AddIcon />
          </Link>
        </div>
      </div>
    );

  if (typePage === "details")
    return (
      <div className={styles.fullContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1>
        </div>

        <div className={styles.functionsContainerDetails}>
          <button onClick={() => history.goBack()}>
            <GoBack />
          </button>

          <div className={styles.iconsContainer}>
            <Link to={`/editar_${page}`} id={styles.paddedIcons}>
              <EditIcon />
            </Link>

            <Link to={`remover_${page}`}>
              <RemoveIcon />
            </Link>
          </div>
        </div>
      </div>
    );

  if (typePage === "register" || typePage === "edit")
    return (
      <div className={styles.fullContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1>
        </div>

        <div className={styles.functionsContainerRegister}>
          <button onClick={() => history.goBack()}>
            <GoBack />
          </button>
        </div>
      </div>
    );
};

export default TopMenu;
