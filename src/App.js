import "./App.scss";
import DynamicForm from "./Components/Forms/DynamicForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApplicationList from "./Components/Application/ApplicationsList";
import React from "react";

function App() {
  return (
    <Router className="app">
      <Route exact path="/">
        <DynamicForm />
      </Route>
      <Route exact path="/applications">
        <ApplicationList />
      </Route>
    </Router>
  );
}

export default App;
