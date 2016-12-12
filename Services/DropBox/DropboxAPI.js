// ***** MODULES IMPORTED *****************************************************************************************************************************************
var Dropbox = require("dropbox");
var fs = require("fs");

// ***** LOCAL VARIABLES ******************************************************************************************************************************************
var TOKEN_DIR = __dirname + '/credentials/';
var TOKEN_PATH = TOKEN_DIR + 'accessToken.json';
var CREDENTIALS_PATH = TOKEN_DIR + 'credentials.json';
// ***** PRIVATE FUNCTIONS *****************************************************************************************************************************************

function Authenticate(responseObject, callback, callbackParams, callbackOK, callbackError) {
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
        getNewToken(responseObject, callback, callbackOK, callbackError);
    } else {
      var savedToken = JSON.parse(token);
      var client = new Dropbox.Client({ token: savedToken.token }); 
      callback(client, callbackOK, callbackError, callbackParams);
    }
  });
}

function AuthenticateCallback(code, responseObject) {
  var credentials = require(CREDENTIALS_PATH);
  // Server-side applications use both the API key and secret.
  var client = new Dropbox.Client({
      key: credentials.AppKey,
      secret: credentials.AppSecret
  });

    client.authDriver({
      authType: function() {return "code";},
      url: function() {return "http://localhost:9090/api/dropBox/auth-callback";}, //this needs to be set on https://www.dropbox.com/developers/apps, Redirect URIs
      doAuthorize: function(authUrl, stateParam, client, callback) {
        return callback({code: code});// this is the code from the callback
      },
      oauthQueryParams: ['access_token', 'expires_in', 'scope', 'token_type', 'code', 'error', 'error_description', 'error_uri', 'mac_key', 'mac_algorithm'].sort()
    });

    // this time, this will use the code to get the oauth token
    client.authenticate(function(error, client) {
      if (error) return console.log(error);
      
      console.log(client._oauth._token); // <-- TOKEN
      storeToken(client._oauth._token);
      // store the token in a db, use it whenever needed
      responseObject.end("Dropbox authentication successful, please try again your action.");
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {??} responseObject response object to use when finished generating token.
 * @param {getEventsCallback} callback The callback to call with the authorized client.
 * @param {function} callbackOK The callback to call with the authorized client, for a sucessful action
 * @param {function} callbackError The callback to call with the authorized client, for a failed action
 */
function getNewToken(responseObject) {
  var credentials = require(CREDENTIALS_PATH);
  // Server-side applications use both the API key and secret.
  var client = new Dropbox.Client({
      key: credentials.AppKey,
      secret: credentials.AppSecret
  });

  client.authDriver({
      authType: function() {return "code";},
      url: function() {return "http://localhost:9090/api/dropBox/auth-callback";}, //this needs to be set on https://www.dropbox.com/developers/apps, Redirect URIs
      doAuthorize: function(authUrl, stateParam, client, callback) {
        responseObject.redirect(authUrl);// redirect to Dropbox
      },
      oauthQueryParams: ['access_token', 'expires_in', 'scope', 'token_type', 'code', 'error', 'error_description', 'error_uri', 'mac_key', 'mac_algorithm'].sort()
    });

    client.authenticate(function(error, client) {
      if (error) return console.log(error);
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify({ token: token }));
  console.log('Token stored to ' + TOKEN_PATH);
}

function DownloadFile(dropboxClient, callbackOK, callbackError, callbackParams) {
  // to get the user Dropbox id use 
  /*dropboxClient.getAccountInfo(function(error, accountInfo) {
    console.log(accountInfo);
    callbackOK(accountInfo);
  });*/

  dropboxClient.readFile(callbackParams[0], { buffer: true }, function(error, data) {
    if (error) {
      return console.log(error);
    }
    callbackOK(data);
  });
}

function UploadFile(dropboxClient, callbackOK, callbackError, callbackParams) {
  fs.readFile(callbackParams[0], function(error, data) {
    // No encoding passed, readFile produces a Buffer instance
    if (error) {
      return console.log(error);
    }
    dropboxClient.writeFile(callbackParams[1], data, function(error, stat) {
      if (error) {
        return handleError(error);
      }
      fs.unlink(callbackParams[0]);
      // The file has been succesfully written.
      callbackOK("The file has been uploaded successfully");
    });
  });
}

// ***** PUBLIC FUNCTIONS ****************************************************************************************************************************************
module.exports = {
  Authenticate: function(responseObject) {
    var client = Authenticate(responseObject);
  },
  AuthenticateCallback: function(code, responseObject) {
    AuthenticateCallback(code, responseObject);
  },
  DownloadFileRequest: function(responseObject, fullFilePath, callback){
    // Authorize a client with the loaded credentials, then call the Drive API.
    var callbackParams = [fullFilePath];
    Authenticate(responseObject, DownloadFile, callbackParams,
      function (content){
        callback(content);
      },
      function (err){
        callback(content);
      });
  },
  UploadFile: function(responseObject, tempFilePath, destFilePath, callback) {
    var callbackParams = [tempFilePath, destFilePath];
     Authenticate(responseObject, UploadFile, callbackParams,
      function (content){
        callback(content);
      },
      function (err){
        callback(content);
      });
  } 
} 

