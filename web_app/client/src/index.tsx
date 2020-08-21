import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import Settings from "./Settings";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css"
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <App />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
