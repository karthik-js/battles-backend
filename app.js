var createError = require('http-errors');
var express = require('express');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

var routes = require('./routes');

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
mongoose
    .connect(MONGODB_URL.toString(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        //don't show the log when it is test
        if (process.env.NODE_ENV !== 'test') {
            console.log('Connected to %s', MONGODB_URL);
            console.log('App is running ... \n');
            console.log('Press CTRL + C to stop the process. \n');
        }
    })
    .catch((err) => {
        console.error('App starting error:', err.message);
        process.exit(1);
    });
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: err});
});

module.exports = app;
module.exports.handler = serverless(app);
