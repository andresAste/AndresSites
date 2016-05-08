
// This is an example of a web server without any modules involved
/*
var http = require('http')
var url = require('url')
var fs = require('fs')
var siteDefaultFolder = ".";

http.createServer(function (request, response) {
   var requestUrl = url.parse(request.url)    
   console.log(siteDefaultFolder + requestUrl.pathname);
   response.writeHead(200)
   fs.createReadStream(siteDefaultFolder + requestUrl.pathname).pipe(response)  // do NOT use fs's sync methods ANYWHERE on production (e.g readFileSync) 
}).listen(9090)  
*/



//Web server with express
var path = require('path');
var express = require('express');
var fs = require("fs");
var googleDriveAPI = require('./Services/GastosMensuales/GoogleDriveAPI');
var dropboxAPI = require('./Services/DropBox/DropboxAPI');
var bodyParser = require('body-parser');

var staticPath = path.resolve(__dirname, '.');

var app = express();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(staticPath));

var router = express.Router();              // get an instance of the express Router
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


//Pages
app.get('/GastosMensuales', function (req, res) {
   fs.readFile( staticPath + "/GastosMensuales/index.html", 'utf8', function (err, data) {
      if (err) {
      	console.log(err);
      }
      else {
      	res.end(data);
      }
   });
});

/**** WEB PAGES ROUTES ****************************************************************************************************************/
// on routes that end in /gastosMensuales
router.route('/gastosMensuales')
    // get all the gastos mensuales (accessed at GET http://localhost:9090/api/gastosMensuales)
    .get(function(req, res) {
       googleDriveAPI.DownloadSpreadsheet(function(result) {
        res.json(result);
      });
    });

/**** SERVICES ROUTES ****************************************************************************************************************/
router.route('/dropBox/file/:file_path')
    // get a file (accessed at GET http://localhost:9090/api/dropBox/file/Pagos--ABSA--ABSA_Mayo2016)
    .get(function(req, res) {
      var fullFilePath = req.params.file_path.replace(/--/g, "/");
      console.log(fullFilePath);
      var pathParts = fullFilePath.split ("/"); 
      console.log(JSON.stringify(pathParts));
      dropboxAPI.DownloadFileRequest(res, fullFilePath + ".pdf", function(result) {
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=' + pathParts[pathParts.length-1] +'.pdf',
          'Content-Length': result.length
        });
        res.end(result);
      });
    })
    //uploads a file (accessed at POST http://localhost:9090/api/dropBox/file/Pagos--ABSA--ABSA_Mayo2016)
    .post(function(req, res) {
      var fullFilePath = req.params.file_path.replace(/--/g, "/");
      console.log(fullFilePath);
      var pathParts = fullFilePath.split ("/"); 
      console.log(JSON.stringify(pathParts));
      console.log("upload method not implemented!");
      res.end("upload method not implemented!");
    });
   
router.route('/dropBox/auth-callback')
    // authenticates the application and stores the token for later usage (accessed at GET http://localhost:9090/api/dropBox/auth-callback)
    .get(function(req, res) {
      var code = req.query.code;
      dropboxAPI.AuthenticateCallback(code, res);
    });

/**** CATCH-ALL ROUTE ***************************************************************************************************************/
app.get('*', function(req, res) {
  res.end("page not found");
});

app.listen(9090, function() {
  console.log('listening on staticPath:' + staticPath);
});
