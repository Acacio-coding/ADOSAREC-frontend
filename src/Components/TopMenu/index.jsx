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
import { useForm } from "react-hook-form";

const TopMenu = ({
  page,
  typePage,
  title,
  placeholder,
  handleRemove,
  func,
}) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  if (typePage === "general")
    return (
      <div className={styles.fullContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1>

          <div className={styles.inputContainer}>
            <form onSubmit={handleSubmit(func)}>
              <input
                type="text"
                placeholder={placeholder}
                {...register("term")}
              />
              <button type="submit">
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.functionsContainer}>
          <Link to={`registrar_${page}`}>
            <AddIcon />
          </Link>
        </div>
      </div>
    );

  if (typePage === "generalD")
    return (
      <div className={styles.fullContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1>

          <div className={styles.inputContainer}>
            <form onSubmit={handleSubmit(func)}>
              <input
                type="text"
                placeholder={placeholder}
                {...register("term")}
              />
              <button type="submit">
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.functionsContainer}>
          <Link to={`registrar_${page}`} className={styles.paddedIcons}>
            <AddIcon />
          </Link>

          <Link to={`/editar_${page}`} className={styles.paddedIcons}>
            <EditIcon />
          </Link>

          <RemoveIcon id={styles.removeIcon} onClick={handleRemove} />
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
            <Link to={`/editar_${page}`} className={styles.paddedIcons}>
              <EditIcon />
            </Link>

            <RemoveIcon id={styles.removeIcon} onClick={handleRemove} />
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
