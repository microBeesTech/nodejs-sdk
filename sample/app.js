var microBeesSDK = require('../microBeesSDK.js');
var debug=true;
var microBees = new microBeesSDK(debug);
microBees.getAccessToken("myUsername","myPassword","myClientID","myClientSecret","clientRedirectURI");
microBees.doRequest("v/1_0/getMyprofile","");
