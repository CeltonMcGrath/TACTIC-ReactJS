import React from 'react';

import {AuthConsumer} from 'react-check-auth';

import Error from './Error';

import TACTIC from './tactic/Tactic';

export default function Dashboard() {

  function callEval() {
    let server = new TACTIC();
    server.request("eval", ["@SOBJECT(fitnessmedia/class)"], {}).then(data => console.log(data));
  }

  
  return (
  	<AuthConsumer>
      {({userInfo}) => {
        if (!userInfo) return <Error />
        
        return (
	      	<h1>Hey, welcome to the dashboard.</h1>
		);

	  }}
  	</AuthConsumer>

  );
}