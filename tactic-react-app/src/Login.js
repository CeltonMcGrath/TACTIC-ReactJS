import React, { useState } from "react";
import {TextField} from '@material-ui/core';
import {Container, Button, FormControl, makeStyles } from '@material-ui/core';

import  {AuthConsumer} from 'react-check-auth';

import {
  useHistory,
  useLocation
} from "react-router-dom";


import TACTIC from './tactic/Tactic';
//https://reacttraining.com/react-router/web/example/auth-workflow

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      display: 'flex',
      flexDirection: 'column',

    },
  },
  login: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
}));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

	  
  return (
    <AuthConsumer>
      {({userInfo, refreshAuth}) => {
    
   function handleSubmit(event) {
      event.preventDefault();
      let server = new TACTIC();
      server.login(email, password)
      .then(ticket => {console.log(ticket); refreshAuth();}) 
      .catch(err => console.log(err));
    }

	  if (!userInfo) {
            return (
    <Container className={classes.login}>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField value={email} id="email" onChange={e => setEmail(e.target.value)} label="Email" autoFocus />
        <TextField type="password" value={password} id="password" onChange={e => setPassword(e.target.value)} label="Password" />
        <Button disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </Container> 
	 )
          } else {
            return (<h1>Login Success</h1>);
	  }
      }}
    </AuthConsumer>

  );
}
