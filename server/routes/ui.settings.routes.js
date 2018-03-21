var express = require('express');
var router = express.Router();
var UISetting = require('../models/ui.settings.schema.js');

router.get('/GetUISettings', function (req, res) {
    UISetting.find(
        {

        },
        function (err, data) {
            if (err) {
                throw err;
            } else {
                res.json(data);
            }
        }
    );
});

router.post('/AddUISettings', function (req, res) {
    var newUISetting = new UISetting({
        name: req.body.name,
        value: req.body.value
    });
    newUISetting.save(function (err, data) {
        if (err) {
            throw err;
        } else {
            console.log('UISetting is Added Successfully');
            res.end();
        }
    });
});

module.exports = router;