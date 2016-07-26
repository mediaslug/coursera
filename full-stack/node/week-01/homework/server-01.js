// create a simple server using express rather than the http module
// http module is still used to start the server in this exercise, but express
// is used to create the app.

var express = require('express'), http = require('http');
var hostname = 'localhost'
var port = 3000;

var app = express();

app.use(function(req,res,next){
    console.log(req.headers);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html><body><h1>Hello World</h1></body></html>');

});

var server = http.createServer(app);

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
