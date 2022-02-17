import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { FunctionComponent } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import NewApplication from './pages/Dashboard/new';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import PageTitle from './components/PageTitle';
import Breadcrumbs from './components/Breadcrumbs';

const App: FunctionComponent = () => {
    return (
        <div>
            <Header />
            <Breadcrumbs />
            <PageTitle />
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/dashboard" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/new">
                        <NewApplication />
                    </Route>
                    <Route path="/sign-up">
                        <SignUp />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
