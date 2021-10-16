import React from "react";
import { BsExclamationCircleFill as AttentionIcon } from "react-icons/bs";
import styles from "./Remove.module.scss";

const RemoveAnimation = ({
  remove,
  handleRemoveDonator,
  handleRemove,
  donatorNome,
  page,
  unityNome,
}) => {
  if (page === "unity")
    return (
      <div className={remove ? styles.show : styles.hide}>
        <div className={remove ? styles.showRemove : styles.hideRemove}>
          <div className={styles.removeMessageTop}>
            <AttentionIcon id={styles.attentionIcon} />
          </div>

          <div className={styles.removeMessageBottom}>
            <p>
              {`Você tem certeza que deseja remover a unidade 
                  ${unityNome}? Essa ação não poderá ser desfeita!`}
            </p>
            <div>
              <button onClick={handleRemoveDonator}>Remover</button>
              <button onClick={handleRemove}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className={remove ? styles.show : styles.hide}>
      <div className={remove ? styles.showRemove : styles.hideRemove}>
        <div className={styles.removeMessageTop}>
          <AttentionIcon id={styles.attentionIcon} />
        </div>

        <div className={styles.removeMessageBottom}>
          <p>
            {`Você tem certeza que deseja remover o doador 
                  ${donatorNome}? Essa ação não poderá ser desfeita!`}
          </p>
          <div>
            <button onClick={handleRemoveDonator}>Remover</button>
            <button onClick={handleRemove}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveAnimation;
