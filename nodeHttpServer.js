
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

var app = express();

var staticPath = path.resolve(__dirname, '.');

app.use(express.static(staticPath));

//Define a service  localhost:9090/"Users"
app.get('/Users', function (req, res) {
   fs.readFile( staticPath + "/Services/" + "users.json", 'utf8', function (err, data) {
       console.log(googleDriveAPI.DownloadSpreadsheet());
       res.end( data );
   });
})

app.listen(9090, function() {
  console.log('listening on staticPath:' + staticPath);
});
