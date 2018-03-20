var express = require('express');
var router = express.Router();
var Template = require('../models/template.schema.js');



router.post('/AddTemplate', function (req, res) {
    var NewTemplate = new Template({
        Name: req.body.Name,
        templateValue: req.body.templateValue
    });
    NewTemplate.save(function (err, data) {
        if (err) {
            throw err;
        } else {
            console.log('Template is Added Successfully');
            res.end();
        }
    });
});

router.get('/GetTemplate', function (req, res) {
    Template.find({}, function (err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

router.get('/SearchTemplate/:id', function (req, res) {
    Template.find({
        Name: req.params.id
    }, function (err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});


module.exports = router;
