import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { routes } from './route';

// const App = () => (
class App extends Component {
	render() {
		return (
			<Router>
				<div className="page-body">
					<ul>
						{routes.map((link, index) => (
							<li
								key={index.toString()}>
								<NavLink
									to={link.path}
									exact={link.exact}
									activeClassName="active"
								>{link.name}</NavLink>
							</li>
						))}
					</ul>

					<hr />
					<TransitionGroup>
						<CSSTransition className="fade" timeout={300}>
							<Switch>
								{routes.map((route, index) => (
									<Route
										key={index}
										path={route.path}
										exact={route.exact}
										component={route.main}
									/>
								))}
							</Switch>
						</CSSTransition>
					</TransitionGroup>	
				</div>
			</Router>	
		)
	}
}

export default App;
