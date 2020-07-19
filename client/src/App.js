import React, { useState } from 'react';
import './App.css';
import AuthContext from './context/AuthContext';
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

	const [authState, setAuthState] = useState({
		token: null,
		userId: null,
		tokenExpiration: null
	});

	const login = (token, userId, tokenExpiration) => {
		setAuthState(prevState => ({
			...prevState,
			token,
			userId
		}));
	};

	const logout = () => {
		setAuthState(prevState => ({
			...prevState,
			token: null,
			userId: null
		}));
	};

	return (
		<div className="App">
			<Router>
				<CssBaseline />
				<AuthContext.Provider value={{
					token: authState.token,
					userId: authState.userId,
					login: login,
					logout: logout
				}}>
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
				</AuthContext.Provider>
			</Router>
		</div>

	);
}

export default App;
