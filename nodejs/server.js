/************************************
This will tell git you want to start ignoring the changes to the file
git update-index --assume-unchanged path/to/file

When you want to start keeping track again
git update-index --no-assume-unchanged path/to/file
************************************/
var connect = require('connect');
connect.createServer(
    connect.static("/Users/paulsjv/git/leansheets/app")
).listen(8080);