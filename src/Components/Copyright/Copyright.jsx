import React from "react";

const Copyright = () => {
  const date = new Date();
  return (
    <>
      <h3 style={{ color: "#fff", fontSize: "1em", fontWeight: "600" }}>
        © {date.getFullYear()} - ADOSAREC
      </h3>
    </>
  );
};

export default Copyright;
