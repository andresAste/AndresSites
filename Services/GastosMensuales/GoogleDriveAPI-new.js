//IMPORTANT: THIS WORK WIHT THIS LIBRARY, https://www.npmjs.com/package/google-spreadsheet, INCLUDING THE AUTHENTICATION STEPS

// ***** MODULES IMPORTED *****************************************************************************************************************************************
var fs = require("fs");
var readline = require('readline');
var utils = require('./Utils');
var GoogleSpreadsheet = require('google-spreadsheet');

// ***** LOCAL VARIABLES ******************************************************************************************************************************************

var SEPARADOR = "***";
var MES_PAGADO = "-p";
var PAGO_ANUAL = "-a";
var CONCEPTO = "Concepto";

// ***** PRIVATE FUNCTIONS *****************************************************************************************************************************************

/**
 * Download the spreadhseeet
 * @param {function} callbackOK    callback method when processing was successful
 * @param {function} callbackError callback method when an error was found
 */
function DownloadSpreadsheet(callbackOK, callbackError) {
  var fileInfo = require(__dirname + "/keyFile.json");
  var creds = require(__dirname +'/claveGastosMensuales.json');
  
  var doc = new GoogleSpreadsheet(fileInfo.key);
  var sheet;
  console.log("here");
  doc.useServiceAccountAuth(creds, function() {
     doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      info.worksheets.forEach(function(worksheet, index) {
        sheet = info.worksheets[index];
        console.log('sheet : '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);  
        if (sheet.title == "Gastos 2016") {
          ParseGastosMensuales(sheet, callbackOK, callbackError);
        }
      });
    });
  });
}

/**
 * Reads the cells contents and returns a JSON object
 * @param {function} callbackOK The callback to call with the authorized client, for a sucessful action
 * @param {function} callbackError The callback to call with the authorized client, for a failed action
 */
function ParseGastosMensuales(sheet, callbackOK, callbackError) {
  var parsedObject = {
    Meses: [{Mes: "Enero", Pagos:[] }, {Mes: "Febrero", Pagos:[] }, {Mes: "Marzo", Pagos:[] }, {Mes: "Abril", Pagos:[] }, {Mes: "Mayo", Pagos:[] }, {Mes: "Junio", Pagos:[] }, 
            {Mes: "Julio", Pagos:[] }, {Mes: "Agosto", Pagos:[] }, {Mes: "Septiembre", Pagos:[] }, {Mes: "Octubre", Pagos:[] }, {Mes: "Noviembre", Pagos:[] }, 
            {Mes: "Diciembre", Pagos:[] }, ],
    Conceptos:[]
  };

  //get the cells and transform them into a two-dimensional array
  var arraySheet = [];
  for(var x = 0; x < sheet.rowCount; x++){
      arraySheet[x] = [];    
      for(var y = 0; y < sheet.colCount; y++){ 
          arraySheet[x][y] = x*y;    
      }    
  }

  sheet.getCells({ 'max-row':150,'max-col':20,'return-empty': true }, function(err, cells) {
      if (err) {
        console.log('Error reading cells: ' + err);
        callbackError('Error loading client secret file: ' + err);
      } else {
        cells.forEach(function(cell, index, array){
          arraySheet[cell.row-1][cell.col-1] = cell.value;
        });
        
        //find pagos per month
        parsedObject.Meses.forEach(function(mes, index, array) {
          var i = 2; //The first cell begins at row #3, array index:2
          while (i <= sheet.rowCount && arraySheet[i] !== undefined && arraySheet[i][0] !=  SEPARADOR) {
            var vencimientoRaw = arraySheet[i][index + 2].toString();
            var vencimientoDay = vencimientoRaw.replace("-p", "").replace("-a", "").replace("?", "");
            var date = new Date();
            var diaVencimiento = "";

            if (utils.ValidateDay(vencimientoDay)) {
              diaVencimiento = new Date(date.getFullYear(), index, vencimientoDay);
            }

            var pago = {
              Concepto:arraySheet[i][0],
              Monto:arraySheet[i+1][index + 2],
              Vencimiento: diaVencimiento,
              FechaTentativa : vencimientoRaw.lastIndexOf("?") != -1,
              Pagado: vencimientoRaw.lastIndexOf("-p") != -1,
              EsPagoAnual: vencimientoRaw.lastIndexOf("-a") != -1,
              CeldaFila : i + 1,
              CeldaColumna: index + 3
            };

            mes.Pagos.push(pago);
            i = i+2;
          }
        });

        //find general pagos' information
        var i = 1;
        while (i < sheet.rowCount&& arraySheet[i][0] !=  CONCEPTO) {
          i = i+1;
        }
        if (i < sheet.rowCount) {
          i = i + 1; //Skip Concepto's header
          while (i < sheet.rowCount && arraySheet[i][0] !=  SEPARADOR) {
            var concepto = {
              Concepto:arraySheet[i][0],
              CodigoPago:arraySheet[i][1],
              CarpetaDropbox: arraySheet[i][2],
              PalabraDropbox: arraySheet[i][3],
              Origen: arraySheet[i][4]
            };

            parsedObject.Conceptos.push(concepto);
            i = i+1;
          }
        }

        callbackOK(parsedObject);
      }
    });
}

// ***** PUBLIC FUNCTIONS ****************************************************************************************************************************************
module.exports = {
  DownloadSpreadsheet: function(callback) {
     var result = {
      errors : [],
      gastosMensuales: {}
    };

    DownloadSpreadsheet( 
        function (content){
          result.gastosMensuales = content;
          callback(result);
        },
        function (err){
          result.errors.push(err);
          callback(result);
        });
  }
};

