import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./Components/Forms/Reducer";

const store = configureStore({ reducer: Reducer });
const container = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>
, container);
