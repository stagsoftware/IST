var express = require('express');
var router = express.Router();
var Project = require('../models/project.schema.js');

router.post('/AddProject', function (req, res) {
    console.log("in here");
    var NewProject = new Project({
        projectName: req.body.projectName,
        projectDetails: req.body.projectDetails,
        projectDescription: req.body.projectDescription,
        templateName: req.body.templateName
    });
    NewProject.save(function (err, data) {
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
    Project.find({}, function (err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

router.get('/SearchProject/:id', function (req, res) {
    Project.find({
        projectName: req.params.id
    }, function (err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});


router.put('/UpdateProject/:id', function (req, res) {
    Project.findOneAndUpdate({
        projectName: req.params.id
    }, {
            projectDetails: projectDetails,
            projectDescription: req.body.projectDescription,
            templateName: templateName
        }, function (err, data) {
            if (err) {
                throw err;
            } else {
                console.log('Data Updated Successfully');
                res.end();
            }
        });
});


router.delete('/DeleteProject/:id', function (req, res) {
    Project.remove({
        projectName: req.params.id
    }, function (err, data) {
        if (err) {
            throw err;
        } else {
            console.log('the Project has been Removed Successfully');
        }
    });
});


module.exports = router;
