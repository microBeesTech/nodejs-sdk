var http = require('https');
var microBees = function (debug) {
	microBees.prototype.debug = debug;
};
microBees.prototype.token = "";
microBees.prototype.getAccessToken = function (username,password,clientID,clientSecret,redirectURI) {
	var options = {
		host: 'dev.microbees.com',
		path: '/oauth/token?'+
			+'grant_type=password&username='+username+'&password='+password+'&client_id='+clientID+'&client_secret='+clientSecret+'&redirect_uri='+redirectURI,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (_data) {
			if(microBees.prototype.debug)
				console.log("body: " + _data);
			microBees.prototype.token=_data.access_token;
			return _data.access_token;
		});
	});
	req.end();
}
microBees.prototype.doRequest = function (url,data) {
	var options = {
		host: 'dev.microbees.com',
		path: "/"+url,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(data),
			'Authorization': 'Bearer '+microBees.prototype.token
		}
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (_data) {
			if(microBees.prototype.debug)
				console.log("body: " + _data);
			return _data;
		});
	});
	req.write(data);
	req.end();
}
module.exports = microBees;