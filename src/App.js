import "./App.scss";
import IncomeForm from "./Components/Forms/IncomeForm";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router className="app">
      <Route path="/">
        <IncomeForm />
      </Route>
    </Router>
  );
}

export default App;
