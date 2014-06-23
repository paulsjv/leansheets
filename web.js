var express 	= require('express');
var app		= express();
var port 	= process.env.PORT || 8000;

var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

	// log each request to the console
	console.log(req.method, req.url);

	// continue doing what we were doing and go to the route
	next();	
});

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
	res.sendfile('./app/index.html');	
});

app.use(express.static(__dirname + '/app'));
app.use('/', router);

app.listen(port);
console.log("App listening on port " + port);
