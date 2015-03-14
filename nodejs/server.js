/************************************
This will tell git you want to start ignoring the changes to the file
git update-index --assume-unchanged path/to/file

When you want to start keeping track again
git update-index --no-assume-unchanged path/to/file
************************************/
var connect = require('connect');
connect.createServer(
    connect.static("/Users/paulsjv/git/leansheets/src")
).listen(8180);

// var connect = require("connect");
// var app = connect().use(connect.static('/Users/paulsjv/git/leansheets/app'));
// app.listen(8180);