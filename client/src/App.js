import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './ui/components/Login/Login';
import Events from './ui/components/Events/Events';
import Bookings from './ui/components/Bookings/Bookings';
import Header from './ui/layout/Header/Header';
import Main from './ui/layout/Main/Main';
import Footer from './ui/layout/Footer/Footer';
import Signup from './ui/components/Signup/Signup';


const App = () => {
	return (
		<div className="App">
			<Router>
				<CssBaseline />
				<Header />
				<Main>
					<Switch>
						<Redirect from="/" to="/login" exact />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
						<Route path="/events" component={Events} />
						<Route path="/bookings" component={Bookings} />
					</Switch>
				</Main>
				<Footer />
			</Router>
		</div>

	);
}

export default App;
