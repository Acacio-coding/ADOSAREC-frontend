import React from "react";
import Lottie from "lottie-react";
import animationData from "./loading.json";
import styles from "./Loading.module.scss";

const LoadingAnimation = ({ loading }) => {
  const options = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <div className={loading ? styles.show : styles.hide}>
      <div>
        <Lottie options={options} animationData={animationData} />
      </div>
    </div>
  );
};

export default LoadingAnimation;
