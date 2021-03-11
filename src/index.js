import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import reducer from "./reducers";
import App from "./routes/App";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/Media.scss";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const initialState = { user: {} };

// DEBUGGING ONLY

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// DEBUGGING ONLY

const store = createStore(reducer, initialState, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
