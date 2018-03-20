var mongoose = require('mongoose');
var projectSchema = mongoose.Schema({
    projectName: String,
    projectDetails: Object,
    projectDescription: String,
    templateName: String
});

module.exports = mongoose.model('Project', projectSchema);