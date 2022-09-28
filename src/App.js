import "./App.scss";
import DynamicForm from "./Components/Forms/DynamicForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApplicationList from "./Components/Application/ApplicationsList";
import React from "react";
import AddApplcation from "./Components/Application/CRUD/AddApplication";
import EditApplcation from "./Components/Application/CRUD/EditApplication";

function App() {
  return (
    <Router forceRefresh={true} className="app">
      <Route exact path="/">
        <DynamicForm />
      </Route>
      <Route exact path="/applications">
        <ApplicationList />
      </Route>
      <Route exact path="/applications/create">
        <AddApplcation />
      </Route>
      <Route path="/applications/edit/:idApp">
        <EditApplcation />
      </Route>
    </Router>
  );
}

export default App;
