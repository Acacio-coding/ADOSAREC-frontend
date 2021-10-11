import React, { createContext, useState, useEffect } from "react";

export const donatorContext = createContext();

const DonatorProvider = ({ children }) => {
  const [donatorRg, setDonatorRg] = useState();

  useEffect(() => {
    if (donatorRg) {
      sessionStorage.setItem("donatorRg", donatorRg);
    }
  }, [donatorRg]);

  return (
    <donatorContext.Provider value={{ donatorRg, setDonatorRg }}>
      {children}
    </donatorContext.Provider>
  );
};

export default DonatorProvider;
