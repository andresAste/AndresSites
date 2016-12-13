# AndresSites
Test site to handle bills.
Both services requires some json files with credentials not uploaded.
To install package dependencies run "npm install" from the root folder of this app.
Then run npm 

Start page to run web site:http://localhost:9090/

NodeJS: to start and run the server, I follow the steps here: https://code.ciphertrick.com/2016/10/24/file-upload-with-angular2-nodejs/, which involves:
  1. Adding Gulp references on package.json
  2. Create file gulpfile.js 
  3. Install Gulp globally: npm install gulp -g
  4. Use gulp command to start server, which also restarts after specified files change.

Troubleshooting:
1. If dropbox is not installed correctly on "node_modules\dropbox" (you should get an error when trying to upload/download files), decompress it from dropboxLib.zip on root folder.
2. Boostrap 2 components were installed and used following this page: https://ng-bootstrap.github.io/#/home
