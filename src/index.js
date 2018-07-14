import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "typeface-roboto";
import "typeface-source-code-pro";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

import App from "./App";

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = "jss-insertion-point";

function renderApp(App) {
  ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <App />
    </JssProvider>,
    document.getElementById("root")
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    let NextApp = require("./App").default;
    let root = document.getElementById("root");
    ReactDOM.unmountComponentAtNode(root);
    renderApp(NextApp);
  });
}
