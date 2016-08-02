// Require the necessary modules
var dishRouter = require('./dishRouter');
var leaderRouter = require('./leaderRouter');
var promoRouter = require('./promoRouter');
var express = require('express');


var app = express();

// configure the server
var hostname = 'localhost'
var port = 3000;


// Reference the Express application and mount it on the /dishes route.
app.use('/dishes', dishRouter);

// Reference the Express application and mount it on the /leadership route.
app.use('/leadership', leaderRouter);

// Reference the Express application and mount it on the /promotions route.
app.use('/promotions', promoRouter);


// identify folder for sharing static files
app.use(express.static(__dirname + '/public'));

// start up the server
app.listen(port, hostname, function() {
    console.log(`server running at http://${hostname}:${port}`);
})
