import React from "react";
import "./loader.css";

function Spinner() {
  return (
    <div className="loader">
      <div className="spinner" />
      <h1>Loading...</h1>
    </div>
  );
}

export default Spinner;
