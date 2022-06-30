import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import ApplicationsPage from "./routes/applications";
import ApplicationPage from "./routes/application";
import UserPage from "./routes/user";
import SignUpPage from "./routes/signup";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUpPage />} />
        <Route path="/applications" element={<ApplicationsPage />}></Route>
        <Route path="/applications/:id" element={<ApplicationPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
