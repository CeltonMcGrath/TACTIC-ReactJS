import React, { useState } from "react";
import {TextField} from '@material-ui/core';
import { Button, FormControl, makeStyles } from '@material-ui/core';

import TACTIC from './tactic/Tactic';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let server = new TACTIC();
    server.login(email, password);
  }

  function callEval() {
    let server = new TACTIC();
    server.request("eval", ["@SOBJECT(fitnessmedia/class)"], {}).then(data => console.log(data));
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField value={email} id="email" onChange={e => setEmail(e.target.value)} label="Email" autoFocus />
        <TextField type="password" value={password} id="password" onChange={e => setPassword(e.target.value)} label="Password" />
        <Button disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      <Button onClick={callEval}>Call Eval</Button>
    </div>
  );
}