import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";

import "./base.css";
import store from "./redux/store";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
