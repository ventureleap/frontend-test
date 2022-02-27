// Packages
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

// Components
import App from "./App"

// API
import { AuthProviderWrapper } from "./context/auth"

// Tests
import reportWebVitals from "./tests/reportWebVitals"

// Styles
import "./styles/reset.css"
import "./styles/global-styles.scss"

ReactDOM.render(
    <BrowserRouter>
        <AuthProviderWrapper>
            <App />
        </AuthProviderWrapper>
    </BrowserRouter>,
    document.getElementById("root")
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
