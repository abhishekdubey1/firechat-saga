import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./redux/store";

const Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById("root"));
