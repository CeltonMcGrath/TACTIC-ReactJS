import Cookies from 'universal-cookie';
 

class TACTIC {

    constructor() {
        this.server_url = process.env.REACT_APP_TACTIC_SERVER_URL;
      	this.site = process.env.REACT_APP_TACTIC_SITE;
      	this.project = process.env.REACT_APP_TACTIC_PROJECT;
      	this.check_auth_endpoint = this.server_url + "/" + this.site + "/" + this.project + process.env.REACT_APP_TACTIC_CHECK_AUTH_ENDPOINT;
    }

    getCheckAuthEndpoint() {
    	return this.check_auth_endpoint;
    }

	login(username, password) {
		this.username = username;
		this.password = password;

		if (process.env.REACT_APP_TACTIC_DEV_LOGIN_TICKET) {
			let ticket = process.env.REACT_APP_TACTIC_DEV_LOGIN_TICKET;

			const cookies = new Cookies();
		    cookies.set('login_ticket', ticket, { path: '/' });
		} else {
			let url = this.server_url + "/tactic/default/Api/";
			let body = `<?xml version="1.0"?>
			  <methodCall>
				  <methodName>get_ticket</methodName>
				  <params>
				    <param><value><string>USERNAME</string></value></param>
				    <param><value><string>PASSWORD</string></value></param>
				    <param><value><string>SITE</string></value></param>
				  </params>
			  </methodCall>`

			body = body.replace("USERNAME", username)
			﻿body = body.replace("PASSWORD", password)
			body = body.replace("SITE", this.site)

			fetch(url, {
			 'method': 'POST',
			 'headers': {
			      'Content-Type': 'text/xml'
			  },
			  'body': body
			}).then(resp => resp.text()).then(data => {
				let pattern = ".*<string>(.*)</string>.*";
	            let re = RegExp(pattern);
	            let ticket = data.match(re)[1];

	            const cookies = new Cookies();
				cookies.set('login_ticket', ticket, {'domain': this.server_url});
			});
		}

        

        
		

	}

	getTicket() {
		const cookies = new Cookies();
		return cookies.get('login_ticket'); 
	}

	_request(url) {
		return new Promise(
	    	(resolve, reject) => {
			    fetch(url, {method: 'POST'})
			    .then(resp => resp.json().then(resolve))
			    .catch(error => reject(error));
			}
		);
	};

	request(method, args, kwargs) {
        let login_ticket = this.getTicket();

		let url = this.server_url;
		url += "/tactic/" + this.site + "/"  + this.project + "/" + "REST";
		url += "?login_ticket=" + login_ticket;
 		url += "&method=" + method;
 		if (args) url += "&args=" + JSON.stringify(args);
		if (kwargs) url += "&kwargs=" + JSON.stringify(kwargs);

		return new Promise(
			(resolve, reject) => {
				this._request(url)
				.then(resolve)
				.catch(reject);
			}
		)
	}


}

export default TACTIC;
