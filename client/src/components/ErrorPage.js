import React from "react";
import { useSelector } from "react-redux";

function ErrorPage() {
  const error = useSelector((state) => state.app.error);

  return <h1 className="container-90">{error.message}</h1>;
}

export default ErrorPage;
