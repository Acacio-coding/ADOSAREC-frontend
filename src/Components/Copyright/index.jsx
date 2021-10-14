import React from "react";

const Copyright = () => {
  const date = new Date();
  return (
    <>
      <h4 style={{ color: "#fff", fontWeight: "600" }}>
        © {date.getFullYear()} - ADOSAREC
      </h4>
    </>
  );
};

export default Copyright;
