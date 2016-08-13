var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');


var hostname = 'localhost';
var port = 3000;

var app = express();


app.use(morgan('dev'));
app.use(cookieParser('12345-67890-09876-54321')); // secret key

function auth (req, res, next) {
  //  console.log(req.headers);

    if (!req.signedCookies.user) {
        console.log("there is no cookie");
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log("there is no authHeader");
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];

        if (user == 'admin' && pass == 'password') {
            res.cookie('user','admin',{signed: true});

            console.log('received a username and password');
            console.log ( user +' '+ pass);
            next(); // authorized
        } else {
            console.log("username and password do not match");
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    } else {
        console.log('there is a signed cookie')
        if (req.signedCookies.user === 'admin') {
            console.log("the admin cookie is present");
            next();
        } else {
            console.log('it is not the admin cookie')
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }

}

app.use(auth);

app.use(express.static(__dirname + '/public'));
app.use(function(err,req,res,next) {
            res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
