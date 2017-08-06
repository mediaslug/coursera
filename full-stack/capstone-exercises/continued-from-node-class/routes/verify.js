var User = require('../models/user');
var jwt = require('jsonwebtoken');
var logger = require('morgan');

var config = require('../config.js')


exports.getToken = function(user) {
    console.log('get the token');
    return jwt.sign(user, config.secretKey, {
        expiresIn:600804
    });

};

exports.verifyOrdinaryUser = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode the token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!')
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token, return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};


exports.verifyAdmin = function(req, res, next) {
    console.log("in verify admin req.decoded.admin = " + req.decoded.admin );

    if (req.decoded.admin) {
        console.log("in verify admin req.decoded._doc.admin = " + req.decoded.admin );

        return next();
    } else {
        var err = new Error('Not authorized to perform this action. You need to be an admin');
        err.status = 403;
        return next(err)
    }
};

