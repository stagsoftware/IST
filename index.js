var express = require('express');
var app = express();
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');


var UISettingroute = require('./server/routes/ui.settings.routes.js');
var projectroute = require('./server/routes/project.routes.js');
var templateroute = require('./server/routes/template.routes.js');
var loginroute = require('./server/routes/routes.js');

// Used for POSTMAN
// app.use(bodyParser.urlencoded({
// 	extended:true
// }));
// Used for APPLICATION
app.use(bodyParser.json());

app.use(logger('dev'));
mongoose.connect('mongodb://localhost/istdb');

app.use(express.static(path.join(__dirname, '/client')));

// app.get('/',function(req,res){
// 	res.sendFile(path.join(__dirname, '/index.html'));
// })

app.use('/', loginroute);
app.use('/workspace', templateroute);
app.use('/workspace', UISettingroute);
app.use('/workspace', projectroute);

app.use(function (req, res) {
    res.sendFile(__dirname + '/client/index.html')
});

app.listen(8000, function (req, res) {
    console.log('Server is running on port 8000...');
});
