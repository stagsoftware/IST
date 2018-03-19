var express = require('express');
var app = express();
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '/client')));

app.use(function (req, res) {
  res.sendFile(__dirname + '/client/index.html')
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8000, function (req, res) {
  console.log('Server is running on port 8000...');
});