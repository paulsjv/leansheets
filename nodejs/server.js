var connect = require('connect');
connect.createServer(
    connect.static("/git/leansheets/app")
).listen(8080);