import React from 'react';

import {AuthProvider, AuthConsumer} from 'react-check-auth';

import TACTIC from './tactic/Tactic';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home';
import About from './About';
import Login from './Login';
import Dashboard from './Dashboard';
import Classroom from './Classroom';


function Header() {


	return (

		<AuthConsumer>
	         {({userInfo}) => {

	           if (!userInfo) {
	              return (
	              	<div className="header">
	              	  <Link className="nav-link" to="/home">Home</Link>
				      <Link className="nav-link" to="/about">About</Link>
				      <Link className="nav-link" to="/login">Login</Link>
				     </div>
				   );
	           } 
	           
	           else {
	             return (
	             	<div className="header">
	              <Link className="nav-link" to="/home">Home</Link>
			      <Link className="nav-link" to="/login">Login</Link>
			      <Link className="nav-link" to="/about">About</Link>
				  <Link className="nav-link" to="/dashboard">Dashboard</Link>
				  <Link className="nav-link" to="/classroom">Classroom</Link>
	                </div>

				  );
	           }

	  
	         }}
       	</AuthConsumer>

	);
}


function App() {

  let server = new TACTIC();
  const authUrl = server.getCheckAuthEndpoint(); 

  return (
	<AuthProvider authUrl={authUrl}>
		
		<div className="app">
			<Router>
			    <Header/>
			    <div className="main">
				<Switch>
					
					<Route path="/about">
						<About />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/classroom">
						<Classroom />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
				</div>
			</Router>
		</div>    
	</AuthProvider>

  );
}

export default App;
