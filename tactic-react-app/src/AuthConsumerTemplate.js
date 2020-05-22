import React from 'react';
import {AuthConsumer} from 'react-check-auth';
import Error from './Error';

export default function AuthConsumerTemplate() {
  return (
  	<AuthConsumer>
      {({userInfo}) => {
        if (!userInfo) return <Error />
        
        return (
	      	<h1>Hello world</h1>
		);

	  }}
  	</AuthConsumer>

  );
}