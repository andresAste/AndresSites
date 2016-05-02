//Token stored to \Users\aasteasu/.credentials/gastosMensuales.json
var fs = require("fs");
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds', 'https://www.googleapis.com/auth/drive.file'];
var TOKEN_DIR = __dirname + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gastosMensuales.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client
 * @param {function} callbackOK The callback to call with the authorized client, for a sucessful action
 * @param {function} callbackError The callback to call with the authorized client, for a failed action
 */
function authorize(credentials, callback, callbackOK, callbackError) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback, callbackOK, callbackError);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, callbackOK, callbackError);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized client.
 * @param {function} callbackOK The callback to call with the authorized client, for a sucessful action
 * @param {function} callbackError The callback to call with the authorized client, for a failed action
 */
function getNewToken(oauth2Client, callback, callbackOK, callbackError) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        callbackError('Error while trying to retrieve access token' + err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client, callbackOK, callbackError);
    });
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
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth, callbackOK, callbackError) {
  var service = google.drive('v3');
  service.files.list(
  {
    auth: auth,
    pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  }, 
  function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      callbackError('The API returned an error: ' + err);
    }
    else {
      var files = response.files;
      if (files.length == 0) {
        console.log('No files found.');
        callbackError('No files found.');
      } else {
        console.log('Files:');
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log('%s (%s)', file.name, file.id);
          if (file.name == "Gastos mensuales") {
            downloadGastosMensuales(file.id, auth, callbackOK, callbackError);
          };
        }
      }  
    }
  });
}

function downloadGastosMensuales(fileID, auth, callbackOK, callbackError) {
  var dest = fs.createWriteStream(__dirname + '/tmp/gastosMensuales.csv');
  var service = google.drive('v3');
  service.files.export({
    auth: auth,
    fileId: fileID,
    mimeType: 'text/csv'
  })
  .on('end', function() { 
    console.log('Done'); 
    callbackOK({ message: 'File saved successfully. Pending: read file and return results as JSON'});
  })
  .on('error', function(err) { 
    console.log('Error during download', err); 
    callbackError('Error during download' + err);
  })
  .pipe(dest);
}

module.exports = {
	DownloadSpreadsheet: function(callback) {
    var result = {
      errors : [],
      gastosMensuales: {}
    };

		// Load client secrets from a local file.
    fs.readFile(__dirname +'/client_secret.json', function processClientSecrets(err, content) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        result.errors.push('Error loading client secret file: ' + err);
        return result;
      }
      // Authorize a client with the loaded credentials, then call the Drive API.
      authorize(JSON.parse(content), listFiles,
        function (content){
          result.gastosMensuales = content;
          callback(result);
        },
        function (err){
          result.errors.push(err);
          callback(result);
        });
    });
	}
}

