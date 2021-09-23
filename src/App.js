import React from "react";
import { isMobile } from "react-device-detect";
import LoginDesktop from "./components/Login/LoginDesktop";
import LoginMobile from "./components/Login/LoginMobile";
import "./styles/App.css";

const App = () => {
  if (isMobile) {
    return (
      <div className="App">
        <LoginMobile />
      </div>
    );
  }
  return (
    <div className="App">
      <LoginDesktop />
    </div>
  );
};

export default App;
