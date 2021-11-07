import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useHistory } from "react-router";

import { FaSearch as SearchIcon } from "react-icons/fa";
import { RiPencilFill as EditIcon } from "react-icons/ri";
import {
  MdAddCircle as AddIcon,
  MdKeyboardBackspace as GoBack,
} from "react-icons/md";
import { IoMdTrash as RemoveIcon } from "react-icons/io";
import { MdRestorePage as ActiveIcon } from "react-icons/md";
import styles from "./TopMenu.module.scss";
import { useForm } from "react-hook-form";

const TopMenu = ({
  page,
  typePage,
  title,
  placeholder,
  handleRemove,
  func,
  filter,
  setFilter,
  loading,
}) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const style = {
    control: (provided) => ({
      ...provided,
      border: "none",
      width: "12em",
      borderRadius: "5px",
      marginRight: "20px",
      padding: "0",
      boxShadow: "0 4px 8px hsla(0, 0%, 0%, 0.2)",
      backgroundColor: loading ? "background: hsla(0, 0%, 0%, 0.7)" : "#fff",
      transition: "0ms",
    }),

    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: loading ? "#360000" : "#670000",
      transition: "0ms",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#650000" : "#fff",
      "&:hover": {
        backgroundColor: state.isSelected ? "#650000" : "#0000001d",
      },
    }),

    menu: (provided) => ({
      ...provided,
      width: "12em",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: loading ? "#360000" : "#670000",
      transition: "0ms",
    }),
  };

  if (typePage === "general")
    return (
      <div className={styles.fullContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1>

          <div className={styles.inputContainer}>
            <Select
              options={[
                { value: "Active", label: "Ativos" },
                { value: "Inactive", label: "Inativos" },
              ]}
              styles={style}
              onChange={setFilter}
              value={filter}
              required
            />

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
            <Select
              options={[
                { value: "Active", label: "Ativos" },
                { value: "Inactive", label: "Inativos" },
              ]}
              styles={style}
              onChange={setFilter}
              value={filter}
              required
            />

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

          <ActiveIcon
            id={styles.activeIcon}
            className={
              filter && filter.value === "Inactive" ? styles.show : styles.hide
            }
            onClick={func}
          />

          <div
            className={
              (styles.iconsContainer,
              filter && filter.value === "Inactive" ? styles.hide : styles.show)
            }
          >
            <Link to={`/editar_${page}`}>
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
