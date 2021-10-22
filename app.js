var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
    const error = new Error ("wrong url")
    error.statusCode = 404
    next(error)
})
app.use((err, req, res, next) =>{
    if(error.statusCode){
       return res.statusCode(error.statusCode).send(err.message)
    }else{
        res.status(500).send(err.message)
    }
})


module.exports = app;
