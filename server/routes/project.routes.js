var express = require('express');
var router = express.Router();
var Project = require('../models/project.schema.js');

router.post('/AddProject', function (req, res) {
    var newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        details: req.body.details,
        templateName: req.body.templateName
    });
    newProject.save(function (err, data) {
        if (err) {
            console.log("in");
            throw err;
        } else {
            console.log('Project is Added Successfully');
            res.end();
        }
    });
});

router.get('/GetProject', function (req, res) {
    Project.find(
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

router.get('/SearchProject/:id', function (req, res) {
    Project.find(
        {
            name: req.params.id
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


router.put('/UpdateProject/:id', function (req, res) {
    Project.findOneAndUpdate(
        {
            name: req.params.id
        },
        {
            name: req.body.name,
            description: req.body.description,
        },
        function (err, data) {
            if (err) {
                throw err;
            } else {
                console.log('Data Updated Successfully');
                res.end();
            }
        }
    );
});


router.put('/SaveProject/:id', function (req, res) {
    Project.findOneAndUpdate(
        {
            name: req.params.id
        },
        {
            details: req.body.details
        },
        function (err, data) {
            if (err) {
                throw err;
            } else {
                console.log('Data saved Successfully');
                res.end();
            }
        });
});


router.delete('/DeleteProject/:id', function (req, res) {
    Project.remove(
        {
            name: req.params.id
        },
        function (err, data) {
            if (err) {
                throw err;
            } else {
                console.log('the Project has been Removed Successfully');
            }
        }
    );
});


module.exports = router;
