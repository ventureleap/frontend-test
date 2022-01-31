// @flow
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './features/User/Login';
import Signup from './features/User/Signup';
import { PrivateRoute } from './helpers/PrivateRoute';
import CreateApplication from './features/Applications/Create';
import ApplicationList from './features/Applications/List';

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact component={Login} path='/users/login' />
					<Route exact component={Signup} path='/users' />
					<PrivateRoute
						exact
						component={CreateApplication}
						path='/application/create'
					/>
					<PrivateRoute
						exact
						component={CreateApplication}
						path='/application/edit'
					/>
					<PrivateRoute exact component={ApplicationList} path='/' />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
