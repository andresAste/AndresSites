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
 * Reads the cells contents and returns a JSON object
 * @param {object} parameters object with these parameters:
 *   - sheet
 *   - callbackOK
 *   - callbackError
 */
function ParseGastosMensuales(parameters) {
  var sheet = parameters.Sheet;
  var callbackOK = parameters.CallbackOK;
  var callbackError = parameters.CallbackError;

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

/**
 * Updates a given Pago
 * @param {object} parameters object with these parameters:
 *   - sheet
 *   - pago
 *   - callbackOK
 *   - callbackError
 */
function UpdatePago(parameters) {
  parameters.Pago.Tentativo = (parameters.Pago.Tentativo.toLowerCase() === "true");
  parameters.Pago.Pagado = (parameters.Pago.Pagado.toLowerCase() === "true");
  parameters.Pago.PagoAnual = (parameters.Pago.PagoAnual.toLowerCase() === "true");
  parameters.Pago.CeldaFila = parseInt(parameters.Pago.CeldaFila);
  parameters.Pago.CeldaColumna = parseInt(parameters.Pago.CeldaColumna);

  console.log(JSON.stringify(parameters.Pago));
  var pago = parameters.Pago;

  var getCellsParameters = { 'min-row':pago.CeldaFila, //Here is the Vencimiento date
                              'max-row':pago.CeldaFila + 1, //here is the Monto
                              'min-col':pago.CeldaColumna, 
                              'max-col':pago.CeldaColumna,
                              'return-empty': true 
                            };
  console.log(JSON.stringify(getCellsParameters));                            
  parameters.Sheet.getCells(getCellsParameters, function(err, cells) {
     if (err) {
        console.log('Error reading cells: ' + err);
        parameters.CallbackError('Error loading client secret file: ' + err);
      } else {
        cells.forEach(function(cell, index, array){
          if (cell.row == pago.CeldaFila && cell.col == pago.CeldaColumna) { //Vencimiento cell
            var splittedDate = pago.Vencimiento.split("/");
            var newDay = splittedDate[0];
            if (pago.Tentativo === true) {
              newDay = newDay + "?";
            }
            else if (pago.PagoAnual === true) {
              newDay = newDay + PAGO_ANUAL;
            } else if (pago.Pagado === true) {
              newDay = newDay + MES_PAGADO;
            }
            cell.value = newDay;
          }
          else if (cell.row == pago.CeldaFila + 1 && cell.col == pago.CeldaColumna) { //Monto cell
            var value = pago.Monto;
            cell.value = value;
          }
        });
        console.log("updating cells");
        console.log(JSON.stringify(cells));
        parameters.Sheet.bulkUpdateCells(cells, function() {
          parameters.CallbackOK(pago);  
        });
      }
  });
}

/**
 * Authenticate the users, and then proceeds with action
 * @param {function} action         function to call after authentication
 * @param {string} sheetTitle  title of the sheet to pass to the action
 * @param {Array} actionParameters  parameters to pass to action method
 */
function Authenticate(action, sheetTitle, actionParameters) {
  var fileInfo = require(__dirname + "/keyFile.json");
  var creds = require(__dirname +'/claveGastosMensuales.json');
  
  var doc = new GoogleSpreadsheet(fileInfo.key);
  var sheet;
  doc.useServiceAccountAuth(creds, function() {
     doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      info.worksheets.forEach(function(worksheet, index) {
        sheet = info.worksheets[index];
        console.log('sheet : '+sheet.title+'(' + sheet.url + '-' + sheet.id+ ') '+sheet.rowCount+'x'+sheet.colCount);  
        if (sheet.title == sheetTitle) {
          actionParameters.Sheet = sheet;
          action(actionParameters);
        }
      });
    });
  });
}

/**
 * Returns a Compras object after reading data from the Spreadsheet
 * @param {object} parameters object with these parameters:
 *   - Sheet
 *   - CallbackOK
 *   - CallbackError
 */
function ParseCompras(parameters) {
  var compras = [];
  var maxCol = 24;
  var maxRow = 90;
 //get the cells and transform them into a two-dimensional array
  var arraySheet = [];
  for(var x = 0; x < parameters.Sheet.rowCount; x++){
      arraySheet[x] = [];    
      for(var y = 0; y < parameters.Sheet.colCount; y++){ 
          arraySheet[x][y] = x*y;    
      }    
  }

  parameters.Sheet.getCells({ 'max-row':maxRow,'max-col':maxCol,'return-empty': true }, function(err, cells) {
      if (err) {
        console.log('Error reading cells: ' + err);
        parameters.CallbackError('Error on method ParseCompras: ' + err);
      } else {
        cells.forEach(function(cell, index, array){
          arraySheet[cell.row-1][cell.col-1] = cell.value;
        });
       
        var currentCol = 0;
        while (currentCol < maxCol && arraySheet[0][currentCol] !== "" ){
            var splittedDate = arraySheet[0][currentCol].split("-");
            var compra = {
              Mes: splittedDate[0],
              Anio:splittedDate[1],
              Detalle:[]
            };

            var currentRow = 9;
            while (currentRow < maxRow && arraySheet[currentRow][currentCol] !== "") {
              compra.Detalle.push({
                TipoGasto: arraySheet[currentRow][currentCol],
                Monto:  arraySheet[currentRow][currentCol+1],
                CeldaFila: currentRow + 1,
                CeldaColumna: currentCol + 1
              });
              currentRow = currentRow + 1;
            }
            
            compras.push(compra);
            currentCol = currentCol + 2;
        }

        parameters.CallbackOK(compras);
      }
    });
}

/**
 * Adds or updates compras
 * @param {object} parameters parameters for the method:
 *   - Sheet
 *   - Compras: array
 *   - CallbackOK
 *   - CallbackError
 */
function UpdateCompras(parameters) {
  
  var column = 0;
  var minRow = 50000;
  var maxRow = 0;

  parameters.Compras.forEach(function(compra, compraIndex, array) {
    compra.New = (compra.New.toLowerCase() === "true");
    compra.CeldaFila = parseInt(compra.CeldaFila);
    compra.CeldaColumna = parseInt(compra.CeldaColumna);
    
    column = compra.CeldaColumna; //all should have the same column's value.
    if (minRow > compra.CeldaFila) {
      minRow = compra.CeldaFila;
    }
    if (maxRow < compra.CeldaFila) {
      maxRow = compra.CeldaFila;
    }
  });

  console.log(parameters.Compras);

  var getCompraByCellParameters = function(row, column, compras) {
    var compraFound = null;
    compras.forEach(function(compra, compraIndex, array) {
      if (compra.CeldaFila == row && compra.CeldaColumna == column) { compraFound = compra; }
    });
    return compraFound;
  };  

  var getCellsParameters = { 'min-row':minRow, 
                          'max-row':maxRow, 
                          'min-col':column, //here is the Tipo Pago
                          'max-col':column + 1,  //here is the Monto
                          'return-empty': true 
                        };

  parameters.Sheet.getCells(getCellsParameters, function(err, cells) {
     if (err) {
        console.log('Error reading cells: ' + err);
        parameters.CallbackError('Error loading client secret file: ' + err);
      } else {
        cells.forEach(function(cell, index, array){
          var compraToUpdate = getCompraByCellParameters(cell.row, cell.col, parameters.Compras);
          if (compraToUpdate === null) {
            compraToUpdate = getCompraByCellParameters(cell.row, cell.col-1, parameters.Compras); //in case the cell is for the second column
          }
          
          if (compraToUpdate !== null) {
            cell.value = compraToUpdate.CeldaColumna + 1 == cell.col ? compraToUpdate.Monto : compraToUpdate.TipoGasto;
          }
        });

        console.log("updating cells");
        console.log(JSON.stringify(cells));
        parameters.Sheet.bulkUpdateCells(cells, function() {
          parameters.CallbackOK(parameters.Compras);  
        });
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
    Authenticate(ParseGastosMensuales, 
                 "Gastos 2016",
                {
                  CallbackOK:  function (content){
                      result.gastosMensuales = content;
                      callback(result);
                    },
                  CallbackError: function (err){
                      result.errors.push(err);
                      callback(result);
                    }
                });
  },
  UpdateCell: function(pago, callback) {
    var result = {
      errors : [],
      pago: {}
    };

    Authenticate(UpdatePago, 
                 "Gastos 2016",
                {
                  Pago: pago,
                  CallbackOK:  function (content){
                      result.pago = content;
                      callback(result);
                    },
                  CallbackError: function (err){
                      result.errors.push(err);
                      callback(result);
                    }
                });
  },
  DownloadCompras: function(callback) {
     var result = {
      errors : [],
      compras:[]
    };
    
    Authenticate(ParseCompras, 
                 "Compras",
                {
                  CallbackOK:  function (content){
                      result.compras = content;
                      callback(result);
                    },
                  CallbackError: function (err){
                      result.errors.push(err);
                      callback(result);
                    }
                });
  },
  /**
   * Add or Updates compras
   * @param {Array of Object}   compras  Compras to update
   * @param {Function} callback Callback method
   */
  UpdateCompras: function(compras, callback) {
     var result = {
      errors : [],
      compras: []
    };
    Authenticate(UpdateCompras, 
              "Compras",
              {
                Compras: compras,
                CallbackOK:  function (content){
                    result.compras = content;
                    callback(result);
                  },
                CallbackError: function (err){
                    result.errors.push(err);
                    callback(result);
                  }
              });
  }
};

