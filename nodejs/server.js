/************************************
This will tell git you want to start ignoring the changes to the file
git update-index --assume-unchanged path/to/file

When you want to start keeping track again
git update-index --no-assume-unchanged path/to/file
************************************/
var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect()
app.use(serveStatic("app"));
app.listen(8080);
console.log("Navigate to http://localhost:8080");