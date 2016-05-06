
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
var app = express();

var staticPath = path.resolve(__dirname, '.');

app.use(express.static(staticPath));

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

//Services
app.get('/Services/GastosMensuales', function (req, res) {
	googleDriveAPI.DownloadSpreadsheet(function(result) {
		//This line returns a string
		//res.end(JSON.stringify(result)); 

		//This line returns a JSON object
		res.json(result);
	});
});
app.get('/Services/DropBox/File', function (req, res) {
  dropboxAPI.DownloadFileRequest(res, function(result) {
    res.json(result);
  });
});
/*app.get('/Services/DropBox/auth', function(req, res) {
  dropboxAPI.Authenticate(res);
});
*/
app.get('/Services/DropBox/auth-callback', function(req, res) {
  var code = req.query.code;
  dropboxAPI.AuthenticateCallback(code, res);
});


app.get('*', function(req, res) {
  res.end("page not found");
});

app.listen(9090, function() {
  console.log('listening on staticPath:' + staticPath);
});
