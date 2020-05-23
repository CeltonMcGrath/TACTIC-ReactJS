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

import {makeStyles, AppBar, Toolbar, IconButton, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  app: {
  	height: '100vh',
  	width: '100vw',
  	display: 'flex',
  	flexDirection: 'column'
  },
  main: {
  	flexGrow: '1'
  }
}));


function Header() {


	return (

		<AuthConsumer>
	         {({userInfo, refreshAuth}) => {

	           function logout() {
	             let server = new TACTIC();
	             server.logout();
	             refreshAuth();
	           }


		   let links;
	           if (!userInfo) {
	              links = (
	               	<div className="appbar-links">
	              	  <Button component={Link} color="inherit" to="/home">Home</Button>
			  <Button component={Link} color="inherit" to="/about">About</Button>
			  <Button component={Link} color="inherit" to="/login">Login</Button>
		        </div>
		     );
	           } else {
	             links = (
		       <div className="appbar-links">
			 <Button component={Link} color="inherit" to="/home">Home</Button>
			 <Button component={Link} color="inherit" to="/about">About</Button>
			 <Button component={Link} color="inherit" to="/dashboard">Dashboard</Button>
			 <Button component={Link} color="inherit" to="/classroom">Classroom</Button>
			 <Button onClick={logout} color="inherit">Logout</Button>
		       </div>
		     );
	           }

	          return (
	          	<AppBar position="static">
				  <Toolbar>
				    <IconButton edge="start" color="inherit" aria-label="menu">
				      <MenuIcon />
				    </IconButton>
				    {links}
				  </Toolbar>
				</AppBar>
			);

	  
	         }}
       	</AuthConsumer>

	);
}


function App() {

  let server = new TACTIC();
  let authUrl = server.getCheckAuthEndpoint(); 
  const classes = useStyles();

  return (
    <AuthProvider authUrl={authUrl} reqOptions={{mode: 'cors', credentials: 'include'}}>
      <div className={classes.app}>
	<Router>
	  <Header/>
	    <div className={classes.main}>
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
