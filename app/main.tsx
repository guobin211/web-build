import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./styles/main.scss";

function rendered() {
  console.log("ReactDom rendered");
}

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
  rendered
);
