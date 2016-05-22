// ***** MODULES IMPORTED *****************************************************************************************************************************************
var fs = require("fs");
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var utils = require('./Utils');
var GoogleSpreadsheet = require('google-spreadsheet');

// ***** LOCAL VARIABLES ******************************************************************************************************************************************
//Converter Class 
var Converter = require("csvtojson").Converter;

// If modifying these scopes, delete your previously saved credentials at /.credentials/TOKEN_PATH
var SCOPES = ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds', 'https://www.googleapis.com/auth/drive.file'];
var TOKEN_DIR = __dirname + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gastosMensuales.json';
var GASTOS_MENSUALES_FILE = '/tmp/gastosMensuales.csv';

var SEPARADOR = "***";
var MES_PAGADO = "-p";
var PAGO_ANUAL = "-a";
var CONCEPTO = "Concepto";

// ***** PRIVATE FUNCTIONS *****************************************************************************************************************************************
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
    q: "name contains 'Gastos'", //Remove this filter if desired to return all files
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

/**
 * Download Gastos Mensuales Spreadsheet
 * 
 * @param {String} fileID ID of the file.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {function} callbackOK The callback to call with the authorized client, for a sucessful action
 * @param {function} callbackError The callback to call with the authorized client, for a failed action
 */
function downloadGastosMensuales(fileID, auth, callbackOK, callbackError) {
  var dest = fs.createWriteStream(__dirname + GASTOS_MENSUALES_FILE);
  var service = google.drive('v3');
  service.files.export({
    auth: auth,
    fileId: fileID,
    mimeType: 'text/csv'
  })
  .on('end', function() { 
    console.log('Done'); 
    ParseGastosMensuales(__dirname + GASTOS_MENSUALES_FILE, callbackOK, callbackError);
  })
  .on('error', function(err) { 
    console.log('Error during download', err); 
    callbackError('Error during download' + err);
  })
  .pipe(dest);
}

/**
 * Reads a csv file and returns the contents as a JSON  file.
 * @param {string} filePath Path to the cvs file
 * @param {function} callbackOK The callback to call with the authorized client, for a sucessful action
 * @param {function} callbackError The callback to call with the authorized client, for a failed action
 */
function ParseGastosMensuales(filePath, callbackOK, callbackError) {
  
  var converter = new Converter({});

  converter.on("end_parsed", function (jsonObj) {
    var parsedObject = {
      Meses: [{Mes: "Enero", Pagos:[] }, {Mes: "Febrero", Pagos:[] }, {Mes: "Marzo", Pagos:[] }, {Mes: "Abril", Pagos:[] }, {Mes: "Mayo", Pagos:[] }, {Mes: "Junio", Pagos:[] }, 
              {Mes: "Julio", Pagos:[] }, {Mes: "Agosto", Pagos:[] }, {Mes: "Septiembre", Pagos:[] }, {Mes: "Octubre", Pagos:[] }, {Mes: "Noviembre", Pagos:[] }, 
              {Mes: "Diciembre", Pagos:[] }, ],
      Conceptos:[]
    };   

    //find pagos per month
    parsedObject.Meses.forEach(function(mes, index, array) {
      var i = 1;
      while (i < jsonObj.length && jsonObj[i].field1 !=  SEPARADOR) {
        var vencimientoRaw = jsonObj[i][mes.Mes].toString();
        var vencimientoDay = vencimientoRaw.replace("-p", "").replace("-a", "").replace("?", "");

        var date = new Date();
        var diaVencimiento = "";

        if (utils.ValidateDay(vencimientoDay)) {
          diaVencimiento = new Date(date.getFullYear(), index, vencimientoDay);
        };

        var pago = {
          Concepto:jsonObj[i].field1,
          Monto:jsonObj[i+1][mes.Mes],
          Vencimiento: diaVencimiento,
          FechaTentativa : vencimientoRaw.lastIndexOf("?") != -1,
          Pagado: vencimientoRaw.lastIndexOf("-p") != -1,
          EsPagoAnual: vencimientoRaw.lastIndexOf("-a") != -1,
        };

        mes.Pagos.push(pago);
        i = i+2;
      }
    });

    //find general pagos' information
    var i = 1;
    while (i < jsonObj.length && jsonObj[i].field1 !=  CONCEPTO) {
      i = i+1;
    }
    if (i < jsonObj.length) {
      i = i + 1; //Skip Concepto's header
      while (i < jsonObj.length && jsonObj[i].field1 !=  SEPARADOR) {
        var concepto = {
          Concepto:jsonObj[i].field1,
          CodigoPago:jsonObj[i].field2,
          CarpetaDropbox: jsonObj[i].Enero,
          PalabraDropbox: jsonObj[i].Febrero,
          Origen: jsonObj[i].Marzo
        };

        parsedObject.Conceptos.push(concepto);
        i = i+1;
      }
    };

    callbackOK(parsedObject);
  })
  .on("error",function(errMsg,errData){
    console.log(errMsg);
    console.log(errData);
    callbackError(errMsg);
  });

  fs.createReadStream(filePath)
    .pipe(converter);
}

// ***** PUBLIC FUNCTIONS ****************************************************************************************************************************************
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

