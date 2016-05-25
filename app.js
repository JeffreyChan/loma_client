var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require("uglify-js");
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var appClientFiles = [
  'src/app/app.js',
  'src/app/app.controller.js',
  'src/app/category/category.ctrl.js',
  'src/app/home/home.ctrl.js'
];
var uglified = uglifyJs.minify(appClientFiles, { compress: false });

fs.writeFile('public/loma/loma.min.js', uglified.code, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'loma.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));
app.use("/tmp" , express.static(path.join(__dirname, 'src/app')));

app.get('*', function (req, res) {
  res.sendfile(path.join(__dirname, 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
