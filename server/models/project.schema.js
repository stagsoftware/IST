var mongoose = require('mongoose');
var projectSchema = mongoose.Schema({
    name: String,
    description: String,
    details: String,
    templateName: String
});

module.exports = mongoose.model('Project', projectSchema);