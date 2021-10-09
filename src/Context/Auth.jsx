import React, { createContext, useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const history = useHistory();

  //Armazenar token
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      history.push("/estatisticas");
    }
  }, [token, history]);

  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <authContext.Provider value={{ token, setToken, handleLogout }}>
      {children}
    </authContext.Provider>
  );
};

export default withRouter(AuthProvider);
