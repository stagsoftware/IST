var express = require('express');
var router = express.Router();
var UISetting = require('../models/ui.settings.schema.js');

router.get('/GetUISettings', function (req, res) {
    UISetting.find({}, function (err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

router.post('/AddUISettings', function (req, res) {
    var NewUISetting = new UISetting({
        Name: req.body.Name,
        Value: req.body.Value
    });
    NewUISetting.save(function (err, data) {
        if (err) {
            throw err;
        } else {
            console.log('UISetting is Added Successfully');
            res.end();
        }
    });
});

module.exports = router;