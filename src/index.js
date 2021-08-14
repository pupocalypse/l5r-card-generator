import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// import "semantic-ui-css/semantic.min.css";
import "croppie/croppie.css";
import "./scss/app.css";

// window.Croppie = require("croppie");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
